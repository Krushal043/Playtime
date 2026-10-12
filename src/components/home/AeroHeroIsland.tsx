'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, EyeOff, ShieldCheck, Zap, Star, Sparkles } from 'lucide-react';
import { Product } from '@/types';

interface AeroHeroIslandProps {
  flagship?: Product;
  onShopClick: () => void;
  onQuizClick: () => void;
}

export default function AeroHeroIsland({
  flagship,
  onShopClick,
  onQuizClick,
}: AeroHeroIslandProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-6 w-full">
      {/* Grand Rounded Island Container (AERO Reference Layout) */}
      <div className="relative rounded-[2.5rem] bg-white/80 backdrop-blur-2xl border border-white/95 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_20px_50px_-10px_rgba(5,19,54,0.08),0_1px_3px_rgba(0,0,0,0.02)]">
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-rose-100/20 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Hero Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#051336] text-[11px] font-black uppercase tracking-wider w-fit shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>PREMIUM AYURVEDIC FORMULATIONS</span>
            </div>

            {/* Giant Bold Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#051336] tracking-tight leading-[1.08] uppercase">
              BOTANICAL WELLNESS <br className="hidden sm:inline" />
              FOR ENDURANCE, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#051336] via-[#1d4ed8] to-[#e11d48]">
                INTIMACY &amp; CONFIDENCE
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-lg leading-relaxed">
              Clinically tested, transfer-free Ayurvedic solutions engineered for prolonged endurance and cellular vitality. 100% plain brown box delivery guaranteed.
            </p>

            {/* Dual Pill CTA Buttons (Playtime Signature Brand Colors) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onShopClick}
                className="bg-gradient-to-r from-[#051336] via-[#0b2560] to-[#1d4ed8] hover:from-[#091d4a] hover:via-[#c81e3d] hover:to-[#dc2626] text-white px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-3 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 group"
              >
                <span>Explore Formulations</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </button>

              <button
                onClick={onQuizClick}
                className="bg-white hover:bg-slate-50 text-[#051336] hover:text-[#1d4ed8] border-2 border-slate-200/90 hover:border-blue-400 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer transition-all shadow-xs hover:shadow-md active:scale-95"
              >
                Take 30s Intimacy Quiz
              </button>
            </div>

          </div>

          {/* Right Hero Column: Visual + Floating Badges + Social Proof */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] sm:min-h-[440px]">
            
            {/* Center Dynamic Product / Lifestyle Stage */}
            <div className="relative w-full h-[360px] sm:h-[440px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-gradient-to-b from-white via-[#fcfbf9] to-slate-100/60 flex items-center justify-center">
              {/* Soft Ambient Radial Backlight */}
              <div className="absolute inset-0 bg-radial from-slate-200/40 via-transparent to-transparent pointer-events-none" />

              <Image
                src={flagship?.image || 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=800&auto=format&fit=crop&q=80'}
                alt="Playtime Flagship Formulation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6 sm:p-10 drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                priority
              />

              {/* Gradient Bottom Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />

              {/* Floating Right Edge Badges (Desktop Overlay) */}
              <div className="hidden lg:flex flex-col gap-2.5 absolute top-5 right-5 z-20 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2.5 shadow-md flex items-center gap-2.5 w-52">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <EyeOff className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-[#051336] leading-tight">Plain Box Delivery</h4>
                    <p className="text-[9px] text-slate-500 font-medium">100% Discreet Brown Carton</p>
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2.5 shadow-md flex items-center gap-2.5 w-52">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-[#051336] leading-tight">AYUSH Certified</h4>
                    <p className="text-[9px] text-slate-500 font-medium">Doctor Panel Approved</p>
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2.5 shadow-md flex items-center gap-2.5 w-52">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-[#051336] leading-tight">Zero Numbness</h4>
                    <p className="text-[9px] text-slate-500 font-medium">Transfer-free Action</p>
                  </div>
                </div>
              </div>

              {/* Bottom-Right Social Proof Pill (From Reference) */}
              <div className="absolute bottom-4 left-4 sm:left-auto sm:right-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl py-2 px-3.5 shadow-lg flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-slate-300 overflow-hidden relative">
                    <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Customer" fill className="object-cover" />
                  </div>
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-slate-400 overflow-hidden relative">
                    <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Customer" fill className="object-cover" />
                  </div>
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-slate-500 overflow-hidden relative">
                    <Image src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="Customer" fill className="object-cover" />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-black text-[#051336] leading-none">10,000+ Couples</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[10px] font-black text-slate-600">4.9</span>
                    <div className="flex text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Feature Strip (Visible on mobile/tablet below image) */}
            <div className="flex lg:hidden flex-wrap items-center justify-center gap-2 mt-4 w-full">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-700 shadow-2xs">
                <EyeOff className="w-3 h-3 text-emerald-600" />
                Plain Box Delivery
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-700 shadow-2xs">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                AYUSH Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-700 shadow-2xs">
                <Zap className="w-3 h-3 text-rose-600" />
                Zero Numbness
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

