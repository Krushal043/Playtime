import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVideoReel extends Document {
  id: string;
  creatorName: string;
  creatorHandle: string;
  creatorRole: string;
  avatar: string;
  videoUrl: string;
  poster: string;
  views: string;
  likes: string;
  duration?: string;
  quote: string;
  rating: number;
  productId: string;
  productName: string;
  productPrice: number;
  productOriginalPrice?: number;
  productImage: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const VideoReelSchema = new Schema<IVideoReel>(
  {
    id: { type: String, required: true, unique: true, index: true },
    creatorName: { type: String, required: true },
    creatorHandle: { type: String, required: true },
    creatorRole: { type: String, default: 'Verified Creator' },
    avatar: { type: String, required: true },
    videoUrl: { type: String, required: true },
    poster: { type: String, required: true },
    views: { type: String, default: '120K' },
    likes: { type: String, default: '12.4K' },
    duration: { type: String, default: '0:30' },
    quote: { type: String, required: true },
    rating: { type: Number, default: 5 },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productOriginalPrice: { type: Number },
    productImage: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const VideoReel: Model<IVideoReel> =
  mongoose.models.VideoReel || mongoose.model<IVideoReel>('VideoReel', VideoReelSchema);

export default VideoReel;
