'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DUO_BUNDLE } from '@/data/products';
import { Product, ProductPack } from '@/types';
import { ShoppingBag, Check, Gift, EyeOff, Star, Sparkles } from 'lucide-react';

interface DuoBundleBannerProps {
  onAddToCart: (product: Product, pack: ProductPack) => void;
}

export default function DuoBundleBanner({ onAddToCart }: DuoBundleBannerProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddDuo = () => {
    const duoProduct: Product = {
      id: DUO_BUNDLE.id,
      name: DUO_BUNDLE.name,
      tagline: DUO_BUNDLE.tagline,
      category: 'couples',
      basePrice: DUO_BUNDLE.price,
      rating: 5.0,
      reviewsCount: 1420,
      badge: DUO_BUNDLE.badge,
      badgeType: 'red',
      image: DUO_BUNDLE.image,
      description: 'The ultimate 100% Ayurvedic vitality kit. Includes Extend Herbal Delay Spray (50g) and Pure Himalayan Shilajit Gold Resin (20g) in one luxury presentation box.',
      features: DUO_BUNDLE.includes,
      specs: {
        safeForSkin: '100% Ayurvedic, AYUSH Approved & Lab Certified'
      },
      packs: [
        {
          packSize: 1,
          label: 'Complete Duo Box Set',
          price: DUO_BUNDLE.price,
          originalPrice: DUO_BUNDLE.originalPrice,
          discount: DUO_BUNDLE.discount
        }
      ],
      inStock: true,
      discreetPackagingGuaranteed: true
    };

    onAddToCart(duoProduct, duoProduct.packs[0]);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white border-y border-slate-200/80 py-12 sm:py-16">
      {/* Ambient Radial Lights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual Product Box Art */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-xl group card-3d-hover">
              <Image
                src={DUO_BUNDLE.image}
                alt={DUO_BUNDLE.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/10" />
              
              {/* Badge in Gradient Passion Red */}
              <div className="absolute top-3 left-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider btn-red text-white shadow-lg flex items-center gap-1.5 shimmer-badge">
                  <Gift className="w-3.5 h-3.5" />
                  {DUO_BUNDLE.badge}
                </span>
              </div>

              {/* Savings overlay tag */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>5.0 (1,420+ Couples)</span>
                </div>
                <span className="font-black text-rose-600">Save ₹799</span>
              </div>
            </div>
          </div>

          {/* Right Column: Offer Details & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill border border-slate-200/80 text-[#0a193d] text-xs font-black uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                LIMITED EDITION COUPLES BUNDLE
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0a193d] tracking-tight">
                {DUO_BUNDLE.name}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1.5 font-medium leading-relaxed">
                {DUO_BUNDLE.tagline}
              </p>
            </div>

            {/* Checklist of what is inside the Duo Box */}
            <div className="space-y-2.5 bg-white/70 rounded-2xl p-4 sm:p-5 border border-slate-200/80 backdrop-blur-sm">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-1">
                Everything Included In The Box:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
                {DUO_BUNDLE.includes.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Action CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-[#0a193d]">
                    ₹{DUO_BUNDLE.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base text-slate-400 line-through font-semibold">
                    ₹{DUO_BUNDLE.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-black btn-red text-white shadow-xs">
                    {DUO_BUNDLE.discount}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mt-1">
                  <EyeOff className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ships in 100% unmarked discreet carton &bull; Free express delivery</span>
                </div>
              </div>

              {/* Action Buttons: Pill Gradient & Silver */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/products/pt-power-duo-bundle"
                  className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs uppercase tracking-wider font-bold text-center cursor-pointer transition-all whitespace-nowrap shadow-2xs"
                >
                  View Details &rarr;
                </Link>

                <button
                  onClick={handleAddDuo}
                  className={`w-full sm:w-auto py-3.5 px-8 rounded-full text-xs uppercase tracking-wider font-black flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap transition-all active:scale-95 ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-[#090d16] hover:bg-[#1e293b] text-white shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added To Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Claim Duo Kit</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
