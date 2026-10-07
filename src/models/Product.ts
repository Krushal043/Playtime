import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductPack {
  packSize: number;
  label: string;
  price: number;
  originalPrice: number;
  discount: string;
}

export interface IProductImage {
  url: string;
  label?: string;
  caption?: string;
}

export interface IProduct extends Document {
  id: string; // URL slug e.g. pt-extend-spray
  name: string;
  tagline: string;
  category: 'all' | 'bestsellers' | 'extend' | 'supplements' | 'condoms' | 'couples' | 'lubes';
  basePrice: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeType?: 'blue' | 'red' | 'green' | 'silver';
  image: string;
  images: IProductImage[];
  videoUrl?: string;
  description: string;
  features: string[];
  specs: {
    material?: string;
    waterproof?: string;
    power?: string;
    ingredients?: string;
    volume?: string;
    safeForSkin?: string;
  };
  packs: IProductPack[];
  inStock: boolean;
  discreetPackagingGuaranteed: boolean;
  howToUse: string[];
  isFeatured?: boolean;
  sortOrder?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductPackSchema = new Schema<IProductPack>(
  {
    packSize: { type: Number, required: true },
    label: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: String, required: true },
  },
  { _id: false }
);

const ProductImageSchema = new Schema<IProductImage>(
  {
    url: { type: String, required: true },
    label: { type: String },
    caption: { type: String },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['all', 'bestsellers', 'extend', 'supplements', 'condoms', 'couples', 'lubes'],
      default: 'extend',
    },
    basePrice: { type: Number, required: true },
    originalPrice: { type: Number },
    rating: { type: Number, default: 4.9 },
    reviewsCount: { type: Number, default: 0 },
    badge: { type: String },
    badgeType: { type: String, enum: ['blue', 'red', 'green', 'silver'] },
    image: { type: String, required: true },
    images: [ProductImageSchema],
    videoUrl: { type: String },
    description: { type: String, required: true },
    features: [{ type: String }],
    specs: {
      material: { type: String },
      waterproof: { type: String },
      power: { type: String },
      ingredients: { type: String },
      volume: { type: String },
      safeForSkin: { type: String },
    },
    packs: [ProductPackSchema],
    inStock: { type: Boolean, default: true },
    discreetPackagingGuaranteed: { type: Boolean, default: true },
    howToUse: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation in development
export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
