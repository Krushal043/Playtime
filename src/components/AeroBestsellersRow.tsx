'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingBag, Check, ChevronLeft, ChevronRight, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { Product, ProductPack } from '@/types';
import { ProductCardSkeleton } from '@/components/Skeleton';

interface AeroBestsellersRowProps {
  products: Product[];
  onAddToCart: (product: Product, pack: ProductPack) => void;
  onQuickView?: (product: Product) => void;
  loading?: boolean;
}

export default function AeroBestsellersRow({
  products,
  onAddToCart,
  onQuickView,
  loading = false,
}: AeroBestsellersRowProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleFav = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAdd = (product: Product) => {
    const fallbackPack = {
      packSize: 1,
      label: 'Single Pack',
      price: product.basePrice || 499,
      originalPrice: product.originalPrice || Math.round((product.basePrice || 499) * 1.4),
      discount: 'Special Deal',
    };
    const pack = (product.packs && product.packs[0]) || fallbackPack;
    onAddToCart(product, pack);

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1400);
  };

  return (
    <section id="flagship-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] uppercase tracking-tight">
              BESTSELLER FORMULATIONS
            </h2>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#007BA7]/15 text-[#007BA7]">
              {products.length} Items
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Signature Ayurvedic solutions with 100% plain box delivery
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#flagship-section"
            className="text-xs font-black text-[#0A0A0A] hover:text-[#FF2D95] transition-colors flex items-center gap-1 cursor-pointer icon-spin-hover"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer transition-all shadow-2xs active:scale-95 magnetic-btn"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer transition-all shadow-2xs active:scale-95 magnetic-btn"
              aria-label="Next products"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Carousel / Grid */}
      <div
        ref={scrollContainerRef}
        className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 scrollbar-none snap-x"
      >
        {loading ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : (
          products.map((product, idx) => {
          const fallbackPack = {
            packSize: 1,
            label: 'Single Pack',
            price: product.basePrice || 499,
            originalPrice: product.originalPrice || Math.round((product.basePrice || 499) * 1.4),
            discount: 'Special Deal',
          };
          const pack = (product.packs && product.packs[0]) || fallbackPack;
          const isFav = favorites[product.id];
          const isAdded = addedIds[product.id];

          return (
            <div
              key={product.id}
              className="product-card-3d group relative rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between min-w-[260px] sm:min-w-0 snap-start shrink-0 sm:shrink perspective-container animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              {/* 3D depth shine overlay */}
              <div className="card-3d-shine" />

              <div className="relative z-10">
                {/* Card Top: Badges & Favorite Heart Button */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    {product.badge ? (
                      <span className="shimmer-badge px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0A0A0A] text-white shadow-xs">
                        {product.badge.split('•')[0]}
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs">
                        Ayurvedic
                      </span>
                    )}
                    {pack.discount && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 shadow-xs">
                        {pack.discount}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFav(product.id)}
                    className="w-7 h-7 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-all hover:scale-125 active:scale-90"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-all duration-300 ${
                        isFav ? 'fill-[#FF2D95] text-[#FF2D95] scale-110' : 'text-slate-400'
                      }`}
                    />
                  </button>
                </div>

                {/* 3D Product Image Stage */}
                <div className="relative w-full h-44 sm:h-48 my-2 flex items-center justify-center bg-gradient-to-b from-slate-50/50 via-white to-slate-100/50 rounded-2xl overflow-hidden group/img img-zoom-container">
                  <Link
                    href={`/products/${product.id}`}
                    className="relative w-full h-full p-4 flex items-center justify-center"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-contain drop-shadow-md transition-transform duration-700"
                    />
                  </Link>

                  {/* Quick View Button on Hover */}
                  {onQuickView && (
                    <button
                      type="button"
                      onClick={() => onQuickView(product)}
                      className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 text-slate-800 border border-slate-200 shadow-md flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all cursor-pointer hover:bg-slate-100 hover:scale-110 active:scale-90"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#0A0A0A]" />
                    </button>
                  )}
                </div>

                {/* Title & Active Herb */}
                <div className="mt-3">
                  <Link href={`/products/${product.id}`} className="block group/title">
                    <h3 className="text-sm font-black text-[#0A0A0A] group-hover/title:text-[#FF2D95] transition-colors line-clamp-1 tracking-tight">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                    {product.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom: Price, Rating & Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 relative z-10">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-black text-[#0A0A0A]">
                      ₹{pack.price.toLocaleString('en-IN')}
                    </span>
                    {pack.originalPrice > pack.price && (
                      <span className="text-[11px] text-slate-400 line-through font-semibold">
                        ₹{pack.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] font-bold text-slate-600">{product.rating}</span>
                  </div>
                </div>

                {/* Add to Bag with ripple */}
                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  className={`ripple-container py-2 px-3.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all duration-300 active:scale-95 magnetic-btn btn-press-pulse ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-[#0A0A0A] via-[#005f82] to-[#007BA7] hover:from-[#0A0A0A] hover:to-[#FF2D95] text-white shadow-sm hover:shadow-md'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3 h-3" />
                      <span>Bag</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        }))}
      </div>
    </section>
  );
}
