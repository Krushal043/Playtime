export type CategoryType = 'all' | 'bestsellers' | 'extend' | 'supplements' | 'condoms' | 'couples' | 'lubes';

export interface ProductPack {
  packSize: number; // 1, 2, 3
  label: string; // "Pack of 1", "Pack of 2 (Save 15%)", "Pack of 3 (Save 25%)"
  price: number;
  originalPrice: number;
  discount: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: CategoryType;
  basePrice: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeType?: 'blue' | 'red' | 'green' | 'silver';
  image: string;
  images?: { url: string; label?: string; caption?: string }[];
  videoUrl?: string;
  isFeatured?: boolean;
  sortOrder?: number;
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
  packs: ProductPack[];
  inStock: boolean;
  discreetPackagingGuaranteed: boolean;
  howToUse?: string[];
  faq?: { q: string; a: string }[];
}

export interface CartItem {
  product: Product;
  selectedPack: ProductPack;
  quantity: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  alternatePhone?: string;
  pincode: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  addressType: 'Home' | 'Work' | 'Other';
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  defaultAddressId?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  packLabel: string;
  packSize: number;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  paymentStatus: 'Paid' | 'Pending' | 'COD';
  billingDescriptor: string; // e.g. "PT Logistics"
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  totalAmount: number;
  discreetDeliveryPreference: {
    unmarkedBox: boolean;
    discreteCallOnArrival: boolean;
    hideContentsFromPartner: boolean;
    customNote?: string;
  };
  status: 'Confirmed' | 'Discreetly Packed' | 'Dispatched' | 'Delivered';
  estimatedDelivery: string;
  trackingNumber: string;
}
