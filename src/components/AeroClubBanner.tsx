'use client';

import React from 'react';
import { ShieldCheck, Gift, Percent, Zap, ArrowRight, Sparkles } from 'lucide-react';

interface AeroClubBannerProps {
  onJoinClick?: () => void;
}

export default function AeroClubBanner({ onJoinClick }: AeroClubBannerProps) {
  return (
    <section id="club-banner" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
      {/* Club Banner Island (From Reference Design) */}
      <div className="rounded-[2.5rem] bg-white/80 backdrop-blur-2xl border border-white/95 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_20px_50px_-10px_rgba(5,19,54,0.08)] flex flex-col lg:flex-row items-center justify-between gap-8 relative">
        
        {/* Subtle Ambient Backlight */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        {/* Left: Metallic VIP Membership Card Mockup */}
        <div className="relative w-72 sm:w-80 h-44 rounded-2xl bg-gradient-to-tr from-[#051336] via-[#0f2a6b] to-[#1e3a8a] text-white p-5 shadow-xl border border-blue-400/30 shrink-0 overflow-hidden transform hover:-rotate-1 transition-transform duration-300">
          {/* Card Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">PLAYTIME VIP</span>
            </div>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>

          <div className="my-5">
            <div className="w-8 h-6 rounded-md bg-amber-400/30 border border-amber-300/60 mb-2" />
            <p className="text-xs font-mono tracking-widest text-slate-300">•••• •••• •••• 2026</p>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-400">DISCREET MEMBER</p>
              <p className="text-[11px] font-black tracking-wide text-white">ALL ACCESS PASS</p>
            </div>
            <span className="text-[10px] font-black text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">
              TIER ONE
            </span>
          </div>
        </div>

        {/* Middle: Info & Perks */}
        <div className="flex-1 space-y-4 text-center lg:text-left z-10">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#051336] uppercase tracking-tight">
              JOIN THE PLAYTIME DISCREET CLUB
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-xl">
              Exclusive botanical releases, subscriber discounts, priority dispatch, and complimentary medical panel consults.
            </p>
          </div>

          {/* 4 Perk Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div className="bg-white/90 border border-slate-200/90 rounded-xl p-2.5 flex items-center gap-2 shadow-2xs">
              <Percent className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="text-[11px] font-bold text-[#051336]">10% Cashback</span>
            </div>
            <div className="bg-white/90 border border-slate-200/90 rounded-xl p-2.5 flex items-center gap-2 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-[11px] font-bold text-[#051336]">Early Access</span>
            </div>
            <div className="bg-white/90 border border-slate-200/90 rounded-xl p-2.5 flex items-center gap-2 shadow-2xs">
              <Gift className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="text-[11px] font-bold text-[#051336]">Secret Gifts</span>
            </div>
            <div className="bg-white/90 border border-slate-200/90 rounded-xl p-2.5 flex items-center gap-2 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-[11px] font-bold text-[#051336]">Doctor VIP</span>
            </div>
          </div>
        </div>

        {/* Right: CTA Button */}
        <div className="shrink-0 z-10">
          <button
            type="button"
            onClick={onJoinClick}
            className="bg-[#051336] hover:bg-[#0c245c] text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-md hover:shadow-lg active:scale-95 group"
          >
            <span>Become A Member</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
