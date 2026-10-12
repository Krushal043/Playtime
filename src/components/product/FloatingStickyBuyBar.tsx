'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingBag, Zap, Check } from 'lucide-react';
import { Product, ProductPack } from '@/types';

interface FloatingStickyBuyBarProps {
  product: Product;
  selectedPack: ProductPack;
  onAddToCart: () => void;
  onBuyNow: () => void;
  threshold?: number;
}

export default function FloatingStickyBuyBar({
  product,
  selectedPack,
  onAddToCart,
  onBuyNow,
  threshold = 320,
}: FloatingStickyBuyBarProps) {
  const [show, setShow] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const handleAdd = () => {
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <aside
      aria-label="Quick Purchase Floating Bar"
      className={`fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100vw-24px)] sm:w-auto max-w-2xl transition-all duration-300 transform ${
        show
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-2xl rounded-full border border-slate-200/90 shadow-[0_16px_50px_rgba(5,19,54,0.22)] px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between sm:justify-start gap-2.5 sm:gap-4 text-[#051336]">
        
        {/* Product Thumbnail + Name & Variant */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-50 shadow-2xs">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-black text-[#051336] truncate leading-tight max-w-[100px] xs:max-w-[140px] sm:max-w-[200px]">
              {product.name}
            </h4>
            <p className="text-[10px] text-slate-500 font-semibold truncate">
              {selectedPack.label}
            </p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] bg-slate-200 shrink-0 hidden xs:block" />

        {/* Price & Taxes */}
        <div className="shrink-0 text-left">
          <span className="text-sm sm:text-base font-black text-[#051336] block leading-tight">
            ₹{selectedPack.price.toLocaleString('en-IN')}
          </span>
          <span className="text-[9px] text-slate-400 font-semibold block leading-none">
            Free Delivery
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Add to Bag Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[#051336] text-[11px] sm:text-xs font-black uppercase tracking-wider active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-xs"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span className="text-emerald-700">Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-blue-900" />
                <span>Add To Bag</span>
              </>
            )}
          </button>

          {/* Buy Now Button */}
          <button
            type="button"
            onClick={onBuyNow}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 active:scale-95 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[0_4px_16px_rgba(225,29,72,0.45)] hover:shadow-[0_6px_22px_rgba(225,29,72,0.6)] transition-all cursor-pointer whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-white" />
            <span>Buy Now</span>
          </button>

        </div>

      </div>
    </aside>
  );
}
