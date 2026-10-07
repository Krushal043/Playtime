import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Order from '@/models/Order';
import { verifyAdminRequest, escapeRegex } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const query: any = {};
    if (status && status !== 'all') {
      query.fulfillmentStatus = status;
    }
    if (search && search.trim()) {
      const sanitized = escapeRegex(search.trim());
      query.$or = [
        { orderId: { $regex: sanitized, $options: 'i' } },
        { 'customer.name': { $regex: sanitized, $options: 'i' } },
        { 'customer.phone': { $regex: sanitized, $options: 'i' } },
      ];
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();

    if (!body.orderId) {
      return NextResponse.json({ success: false, message: 'Order ID is required' }, { status: 400 });
    }

    const updated = await Order.findOneAndUpdate(
      { orderId: body.orderId },
      {
        fulfillmentStatus: body.fulfillmentStatus,
        paymentStatus: body.paymentStatus,
        tracking: body.tracking,
        notes: body.notes,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, order: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
