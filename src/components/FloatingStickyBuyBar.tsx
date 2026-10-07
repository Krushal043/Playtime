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
  threshold = 320
}: FloatingStickyBuyBarProps) {
  const [show, setShow] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when user scrolls past threshold so they don't have to scroll back up
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
      <div className="bg-white/95 backdrop-blur-2xl rounded-full border border-slate-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.18)] px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between sm:justify-start gap-2.5 sm:gap-4 text-[#0a193d]">
        
        {/* Product Thumbnail + Name & Variant */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-50 shadow-2xs">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-black text-[#0a193d] truncate leading-tight max-w-[95px] xs:max-w-[130px] sm:max-w-[180px]">
              {product.name}
            </h4>
            <p className="text-[10px] text-slate-500 font-medium truncate">
              {selectedPack.label}
            </p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] bg-slate-200 shrink-0 hidden xs:block" />

        {/* Price & Taxes */}
        <div className="shrink-0 text-left">
          <span className="text-sm sm:text-base font-black text-[#0a193d] block leading-tight">
            ₹{selectedPack.price.toLocaleString('en-IN')}
          </span>
          <span className="text-[9px] text-slate-400 font-medium block leading-none">
            Inclusive of taxes
          </span>
        </div>

        {/* Action Buttons: Add To Cart (Outline) & Buy Now (Solid Accent) */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Outline ADD TO CART Button */}
          {/* Liquid Chrome Silver ADD TO CART Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full btn-silver text-[#051336] text-[11px] sm:text-xs font-black uppercase tracking-wider active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-xs"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span className="text-emerald-700">Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add To Cart</span>
              </>
            )}
          </button>

          {/* Solid BUY NOW Button (Logo Ayurvedic Leaf Green Gradient) */}
          <button
            type="button"
            onClick={onBuyNow}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap btn-shimmer"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>Buy Now</span>
          </button>

        </div>

      </div>
    </aside>
  );
}
