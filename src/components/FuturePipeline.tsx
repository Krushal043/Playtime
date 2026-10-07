'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PIPELINE_PRODUCTS, PipelineProduct } from '@/data/products';
import { Bell, Sparkles, Check, ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';

export default function FuturePipeline() {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notifiedItems, setNotifiedItems] = useState<Record<string, boolean>>({});

  const handleNotifySingle = (item: PipelineProduct) => {
    setNotifiedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      // keep it checked
    }, 500);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;
    setIsSubscribed(true);
    setWaitlistEmail('');
  };

  return (
    <section id="upcoming-pipeline" className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-[#0a193d] text-xs font-black uppercase tracking-wider mb-2.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            EXPANSION PIPELINE
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0a193d] tracking-tight">
            Upcoming Innovations &bull; Coming Soon
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            We are engineering these 4 new intimate essentials. Join the waitlist for 40% early bird launch pricing.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-pill border border-slate-200/80 shadow-2xs text-[#0a193d]">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            Zero Spam &bull; 100% Discreet
          </span>
        </div>
      </div>

      {/* Grid of 4 Pipeline Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {PIPELINE_PRODUCTS.map((item) => {
          const isNotified = notifiedItems[item.id];

          return (
            <div
              key={item.id}
              className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Visual Image */}
                <div className="relative aspect-4/3 w-full bg-gradient-to-b from-slate-100 to-slate-200/60 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 text-[#0a193d] backdrop-blur-sm border border-slate-200/80 shadow-xs">
                      {item.badge}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-bold text-white bg-slate-900/80 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-black text-[#0a193d] leading-snug line-clamp-1 group-hover:text-rose-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                    {item.tagline}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => handleNotifySingle(item)}
                  className={`w-full py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                    isNotified
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                      : 'bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 border-slate-200/80'
                  }`}
                >
                  {isNotified ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Waitlist Joined!</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3.5 h-3.5 text-rose-600" />
                      <span>Notify When Ready</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* VIP Early Access Banner Box */}
      <div className="rounded-3xl glass-card-elevated p-6 sm:p-8 text-[#0a193d] shadow-xl border border-white/95 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl text-center md:text-left">
          <span className="text-xs font-black text-rose-600 uppercase tracking-widest block mb-1">
            VIP EARLY ACCESS PRIVILEGES
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#0a193d]">
            Be The First To Experience New Launches
          </h3>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Join 8,500+ members getting private pre-sale invites, 40% launch discount vouchers, and discreet early samples.
          </p>
        </div>

        <div className="w-full md:auto">
          {isSubscribed ? (
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>You&apos;re on the VIP list! Welcome aboard.</span>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md">
              <div className="relative w-full">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="Enter your email for private invites"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-slate-200/90 text-[#0a193d] placeholder-slate-400 text-xs focus:outline-none focus:border-rose-500 shadow-2xs"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto py-3 px-6 rounded-full text-xs font-black uppercase tracking-wider btn-navy-red cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Get VIP Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

    </section>
  );
}
