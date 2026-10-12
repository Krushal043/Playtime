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

      {/* Heroic 2-Product Showcase with Large Studio Image Stage */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
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
              className="group relative bg-white/95 rounded-3xl border border-slate-200/90 shadow-lg hover:shadow-2xl hover:border-slate-300 transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              {/* Top: Large Studio Hero Image Stage */}
              <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[500px] bg-gradient-to-b from-[#f8f9fb] via-[#fcfbf9] to-slate-100/70 border-b border-slate-100 overflow-hidden flex items-center justify-center">
                {/* Ambient Soft Studio Glow */}
                <div className="absolute inset-0 bg-radial from-white via-transparent to-slate-200/30 pointer-events-none" />

                {/* Floating Badges on Top */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20 pointer-events-none">
                  <div className="flex flex-wrap items-center gap-2">
                    {product.badge && (
                      <span className={`px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md backdrop-blur-md ${
                        isExtend ? 'btn-navy-gradient text-white' : 'bg-slate-900 text-white'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                    {currentPack.discount && (
                      <span className="px-3 py-1.5 rounded-full text-[11px] font-black bg-amber-400 text-slate-950 shadow-md">
                        {currentPack.discount}
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-slate-200/80 text-[11px] font-bold text-slate-700 shadow-md backdrop-blur-md">
                    <EyeOff className="w-3.5 h-3.5 text-emerald-600" />
                    Plain Box
                  </span>
                </div>

                {/* Large Product Image (Full bottle visible, high impact) */}
                <Link
                  href={`/products/${product.id}`}
                  className="relative w-full h-full flex items-center justify-center p-8 sm:p-12 z-10"
                >
                  <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-106">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-contain drop-shadow-2xl"
                      priority
                    />
                  </div>
                </Link>

                {/* Subtle Hover Action Pill */}
                <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Link
                    href={`/products/${product.id}`}
                    className="px-4 py-2 rounded-full bg-white/95 text-[#0a193d] text-xs font-black shadow-lg backdrop-blur-md flex items-center gap-1.5 border border-slate-200"
                  >
                    <span>Inspect Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
                  </Link>
                </div>
              </div>

              {/* Bottom: Luxury Product Details & Action Bar */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-white">
                <div>
                  {/* Rating & Ayurvedic Tag */}
                  <div className="flex items-center justify-between gap-2 text-xs mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      </div>
                      <span className="font-black text-sm text-[#0a193d]">{product.rating}</span>
                      <span className="text-xs text-slate-500 font-medium">({product.reviewsCount.toLocaleString()} reviews)</span>
                    </div>
                    <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                      100% Ayurvedic
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <Link href={`/products/${product.id}`} className="block group/title">
                    <h3 className="text-xl sm:text-2xl font-black text-[#0a193d] group-hover/title:text-rose-600 transition-colors line-clamp-1 tracking-tight">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mt-1.5 font-medium leading-relaxed">
                    {product.tagline}
                  </p>

                  {/* Pack Selector Chips */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2.5">
                      <span className="uppercase tracking-wider">Select Pack:</span>
                      <span className="text-rose-600 font-black">{currentPack.label}</span>
                    </div>

                    <div className={`grid gap-2.5 ${safePacks.length === 2 ? 'grid-cols-2' : safePacks.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
                      {safePacks.map((pack, idx) => {
                        const isSelected = selectedIdx === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handlePackChange(product.id, idx)}
                            className={`py-2 px-3 rounded-2xl text-xs font-black transition-all duration-200 cursor-pointer flex flex-col items-center justify-center active:scale-95 ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#051336] via-[#0c245c] to-[#1d4ed8] text-white shadow-md ring-1 ring-blue-400/50'
                                : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700'
                            }`}
                          >
                            <span>Pack {pack.packSize}</span>
                            <span className={`text-[10px] ${isSelected ? 'text-amber-300 font-extrabold' : 'text-slate-500'}`}>
                              {pack.discount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-[#051336]">
                          ₹{currentPack.price.toLocaleString('en-IN')}
                        </span>
                        {currentPack.originalPrice > currentPack.price && (
                          <span className="text-sm text-slate-400 line-through font-semibold">
                            ₹{currentPack.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full inline-block mt-1">
                        Save ₹{(currentPack.originalPrice - currentPack.price).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Add to Bag Button */}
                    <button
                      onClick={() => handleAdd(product)}
                      className={`py-3 px-6 sm:px-8 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all whitespace-nowrap active:scale-95 ${
                        isAdded
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg'
                          : 'btn-navy-red shadow-lg hover:shadow-xl'
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

                  {/* Clinical Specs Link */}
                  <div className="text-center pt-3">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors inline-flex items-center gap-1"
                    >
                      <span>View Full Product Details &amp; Clinical Specs &rarr;</span>
                    </Link>
                  </div>
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
