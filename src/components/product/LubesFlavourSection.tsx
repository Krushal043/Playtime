'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, ProductPack } from '@/types';
import { ShoppingBag, Check, Droplet, Star, ShieldCheck } from 'lucide-react';

interface LubeFlavour {
  id: string;
  name: string;
  badge: string;
  accent: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
}

const LUBE_FLAVOURS: LubeFlavour[] = [
  {
    id: 'strawberry',
    name: 'Juicy Strawberry',
    badge: 'Sweet & Luscious 🍓',
    accent: 'bg-rose-500 text-white',
    price: 349,
    originalPrice: 499,
    description: 'Rich strawberry natural essence with a silky smooth glide. Safe for intimate oral indulgence.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'chocolate',
    name: 'Dark Chocolate',
    badge: 'Sinfully Rich 🍫',
    accent: 'bg-amber-800 text-white',
    price: 349,
    originalPrice: 499,
    description: 'Velvety dark chocolate aroma that heightens every touch and creates intense sensory heat.',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'vanilla',
    name: 'Warm Vanilla Silk',
    badge: 'Sensual Warmth 🍦',
    accent: 'bg-amber-600 text-white',
    price: 349,
    originalPrice: 499,
    description: 'Gentle French vanilla with a subtle heating feel upon gentle blowing or friction.',
    image: 'https://images.unsplash.com/photo-1505253758473-96b46d5f69fe?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'mint',
    name: 'Cooling Mint Breeze',
    badge: 'Tingling Sensation 🌿',
    accent: 'bg-emerald-600 text-white',
    price: 349,
    originalPrice: 499,
    description: 'Invigorating spearmint tingling sensation that sends pleasant shivers down both partners.',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&auto=format&fit=crop&q=80'
  }
];

interface LubesFlavourSectionProps {
  onAddToCart: (product: Product, pack: ProductPack) => void;
}

export default function LubesFlavourSection({ onAddToCart }: LubesFlavourSectionProps) {
  const [selectedFlavour, setSelectedFlavour] = useState(0);
  const [added, setAdded] = useState(false);

  const flavour = LUBE_FLAVOURS[selectedFlavour];

  const handleAdd = () => {
    const lubeProduct: Product = {
      id: `pt-lube-${flavour.id}`,
      name: `Playtime Vibe ${flavour.name} Lubricant (100ml)`,
      tagline: flavour.description,
      category: 'lubes',
      basePrice: flavour.price,
      rating: 4.9,
      reviewsCount: 1420,
      badge: flavour.badge,
      image: flavour.image,
      description: flavour.description,
      features: [
        '100% Water-soluble & edible safe formula',
        'Latex, condom & sex toy compatible',
        'pH balanced for female intimate flora',
        'Non-sticky, easily washes off with plain water'
      ],
      specs: {
        volume: '100 ml',
        safeForSkin: 'Gynecologist Tested, 100% Edible'
      },
      packs: [
        { packSize: 1, label: '100ml Bottle', price: flavour.price, originalPrice: flavour.originalPrice, discount: '30% OFF' },
        { packSize: 2, label: 'Pack of 2', price: flavour.price * 2 - 150, originalPrice: flavour.originalPrice * 2, discount: '40% OFF' }
      ],
      inStock: true,
      discreetPackagingGuaranteed: true
    };

    onAddToCart(lubeProduct, lubeProduct.packs[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-black brand-gradient-text uppercase tracking-widest block mb-1">
            LUBES &amp; MASSAGE OILS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-2">
            4 Flavours For The Fun Part
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Water-based, edible, and 100% body-safe formulations crafted to make foreplay taste and feel delicious.
          </p>
        </div>

        {/* Flavour Selector Tabs with Gradient Highlights */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {LUBE_FLAVOURS.map((item: LubeFlavour, idx: number) => {
            const isSelected = selectedFlavour === idx;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedFlavour(idx)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all border cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'brand-gradient text-white border-transparent shadow-md shadow-blue-500/20 scale-105'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Flavour Spotlight Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 sm:p-10">
          
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-inner">
            <Image
              src={flavour.image}
              alt={flavour.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-500 hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${flavour.accent}`}>
                {flavour.badge}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-black text-slate-700">4.9 / 5.0 (1,420 reviews)</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              {flavour.name} Lubricant (100ml)
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {flavour.description}
            </p>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl font-black text-slate-900">₹{flavour.price}</span>
              <span className="text-xs text-slate-400 line-through">₹{flavour.originalPrice}</span>
              <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                30% OFF
              </span>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider font-black flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                added ? 'emerald-gradient text-white' : 'btn-gradient'
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
                  <span>Add {flavour.name} (₹{flavour.price})</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
