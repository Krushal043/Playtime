'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Address, Order, OrderItem } from '@/types';
import PromoBanner from '@/components/PromoBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ShieldCheck,
  EyeOff,
  Lock,
  ChevronRight,
  ArrowLeft,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  MapPin,
  Tag,
  Zap
} from 'lucide-react';

export default function CheckoutClient() {
  const router = useRouter();
  const {
    cart,
    subtotal,
    discount,
    shippingFee,
    finalTotal,
    promoCode,
    applyPromo,
    removePromo,
    clearCart
  } = useCart();
  const { user, addOrder, addAddress, demoLogin } = useAuth();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Address state
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const [addressForm, setAddressForm] = useState<Omit<Address, 'id'>>({
    fullName: user?.name || '',
    phone: user?.phone || '',
    alternatePhone: '',
    pincode: '400050',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    addressType: 'Home',
    isDefault: true
  });

  // Shipping preferences
  const [unmarkedBox, setUnmarkedBox] = useState(true);
  const [discreteCallOnArrival, setDiscreteCallOnArrival] = useState(true);
  const [hideContentsFromPartner, setHideContentsFromPartner] = useState(true);
  const [customDeliveryNote, setCustomDeliveryNote] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [cardData, setCardData] = useState({
    number: '4532 •••• •••• 8921',
    name: user?.name || 'Rahul Sharma',
    expiry: '09/28',
    cvv: '•••'
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Sync user addresses if available
  useEffect(() => {
    if (user?.addresses && user.addresses.length > 0) {
      const defaultAddr = user.addresses.find((a) => a.isDefault) || user.addresses[0];
      setSelectedAddressId(defaultAddr.id);
      setIsAddingNewAddress(false);
    } else {
      setIsAddingNewAddress(true);
    }
  }, [user]);

  // Fill quick demo address
  const handleFillDemoAddress = () => {
    setAddressForm({
      fullName: 'Rahul Sharma',
      phone: '9876543210',
      alternatePhone: '9820012345',
      pincode: '400050',
      addressLine1: 'Flat 402, Sea Breeze Apts, Hill Road',
      addressLine2: 'Near Mehboob Studio, Bandra West',
      landmark: 'Opposite Costa Coffee',
      city: 'Mumbai',
      state: 'Maharashtra',
      addressType: 'Home',
      isDefault: true
    });
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyPromo(couponInput);
    if (ok) {
      setCouponMsg({ text: 'Coupon applied! 10% instant discount subtracted.' });
    } else {
      setCouponMsg({ text: 'Invalid coupon. Try "PLAY10" for 10% off.', error: true });
    }
  };

  const getEffectiveAddress = (): Address => {
    if (!isAddingNewAddress && user?.addresses) {
      const found = user.addresses.find((a) => a.id === selectedAddressId);
      if (found) return found;
    }
    return {
      ...addressForm,
      id: `addr_${Date.now()}`
    };
  };

  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddingNewAddress) {
      if (!addressForm.fullName || !addressForm.phone || !addressForm.addressLine1 || !addressForm.pincode) {
        alert('Please fill out all required address fields.');
        return;
      }
      if (user) {
        const saved = addAddress(addressForm);
        setSelectedAddressId(saved.id);
        setIsAddingNewAddress(false);
      }
    }
    setActiveStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToStep3 = () => {
    setActiveStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    const shippingAddress = getEffectiveAddress();
    const orderId = `PT-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderItems: OrderItem[] = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.image,
      packLabel: item.selectedPack.label,
      packSize: item.selectedPack.packSize,
      price: item.selectedPack.price,
      quantity: item.quantity
    }));

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: orderItems,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'COD' : 'Paid',
      billingDescriptor: 'PT Logistics',
      subtotal,
      discount,
      couponCode: promoCode || undefined,
      shippingFee,
      totalAmount: finalTotal,
      discreetDeliveryPreference: {
        unmarkedBox,
        discreteCallOnArrival,
        hideContentsFromPartner,
        customNote: customDeliveryNote || undefined
      },
      status: 'Confirmed',
      estimatedDelivery: 'Estimated delivery in 2-3 business days',
      trackingNumber: `EXP-IN-${orderId.replace('PT-', '')}`
    };

    try {
      // POST order directly to MongoDB database!
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          customer: {
            name: shippingAddress.fullName,
            phone: shippingAddress.phone,
            email: user?.email || '',
            address: `${shippingAddress.addressLine1} ${shippingAddress.addressLine2 || ''} ${shippingAddress.landmark || ''}`.trim(),
            city: shippingAddress.city,
            state: shippingAddress.state,
            pincode: shippingAddress.pincode,
          },
          items: cart.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            packLabel: item.selectedPack.label,
            packSize: item.selectedPack.packSize,
            quantity: item.quantity,
            price: item.selectedPack.price,
            image: item.product.image,
          })),
          pricing: {
            subtotal,
            discount,
            shippingFee,
            totalAmount: finalTotal,
            promoCode: promoCode || undefined,
          },
          paymentMethod,
          notes: customDeliveryNote || undefined,
          website_honeypot: honeypot || undefined,
        }),
      });

      const data = await res.json();
      const confirmedOrderId = data.orderId || orderId;
      const tokenQuery = data.accessToken ? `?token=${encodeURIComponent(data.accessToken)}` : '';

      addOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      router.push(`/order-success/${confirmedOrderId}${tokenQuery}`);
    } catch (err) {
      console.error('Order API error, continuing with local confirmation:', err);
      addOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      router.push(`/order-success/${orderId}`);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen silver-shade-bg text-slate-900 flex flex-col selection:bg-blue-600/20 selection:text-blue-950">
        <Navbar />
        <div className="flex-1 max-w-md mx-auto px-4 py-20 text-center space-y-6">
          <div className="glass-card-elevated rounded-3xl p-8 sm:p-10 border border-white/95 shadow-2xl space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200/80 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-[#051336]">Your Bag is Empty</h2>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Please add an intimate wellness formulation or couples bundle to your bag to proceed with 100% discreet delivery.
            </p>
            <Link
              href="/"
              className="inline-block px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white text-xs font-black uppercase tracking-wider shadow-[0_4px_16px_rgba(225,29,72,0.45)] hover:shadow-[0_6px_22px_rgba(225,29,72,0.6)] transition-all"
            >
              Explore Formulations &rarr;
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen silver-shade-bg text-slate-900 flex flex-col selection:bg-blue-600/20 selection:text-blue-950">
      <Navbar />

      {/* Checkout Progress Stepper in Frosted Pearl */}
      <div className="bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-center gap-2 sm:gap-6 text-xs font-black">
            
            <button
              onClick={() => setActiveStep(1)}
              className={`flex items-center gap-2 cursor-pointer ${
                activeStep === 1 ? 'text-[#0a193d] font-black' : 'text-slate-500'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                activeStep >= 1 ? 'btn-red text-white shadow-xs' : 'bg-slate-200 text-slate-500'
              }`}>
                1
              </span>
              <span>1. Delivery Address</span>
            </button>

            <ChevronRight className="w-4 h-4 text-slate-300" />

            <button
              onClick={() => (activeStep > 2 ? setActiveStep(2) : null)}
              className={`flex items-center gap-2 ${
                activeStep === 2 ? 'text-[#0a193d] font-black' : activeStep > 2 ? 'text-slate-600 cursor-pointer' : 'text-slate-400'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                activeStep >= 2 ? 'btn-red text-white shadow-xs' : 'bg-slate-200 text-slate-400'
              }`}>
                2
              </span>
              <span>2. Discreet Preferences</span>
            </button>

            <ChevronRight className="w-4 h-4 text-slate-300" />

            <div className={`flex items-center gap-2 ${
              activeStep === 3 ? 'text-rose-600 font-black' : 'text-slate-400'
            }`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                activeStep === 3 ? 'btn-red text-white shadow-xs' : 'bg-slate-200 text-slate-400'
              }`}>
                3
              </span>
              <span>3. Payment &amp; Confirmation</span>
            </div>

          </div>
        </div>
      </div>

      {/* Main Checkout Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Multi-Step Flow */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: DELIVERY ADDRESS */}
            {activeStep === 1 && (
              <div className="glass-card-elevated rounded-3xl p-6 sm:p-8 border border-white/95 shadow-2xl space-y-6 animate-in fade-in duration-200 text-[#0a193d]">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
                  <div>
                    <h2 className="text-xl font-black text-[#0a193d] flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-rose-600" />
                      Delivery Address
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">Where should we deliver your unmarked parcel?</p>
                  </div>

                  {!user && (
                    <button
                      type="button"
                      onClick={demoLogin}
                      className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0a193d] border border-slate-200/80 text-[11px] font-black flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                    >
                      <Zap className="w-3 h-3 fill-current text-amber-500" />
                      Sign In Demo Account
                    </button>
                  )}
                </div>

                {/* If user has saved addresses, display them */}
                {user && user.addresses.length > 0 && !isAddingNewAddress && (
                  <div className="space-y-3">
                    <p className="text-xs font-black text-slate-600">Choose from Saved Addresses:</p>
                    <div className="grid grid-cols-1 gap-3">
                      {user.addresses.map((addr) => {
                        const isSelected = selectedAddressId === addr.id;
                        return (
                          <div
                            key={addr.id}
                            onClick={() => setSelectedAddressId(addr.id)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                              isSelected
                                ? 'border-rose-400 btn-red shadow-md text-white'
                                : 'border-slate-200/80 bg-slate-50 hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <div className="mt-0.5">
                              <input
                                type="radio"
                                checked={isSelected}
                                onChange={() => setSelectedAddressId(addr.id)}
                                className="w-4 h-4 text-rose-600"
                              />
                            </div>
                            <div className="flex-1 text-xs">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`font-black text-sm ${isSelected ? 'text-white' : 'text-[#0a193d]'}`}>{addr.fullName}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                                  {addr.addressType}
                                </span>
                              </div>
                              <p className={`leading-relaxed ${isSelected ? 'text-white/90' : 'text-slate-600'}`}>
                                {addr.addressLine1}, {addr.addressLine2 && `${addr.addressLine2}, `}
                                {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                              </p>
                              <p className={`mt-1 font-semibold ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>Phone: +91 {addr.phone}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(true)}
                      className="text-xs text-rose-600 font-black hover:underline cursor-pointer block pt-2"
                    >
                      + Deliver to a Different Address
                    </button>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleProceedToStep2}
                        className="w-full py-4 rounded-full btn-navy-red text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer transition-all"
                      >
                        <span>Deliver to This Address &rarr;</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Add / Edit New Address Form */}
                {isAddingNewAddress && (
                  <form onSubmit={handleProceedToStep2} className="space-y-4">
                    {/* Invisible Honeypot to trap automated form bots */}
                    <div className="opacity-0 absolute top-0 left-0 h-0 w-0 -z-50 pointer-events-none" aria-hidden="true">
                      <label htmlFor="website_honeypot">Leave this blank</label>
                      <input
                        id="website_honeypot"
                        type="text"
                        name="website_honeypot"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-600">Enter delivery details:</span>
                      <button
                        type="button"
                        onClick={handleFillDemoAddress}
                        className="text-xs font-black text-[#0a193d] bg-slate-100 px-3 py-1 rounded-full border border-slate-200/90 hover:bg-slate-200 cursor-pointer shadow-2xs"
                      >
                        ⚡ Auto-fill Sample Address
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={addressForm.fullName}
                          onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-[#0a193d] focus:outline-none focus:border-rose-500 text-xs font-bold shadow-2xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">10-Digit Mobile Number *</label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200/90 bg-slate-50 text-slate-500 text-xs font-bold">
                            +91
                          </span>
                          <input
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            maxLength={10}
                            placeholder="9876543210"
                            value={addressForm.phone}
                            onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value.replace(/\D/g, '') })}
                            className="w-full px-4 py-2.5 rounded-r-xl border border-slate-200/90 bg-white text-[#0a193d] focus:outline-none focus:border-rose-500 text-xs font-bold shadow-2xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">PIN Code *</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="400050"
                          value={addressForm.pincode}
                          onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value.replace(/\D/g, '') })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-[#0a193d] focus:outline-none focus:border-rose-500 text-xs font-bold shadow-2xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                        <input
                          type="text"
                          required
                          placeholder="Mumbai"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-[#0a193d] focus:outline-none focus:border-rose-500 text-xs font-bold shadow-2xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">State *</label>
                        <input
                          type="text"
                          required
                          placeholder="Maharashtra"
                          value={addressForm.state}
                          onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-[#0a193d] focus:outline-none focus:border-rose-500 text-xs font-bold shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Flat / House No. / Building Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Flat 402, Sea Breeze Apts"
                        value={addressForm.addressLine1}
                        onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-[#0a193d] focus:outline-none focus:border-rose-500 text-xs font-medium shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Road / Area / Colony</label>
                      <input
                        type="text"
                        placeholder="Hill Road, Bandra West"
                        value={addressForm.addressLine2}
                        onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-[#0a193d] focus:outline-none focus:border-rose-500 text-xs font-medium shadow-2xs"
                      />
                    </div>

                    <div className="flex gap-4 pt-1">
                      {(['Home', 'Work', 'Other'] as const).map((type) => (
                        <label key={type} className="flex items-center gap-1.5 text-xs font-bold cursor-pointer text-slate-700">
                          <input
                            type="radio"
                            name="addressType"
                            checked={addressForm.addressType === type}
                            onChange={() => setAddressForm({ ...addressForm, addressType: type })}
                            className="text-rose-600"
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      {user && user.addresses.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setIsAddingNewAddress(false)}
                          className="text-xs text-slate-500 font-bold hover:underline cursor-pointer"
                        >
                          &larr; Back to saved addresses
                        </button>
                      )}

                      <button
                        type="submit"
                        className="py-4 px-8 rounded-full btn-navy-red text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl cursor-pointer ml-auto transition-all"
                      >
                        <span>Continue To Discreet Preferences &rarr;</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* STEP 2: DISCREET SHIPPING & PACKAGING PREFERENCES */}
            {activeStep === 2 && (
              <div className="glass-card-elevated rounded-3xl p-6 sm:p-8 border border-white/95 shadow-2xl space-y-6 animate-in fade-in duration-200 text-[#0a193d]">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
                  <div>
                    <h2 className="text-xl font-black text-[#0a193d] flex items-center gap-2">
                      <EyeOff className="w-5 h-5 text-emerald-600" />
                      Discreet Packaging &amp; Delivery Instructions
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">Customize how your parcel will be delivered in 100% confidentiality.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  
                  {/* Plain Box */}
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3.5 shadow-2xs">
                    <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
                      <EyeOff className="w-4 h-4" />
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-[#0a193d] text-sm">100% Plain Unmarked Outer Box</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[10px]">
                          GUARANTEED
                        </span>
                      </div>
                      <p className="text-emerald-800 leading-relaxed mt-1 font-medium">
                        Delivered inside a heavy-duty, blank brown corrugated box with zero logos or adult references. The airway bill states &ldquo;PT Logistics - Health Supplements&rdquo;.
                      </p>
                    </div>
                  </div>

                  {/* Discreet Call on Arrival */}
                  <label className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-slate-100 flex items-start gap-3.5 cursor-pointer transition-colors block">
                    <input
                      type="checkbox"
                      checked={discreteCallOnArrival}
                      onChange={(e) => setDiscreteCallOnArrival(e.target.checked)}
                      className="w-4 h-4 text-rose-600 rounded-md mt-1"
                    />
                    <div className="flex-1 text-xs">
                      <p className="font-black text-[#0a193d] text-sm">Discreet Call on Arrival</p>
                      <p className="text-slate-600 mt-0.5 font-medium">
                        Courier agent will phone you upon reaching your building without mentioning brand or parcel content.
                      </p>
                    </div>
                  </label>

                  {/* Safe Handover */}
                  <label className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-slate-100 flex items-start gap-3.5 cursor-pointer transition-colors block">
                    <input
                      type="checkbox"
                      checked={hideContentsFromPartner}
                      onChange={(e) => setHideContentsFromPartner(e.target.checked)}
                      className="w-4 h-4 text-rose-600 rounded-md mt-1"
                    />
                    <div className="flex-1 text-xs">
                      <p className="font-black text-[#0a193d] text-sm">Do Not Hand Over to Neighbors</p>
                      <p className="text-slate-600 mt-0.5 font-medium">
                        Parcel will strictly be handed directly to you or your designated recipient code.
                      </p>
                    </div>
                  </label>

                  {/* Custom Delivery Instructions with 1-Click Smart Presets */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700">
                        Special Delivery Instructions (Optional)
                      </label>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        🔒 Printed on Outer Courier Label
                      </span>
                    </div>

                    {/* 1-Click Smart AI Discreet Presets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-1">
                      {[
                        {
                          icon: '🏢',
                          title: 'Society Gate Drop',
                          text: 'Leave with building security guard. State contents as Books / Documents.',
                        },
                        {
                          icon: '🤫',
                          title: 'Silent Doorstep Drop',
                          text: 'Leave on shoe rack outside main door. Ring bell only once, no phone calls.',
                        },
                        {
                          icon: '📞',
                          title: 'Private In-Hand Call',
                          text: 'Call 5 mins before arrival. Hand over strictly to recipient in person only.',
                        },
                        {
                          icon: '💼',
                          title: 'Office Front Desk',
                          text: 'Leave sealed plain envelope at office reception. Do not call desk phone.',
                        },
                      ].map((preset) => (
                        <button
                          key={preset.title}
                          type="button"
                          onClick={() => setCustomDeliveryNote(preset.text)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-start gap-2 ${
                            customDeliveryNote === preset.text
                              ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="text-sm shrink-0">{preset.icon}</span>
                          <div>
                            <div className="font-bold text-[11px] text-[#0a193d]">{preset.title}</div>
                            <div className="text-[10px] text-slate-500 line-clamp-1">{preset.text}</div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Or type custom note e.g. Call before reaching, do not hand to neighbors..."
                      value={customDeliveryNote}
                      onChange={(e) => setCustomDeliveryNote(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-[#0a193d] focus:outline-none focus:border-rose-500 text-xs font-medium shadow-2xs"
                    />
                  </div>

                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="text-xs text-slate-500 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Address
                  </button>

                  <button
                    type="button"
                    onClick={handleProceedToStep3}
                    className="py-4 px-8 rounded-full btn-navy-red text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl cursor-pointer transition-all"
                  >
                    <span>Proceed To Payment &rarr;</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {activeStep === 3 && (
              <div className="glass-card-elevated rounded-3xl p-6 sm:p-8 border border-white/95 shadow-2xl space-y-6 animate-in fade-in duration-200 text-[#0a193d]">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
                  <div>
                    <h2 className="text-xl font-black text-[#0a193d] flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-rose-600" />
                      Payment Method
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">Encrypted 256-bit SSL transaction.</p>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 text-[11px] font-black flex items-center gap-1 shadow-2xs">
                    <Lock className="w-3 h-3 text-rose-600" />
                    <span>PT LOGISTICS Bill</span>
                  </div>
                </div>

                {/* Method Selectors */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'UPI'
                        ? 'border-rose-400 btn-red text-white font-black shadow-md'
                        : 'border-slate-200/90 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-1 text-rose-500" />
                    <span className="text-xs">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'Card'
                        ? 'border-rose-400 btn-red text-white font-black shadow-md'
                        : 'border-slate-200/90 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-rose-500" />
                    <span className="text-xs">Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('NetBanking')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'NetBanking'
                        ? 'border-rose-400 btn-red text-white font-black shadow-md'
                        : 'border-slate-200/90 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-1 text-rose-500" />
                    <span className="text-xs">Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'COD'
                        ? 'border-rose-400 btn-red text-white font-black shadow-md'
                        : 'border-slate-200/90 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold'
                    }`}
                  >
                    <Banknote className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                    <span className="text-xs">Discreet COD</span>
                  </button>
                </div>

                {/* Method Specific Fields */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  {paymentMethod === 'UPI' && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-[#0a193d]">Pay via Instant UPI</span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
                          ⚡ 1-Tap Checkout
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. yourname@oksbi"
                          className="flex-1 px-4 py-2.5 rounded-full border border-slate-200/90 bg-white text-[#0a193d] focus:outline-none focus:border-rose-500 font-bold shadow-2xs"
                        />
                        <button
                          type="button"
                          className="px-5 py-2.5 rounded-full btn-red text-white font-black shadow-xs hover:opacity-95"
                        >
                          Verify
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Supports Google Pay, PhonePe, Paytm, CRED &amp; BHIM.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'Card' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardData.number}
                          onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-[#0a193d] focus:outline-none focus:border-rose-500 font-mono font-bold shadow-2xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-700 font-bold mb-1">Valid Thru</label>
                          <input
                            type="text"
                            value={cardData.expiry}
                            onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-[#0a193d] focus:outline-none focus:border-rose-500 font-bold shadow-2xs"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-[#0a193d] focus:outline-none focus:border-rose-500 font-bold shadow-2xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'NetBanking' && (
                    <div className="space-y-3 text-xs">
                      <label className="block text-slate-700 font-bold mb-1">Select Bank</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-[#0a193d] focus:outline-none focus:border-rose-500 font-bold shadow-2xs"
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="State Bank of India">State Bank of India</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === 'COD' && (
                    <div className="space-y-2 text-xs">
                      <p className="font-black text-[#0a193d]">Pay via Cash upon Delivery</p>
                      <p className="text-slate-600 leading-relaxed font-medium">
                        Pay cash or UPI directly to the courier agent when your plain unmarked package arrives.
                      </p>
                    </div>
                  )}
                </div>

                {/* Final Statement & Security Highlight */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5 shadow-2xs">
                  <Lock className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-[#0a193d]">Confidential Billing Statement: </span>
                    <span>Your credit card or bank SMS will show &ldquo;<strong>PT Logistics</strong>&rdquo;. No product name or adult references will ever appear.</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="text-xs text-slate-500 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Preferences
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handlePlaceOrder}
                    className="py-4 px-8 rounded-full btn-navy-red text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50 transition-all"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {isSubmitting ? 'Securing Order...' : `Pay & Place Order (₹${finalTotal.toLocaleString('en-IN')})`}
                    </span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Order Summary Sidebar in Frosted Glass */}
          <div className="lg:col-span-5 glass-card-elevated rounded-3xl p-6 sm:p-8 border border-white/95 shadow-xl space-y-6 sticky top-24 text-[#0a193d]">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
              <h3 className="font-black text-[#0a193d] text-base">Order Summary</h3>
              <span className="text-xs font-bold text-slate-500">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items
              </span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedPack.packSize}`}
                  className="flex items-center gap-3 p-2.5 rounded-2xl border border-slate-200/80 bg-white/80 shadow-2xs"
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-200">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-black text-[#0a193d] truncate">{item.product.name}</h4>
                    <p className="text-[11px] text-rose-600 font-bold mt-0.5">{item.selectedPack.label}</p>
                    <p className="text-[10px] text-slate-500 font-medium">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right text-xs font-black text-[#0a193d]">
                    ₹{(item.selectedPack.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} className="space-y-1.5 pt-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Coupon (Try PLAY10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-full bg-slate-50 border border-slate-200/90 text-[#0a193d] uppercase placeholder-slate-400 focus:outline-none font-bold"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full btn-red text-xs font-black text-white cursor-pointer transition-colors shadow-2xs"
                >
                  Apply
                </button>
              </div>

              {couponMsg && (
                <p className={`text-[11px] font-bold ${couponMsg.error ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {couponMsg.text}
                </p>
              )}

              {promoCode && (
                <div className="flex items-center justify-between text-[11px] text-emerald-700 font-black">
                  <span>✓ Code {promoCode} Applied (10% Off)</span>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="text-slate-400 hover:text-rose-600 cursor-pointer text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Price Breakdown */}
            <div className="space-y-2 text-xs pt-3 border-t border-slate-200/80">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Subtotal</span>
                <span className="font-bold text-[#0a193d]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-black">
                  <span>Promo Discount (10%)</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600 font-medium">
                <span>Discreet Express Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-700 font-black">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-black text-[#0a193d] pt-3 border-t border-slate-200/80">
                <span>Total Payable</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Trust Assurance Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-2 font-black text-[#0a193d]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>The Playtime Discretion Guarantee</span>
              </div>
              <ul className="space-y-1 text-slate-600 list-disc list-inside text-[10px] font-medium">
                <li>Zero logos, photos or product descriptions on package.</li>
                <li>Neutral sender: &ldquo;PT Logistics&rdquo;.</li>
                <li>Tamper-proof security strip.</li>
              </ul>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
