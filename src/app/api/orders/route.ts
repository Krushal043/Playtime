import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import Coupon from '@/models/Coupon';
import { ALL_PRODUCTS } from '@/data/products';
import {
  verifyAdminRequest,
  checkRateLimit,
  createOrderAccessToken,
  verifyOrderAccessToken,
} from '@/lib/auth';

/**
 * Helper to mask phone numbers for public/unauthenticated views
 * e.g. "+91 9876543210" -> "+91 98****3210"
 */
function maskPhoneNumber(phone: string): string {
  if (!phone) return '';
  const digits = phone.trim();
  if (digits.length <= 4) return '****';
  return digits.slice(0, 4) + '****' + digits.slice(-3);
}

export async function POST(request: Request) {
  try {
    // Rate limit checkout requests per IP (max 10 orders per 10 minutes)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
    const rateCheck = checkRateLimit(ip, 'create-order', 10, 600);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many order requests. Please try again later.' },
        { status: 429 }
      );
    }

    await connectToDatabase();
    const body = await request.json();

    // Anti-spam Honeypot Check: Automated bots populate hidden form fields
    if (body.website_honeypot || body.company_fax || body.honeypot) {
      return NextResponse.json(
        { success: false, message: 'Submission rejected as spam.' },
        { status: 400 }
      );
    }

    const rawItems = Array.isArray(body.items) ? body.items : [];
    if (rawItems.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Cart is empty. Please add items to checkout.' },
        { status: 400 }
      );
    }

    // 1. Server-side Price Verification (Prevents Price Tampering Attacks)
    let calculatedSubtotal = 0;
    const validatedItems: any[] = [];

    for (const item of rawItems) {
      const prodId = item.productId || item.product?.id || item.id;
      if (!prodId) continue;

      // Look up authoritative product from database (or catalog fallback)
      let product = await Product.findOne({ id: prodId });
      if (!product) {
        product = (ALL_PRODUCTS.find((p) => p.id === prodId) as any) || null;
      }

      if (!product) {
        continue;
      }

      const reqPackSize = Number(item.packSize || item.selectedPack?.packSize) || 1;
      const matchedPack =
        product.packs?.find((pk: any) => pk.packSize === reqPackSize) ||
        product.packs?.[0];

      // Authoritative unit price strictly from server
      const unitPrice = matchedPack ? Number(matchedPack.price) : Number(product.basePrice) || 499;
      const quantity = Math.max(1, Math.min(20, Math.floor(Number(item.quantity) || 1)));
      const itemSubtotal = unitPrice * quantity;

      calculatedSubtotal += itemSubtotal;

      validatedItems.push({
        productId: product.id,
        productName: product.name,
        packLabel: matchedPack?.label || `${reqPackSize} Pack`,
        packSize: reqPackSize,
        quantity,
        price: unitPrice,
        image: item.image || item.productImage || product.image,
      });
    }

    if (validatedItems.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No valid products could be verified in order.' },
        { status: 400 }
      );
    }

    // 2. Server-side Coupon & Discount Calculation
    let calculatedDiscount = 0;
    const rawCoupon = (body.pricing?.promoCode || body.couponCode || '').toString().trim().toUpperCase();

    if (rawCoupon) {
      const couponRecord = await Coupon.findOne({ code: rawCoupon, isActive: true });
      if (couponRecord) {
        const minSpend = Number(couponRecord.minSpend) || 0;
        if (calculatedSubtotal >= minSpend) {
          if (couponRecord.discountType === 'percentage') {
            calculatedDiscount = Math.round((calculatedSubtotal * Number(couponRecord.discountValue)) / 100);
          } else {
            calculatedDiscount = Math.min(calculatedSubtotal, Number(couponRecord.discountValue));
          }

          // Increment coupon usage
          await Coupon.findOneAndUpdate({ code: rawCoupon }, { $inc: { timesUsed: 1 } });
        }
      }
    }

    const shippingFee = calculatedSubtotal > 499 ? 0 : 0; // Free shipping standard
    const finalTotalAmount = Math.max(0, calculatedSubtotal - calculatedDiscount + shippingFee);

    // 3. Generate non-sequential, cryptographically unpredictable Order ID
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const timestampPart = Date.now().toString(36).toUpperCase().slice(-4);
    const orderId = `ORD-${timestampPart}-${randomSuffix}`;

    const newOrder = await Order.create({
      orderId,
      customer: {
        name: (body.customer?.name || body.shippingAddress?.fullName || 'Valued Customer').slice(0, 80),
        phone: (body.customer?.phone || body.shippingAddress?.phone || '').slice(0, 20),
        email: (body.customer?.email || body.shippingAddress?.email || '').slice(0, 100),
        address: (
          body.customer?.address ||
          `${body.shippingAddress?.addressLine1 || ''} ${body.shippingAddress?.addressLine2 || ''}`
        ).trim().slice(0, 250),
        city: (body.customer?.city || body.shippingAddress?.city || 'Mumbai').slice(0, 50),
        state: (body.customer?.state || body.shippingAddress?.state || 'Maharashtra').slice(0, 50),
        pincode: (body.customer?.pincode || body.shippingAddress?.pincode || '400001').slice(0, 10),
      },
      items: validatedItems,
      pricing: {
        subtotal: calculatedSubtotal,
        discount: calculatedDiscount,
        shippingFee,
        totalAmount: finalTotalAmount,
        promoCode: calculatedDiscount > 0 ? rawCoupon : undefined,
      },
      paymentMethod: (body.paymentMethod === 'UPI' ? 'UPI' : body.paymentMethod === 'CARD' ? 'CARD' : 'COD') as 'COD' | 'UPI' | 'CARD',
      paymentStatus: (body.paymentMethod === 'UPI' || body.paymentMethod === 'CARD' ? 'paid' : 'pending') as 'pending' | 'paid',
      fulfillmentStatus: 'pending',
      notes: (
        body.notes ||
        (body.discreetDeliveryPreference?.customNote ? `Note: ${body.discreetDeliveryPreference.customNote}` : '')
      ).slice(0, 300),
    });

    const createdOrder = newOrder as any;
    const accessToken = await createOrderAccessToken(createdOrder.orderId);

    return NextResponse.json({
      success: true,
      orderId: createdOrder.orderId,
      accessToken,
      order: createdOrder,
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const token = searchParams.get('token');

    if (!orderId) {
      return NextResponse.json({ success: false, message: 'Order ID is required' }, { status: 400 });
    }

    const order = await Order.findOne({ orderId });
    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    // Check if requester is authenticated admin
    const admin = await verifyAdminRequest(request);
    if (admin) {
      return NextResponse.json({ success: true, order });
    }

    // Verify cryptographic order access token from URL
    const isTokenValid = await verifyOrderAccessToken(orderId, token);
    if (!isTokenValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Security verification required: Valid URL token is required to view this order.',
        },
        { status: 403 }
      );
    }

    // If unauthenticated public request (e.g. order confirmation page):
    // Mask sensitive PII to prevent harvest attacks / enumeration
    const publicSafeOrder = {
      orderId: order.orderId,
      createdAt: order.createdAt,
      items: order.items,
      pricing: order.pricing,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      fulfillmentStatus: order.fulfillmentStatus,
      tracking: order.tracking,
      customer: {
        name: order.customer.name,
        phone: maskPhoneNumber(order.customer.phone),
        city: order.customer.city,
        state: order.customer.state,
        pincode: order.customer.pincode,
      },
    };

    return NextResponse.json({ success: true, order: publicSafeOrder });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
