'use client';

import React from 'react';
import { Truck, EyeOff, Award, Headphones } from 'lucide-react';

export default function AeroTrustStrip() {
  const trustItems = [
    {
      icon: Truck,
      title: 'Free Discreet Shipping',
      description: 'Delivered in 2-4 business days',
    },
    {
      icon: EyeOff,
      title: '100% Plain Brown Box',
      description: 'Zero external brand markings',
    },
    {
      icon: Award,
      title: 'AYUSH Certified Herbs',
      description: 'Tested by independent NABL labs',
    },
    {
      icon: Headphones,
      title: '24/7 Medical Concierge',
      description: 'Confidential WhatsApp support',
    },
  ];

  return (
    <section id="trust-strip" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
      <div className="rounded-3xl bg-white/85 backdrop-blur-xl border border-white/95 p-5 sm:p-6 shadow-[0_10px_30px_-5px_rgba(5,19,54,0.06)]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#051336]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#051336] leading-tight">
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
