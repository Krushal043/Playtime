'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, EyeOff, Sparkles, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { LAUNCH_PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import Link from 'next/link';

interface HeroContent {
  heading1: string;
  headingGreen: string;
  headingGradient: string;
  subtitle: string;
}

interface ModernLuxuryHeroProps {
  flagship?: Product;
  onShopClick: () => void;
  onQuizClick: () => void;
}

export default function ModernLuxuryHero({ flagship, onShopClick, onQuizClick }: ModernLuxuryHeroProps) {
  const heroProduct = flagship || LAUNCH_PRODUCTS[0];

  const [heroContent, setHeroContent] = useState<HeroContent>({
    heading1: 'Peak Intimate Endurance.',
    headingGreen: '100% Herbal.',
    headingGradient: 'Zero Numbness.',
    subtitle:
      'Formulated with pure botanical clove, jaiphal and pure Himalayan Shilajit. Clinically tested to prolong endurance without dulling sensations or transferring to your partner.',
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings?.hero_section) {
          const hs = data.settings.hero_section;
          setHeroContent((prev) => ({
            ...prev,
            heading1: hs.heading1 || prev.heading1,
            headingGreen: hs.headingGreen || prev.headingGreen,
            headingGradient: hs.headingGradient || prev.headingGradient,
            subtitle: hs.subtitle || prev.subtitle,
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-300/60 bg-linear-to-b from-white/80 via-slate-100/40 to-transparent">
      
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-50/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-amber-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & High-Conversion Action */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Top Minimalist Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#051336] text-white text-[11px] font-bold tracking-wider uppercase shadow-xs border border-blue-600/30">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span>Ayurvedic Science &bull; Modern Intimacy</span>
            </div>

            {/* Main Editorial Headline with Signature Logo Palette */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#051336] tracking-tight leading-[1.08]">
              {heroContent.heading1}{' '}
              <span className="text-[#16a34a]">
                {heroContent.headingGreen}
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600">
                {heroContent.headingGradient}
              </span>
            </h1>

            {/* Clear, Trust-Building Subtitle */}
            <p className="text-base sm:text-lg text-slate-700 max-w-xl font-normal leading-relaxed">
              {heroContent.subtitle}
            </p>

            {/* Quick Proof Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Non-Chemical &bull; Transfer-Free</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>10-Minute Micro Absorption</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                <span>100% Plain Discreet Parcel</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
              <button
                type="button"
                onClick={onShopClick}
                className="px-8 py-4 rounded-full btn-navy-red text-white text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl active:scale-95 transition-all cursor-pointer group"
              >
                <span>Explore Best Sellers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onQuizClick}
                className="px-7 py-4 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-[#051336] text-xs sm:text-sm font-bold tracking-wider flex items-center justify-center gap-2 shadow-2xs active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>30-Sec Intimacy Matcher</span>
              </button>
            </div>

            {/* Social Proof & Doctor Trust Bar */}
            <div className="pt-4 border-t border-slate-200/80 w-full flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-emerald-800">VK</div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-blue-800">AS</div>
                  <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-amber-800">RM</div>
                  <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">+10k</div>
                </div>
                <div className="text-left">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                    <span className="ml-1 text-xs font-black text-slate-900">4.9/5</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">10,000+ Verified Indian Couples</p>
                </div>
              </div>

              <div className="hidden sm:block h-6 w-[1px] bg-slate-200" />

              <div className="flex items-center gap-2 text-left">
                <Award className="w-6 h-6 text-emerald-700 shrink-0" />
                <div>
                  <p className="text-xs font-black text-slate-900">AYUSH Certified</p>
                  <p className="text-[11px] text-slate-500 font-medium">GMP & NABL Tested</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Luxury Product Showcase Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Visual Glass Showcase Card */}
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)]">
              
              {/* Product Badge Pill */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                  {heroProduct.badge || 'Flagship Hero'}
                </span>
                <span className="text-xs font-bold text-slate-500">₹{heroProduct.basePrice} &bull; Free Discreet Courier</span>
              </div>

              {/* Main Product Image Container */}
              <Link href={`/products/${heroProduct.id}`} className="block group">
                <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-radial from-slate-50 to-slate-100/60 mb-3 border border-slate-100 flex items-center justify-center cursor-pointer">
                  <Image
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />

                  {/* Floating Micro-Pill 1: Clinically Tested */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-xs flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Transfer-Free Formula</span>
                  </div>

                  {/* Floating Micro-Pill 2: Discretion */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-xs flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                    <EyeOff className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Plain Box Guarantee</span>
                  </div>
                </div>
                <h4 className="text-sm font-black text-slate-900 mb-4 group-hover:text-rose-600 transition-colors line-clamp-1">
                  {heroProduct.name}
                </h4>
              </Link>

              {/* Mini Specs Row */}
              <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-slate-100">
                <div className="p-2 rounded-xl bg-slate-50">
                  <p className="text-[10px] text-slate-500 font-medium">Absorption</p>
                  <p className="text-xs font-black text-slate-900">10 Mins</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <p className="text-[10px] text-slate-500 font-medium">Endurance</p>
                  <p className="text-xs font-black text-slate-900">+35 Mins</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <p className="text-[10px] text-slate-500 font-medium">Formulation</p>
                  <p className="text-xs font-black text-emerald-700">100% Herbal</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
