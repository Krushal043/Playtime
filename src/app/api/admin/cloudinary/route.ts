import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { verifyAdminRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/cloudinary
 * Lists assets uploaded to Cloudinary in the playtime namespace
 */
export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const resourceType = (searchParams.get('resource_type') as 'image' | 'video' | 'all') || 'all';
    const prefix = searchParams.get('prefix') || 'playtime';
    const maxResults = parseInt(searchParams.get('max_results') || '50', 10);

    const assets: any[] = [];

    // Fetch images if requested
    if (resourceType === 'image' || resourceType === 'all') {
      try {
        const imageRes = await cloudinary.api.resources({
          type: 'upload',
          resource_type: 'image',
          prefix,
          max_results: maxResults,
        });
        if (imageRes.resources) {
          assets.push(...imageRes.resources);
        }
      } catch (err) {
        console.error('Error fetching image resources from Cloudinary:', err);
      }
    }

    // Fetch videos if requested
    if (resourceType === 'video' || resourceType === 'all') {
      try {
        const videoRes = await cloudinary.api.resources({
          type: 'upload',
          resource_type: 'video',
          prefix,
          max_results: maxResults,
        });
        if (videoRes.resources) {
          assets.push(...videoRes.resources);
        }
      } catch (err) {
        console.error('Error fetching video resources from Cloudinary:', err);
      }
    }

    // Sort newest first
    assets.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({
      success: true,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      assets,
      count: assets.length,
    });
  } catch (error: any) {
    console.error('Cloudinary listing error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to list Cloudinary assets' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/cloudinary
 * Deletes an asset by public_id from Cloudinary
 */
export async function DELETE(request: NextRequest) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('public_id');
    const resourceType = (searchParams.get('resource_type') as 'image' | 'video' | 'raw') || 'image';

    if (!publicId) {
      return NextResponse.json(
        { success: false, message: 'public_id query parameter is required' },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.error('Cloudinary deletion error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete asset from Cloudinary' },
      { status: 500 }
    );
  }
}
