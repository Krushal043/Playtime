import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Coupon from '@/models/Coupon';
import { verifyAdminRequest } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, coupons });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();

    if (!body.code || !body.discountValue) {
      return NextResponse.json({ success: false, message: 'Code and discount value required' }, { status: 400 });
    }

    const coupon = await Coupon.findOneAndUpdate(
      { code: body.code.toUpperCase().trim() },
      {
        code: body.code.toUpperCase().trim(),
        discountType: body.discountType || 'percentage',
        discountValue: Number(body.discountValue),
        minSpend: Number(body.minSpend) || 0,
        usageLimit: body.usageLimit ? Number(body.usageLimit) : undefined,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, coupon });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ success: false, message: 'Coupon code required' }, { status: 400 });
    }

    await Coupon.findOneAndDelete({ code: code.toUpperCase() });
    return NextResponse.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
