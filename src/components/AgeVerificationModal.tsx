'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, AlertCircle, EyeOff, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsAuthModalOpen, user } = useAuth();

  useEffect(() => {
    const verified = localStorage.getItem('playtime_age_verified');
    if (!verified) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleVerify = () => {
    localStorage.setItem('playtime_age_verified', 'true');
    setIsOpen(false);
    // Open the 10% Off Login popup right after age confirmation if not logged in
    if (!user) {
      setTimeout(() => {
        setIsAuthModalOpen(true);
      }, 350);
    }
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-hidden">
      <div className="relative w-full max-w-[420px] p-5 sm:p-7 rounded-3xl glass-card-elevated border border-white/95 shadow-2xl text-center overflow-hidden text-[#0A0A0A] mx-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#FF2D95]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#007BA7]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Logo in sleek badge container */}
        <div className="relative flex justify-center mb-4">
          <div className="relative h-13 w-40 sm:h-16 sm:w-52 bg-[#0A0A0A] px-3 py-1.5 rounded-2xl shadow-md border border-[#007BA7]/30 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Playtime"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
        </div>

        {/* 18+ Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-[#FF2D95] text-white text-[11px] font-black tracking-wider uppercase shadow-xs">
          <AlertCircle className="w-3.5 h-3.5 text-white" />
          <span>Age Sensitive &bull; 18+ Store</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] mb-2 tracking-tight">
          Are you 18 or older?
        </h2>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-medium">
          <strong className="text-[#0A0A0A] font-bold">Playtime</strong> is an exclusive platform dedicated to adult wellness, intimacy devices, and herbal vitality.
        </p>

        {/* Key Discretion Highlights */}
        <div className="grid grid-cols-2 gap-2.5 mb-5 text-left">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-2 shadow-2xs">
            <EyeOff className="w-3.5 h-3.5 text-[#007BA7] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-black text-[#0A0A0A]">100% Plain Box</p>
              <p className="text-[10px] text-slate-500 font-medium">Zero outer branding</p>
            </div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-2 shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-[#FF2D95] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-black text-[#0A0A0A]">Discreet Billing</p>
              <p className="text-[10px] text-slate-500 font-medium">Generic statement</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <button
            onClick={handleVerify}
            className="w-full py-3 px-5 rounded-full btn-gradient text-white text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer font-black shadow-lg hover:shadow-xl transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Yes, I am 18+ &mdash; Enter</span>
          </button>
          <button
            onClick={handleExit}
            className="w-full py-2 px-4 rounded-full btn-silver text-[#0A0A0A] text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            Under 18 / Exit
          </button>
        </div>

        <p className="text-[10px] text-slate-400 mt-3 font-medium">
          By entering, you confirm you are at least 18 years of age.
        </p>
      </div>
    </div>
  );
}
