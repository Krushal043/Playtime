import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
  productId: string;
  productName: string;
  packLabel: string;
  packSize: number;
  quantity: number;
  price: number;
  image?: string;
}

export interface IOrder extends Document {
  orderId: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: IOrderItem[];
  pricing: {
    subtotal: number;
    discount: number;
    shippingFee: number;
    totalAmount: number;
    promoCode?: string;
  };
  paymentMethod: 'COD' | 'UPI' | 'CARD';
  paymentStatus: 'pending' | 'paid' | 'failed';
  fulfillmentStatus: 'pending' | 'confirmed' | 'dispatched' | 'in_transit' | 'delivered' | 'cancelled';
  tracking?: {
    courierPartner?: string;
    trackingNumber?: string;
    dispatchedAt?: Date;
    deliveredAt?: Date;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    packLabel: { type: String, required: true },
    packSize: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    items: [OrderItemSchema],
    pricing: {
      subtotal: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      shippingFee: { type: Number, default: 0 },
      totalAmount: { type: Number, required: true },
      promoCode: { type: String },
    },
    paymentMethod: { type: String, enum: ['COD', 'UPI', 'CARD'], default: 'COD' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    fulfillmentStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'dispatched', 'in_transit', 'delivered', 'cancelled'],
      default: 'pending',
    },
    tracking: {
      courierPartner: { type: String },
      trackingNumber: { type: String },
      dispatchedAt: { type: Date },
      deliveredAt: { type: Date },
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
