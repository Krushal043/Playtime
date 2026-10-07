import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import VideoReel from '@/models/VideoReel';
import { INFLUENCER_VIDEOS } from '@/data/influencerVideos';

export async function GET() {
  try {
    await connectToDatabase();
    const videos = await VideoReel.find({ isPublished: true }).sort({ sortOrder: 1, createdAt: -1 });

    if (!videos || videos.length === 0) {
      return NextResponse.json({ success: true, videos: INFLUENCER_VIDEOS });
    }

    return NextResponse.json({ success: true, videos });
  } catch (error: any) {
    console.error('Public videos fetch error:', error);
    return NextResponse.json({ success: true, videos: INFLUENCER_VIDEOS });
  }
}
