'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LAUNCH_PRODUCTS } from '@/data/products';
import { Product, ProductPack } from '@/types';
import { Star, ShoppingBag, EyeOff, Check, Sparkles, ArrowRight } from 'lucide-react';
import PincodeChecker from '@/components/PincodeChecker';

interface DualProductShowcaseProps {
  products?: Product[];
  onAddToCart: (product: Product, pack: ProductPack) => void;
  onQuickView?: (product: Product) => void;
}

export default function DualProductShowcase({
  products = LAUNCH_PRODUCTS,
  onAddToCart
}: DualProductShowcaseProps) {
  const displayProducts = products.slice(0, 2);

  const [packSelections, setPackSelections] = useState<Record<string, number>>({});

  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handlePackChange = (productId: string, packIdx: number) => {
    setPackSelections((prev) => ({ ...prev, [productId]: packIdx }));
  };

  const handleAdd = (product: Product) => {
    const fallbackPack = {
      packSize: 1,
      label: 'Single Pack',
      price: product.basePrice || 499,
      originalPrice: product.originalPrice || Math.round((product.basePrice || 499) * 1.4),
      discount: 'Special Deal',
    };
    const safePacks = product.packs && product.packs.length > 0 ? product.packs : [fallbackPack];
    const selectedIdx = packSelections[product.id] || 0;
    const pack = safePacks[selectedIdx] || safePacks[0] || fallbackPack;
    onAddToCart(product, pack);

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section id="flagship-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-[#0a193d] text-[11px] font-black uppercase tracking-wider mb-2.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>OUR 2 AYURVEDIC SIGNATURE HEROES</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#0a193d] tracking-tight">
          Formulated For Pure Natural Intimacy
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">
          Two 100% Ayurvedic flagships — one for climax endurance, one for core vitality &amp; stamina.
        </p>
      </div>

      {/* Centered, Modern 2-Product Grid in Ultra-Luxury Frosted Pearl Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {displayProducts.map((product) => {
          const fallbackPack = {
            packSize: 1,
            label: 'Single Pack',
            price: product.basePrice || 499,
            originalPrice: product.originalPrice || Math.round((product.basePrice || 499) * 1.4),
            discount: 'Special Deal',
          };
          const safePacks = product.packs && product.packs.length > 0 ? product.packs : [fallbackPack];
          const selectedIdx = packSelections[product.id] || 0;
          const currentPack = safePacks[selectedIdx] || safePacks[0] || fallbackPack;
          const isAdded = addedIds[product.id];
          const isExtend = product.id === 'pt-extend-spray';

          return (
            <div
              key={product.id}
              className="glass-card card-3d-hover rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-emerald-500/40"
            >
              <div>
                {/* Product Image Stage */}
                <Link
                  href={`/products/${product.id}`}
                  className="relative aspect-4/3 w-full bg-gradient-to-b from-white via-slate-50 to-slate-100/60 overflow-hidden block"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Badges on Top Left */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                    {product.badge && (
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105 ${
                        isExtend ? 'btn-navy-gradient text-white' : 'bg-emerald-800 text-emerald-100 border border-emerald-600/50'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                    {currentPack.discount && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-900/90 text-amber-300 border border-amber-400/40 shadow-xs backdrop-blur-md">
                        {currentPack.discount}
                      </span>
                    )}
                  </div>

                  {/* Plain Box Badge on Top Right */}
                  <div className="absolute top-3 right-3 z-10 pointer-events-none">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 border border-slate-200/90 text-[10px] font-bold text-slate-700 shadow-xs backdrop-blur-md">
                      <EyeOff className="w-3.5 h-3.5 text-emerald-600" />
                      Plain Box
                    </span>
                  </div>

                  {/* Subtle View Page Hint on Hover with Smooth Transform */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/95 text-[#0a193d] text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 backdrop-blur-md flex items-center gap-1.5 border border-slate-200/80 shadow-md">
                    <span>View Clinical Specs</span>
                    <ArrowRight className="w-3 h-3 text-rose-600 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </Link>

                {/* Refined Product Details */}
                <div className="p-5 sm:p-6 space-y-3.5">
                  
                  {/* Rating & Review Count */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="font-black text-[#0a193d]">{product.rating}</span>
                    <span className="text-[11px] text-slate-500 font-medium">({product.reviewsCount.toLocaleString()})</span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <Link href={`/products/${product.id}`} className="block group/title">
                      <h3 className="text-lg font-black text-[#0a193d] group-hover/title:text-rose-600 transition-colors line-clamp-1 tracking-tight">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-medium">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Sleek Pack Selector Chips */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2">
                      <span className="uppercase tracking-wider">Select Pack:</span>
                      <span className="text-rose-600 font-extrabold">{currentPack.label}</span>
                    </div>

                    <div className={`grid gap-2 ${safePacks.length === 2 ? 'grid-cols-2' : safePacks.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
                      {safePacks.map((pack, idx) => {
                        const isSelected = selectedIdx === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handlePackChange(product.id, idx)}
                            className={`py-2 px-2.5 rounded-2xl text-xs font-black transition-all duration-200 cursor-pointer flex flex-col items-center justify-center active:scale-95 ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#051336] via-[#0c245c] to-[#1d4ed8] text-white shadow-md ring-1 ring-blue-400/50'
                                : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700'
                            }`}
                          >
                            <span>Pack {pack.packSize}</span>
                            <span className={`text-[10px] ${isSelected ? 'text-amber-300 font-bold' : 'text-slate-500'}`}>
                              {pack.discount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

              {/* Price & Action Footer - Compressed Side by Side */}
              <div className="p-4 sm:p-5 pt-3 border-t border-slate-100 bg-[#fbfbfa]/60">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-black text-[#051336]">
                        ₹{currentPack.price.toLocaleString('en-IN')}
                      </span>
                      {currentPack.originalPrice > currentPack.price && (
                        <span className="text-xs text-slate-400 line-through font-semibold">
                          ₹{currentPack.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full inline-block mt-0.5">
                      Save ₹{(currentPack.originalPrice - currentPack.price).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Primary Pill Button with Logo Ribbon Gradient & Shimmer */}
                  <button
                    onClick={() => handleAdd(product)}
                    className={`py-3 px-5 sm:px-6 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all whitespace-nowrap active:scale-95 ${
                      isAdded
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md'
                        : 'btn-navy-red shadow-lg'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add To Bag</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Link */}
                <div className="text-center pt-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-[11px] font-bold text-slate-500 hover:text-rose-600 transition-colors inline-flex items-center gap-1"
                  >
                    <span>View Product Details &amp; Clinical Specs &rarr;</span>
                  </Link>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Pincode & Courier Delivery Checker */}
      <div className="max-w-xl mx-auto mt-8">
        <PincodeChecker />
      </div>

    </section>
  );
}
