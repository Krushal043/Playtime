'use client';

import React from 'react';
import { Truck, EyeOff, Award, Headphones } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function AeroTrustStrip() {
  const sectionRef = useScrollReveal<HTMLElement>();

  const trustItems = [
    {
      icon: Truck,
      title: 'Free Discreet Shipping',
      description: 'Delivered in 2-4 business days',
      color: 'text-[#007BA7]',
      bg: 'bg-[#007BA7]/8',
      border: 'border-[#007BA7]/15',
    },
    {
      icon: EyeOff,
      title: '100% Plain Brown Box',
      description: 'Zero external brand markings',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    {
      icon: Award,
      title: 'AYUSH Certified Herbs',
      description: 'Tested by independent NABL labs',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    {
      icon: Headphones,
      title: '24/7 Medical Concierge',
      description: 'Confidential WhatsApp support',
      color: 'text-[#FF2D95]',
      bg: 'bg-[#FF2D95]/8',
      border: 'border-[#FF2D95]/15',
    },
  ];

  return (
    <section ref={sectionRef} id="trust-strip" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
      <div className="reveal rounded-3xl bg-white/85 backdrop-blur-xl border border-white/95 p-5 sm:p-6 shadow-[0_10px_30px_-5px_rgba(10,10,10,0.06)]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`trust-card-3d reveal stagger-${idx + 1} flex items-center gap-3.5 rounded-2xl p-3 cursor-default`}
              >
                <div className={`w-10 h-10 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#0A0A0A] leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {item.description}
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
