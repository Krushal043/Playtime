'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, ProductPack } from '@/types';
import { X, Star, EyeOff, Check, ShoppingBag } from 'lucide-react';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, pack: ProductPack, quantity: number) => void;
}

export default function ProductQuickView({ product, onClose, onAddToCart }: ProductQuickViewProps) {
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

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
    onAddToCart(product, currentPack, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left: Product Image */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 p-2.5 rounded-xl bg-white/95 border border-slate-200 backdrop-blur-md text-[11px] font-bold text-slate-700 shadow-sm">
              <EyeOff className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Ships in 100% unmarked discreet parcel</span>
            </div>
          </div>

          {/* Right: Info & Specs */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                </div>
                <span className="text-xs font-black text-slate-800">{product.rating}</span>
                <span className="text-xs text-slate-400 font-medium">({product.reviewsCount} verified reviews)</span>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1.5">{product.name}</h2>
              <p className="text-xs font-bold brand-gradient-text mb-4">{product.tagline}</p>

              {/* BOLD CARE PACK SELECTOR */}
              <div className="mb-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-700 uppercase">Select Pack Size:</span>
                  <span className="text-xs font-black brand-gradient-text">{currentPack.label}</span>
                </div>
                <div className={`grid gap-2 ${safePacks.length === 2 ? 'grid-cols-2' : safePacks.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
                  {safePacks.map((pack, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPackIndex(idx)}
                      className={`py-2 px-2 rounded-xl text-xs font-black transition-all border cursor-pointer flex flex-col items-center ${
                        selectedPackIndex === idx
                          ? 'brand-gradient text-white border-transparent shadow-md shadow-blue-500/20'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>Pack {pack.packSize}</span>
                      <span className={`text-[10px] ${selectedPackIndex === idx ? 'text-amber-200 font-bold' : 'text-slate-400 font-medium'}`}>
                        {pack.discount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-black text-slate-900">
                  ₹{currentPack.price.toLocaleString('en-IN')}
                </span>
                {currentPack.originalPrice > currentPack.price && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{currentPack.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Save ₹{(currentPack.originalPrice - currentPack.price).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
                {product.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 mb-4">
                <p className="text-xs font-black text-slate-800 uppercase tracking-wider">Key Highlights:</p>
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions with Gradient CTA */}
            <div>
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-black text-slate-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer ${
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
                      <span>Add To Bag (Discreet Delivery)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
