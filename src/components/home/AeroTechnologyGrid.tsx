'use client';

import React from 'react';
import { ShieldCheck, EyeOff, Sparkles, Zap, Leaf, Stethoscope } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function AeroTechnologyGrid() {
  const { standardsGrid } = useSettings();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Sparkles':
        return Sparkles;
      case 'EyeOff':
        return EyeOff;
      case 'Stethoscope':
        return Stethoscope;
      case 'Leaf':
        return Leaf;
      case 'Zap':
      default:
        return Zap;
    }
  };

  return (
    <section id="tech-grid" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-[#051336] uppercase tracking-tight">
          AYURVEDIC SCIENCE &amp; CLINICAL STANDARDS
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Pure botanical formulations backed by rigorous clinical testing
        </p>
      </div>

      {/* Dynamic Minimalist Technology Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {standardsGrid.map((item) => {
          const Icon = getIcon(item.iconName);
          return (
            <div
              key={item.id || item.title}
              className="rounded-2xl bg-white/85 backdrop-blur-xl border border-white/90 p-4 sm:p-5 flex flex-col items-center text-center justify-between shadow-[0_8px_25px_-5px_rgba(5,19,54,0.05)] hover:bg-white hover:shadow-lg transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#051336] transition-all duration-200">
                <Icon className="w-5 h-5 text-[#051336] group-hover:text-amber-400 transition-colors" />
              </div>
              <h4 className="text-[11px] sm:text-xs font-black text-[#051336] uppercase tracking-wider mb-1 leading-tight">
                {item.title}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
