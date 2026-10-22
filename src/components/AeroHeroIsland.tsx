'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, EyeOff, ShieldCheck, Zap, Star, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { use3DTilt } from '@/hooks/use3DTilt';
import { useParallax } from '@/hooks/useParallax';

interface AeroHeroIslandProps {
  flagship?: Product;
  onShopClick: () => void;
  onQuizClick: () => void;
}

export default function AeroHeroIsland({
  flagship,
  onShopClick,
  onQuizClick,
}: AeroHeroIslandProps) {
  // 3D tilt on the main island card
  const { ref: islandRef, handlers: islandHandlers } = use3DTilt<HTMLDivElement>({
    maxDeg: 6,
    scale: 1.01,
    perspective: 1200,
  });

  // 3D tilt on product image container
  const { ref: imgRef, handlers: imgHandlers } = use3DTilt<HTMLDivElement>({
    maxDeg: 14,
    scale: 1.04,
    perspective: 800,
  });

  // Parallax slow drift for ambient blobs
  const blobRef1 = useParallax<HTMLDivElement>(0.2);
  const blobRef2 = useParallax<HTMLDivElement>(0.35);

  // Text entrance cascade on mount
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Staggered entrance for pill → title → subtitle → CTAs → badges
    const items = el.querySelectorAll<HTMLElement>('[data-entrance]');
    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(24px)';
      item.style.transition = 'none';
      setTimeout(() => {
        item.style.transition = `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`;
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 80);
    });
  }, []);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-6 w-full">
      {/* Grand Rounded Island Container with 3D tilt */}
      <div
        ref={islandRef}
        {...islandHandlers}
        className="relative rounded-[2.5rem] bg-white/80 backdrop-blur-2xl border border-white/95 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_20px_50px_-10px_rgba(10,10,10,0.08),0_1px_3px_rgba(0,0,0,0.02)] card-3d-tilt"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Shine overlay for 3D glass effect */}
        <div className="card-3d-shine" />

        {/* Ambient Radial Glows with parallax */}
        <div
          ref={blobRef1}
          className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#007BA7]/10 rounded-full blur-3xl pointer-events-none -z-0"
        />
        <div
          ref={blobRef2}
          className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#FF2D95]/10 rounded-full blur-3xl pointer-events-none -z-0"
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle-float absolute rounded-full pointer-events-none"
            style={
              {
                width: `${4 + (i % 3) * 3}px`,
                height: `${4 + (i % 3) * 3}px`,
                background: i % 2 === 0 ? 'rgba(0,123,167,0.35)' : 'rgba(255,45,149,0.35)',
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
                '--duration': `${4 + i * 0.7}s`,
                '--delay': `${i * 0.6}s`,
              } as React.CSSProperties
            }
          />
        ))}

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* Left Hero Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">

            {/* Top Pill Tag — entrance #1 */}
            <div
              data-entrance
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#0A0A0A] text-[11px] font-black uppercase tracking-wider w-fit shadow-xs badge-3d-rotate"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#007BA7]" />
              <span>PREMIUM AYURVEDIC FORMULATIONS</span>
            </div>

            {/* Giant Bold Headline — entrance #2 */}
            <h1
              data-entrance
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0A] tracking-tight leading-[1.08] uppercase"
            >
              BOTANICAL WELLNESS <br className="hidden sm:inline" />
              FOR ENDURANCE, <br className="hidden sm:inline" />
              <span className="text-shimmer-animated">
                INTIMACY &amp; CONFIDENCE
              </span>
            </h1>

            {/* Subtitle — entrance #3 */}
            <p
              data-entrance
              className="text-slate-600 text-xs sm:text-sm font-medium max-w-lg leading-relaxed"
            >
              Clinically tested, transfer-free Ayurvedic solutions engineered for prolonged endurance and cellular vitality. 100% plain brown box delivery guaranteed.
            </p>

            {/* Dual Pill CTA Buttons — entrance #4 */}
            <div data-entrance className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onShopClick}
                className="ripple-container magnetic-btn bg-gradient-to-r from-[#0A0A0A] via-[#005f82] to-[#007BA7] hover:from-[#0A0A0A] hover:via-[#FF2D95] hover:to-[#FF2D95] text-white px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-3 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl group btn-press-pulse"
              >
                <span>Explore Formulations</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </button>

              <button
                onClick={onQuizClick}
                className="magnetic-btn bg-white hover:bg-slate-50 text-[#0A0A0A] hover:text-[#007BA7] border-2 border-slate-200/90 hover:border-[#007BA7] px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer transition-all shadow-xs hover:shadow-md btn-press-pulse"
              >
                Take 30s Intimacy Quiz
              </button>
            </div>

            {/* Trust chips — entrance #5 */}
            <div data-entrance className="flex flex-wrap items-center gap-2 pt-1">
              {[
                { icon: EyeOff, label: 'Plain Box Delivery', color: 'text-emerald-600' },
                { icon: ShieldCheck, label: 'AYUSH Certified', color: 'text-[#007BA7]' },
                { icon: Star, label: '4.9 ★ 10K+ Couples', color: 'text-amber-500' },
              ].map(({ icon: Icon, label, color }) => (
                <span
                  key={label}
                  className="trust-card-3d inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-700 shadow-xs cursor-default"
                >
                  <Icon className={`w-3 h-3 ${color}`} />
                  {label}
                </span>
              ))}
            </div>

          </div>

          {/* Right Hero Column: 3D Product Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] sm:min-h-[440px]">

            {/* 3D tilting product stage */}
            <div
              ref={imgRef}
              {...imgHandlers}
              className="relative w-full h-[360px] sm:h-[440px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-gradient-to-b from-white via-[#fcfbf9] to-slate-100/60 flex items-center justify-center cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Shine layer */}
              <div className="card-3d-shine" />

              {/* Soft Ambient Radial Backlight */}
              <div className="absolute inset-0 bg-radial from-slate-200/40 via-transparent to-transparent pointer-events-none" />

              {/* 3D Floating Product Image */}
              <div className="product-3d-float w-full h-full relative">
                <Image
                  src={flagship?.image || 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=800&auto=format&fit=crop&q=80'}
                  alt="Playtime Flagship Formulation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6 sm:p-10 drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Gradient Bottom Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />

              {/* Floating Right Edge Badges */}
              <div className="hidden lg:flex flex-col gap-2.5 absolute top-5 right-5 z-20 pointer-events-none">
                {[
                  { icon: EyeOff, title: 'Plain Box Delivery', sub: '100% Discreet Brown Carton', bg: 'bg-emerald-50', border: 'border-emerald-100', iconColor: 'text-emerald-700' },
                  { icon: ShieldCheck, title: 'AYUSH Certified', sub: 'Doctor Panel Approved', bg: 'bg-blue-50', border: 'border-blue-100', iconColor: 'text-[#007BA7]' },
                  { icon: Zap, title: 'Zero Numbness', sub: 'Transfer-free Action', bg: 'bg-rose-50', border: 'border-rose-100', iconColor: 'text-[#FF2D95]' },
                ].map(({ icon: Icon, title, sub, bg, border, iconColor }, i) => (
                  <div
                    key={title}
                    className={`reveal reveal-right stagger-${i + 1} bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2.5 shadow-md flex items-center gap-2.5 w-52 trust-card-3d`}
                    style={{ transitionDelay: `${0.3 + i * 0.15}s` }}
                  >
                    <div className={`w-8 h-8 rounded-xl ${bg} ${border} border flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${iconColor}`} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-[#0A0A0A] leading-tight">{title}</h4>
                      <p className="text-[9px] text-slate-500 font-medium">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom-Right Social Proof Pill */}
              <div className="absolute bottom-4 left-4 sm:left-auto sm:right-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl py-2 px-3.5 shadow-lg flex items-center gap-3 animate-badge-pop">
                <div className="flex -space-x-2 overflow-hidden">
                  {[
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
                  ].map((src, i) => (
                    <div key={i} className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-slate-300 overflow-hidden relative">
                      <Image src={src} alt="Customer" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[11px] font-black text-[#0A0A0A] leading-none">10,000+ Couples</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[10px] font-black text-slate-600">4.9</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Feature Strip */}
            <div className="flex lg:hidden flex-wrap items-center justify-center gap-2 mt-4 w-full">
              {[
                { icon: EyeOff, label: 'Plain Box Delivery', color: 'text-emerald-600' },
                { icon: ShieldCheck, label: 'AYUSH Certified', color: 'text-[#007BA7]' },
                { icon: Zap, label: 'Zero Numbness', color: 'text-[#FF2D95]' },
              ].map(({ icon: Icon, label, color }) => (
                <span
                  key={label}
                  className="trust-card-3d inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-700 shadow-2xs"
                >
                  <Icon className={`w-3 h-3 ${color}`} />
                  {label}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
