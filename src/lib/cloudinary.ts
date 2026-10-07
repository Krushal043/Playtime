import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format?: string;
  width?: number;
  height?: number;
  duration?: number;
  bytes?: number;
}

/**
 * Uploads a Buffer (or base64 string) to Cloudinary
 */
export async function uploadBufferToCloudinary(
  buffer: Buffer,
  options: {
    folder?: string;
    resource_type?: 'auto' | 'image' | 'video' | 'raw';
    filename?: string;
  } = {}
): Promise<CloudinaryUploadResult> {
  const { folder = 'playtime', resource_type = 'auto', filename } = options;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type,
        use_filename: Boolean(filename),
        unique_filename: true,
        overwrite: false,
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error('Upload failed with no result from Cloudinary'));
        }
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
          resource_type: result.resource_type,
          format: result.format,
          width: result.width,
          height: result.height,
          duration: result.duration,
          bytes: result.bytes,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Generates an upload signature for direct browser uploads to Cloudinary
 */
export function generateCloudinarySignature(paramsToSign: Record<string, any>) {
  const apiSecret = process.env.CLOUDINARY_API_SECRET || '';
  return cloudinary.utils.api_sign_request(paramsToSign, apiSecret);
}

export default cloudinary;
