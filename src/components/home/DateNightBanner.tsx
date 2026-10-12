'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, Heart, EyeOff, ShieldCheck } from 'lucide-react';
import { CategoryType } from '@/types';

interface DateNightBannerProps {
  onSelectCategory: (cat: CategoryType) => void;
}

export default function DateNightBanner({ onSelectCategory }: DateNightBannerProps) {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-[#0a1838] to-slate-950 text-white border-2 border-indigo-900/50 shadow-2xl p-8 sm:p-12 lg:p-16">
        
        {/* Playtime Signature Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              DATE NIGHT KITS
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Your Night, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-rose-400">
                Your Rules.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed font-medium">
              Break the routine. Curated couples massagers, aromatic warming candles, silky organic lubes, and provocative card games — all packed in one discreet box.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Save Up To 45%</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1.5">
                <EyeOff className="w-4 h-4 text-emerald-400" />
                <span>100% Unmarked Delivery</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Couples Certified</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onSelectCategory('couples');
                  const el = document.getElementById('flagship-section') || document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-gradient px-8 py-4 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer group"
              >
                <span>Explore Date Night Kits</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl group">
            <Image
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80"
              alt="Date Night Kits"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs text-slate-200 flex items-center justify-between">
              <span className="font-bold">Sync Harmony + Midnight Spark Game</span>
              <span className="text-emerald-400 font-black">₹4,499 (Save ₹3,200)</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
