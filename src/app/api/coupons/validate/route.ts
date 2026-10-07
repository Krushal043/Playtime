import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Coupon from '@/models/Coupon';
import { checkRateLimit } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Rate limit coupon validation attempts per IP (max 20 per 5 minutes) to prevent dictionary guessing
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
    const rateCheck = checkRateLimit(ip, 'coupon-validate', 20, 300);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { valid: false, message: 'Too many coupon attempts. Please try again shortly.' },
        { status: 429 }
      );
    }

    await connectToDatabase();
    const { code, cartTotal } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, message: 'Coupon code required' }, { status: 400 });
    }

    const cleanCode = code.toUpperCase().trim().slice(0, 30);
    const coupon = await Coupon.findOne({
      code: cleanCode,
      isActive: true,
    });

    if (!coupon) {
      return NextResponse.json({
        valid: false,
        message: `Code "${cleanCode}" is invalid or expired. Try "PLAY10" for 10% off.`,
      });
    }

    const total = Number(cartTotal) || 0;
    if (coupon.minSpend && total < coupon.minSpend) {
      return NextResponse.json({
        valid: false,
        message: `Code "${coupon.code}" requires a minimum spend of ₹${coupon.minSpend}.`,
      });
    }

    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = Math.round((total * coupon.discountValue) / 100);
    } else {
      discountAmount = Math.min(total, coupon.discountValue);
    }

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount,
      message: `Code "${coupon.code}" applied: ${coupon.discountValue}% instant discount!`,
    });
  } catch (error: any) {
    return NextResponse.json({ valid: false, message: error.message }, { status: 500 });
  }
}
