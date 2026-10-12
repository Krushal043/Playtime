'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, ProductPack } from '@/types';
import { Star, ShoppingBag, Eye, EyeOff, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, pack: ProductPack) => void;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [added, setAdded] = useState(false);

  const fallbackPack = {
    packSize: 1,
    label: 'Single Pack',
    price: product.basePrice || 499,
    originalPrice: product.originalPrice || Math.round((product.basePrice || 499) * 1.4),
    discount: '',
  };
  const safePacks = product.packs && product.packs.length > 0 ? product.packs : [fallbackPack];
  const currentPack = safePacks[selectedPackIndex] || safePacks[0] || fallbackPack;

  const handleAdd = () => {
    onAddToCart(product, currentPack);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const getBadgeClass = (type?: string) => {
    switch (type) {
      case 'blue':
        return 'brand-gradient text-white';
      case 'red':
        return 'bg-gradient-to-r from-rose-600 to-pink-600 text-white';
      case 'green':
        return 'emerald-gradient text-white';
      default:
        return 'bg-slate-900 text-white';
    }
  };

  return (
    <div className="card-hover group relative rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between shadow-2xs">
      
      <div>
        {/* Product Image Container */}
        <div className="relative h-48 w-full bg-gradient-to-b from-slate-50 via-white to-slate-100/60 p-3 overflow-hidden">
          <Link href={`/products/${product.id}`} className="relative w-full h-full flex items-center justify-center block">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Badges on Top Left */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
            {product.badge && (
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase shadow-md ${getBadgeClass(product.badgeType)}`}>
                {product.badge}
              </span>
            )}
            {currentPack.discount && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 shadow-sm">
                {currentPack.discount}
              </span>
            )}
          </div>

          {/* Plain Box Badge on Top Right */}
          <div className="absolute top-3 right-3 z-10 pointer-events-none">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 border border-slate-200 text-[10px] font-bold text-slate-700 shadow-sm" title="Unmarked brown box with zero outer branding">
              <EyeOff className="w-3 h-3 text-emerald-600" />
              Plain Box
            </span>
          </div>

          {/* Quick View Button on Hover */}
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-5">
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
            </div>
            <span className="text-xs font-black text-slate-900">{product.rating}</span>
            <span className="text-[11px] text-slate-400">({product.reviewsCount} reviews)</span>
          </div>

          {/* Title */}
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Tagline */}
          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {product.tagline}
          </p>

          {/* BOLD CARE PACK SELECTOR: [ Pack 1 ] [ Pack 2 ] [ Pack 3 ] */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider">
                Select Pack:
              </span>
              <span className="text-[11px] font-extrabold brand-gradient-text">
                {currentPack.label}
              </span>
            </div>

            <div className={`grid gap-1.5 ${safePacks.length === 2 ? 'grid-cols-2' : safePacks.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
              {safePacks.map((pack, idx) => {
                const isSelected = selectedPackIndex === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPackIndex(idx)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-extrabold transition-all border cursor-pointer flex flex-col items-center justify-center ${
                      isSelected
                        ? 'brand-gradient text-white border-transparent shadow-md shadow-blue-500/20 scale-[1.02]'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <span>Pack {pack.packSize}</span>
                    <span className={`text-[10px] font-medium ${isSelected ? 'text-amber-200 font-bold' : 'text-slate-400'}`}>
                      {pack.discount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Price & Add to Bag CTA with Signature Gradient Button */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 border-t border-slate-100">
        <div className="flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900">
              ₹{currentPack.price.toLocaleString('en-IN')}
            </span>
            {currentPack.originalPrice > currentPack.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{currentPack.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[11px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Save ₹{(currentPack.originalPrice - currentPack.price).toLocaleString('en-IN')}
          </span>
        </div>

        {/* SIGNATURE GRADIENT BUTTON */}
        <button
          onClick={handleAdd}
          className={`w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer ${
            added
              ? 'emerald-gradient text-white shadow-emerald-500/20'
              : 'btn-gradient'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added To Bag!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add Pack To Bag</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
