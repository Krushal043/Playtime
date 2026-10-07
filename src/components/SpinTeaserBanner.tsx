'use client';

import React from 'react';
import { Gift, Sparkles, Trophy, ArrowRight } from 'lucide-react';

export default function SpinTeaserBanner() {
  const triggerSpin = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-spin-modal'));
    }
  };

  return (
    <section className="py-6 px-4 max-w-7xl mx-auto w-full">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0a193d] via-[#161233] to-[#29081e] border-2 border-amber-500/40 p-6 sm:p-8 shadow-[0_15px_40px_rgba(245,158,11,0.18)]">
        
        {/* Ambient Glows */}
        <div className="absolute -top-16 -left-16 w-52 h-52 bg-amber-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-rose-600/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Icon + Text */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-amber-400 via-amber-500 to-rose-600 p-0.5 shadow-lg shrink-0 flex items-center justify-center animate-bounce-gentle">
              <div className="w-full h-full bg-[#0a193d] rounded-[14px] flex items-center justify-center">
                <Gift className="w-8 h-8 sm:w-9 sm:h-9 text-amber-300 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-black uppercase tracking-wider mb-1.5">
                <Trophy className="w-3.5 h-3.5" />
                <span>Playtime Lucky Fortune Spin</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                Spin The Wheel & Scratch Secret Discounts! 🎰
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-medium">
                Win up to <strong className="text-amber-300 font-extrabold">₹150 Flat Off</strong>, <strong className="text-emerald-400 font-extrabold">20% Instant Savings</strong>, or <strong className="text-rose-300 font-extrabold">Free Express Discreet Delivery</strong>. 100% Guaranteed Prize!
              </p>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={triggerSpin}
              className="w-full md:w-auto px-7 py-3.5 rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-rose-600 hover:from-amber-300 hover:to-rose-500 active:scale-95 text-[#0a193d] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(245,158,11,0.4)] transition-all cursor-pointer btn-shimmer"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Spin & Win Now</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
