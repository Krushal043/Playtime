import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import VideoReel from '@/models/VideoReel';
import { INFLUENCER_VIDEOS } from '@/data/influencerVideos';
import { verifyAdminRequest } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    let videos = await VideoReel.find({}).sort({ sortOrder: 1, createdAt: -1 });

    // Seed if empty
    if (!videos || videos.length === 0) {
      for (const v of INFLUENCER_VIDEOS) {
        await VideoReel.findOneAndUpdate({ id: v.id }, { ...v, isPublished: true, sortOrder: 0 }, { upsert: true });
      }
      videos = await VideoReel.find({}).sort({ sortOrder: 1, createdAt: -1 });
    }

    return NextResponse.json({ success: true, videos });
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

    if (!body.videoUrl || !body.creatorName) {
      return NextResponse.json({ success: false, message: 'Video URL and Creator Name are required' }, { status: 400 });
    }

    if (!body.id) {
      body.id = 'reel-' + Math.floor(1000 + Math.random() * 9000);
    }

    const newVideo = await VideoReel.create(body);
    return NextResponse.json({ success: true, video: newVideo });
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

    if (!body.id) {
      return NextResponse.json({ success: false, message: 'Video ID is required' }, { status: 400 });
    }

    const updated = await VideoReel.findOneAndUpdate({ id: body.id }, body, { new: true });
    return NextResponse.json({ success: true, video: updated });
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
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Video ID is required' }, { status: 400 });
    }

    await VideoReel.findOneAndDelete({ id });
    return NextResponse.json({ success: true, message: 'Video reel removed successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
