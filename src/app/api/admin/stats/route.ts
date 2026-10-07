import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import Coupon from '@/models/Coupon';
import { verifyAdminRequest } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const [totalOrders, productsCount, couponsCount, orders] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments(),
      Coupon.countDocuments(),
      Order.find({}).sort({ createdAt: -1 }),
    ]);

    const totalRevenue = orders.reduce((sum, o) => sum + (o.pricing?.totalAmount || 0), 0);
    const pendingFulfillments = orders.filter(
      (o) => o.fulfillmentStatus === 'pending' || o.fulfillmentStatus === 'confirmed'
    ).length;
    const deliveredCount = orders.filter((o) => o.fulfillmentStatus === 'delivered').length;

    // Recent 5 orders
    const recentOrders = orders.slice(0, 5);

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        productsCount,
        couponsCount,
        pendingFulfillments,
        deliveredCount,
        averageOrderValue: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0,
      },
      recentOrders,
    });
  } catch (error: any) {
    console.error('Stats error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
