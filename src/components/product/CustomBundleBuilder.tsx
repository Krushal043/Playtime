'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Package, Plus, Check, ArrowRight, ShieldCheck, Sparkles, Tag, Gift } from 'lucide-react';
import { LAUNCH_PRODUCTS } from '@/data/products';
import { Product, ProductPack } from '@/types';
import { useCart } from '@/context/CartContext';

interface CustomBundleBuilderProps {
  onSuccess?: () => void;
}

export default function CustomBundleBuilder({ onSuccess }: CustomBundleBuilderProps) {
  const { addToCart, setIsCartOpen } = useCart();

  const sprayProduct = LAUNCH_PRODUCTS[0];
  const bulletProduct = LAUNCH_PRODUCTS[1];

  const [selectedSprayPack, setSelectedSprayPack] = useState<number>(0);
  const [includeBullet, setIncludeBullet] = useState<boolean>(true);
  const [freeGift, setFreeGift] = useState<'pouch' | 'aloe'>('pouch');

  // Calculate pricing
  const sprayPrice = sprayProduct.packs[selectedSprayPack].price;
  const bulletPrice = includeBullet ? bulletProduct.packs[0].price : 0;
  const rawTotal = sprayPrice + bulletPrice;
  // 15% custom bundle savings if both selected
  const bundleDiscount = includeBullet ? Math.round(rawTotal * 0.15) : 0;
  const bundlePrice = rawTotal - bundleDiscount;

  const handleAddBundleToCart = () => {
    // Add spray pack
    addToCart(sprayProduct, sprayProduct.packs[selectedSprayPack], 1);
    // Add bullet if selected
    if (includeBullet) {
      addToCart(bulletProduct, bulletProduct.packs[0], 1);
    }
    setIsCartOpen(true);
    if (onSuccess) onSuccess();
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden text-[#0a193d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-4 shadow-2xs">
            <Gift className="w-4 h-4 text-blue-600" />
            Custom Couple Kit Builder &bull; Save 15%
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0a193d] tracking-tight mb-4">
            Build Your Custom Bedroom Box
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Mix and match your preferred metered endurance spray, stimulation device, and free VIP keepsake accessories into a single plain-box delivery.
          </p>
        </div>

        {/* Builder Box Container */}
        <div className="glass-card-elevated rounded-3xl p-6 sm:p-10 border border-white/95 shadow-2xl bg-white/95 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3 Customizer Steps */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Select Delay Spray */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-rose-600">
                  Step 1: Choose Your Endurance Formula
                </span>
                <span className="text-[11px] font-bold text-slate-500">Metered 0.08ml No-Numb Valve</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sprayProduct.packs.map((pack, idx) => {
                  const isSelected = selectedSprayPack === idx;
                  return (
                    <button
                      key={pack.packSize}
                      type="button"
                      onClick={() => setSelectedSprayPack(idx)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#0a193d] bg-slate-900 text-white shadow-lg'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-[#0a193d]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black">{pack.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-rose-400" />}
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-base font-black">₹{pack.price}</span>
                        <span className={`text-xs line-through ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                          ₹{pack.originalPrice}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400">{pack.discount}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Add Bullet Stimulator */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-rose-600">
                  Step 2: Add Clitoral Pulse Stimulator
                </span>
                <span className="text-[11px] font-bold text-slate-500">10 Sonic Modes &bull; Waterproof</span>
              </div>

              <div
                onClick={() => setIncludeBullet(!includeBullet)}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  includeBullet
                    ? 'border-rose-500 bg-rose-50/60 shadow-md ring-1 ring-rose-500/30'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                    <Image
                      src={bulletProduct.image}
                      alt={bulletProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-[#0a193d]">{bulletProduct.name}</h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">Dual-stim bullet for synchronized climax</p>
                    <p className="text-xs font-black text-rose-600 mt-1">₹{bulletProduct.basePrice} (Normally ₹2,499)</p>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                  includeBullet ? 'bg-rose-600 border-rose-600 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {includeBullet && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>

            {/* Step 3: Complimentary Gift */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
                  Step 3: Free Gift Included
                </span>
                <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  100% Free
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'pouch', title: 'Blackout Velvet Pouch', desc: 'Discreet nightstand storage' },
                  { id: 'aloe', title: 'Organic Aloe Glide (50ml)', desc: '100% natural water-based' }
                ].map((item) => {
                  const isSelected = freeGift === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFreeGift(item.id as any)}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-500/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-[#0a193d]">{item.title}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium">{item.desc}</p>
                      <p className="text-[10px] font-black text-emerald-700 mt-1">FREE (Worth ₹399)</p>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Custom Box Summary & 1-Click Order */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#07173e] via-[#0a193d] to-[#1e3a8a] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-rose-300 text-[10px] font-black uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Intimacy Box Preview</span>
              </div>

              <h3 className="text-xl font-black text-white mb-4">Your Custom Bundle</h3>

              {/* Items included in box */}
              <div className="space-y-3 mb-6 divide-y divide-white/10 text-xs">
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-300">{sprayProduct.packs[selectedSprayPack].label}</span>
                  <span className="font-black text-white">₹{sprayPrice}</span>
                </div>

                {includeBullet && (
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-300">{bulletProduct.name}</span>
                    <span className="font-black text-white">₹{bulletPrice}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <span className="text-emerald-300">
                    {freeGift === 'pouch' ? 'Velvet Nightstand Pouch' : 'Organic Aloe Glide (50ml)'}
                  </span>
                  <span className="font-black text-emerald-400">FREE</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-300">100% Plain Unmarked Box &amp; Courier OTP</span>
                  <span className="font-black text-emerald-400">FREE</span>
                </div>
              </div>

              {/* Bundle Discount Callout */}
              {includeBullet && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-between text-xs text-rose-200 mb-6">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-rose-400" />
                    <span className="font-bold">15% Duo Synergy Discount</span>
                  </div>
                  <span className="font-black">-₹{bundleDiscount}</span>
                </div>
              )}

              {/* Total Calculation */}
              <div className="pt-4 border-t border-white/15 flex items-baseline justify-between mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-mono text-slate-400">Box Total</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">₹{bundlePrice}</span>
                    {includeBullet && (
                      <span className="text-sm text-slate-400 line-through">₹{rawTotal}</span>
                    )}
                  </div>
                </div>

                <div className="text-right text-[11px] text-emerald-400 font-bold">
                  <span>Free Express Delivery</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div>
              <button
                type="button"
                onClick={handleAddBundleToCart}
                className="w-full py-4 rounded-full btn-navy-red text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
              >
                <span>Add Custom Box To Bag &rarr;</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-2 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Blind Delivery Guarantee</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
