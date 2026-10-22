'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CartItem, Product, CategoryType } from '@/types';
import { useCart } from '@/context/CartContext';
import { X, Trash2, ShieldCheck, EyeOff, Lock, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: CartItem[];
  onUpdateQuantity?: (productId: string, packSize: number, delta: number) => void;
  onRemoveItem?: (productId: string, packSize: number) => void;
  onClearCart?: () => void;
}

export default function CartDrawer(props: CartDrawerProps) {
  const router = useRouter();
  const cartContext = useCart();

  const isOpen = props.isOpen !== undefined ? props.isOpen : cartContext.isCartOpen;
  const onClose = props.onClose || (() => cartContext.setIsCartOpen(false));
  const items = props.items !== undefined ? props.items : cartContext.cart;
  const onUpdateQuantity = props.onUpdateQuantity || cartContext.updateQuantity;
  const onRemoveItem = props.onRemoveItem || cartContext.removeItem;

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.selectedPack.price * item.quantity, 0);
  const discount = cartContext.promoCode === 'PLAY10' ? Math.round(subtotal * 0.1) : 0;
  const freeShippingThreshold = 999;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 99;
  const finalTotal = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const success = cartContext.applyPromo(couponInput);
    if (success) {
      setCouponMsg({ text: 'Code PLAY10 applied: 10% instant discount!' });
    } else {
      setCouponMsg({ text: 'Invalid code. Use code "PLAY10" for 10% off.', error: true });
    }
  };

  const handleGoToCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white/95 backdrop-blur-2xl border-l border-slate-200/90 shadow-2xl flex flex-col justify-between text-[#0A0A0A]">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200/80 flex items-center justify-between bg-white/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="font-black text-[#0A0A0A] text-lg">Your Bag</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                {items.reduce((s, i) => s + i.quantity, 0)} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-[#0A0A0A] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Discreet Notification Bar */}
          <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center gap-2 text-xs font-bold text-emerald-800">
            <EyeOff className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>100% Plain unmarked packaging guaranteed on this order</span>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-8 h-8 text-[#FF2D95]" />
                </div>
                <div>
                  <h3 className="font-black text-[#0A0A0A] text-base">Your Bag is Empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Explore our flagship wellness essentials crafted for prolonged endurance and acoustic pleasure.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full btn-navy-red text-white text-xs font-bold cursor-pointer shadow-md"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <>
                {/* Dynamic Tiered Shipping & Gift Milestone Bar */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-[#0A0A0A]">
                      {subtotal >= 1499 ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          🎉 Free Shipping + Free Luxury Silk Pouch Unlocked!
                        </span>
                      ) : subtotal >= 999 ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          ⚡ Free Shipping Unlocked! Add ₹{(1499 - subtotal).toLocaleString('en-IN')} for Free Silk Pouch
                        </span>
                      ) : (
                        <span>
                          Add <strong className="text-[#FF2D95]">₹{(999 - subtotal).toLocaleString('en-IN')}</strong> for <strong>FREE Discreet Shipping</strong>
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {Math.min(100, Math.round((subtotal / 1499) * 100))}%
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full btn-navy-red transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.round((subtotal / 1499) * 100))}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-0.5">
                    <span className={subtotal >= 999 ? 'text-emerald-600' : ''}>₹999: Free Shipping</span>
                    <span className={subtotal >= 1499 ? 'text-emerald-600' : ''}>₹1,499: Free Silk Pouch</span>
                  </div>
                </div>

                {/* List of items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedPack.packSize}`}
                      className="p-3.5 rounded-2xl border border-slate-200/80 bg-white/90 flex gap-3 shadow-2xs"
                    >
                      <Link
                        href={`/products/${item.product.id}`}
                        onClick={onClose}
                        className="relative w-20 h-20 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-200/80 block"
                      >
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </Link>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <Link
                            href={`/products/${item.product.id}`}
                            onClick={onClose}
                            className="font-black text-xs text-[#0A0A0A] hover:text-[#FF2D95] line-clamp-1 block transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-[11px] font-bold text-[#FF2D95] mt-0.5">
                            {item.selectedPack.label}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-xs font-black text-[#0A0A0A]">
                              ₹{(item.selectedPack.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-slate-400 line-through">
                              ₹{(item.selectedPack.originalPrice * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Quantity control */}
                          <div className="flex items-center border border-slate-200 rounded-full bg-slate-100/90 text-xs">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedPack.packSize, -1)}
                              className="px-2.5 py-1 text-slate-500 hover:text-[#0A0A0A] font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2 text-[#0A0A0A] font-black">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedPack.packSize, 1)}
                              className="px-2.5 py-1 text-slate-500 hover:text-[#0A0A0A] font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedPack.packSize)}
                            className="text-slate-400 hover:text-[#FF2D95] transition-colors p-1 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 1-Click Intimacy Add-On Recommendations */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#0A0A0A]">
                      Frequently Added With Your Order
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full font-bold">
                      Special Add-On Price
                    </span>
                  </div>

                  <div className="space-y-2">
                    {/* Add-on 1: Natural Aloe Glide */}
                    <div className="p-2 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <Image
                            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=80"
                            alt="Natural Aloe Glide"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-xs font-black text-[#0A0A0A] truncate">Natural Aloe Glide (50ml)</p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs font-black text-[#FF2D95]">₹149</span>
                            <span className="text-[10px] text-slate-400 line-through">₹299</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const glideProduct: Product = {
                            id: 'pt-aloe-glide',
                            name: 'Natural Aloe Botanical Glide (50ml)',
                            tagline: 'Water-based organic aloe vera intimate glide',
                            category: 'lubes',
                            basePrice: 149,
                            rating: 4.9,
                            reviewsCount: 840,
                            badge: 'Add-On Special',
                            badgeType: 'blue',
                            image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
                            description: 'Pure organic aloe vera water-based lubricant safe for sensitive skin.',
                            features: ['100% Water-based', 'Ultra-slick botanical aloe', 'Oral safe & toy friendly'],
                            specs: { volume: '50ml', ingredients: 'Organic Aloe Barbadensis, Glycerin, Purified Water', safeForSkin: '100% Hypoallergenic' },
                            packs: [{ packSize: 1, label: 'Standard Tube (50ml)', price: 149, originalPrice: 299, discount: '50% OFF' }],
                            inStock: true,
                            discreetPackagingGuaranteed: true,
                            howToUse: ['Dispense 2-3 drops and apply smoothly.']
                          };
                          cartContext.addToCart(glideProduct, glideProduct.packs[0], 1);
                        }}
                        className="px-3 py-1.5 rounded-full btn-navy-red text-white text-[11px] font-black shrink-0 cursor-pointer shadow-xs hover:opacity-95"
                      >
                        + Add ₹149
                      </button>
                    </div>

                    {/* Add-on 2: Silk Travel Pouch */}
                    <div className="p-2 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <Image
                            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&auto=format&fit=crop&q=80"
                            alt="Velvet Silk Case"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-xs font-black text-[#0A0A0A] truncate">Blackout Travel Pouch</p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs font-black text-[#FF2D95]">₹99</span>
                            <span className="text-[10px] text-slate-400 line-through">₹249</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const pouchProduct: Product = {
                            id: 'pt-silk-pouch',
                            name: 'Discreet Blackout Velvet Pouch',
                            tagline: 'Waterproof luxury storage case for travel',
                            category: 'couples',
                            basePrice: 99,
                            rating: 4.9,
                            reviewsCount: 520,
                            badge: 'Travel Must-Have',
                            badgeType: 'blue',
                            image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
                            description: 'Luxury blackout velvet pouch that conceals intimate products discreetly in travel bags.',
                            features: ['Odor-free lining', 'Water-resistant interior', 'Double drawstring closure'],
                            specs: { volume: '1 Unit', ingredients: 'Premium Velvet & Satin', safeForSkin: '100% Non-Toxic' },
                            packs: [{ packSize: 1, label: 'Single Pouch', price: 99, originalPrice: 249, discount: '60% OFF' }],
                            inStock: true,
                            discreetPackagingGuaranteed: true,
                            howToUse: ['Store spray or stimulator safely.']
                          };
                          cartContext.addToCart(pouchProduct, pouchProduct.packs[0], 1);
                        }}
                        className="px-3 py-1.5 rounded-full btn-navy-red text-white text-[11px] font-black shrink-0 cursor-pointer shadow-xs hover:opacity-95"
                      >
                        + Add ₹99
                      </button>
                    </div>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="space-y-1.5 pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Coupon code (Use PLAY10 or MATCH10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-full bg-slate-50 border border-slate-200/90 text-[#0A0A0A] uppercase placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#007BA7] font-bold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-full btn-navy-red text-xs font-black text-white cursor-pointer transition-colors shadow-xs"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p className={`text-[11px] font-bold ${couponMsg.error ? 'text-[#FF2D95]' : 'text-emerald-700'}`}>
                      {couponMsg.text}
                    </p>
                  )}
                  {cartContext.promoCode && !couponMsg && (
                    <p className="text-[11px] text-emerald-700 font-black">
                      ✓ Code {cartContext.promoCode} applied: 10% extra discount subtracted!
                    </p>
                  )}
                </form>

                {/* Free Shipping Meter */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div className="flex justify-between items-center mb-1.5 font-bold">
                    <span className="text-slate-700">
                      {subtotal >= 999
                        ? '🎉 You unlocked FREE Express Shipping!'
                        : `Add ₹${(999 - subtotal).toLocaleString('en-IN')} more for FREE Express Shipping`}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">Min ₹999</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#007BA7] to-[#FF2D95] transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / 999) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Discretion Box Note */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-start gap-2 shadow-2xs">
                  <Lock className="w-4 h-4 text-[#007BA7] mt-0.5 shrink-0" />
                  <span>
                    <strong>Discreet Billing Assured:</strong> Billed under &quot;PT Logistics&quot;. 100% confidential.
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200/80 bg-white/90 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-[#0A0A0A] font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-black">
                    <span>Discount (10%)</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Discreet Express Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-emerald-700 font-black">FREE</strong>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[#0A0A0A] pt-2 border-t border-slate-200/80">
                  <span>Total Amount</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* CHECKOUT ACTION BUTTON */}
              <button
                onClick={handleGoToCheckout}
                className="w-full py-4 px-4 rounded-full btn-navy-red text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer font-black shadow-lg hover:shadow-xl transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Proceed To Discreet Checkout &rarr;</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
