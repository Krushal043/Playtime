import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAdminRequest } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const mongoose = await connectToDatabase();
    return NextResponse.json({
      success: true,
      status: 'connected',
      database: mongoose.connection.name,
      readyState: mongoose.connection.readyState,
    });
  } catch (error: any) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Database connection failed',
      },
      { status: 500 }
    );
  }
}
