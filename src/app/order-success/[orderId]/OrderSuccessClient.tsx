'use client';

import React, { Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/types';
import PromoBanner from '@/components/PromoBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  EyeOff,
  Lock,
  Download,
  Share2,
  ArrowRight,
  MapPin,
  Calendar,
  CreditCard,
  MessageCircle,
  AlertTriangle
} from 'lucide-react';

function OrderSuccessContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getOrderById } = useAuth();

  const orderId = typeof params.orderId === 'string' ? params.orderId : Array.isArray(params.orderId) ? params.orderId[0] : '';
  const token = searchParams ? searchParams.get('token') : null;
  const localOrder: Order | undefined = getOrderById(orderId);
  const [dbOrder, setDbOrder] = React.useState<any>(null);
  const [accessDenied, setAccessDenied] = React.useState(false);

  React.useEffect(() => {
    if (!localOrder && orderId) {
      const tokenParam = token ? `&token=${encodeURIComponent(token)}` : '';
      fetch(`/api/orders?orderId=${encodeURIComponent(orderId)}${tokenParam}`)
        .then((r) => {
          if (r.status === 403) {
            setAccessDenied(true);
            return null;
          }
          return r.json();
        })
        .then((d) => {
          if (d && d.success && d.order) {
            setDbOrder({
              id: d.order.orderId,
              createdAt: d.order.createdAt,
              items: d.order.items.map((i: any) => ({
                productId: i.productId,
                productName: i.productName,
                productImage: i.image,
                packLabel: i.packLabel,
                packSize: i.packSize,
                price: i.price,
                quantity: i.quantity,
              })),
              shippingAddress: {
                fullName: d.order.customer.name,
                phone: d.order.customer.phone,
                city: d.order.customer.city,
                state: d.order.customer.state,
                pincode: d.order.customer.pincode,
                addressLine1: d.order.customer.address,
              },
              paymentMethod: d.order.paymentMethod,
              paymentStatus: d.order.paymentStatus === 'paid' ? 'Paid' : 'COD',
              billingDescriptor: 'PT Logistics',
              subtotal: d.order.pricing.subtotal,
              discount: d.order.pricing.discount,
              couponCode: d.order.pricing.promoCode,
              shippingFee: d.order.pricing.shippingFee,
              totalAmount: d.order.pricing.totalAmount,
              status: d.order.fulfillmentStatus === 'delivered' ? 'Delivered' : 'Confirmed',
              trackingNumber: d.order.tracking?.trackingNumber || `EXP-IN-${orderId.replace('PT-', '').replace('ORD-', '')}`,
              estimatedDelivery: 'Estimated delivery in 2-3 business days',
            });
          }
        })
        .catch(() => {});
    }
  }, [orderId, localOrder, token]);

  const order: Order | undefined = localOrder || dbOrder;

  const handlePrint = () => {
    window.print();
  };

  if (accessDenied) {
    return (
      <div className="min-h-screen silver-shade-bg text-[#0A0A0A] flex flex-col selection:bg-[#007BA7]/25 selection:text-[#0A0A0A]">
        <Navbar />
        <div className="flex-1 max-w-md mx-auto px-4 py-20 text-center space-y-6">
          <div className="glass-card-elevated rounded-3xl p-8 sm:p-10 border border-white/95 shadow-2xl space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-[#007BA7]/10 text-[#007BA7] flex items-center justify-center mx-auto border border-[#007BA7]/20 shadow-md">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-[#0A0A0A]">Protected Order Access</h2>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              This order contains confidential delivery details and is protected with end-to-end token validation. Please use the exact confirmation link sent to your device.
            </p>
            <Link
              href="/"
              className="inline-block px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0A0A0A] via-[#007BA7] to-[#FF2D95] hover:opacity-95 text-white text-xs font-black uppercase tracking-wider shadow-[0_4px_16px_rgba(0,123,167,0.35)] transition-all"
            >
              Return Home &rarr;
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen silver-shade-bg text-[#0A0A0A] flex flex-col selection:bg-[#007BA7]/25 selection:text-[#0A0A0A]">
        <Navbar />
        <div className="flex-1 max-w-md mx-auto px-4 py-20 text-center space-y-6">
          <div className="glass-card-elevated rounded-3xl p-8 sm:p-10 border border-white/95 shadow-2xl space-y-5">
            <h2 className="text-xl font-black text-[#0A0A0A]">Order Not Found</h2>
            <p className="text-xs text-slate-600 font-medium">We could not find the details for this order.</p>
            <Link
              href="/"
              className="inline-block px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0A0A0A] via-[#007BA7] to-[#FF2D95] hover:opacity-95 text-white text-xs font-black uppercase tracking-wider shadow-[0_4px_16px_rgba(0,123,167,0.35)] transition-all"
            >
              Return Home &rarr;
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen silver-shade-bg text-[#0A0A0A] flex flex-col selection:bg-[#007BA7]/25 selection:text-[#0A0A0A]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full space-y-8">
        
        {/* Celebratory Banner */}
        <div className="glass-card-elevated rounded-3xl p-6 sm:p-10 border border-white/90 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-md animate-in zoom-in duration-300">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
              <EyeOff className="w-3.5 h-3.5" />
              100% Confidential Order Confirmed
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              Thank You! Your Order is Secured.
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Order ID: <strong className="text-[#0A0A0A] font-mono">#{order.id}</strong> • Tracking Number: <span className="font-mono text-[#FF2D95] font-bold">{order.trackingNumber}</span>
            </p>
          </div>

          {/* Discreet Box Reminder */}
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-white/70 border border-slate-200/80 text-xs text-slate-700 flex items-center gap-3 text-left shadow-sm">
            <Lock className="w-5 h-5 text-[#007BA7] shrink-0" />
            <p className="leading-relaxed">
              Your parcel will arrive inside an unmarked brown carton with sender name &ldquo;<strong className="text-[#0A0A0A]">PT Logistics</strong>&rdquo;. No product details appear anywhere on the exterior.
            </p>
          </div>
        </div>

        {/* Live Order Timeline Tracker */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xl space-y-6">
          <h2 className="text-base font-black text-[#0A0A0A]">Shipment Status &amp; Tracking</h2>
          
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2">
              
              {/* Step 1: Confirmed */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 text-left">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-black text-[#0A0A0A]">Order Confirmed</p>
                  <p className="text-[11px] text-slate-500 font-medium">Payment &amp; address verified</p>
                </div>
              </div>

              {/* Step 2: Discretely Packed */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 text-left">
                <div className="w-8 h-8 rounded-full bg-[#FF2D95] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md animate-pulse">
                  2
                </div>
                <div>
                  <p className="text-xs font-black text-[#FF2D95]">Discreetly Packed</p>
                  <p className="text-[11px] text-slate-500 font-medium">Unmarked brown box</p>
                </div>
              </div>

              {/* Step 3: Shipped */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 text-left opacity-70">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </div>
                <div>
                  <p className="text-xs font-black text-slate-700">Dispatched</p>
                  <p className="text-[11px] text-slate-500 font-medium">Express Courier (BlueDart)</p>
                </div>
              </div>

              {/* Step 4: Delivered */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 text-left opacity-70">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0">
                  4
                </div>
                <div>
                  <p className="text-xs font-black text-slate-700">Delivered</p>
                  <p className="text-[11px] text-slate-500 font-medium">{order.estimatedDelivery}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Itemized Order Summary */}
        <div className="glass-card-elevated rounded-3xl p-6 sm:p-8 border border-white/90 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
            <h2 className="text-base font-black text-[#0A0A0A]">Itemized Order Summary</h2>
            <span className="text-xs font-bold text-slate-500">
              {order.items.length} {order.items.length === 1 ? 'Product' : 'Products'}
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl bg-white overflow-hidden shrink-0 border border-slate-200/80 shadow-sm">
                  <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <h3 className="font-black text-[#0A0A0A] text-sm">{item.productName}</h3>
                  <p className="text-[#FF2D95] font-bold mt-0.5">{item.packLabel}</p>
                  <p className="text-slate-500 mt-0.5">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-[#0A0A0A]">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="pt-4 border-t border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold text-[#0A0A0A]">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-black">
                <span>Promo Discount ({order.couponCode || 'PLAY10'})</span>
                <span>-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Discreet Express Shipping</span>
              <span>
                {order.shippingFee === 0 ? (
                  <strong className="text-emerald-600 font-black">FREE</strong>
                ) : (
                  `₹${order.shippingFee}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-[#0A0A0A] pt-2 border-t border-slate-200/80">
              <span>Total Paid</span>
              <span className="text-[#FF2D95]">₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Address and Payment Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Shipping Address */}
          <div className="glass-card rounded-3xl p-6 border border-white/80 shadow-xl text-xs space-y-3">
            <h3 className="font-black text-[#0A0A0A] text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF2D95]" />
              Delivery Destination
            </h3>
            <div>
              <p className="font-black text-[#0A0A0A]">{order.shippingAddress.fullName}</p>
              <p className="text-slate-600 leading-relaxed mt-1">
                {order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2 && `${order.shippingAddress.addressLine2}, `}
                {order.shippingAddress.city}, {order.shippingAddress.state} - <strong className="text-[#0A0A0A]">{order.shippingAddress.pincode}</strong>
              </p>
              <p className="text-slate-500 mt-1">Phone: +91 {order.shippingAddress.phone}</p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 text-[11px] text-emerald-600 font-bold flex items-center gap-1.5">
              <EyeOff className="w-3.5 h-3.5" />
              <span>Packaging: 100% Plain Unmarked Outer Box</span>
            </div>
          </div>

          {/* Payment & Billing Details */}
          <div className="glass-card rounded-3xl p-6 border border-white/80 shadow-xl text-xs space-y-3">
            <h3 className="font-black text-[#0A0A0A] text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#007BA7]" />
              Payment &amp; Billing
            </h3>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="font-black text-[#0A0A0A]">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Status:</span>
                <span className="font-black text-emerald-600">{order.paymentStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Statement Reads:</span>
                <span className="font-black text-slate-700">{order.billingDescriptor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Order Placed:</span>
                <span className="font-medium text-slate-700">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/80 hover:bg-white border border-slate-300/80 text-[#0A0A0A] text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Download Invoice (PDF)</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full btn-gradient text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <span>Continue Shopping &rarr;</span>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default function OrderSuccessClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#007BA7] border-t-transparent animate-spin" />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}

