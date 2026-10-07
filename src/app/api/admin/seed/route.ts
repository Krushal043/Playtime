import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import Order from '@/models/Order';
import Coupon from '@/models/Coupon';
import Setting from '@/models/Setting';
import { ALL_PRODUCTS } from '@/data/products';
import { verifyAdminRequest } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // 1. Seed Products (upsert)
    for (const prod of ALL_PRODUCTS) {
      await Product.findOneAndUpdate(
        { id: prod.id },
        {
          id: prod.id,
          name: prod.name,
          tagline: prod.tagline,
          category: prod.category,
          basePrice: prod.basePrice,
          originalPrice: prod.packs[0]?.originalPrice || prod.basePrice * 1.3,
          rating: prod.rating,
          reviewsCount: prod.reviewsCount,
          badge: prod.badge,
          badgeType: prod.badgeType,
          image: prod.image,
          description: prod.description,
          features: prod.features,
          specs: prod.specs,
          packs: prod.packs,
          inStock: prod.inStock,
          discreetPackagingGuaranteed: prod.discreetPackagingGuaranteed,
          howToUse: prod.howToUse,
          isFeatured: true,
          sortOrder: prod.id === 'pt-extend-spray' ? 1 : prod.id === 'pt-shilajit-gold' ? 2 : 3,
        },
        { upsert: true, new: true }
      );
    }

    // 2. Seed Coupons
    const initialCoupons = [
      {
        code: 'PLAY10',
        discountType: 'percentage',
        discountValue: 10,
        minSpend: 0,
        timesUsed: 142,
        isActive: true,
      },
      {
        code: 'MATCH10',
        discountType: 'percentage',
        discountValue: 10,
        minSpend: 499,
        timesUsed: 68,
        isActive: true,
      },
      {
        code: 'VIP20',
        discountType: 'percentage',
        discountValue: 20,
        minSpend: 999,
        timesUsed: 29,
        isActive: true,
      },
    ];

    for (const coup of initialCoupons) {
      await Coupon.findOneAndUpdate({ code: coup.code }, coup, { upsert: true });
    }

    // 3. Seed Default Storefront Settings
    const defaultSettings = [
      {
        key: 'promo_banner',
        value: {
          tickerText: '100% Plain Box: Discreet Box • Zero outer logos',
          couponCode: 'PLAY10',
          countdownHours: 4,
          countdownMinutes: 28,
          isActive: true,
        },
      },
      {
        key: 'hero_section',
        value: {
          tagText: 'Ayurvedic Science • Modern Intimacy',
          heading1: 'Peak Intimate Endurance.',
          headingGreen: '100% Herbal.',
          headingGradient: 'Zero Numbness.',
          subtitle:
            'Formulated with pure botanical clove, jaiphal and pure Himalayan Shilajit. Clinically tested to prolong endurance without dulling sensations or transferring to your partner.',
        },
      },
    ];

    for (const setting of defaultSettings) {
      await Setting.findOneAndUpdate({ key: setting.key }, setting, { upsert: true });
    }

    // 4. Seed Initial Sample Orders (if none exist)
    const existingOrdersCount = await Order.countDocuments();
    if (existingOrdersCount === 0) {
      const sampleOrders = [
        {
          orderId: 'ORD-94821',
          customer: {
            name: 'Vikram Sharma',
            phone: '+91 98765 43210',
            email: 'vikram.s@gmail.com',
            address: 'Flat 402, Sea Green Apts, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400050',
          },
          items: [
            {
              productId: 'pt-extend-spray',
              productName: 'Extend Long Last Delay Spray (50g)',
              packLabel: 'Single Canister (50g)',
              packSize: 1,
              quantity: 1,
              price: 499,
              image: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=800&auto=format&fit=crop&q=80',
            },
          ],
          pricing: {
            subtotal: 499,
            discount: 50,
            shippingFee: 0,
            totalAmount: 449,
            promoCode: 'PLAY10',
          },
          paymentMethod: 'UPI',
          paymentStatus: 'paid',
          fulfillmentStatus: 'dispatched',
          tracking: {
            courierPartner: 'BlueDart Air',
            trackingNumber: 'BLUEDART-88291039',
            dispatchedAt: new Date(Date.now() - 86400000),
          },
        },
        {
          orderId: 'ORD-94822',
          customer: {
            name: 'Karan Mehra',
            phone: '+91 98201 12345',
            email: 'karan.m@gmail.com',
            address: '12, 100ft Road, Indiranagar',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560038',
          },
          items: [
            {
              productId: 'pt-power-duo-bundle',
              productName: 'The Ayurvedic Power Duo Kit',
              packLabel: '1 Kit (Spray + 20g Shilajit Gold)',
              packSize: 1,
              quantity: 1,
              price: 1399,
              image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
            },
          ],
          pricing: {
            subtotal: 1399,
            discount: 140,
            shippingFee: 0,
            totalAmount: 1259,
            promoCode: 'PLAY10',
          },
          paymentMethod: 'COD',
          paymentStatus: 'pending',
          fulfillmentStatus: 'confirmed',
        },
      ];

      await Order.insertMany(sampleOrders);
    }

    return NextResponse.json({
      success: true,
      message: 'MongoDB database initialized with Playtime products, coupons, settings, and sample orders!',
    });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
