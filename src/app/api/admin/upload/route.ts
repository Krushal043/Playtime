import { NextRequest, NextResponse } from 'next/server';
import { uploadBufferToCloudinary, generateCloudinarySignature } from '@/lib/cloudinary';
import { verifyAdminRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
const MAX_IMAGE_SIZE = 15 * 1024 * 1024; // 15MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

/**
 * GET: Returns signed credentials for direct client-side uploads to Cloudinary.
 * Protected: Requires authenticated admin.
 */
export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'playtime';
    const timestamp = Math.round(new Date().getTime() / 1000);

    const paramsToSign: Record<string, any> = {
      folder,
      timestamp,
    };

    const signature = generateCloudinarySignature(paramsToSign);

    return NextResponse.json({
      success: true,
      signature,
      timestamp,
      folder,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error: any) {
    console.error('Cloudinary sign error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Signature generation failed' },
      { status: 500 }
    );
  }
}

/**
 * POST: Handles direct multipart file uploads through the server to Cloudinary.
 * Protected: Requires authenticated admin and validates file types and sizes.
 */
export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'playtime';
    const resourceType = (formData.get('resource_type') as 'auto' | 'image' | 'video' | 'raw') || 'auto';

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file was provided in the upload request' },
        { status: 400 }
      );
    }

    const mimeType = file.type;
    const fileSize = file.size;

    // Validate MIME types and file sizes
    const isImage = ALLOWED_IMAGE_TYPES.includes(mimeType);
    const isVideo = ALLOWED_VIDEO_TYPES.includes(mimeType);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unsupported file type. Only JPEG, PNG, WEBP, GIF images and MP4, WEBM videos are allowed.',
        },
        { status: 400 }
      );
    }

    if (isImage && fileSize > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { success: false, message: 'Image size exceeds maximum limit of 15MB.' },
        { status: 400 }
      );
    }

    if (isVideo && fileSize > MAX_VIDEO_SIZE) {
      return NextResponse.json(
        { success: false, message: 'Video size exceeds maximum limit of 100MB.' },
        { status: 400 }
      );
    }

    // Convert file to Node Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await uploadBufferToCloudinary(buffer, {
      folder,
      resource_type: isVideo ? 'video' : 'image',
      filename: file.name,
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      resourceType: uploadResult.resource_type,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      duration: uploadResult.duration,
      bytes: uploadResult.bytes,
    });
  } catch (error: any) {
    console.error('Server upload to Cloudinary error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Upload to Cloudinary failed' },
      { status: 500 }
    );
  }
}
