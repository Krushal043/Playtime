'use client';

import React, { useState } from 'react';
import { Leaf, EyeOff, Lock, Zap, Star, ShieldCheck, Tag, Check, Copy } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { MarqueeItemConfig } from '@/types/cms';

export default function TopMarqueeBar() {
  const { marqueeItems } = useSettings();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (e: React.MouseEvent, code: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'EyeOff':
        return <EyeOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'Lock':
        return <Lock className="w-3.5 h-3.5 text-[#007BA7] shrink-0" />;
      case 'Zap':
        return <Zap className="w-3.5 h-3.5 text-[#FF2D95] shrink-0" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'Star':
        return <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />;
      case 'Tag':
        return <Tag className="w-3.5 h-3.5 text-[#FF2D95] shrink-0" />;
      case 'Leaf':
      default:
        return <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    }
  };

  const displayList = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="w-full bg-[#0A0A0A] border-b border-[#007BA7]/25 text-slate-200 py-1.5 sm:py-2 overflow-hidden select-none relative z-50 text-[11px] sm:text-xs">
      <div className="flex items-center">
        {/* Infinite Running Marquee Track */}
        <div className="flex gap-8 sm:gap-12 whitespace-nowrap animate-marquee items-center will-change-transform">
          {displayList.map((item, idx) => {
            const couponCode = item.couponCode || 'PLAY10';
            const isCopied = copiedCode === couponCode;

            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2 font-bold tracking-wide text-slate-200 transition-opacity hover:opacity-100"
              >
                {renderIcon(item.iconName)}
                {item.isCoupon ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-slate-100">{item.text.replace(/Use Code.*$/, 'Flash Sale: Use Code')}</span>
                    <button
                      type="button"
                      onClick={(e) => copyCode(e, couponCode)}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF2D95]/20 hover:bg-[#FF2D95]/30 border border-[#FF2D95]/60 text-white font-mono font-black text-[10px] sm:text-[11px] cursor-pointer transition-all active:scale-95 shadow-xs"
                      title="Click to copy coupon code"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">COPIED</span>
                        </>
                      ) : (
                        <>
                          <span className="text-white tracking-wider">{couponCode}</span>
                          <Copy className="w-2.5 h-2.5 text-slate-300" />
                        </>
                      )}
                    </button>
                    <span className="text-slate-100 font-semibold">for 10% Extra OFF</span>
                  </span>
                ) : (
                  <span className="text-slate-200">{item.text}</span>
                )}
                <span className="text-[#007BA7]/60 ml-4 font-black text-[10px]">&bull;</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
