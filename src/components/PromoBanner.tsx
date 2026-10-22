'use client';

import React, { useState, useEffect } from 'react';
import { EyeOff, Copy, Check, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function PromoBanner() {
  const { setIsAuthModalOpen, user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [promoCode, setPromoCode] = useState('PLAY10');
  const [tickerText, setTickerText] = useState('100% Plain Box: Discreet Box • Zero outer logos');
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings?.promo_banner) {
          const pb = data.settings.promo_banner;
          if (pb.couponCode) setPromoCode(pb.couponCode);
          if (pb.tickerText) setTickerText(pb.tickerText);
          if (pb.countdownHours) {
            setTimeLeft((prev) => ({ ...prev, hours: pb.countdownHours, minutes: pb.countdownMinutes || 28 }));
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyCode = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#0A0A0A] border-b border-[#007BA7]/20 text-white text-xs py-2 px-3 sm:px-4 shadow-2xs select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Left: 100% Discreet notice */}
        <div className="flex items-center gap-1.5 font-medium shrink-0">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-200 font-extrabold flex items-center gap-1 text-[11px] sm:text-xs">
            <EyeOff className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate max-w-[200px] xs:max-w-xs sm:max-w-md">{tickerText}</span>
          </span>
        </div>

        {/* Center: Offer & Coupon Click-To-Copy */}
        <div 
          onClick={() => { if (!user) setIsAuthModalOpen(true); }}
          className="flex items-center gap-1.5 shrink-0 cursor-pointer group"
          title="Click to claim offer"
        >
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#FF2D95] text-white font-black uppercase text-[10px] tracking-wider border border-[#FF2D95]/40 shadow-xs group-hover:scale-105 transition-transform">
            FLASH OFFER
          </span>
          <button
            onClick={copyCode}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF2D95]/20 hover:bg-[#FF2D95]/30 active:scale-95 text-white font-mono font-black text-[11px] sm:text-xs border border-[#FF2D95]/60 transition-all cursor-pointer shadow-xs"
            title="Click to copy coupon code"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-black">COPIED!</span>
              </>
            ) : (
              <>
                <span>{promoCode}</span>
                <Copy className="w-3 h-3 text-slate-300" />
              </>
            )}
          </button>
        </div>

        {/* Right: Live Countdown Timer in Silver Foil */}
        <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono bg-slate-900/90 text-slate-200 px-3 py-1 rounded-full border border-slate-500/40 shadow-inner">
          <Clock className="w-3 h-3 text-slate-400" />
          <span className="text-slate-400">Ends In:</span>
          <span className="font-extrabold text-white">
            {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
          </span>
        </div>

      </div>
    </div>
  );
}
