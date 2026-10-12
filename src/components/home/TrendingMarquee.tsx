'use client';

import React from 'react';
import { ShieldCheck, EyeOff, Lock, Heart, Leaf, Zap, Award } from 'lucide-react';

export default function TrendingMarquee() {
  const highlights = [
    { icon: <EyeOff className="w-4 h-4 text-emerald-600" />, text: '100% Plain Unmarked Box Delivery' },
    { icon: <Lock className="w-4 h-4 text-blue-600" />, text: 'Discreet Bank Billing (No "Playtime" on SMS)' },
    { icon: <ShieldCheck className="w-4 h-4 text-purple-600" />, text: 'Medical-Grade Body Safe Silicone' },
    { icon: <Leaf className="w-4 h-4 text-emerald-600" />, text: '100% Natural Himalayan Shilajit & Ashwagandha' },
    { icon: <Award className="w-4 h-4 text-amber-600" />, text: '5,00,000+ Happy Indian Couples' },
    { icon: <Zap className="w-4 h-4 text-rose-600" />, text: 'Express 24-Hour Dispatch' },
  ];

  return (
    <div className="w-full bg-white/60 backdrop-blur-md border-y border-slate-200/80 py-3 overflow-hidden select-none">
      <div className="flex gap-8 whitespace-nowrap animate-marquee">
        {[...highlights, ...highlights].map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-2 text-xs font-bold text-[#0a193d]">
            {item.icon}
            <span>{item.text}</span>
            <span className="text-slate-300 ml-6">&bull;</span>
          </div>
        ))}
      </div>
    </div>
  );
}
