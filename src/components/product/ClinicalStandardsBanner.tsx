'use client';

import React from 'react';
import { Award, Leaf, ShieldCheck, EyeOff, UserCheck } from 'lucide-react';

interface ClinicalStandardsBannerProps {
  onExploreClick?: () => void;
}

export default function ClinicalStandardsBanner({ onExploreClick }: ClinicalStandardsBannerProps) {
  const pillars = [
    {
      icon: Award,
      title: 'AYUSH Certified',
      subtitle: 'Formulated per ancient Ayurvedic Shastrokt Vidhi',
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      icon: Leaf,
      title: '100% Plant Botanical',
      subtitle: 'Pure clove, jaiphal, & Himalayan shilajit extracts',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50'
    },
    {
      icon: ShieldCheck,
      title: 'Zero Chemical Numbness',
      subtitle: 'Transfer-free; 100% safe for intimate oral play',
      color: 'text-blue-700',
      bg: 'bg-blue-50'
    },
    {
      icon: EyeOff,
      title: '100% Blind Box Delivery',
      subtitle: 'Unmarked plain parcel; confidential billing statement',
      color: 'text-slate-800',
      bg: 'bg-slate-100'
    },
    {
      icon: UserCheck,
      title: 'Doctor Supervised',
      subtitle: 'Free confidential panel consultation available 24/7',
      color: 'text-rose-700',
      bg: 'bg-rose-50'
    }
  ];

  return (
    <section className="bg-white/80 backdrop-blur-md border-b border-slate-300/60 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Responsive Grid of 5 Clinical Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#fafafa] hover:bg-white border border-slate-200/70 hover:border-slate-300 hover:shadow-xs transition-all"
              >
                <div className={`p-2.5 rounded-xl ${pillar.bg} ${pillar.color} shrink-0`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-[#090d16] leading-snug">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">
                    {pillar.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
