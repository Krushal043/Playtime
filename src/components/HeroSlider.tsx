'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Tag,
  ArrowUpRight,
  Flame,
  Gift,
  Clock,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { CategoryType } from '@/types';
import { LAUNCH_PRODUCTS, DUO_BUNDLE } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface HeroSliderProps {
  onSelectCategory?: (cat: CategoryType) => void;
}

export default function HeroSlider({ onSelectCategory }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart, setIsCartOpen } = useCart();

  const slides = [
    {
      id: 1,
      badge: 'EXCLUSIVE LAUNCH SPECIAL',
      badgeIcon: Sparkles,
      titlePrefix: 'ELEVATE EVERY MOMENT',
      titleHighlight: 'Synchronized Pleasure & Peak Endurance',
      subtitle: 'Doctor-Formulated Extend Spray (0.08ml Metered Valve) & 10-Frequency Sonic Rose Stimulator.',
      code: 'PLAYTIME20',
      discountBadge: '20% OFF FIRST ORDER',
      ctaText: 'Explore Flagships',
      actionType: 'scroll',
      products: [
        {
          id: 'pt-extend-spray',
          name: 'Extend Delay Spray',
          type: '10-Min Micro-Absorption',
          badge: 'FOR HIM',
          badgeColor: 'bg-blue-900 text-blue-200 border border-blue-700/60',
          image: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=800&auto=format&fit=crop&q=80',
          price: '₹499',
          originalPrice: '₹699'
        },
        {
          id: 'pt-rose-stimulator',
          name: 'Rose Sonic Stimulator',
          type: 'Touchless Sonic Waves',
          badge: 'FOR HER',
          badgeColor: 'bg-rose-900 text-rose-200 border border-rose-700/60',
          image: 'https://images.unsplash.com/photo-1512290900672-1f55b9e07873?w=800&auto=format&fit=crop&q=80',
          price: '₹2,799',
          originalPrice: '₹3,999'
        }
      ]
    },
    {
      id: 2,
      badge: 'COUPLES POWER DUO',
      badgeIcon: Flame,
      titlePrefix: 'SAVE FLAT ₹1,299',
      titleHighlight: 'The Ultimate Double Orgasm Box',
      subtitle: 'Complete Intimacy Kit with 100% Free & Discreet Plain-Box Delivery. Engineered to synchronize your peak climaxes.',
      code: 'DUOPOWER',
      discountBadge: 'FLAT ₹1,299 OFF',
      ctaText: 'Claim Duo Kit',
      actionType: 'cart-duo',
      products: [
        {
          id: 'pt-extend-spray',
          name: 'Extend Delay Spray (50g)',
          type: 'Peak Endurance Formula',
          badge: 'HIS ENDURANCE',
          badgeColor: 'bg-blue-900 text-blue-200 border border-blue-700/60',
          image: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=800&auto=format&fit=crop&q=80',
          price: 'Included',
          originalPrice: '₹699'
        },
        {
          id: 'pt-rose-stimulator',
          name: 'Rose Romance Stimulator',
          type: 'Sonic Pulse Euphoria',
          badge: 'HER PLEASURE',
          badgeColor: 'bg-rose-900 text-rose-200 border border-rose-700/60',
          image: 'https://images.unsplash.com/photo-1512290900672-1f55b9e07873?w=800&auto=format&fit=crop&q=80',
          price: 'Included',
          originalPrice: '₹3,999'
        }
      ]
    },
    {
      id: 3,
      badge: '100% UNMARKED DISCRETION',
      badgeIcon: EyeOff,
      titlePrefix: 'ZERO AWKWARDNESS',
      titleHighlight: 'Blind Doorstep Delivery Guarantee',
      subtitle: 'Plain corrugated cardboard outer carton. Sender appears as "PT Logistics". Delivery agents have zero knowledge of contents.',
      code: 'DISCREET',
      discountBadge: 'FREE EXPRESS SHIPPING',
      ctaText: 'Shop With Discretion',
      actionType: 'scroll',
      products: [
        {
          id: 'pt-power-duo-bundle',
          name: 'Midnight Keepsake Box',
          type: 'Magnetic Luxury Case',
          badge: 'NIGHTSTAND READY',
          badgeColor: 'bg-slate-900 text-slate-200 border border-slate-700',
          image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
          price: 'Included',
          originalPrice: '₹599'
        },
        {
          id: 'pt-extend-spray',
          name: 'Free Velvet Travel Pouch',
          type: 'Blackout Discreet Fabric',
          badge: 'FREE COMPLIMENT',
          badgeColor: 'bg-emerald-900 text-emerald-200 border border-emerald-700',
          image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80',
          price: '₹0 FREE',
          originalPrice: '₹399'
        }
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];
  const BadgeIcon = slide.badgeIcon;

  const handleCtaClick = () => {
    if (slide.actionType === 'cart-duo') {
      const duoProd = {
        id: DUO_BUNDLE.id,
        name: DUO_BUNDLE.name,
        tagline: DUO_BUNDLE.tagline,
        category: 'couples' as const,
        basePrice: DUO_BUNDLE.price,
        rating: 5.0,
        reviewsCount: 1420,
        badge: DUO_BUNDLE.badge,
        badgeType: 'red' as const,
        image: DUO_BUNDLE.image,
        description: DUO_BUNDLE.tagline,
        features: DUO_BUNDLE.includes,
        specs: {},
        packs: [
          {
            packSize: 1,
            label: 'Complete Duo Box Set',
            price: DUO_BUNDLE.price,
            originalPrice: DUO_BUNDLE.originalPrice,
            discount: DUO_BUNDLE.discount
          }
        ],
        inStock: true,
        discreetPackagingGuaranteed: true
      };
      addToCart(duoProd, duoProd.packs[0], 1);
      setIsCartOpen(true);
    } else {
      const el = document.getElementById('flagship-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white border-b border-slate-200/80 pt-2 pb-10">
      
      {/* 1. FULL-WIDTH TRUST TICKER BAR */}
      <div className="w-full border-b border-slate-200/70 bg-white/70 backdrop-blur-md py-2.5 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4 overflow-x-auto text-[11px] sm:text-xs font-bold text-slate-700 whitespace-nowrap scrollbar-none">
          <div className="flex items-center gap-2 shrink-0 text-[#0a193d]">
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            <span>India&apos;s No. 1 Luxury Wellness Boutique</span>
          </div>
          <span className="text-slate-300">&bull;</span>

          <div className="flex items-center gap-2 shrink-0 text-[#0a193d]">
            <span className="text-emerald-700 font-extrabold text-sm leading-none">₹</span>
            <span>COD Available Across India</span>
          </div>
          <span className="text-slate-300">&bull;</span>

          <div className="flex items-center gap-2 shrink-0 text-[#0a193d]">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>Trusted by 25 Lakh+ Happy Indians</span>
          </div>
          <span className="text-slate-300">&bull;</span>

          <div className="flex items-center gap-2 shrink-0 text-[#0a193d]">
            <EyeOff className="w-4 h-4 text-emerald-600" />
            <span>100% Free, Fast &amp; Discreet Plain-Box Delivery</span>
          </div>
        </div>
      </div>

      {/* 2. FULL-WIDTH HERO STAGE WITH AMBIENT LIGHTING */}
      <div className="relative w-full">
        
        {/* Full-Bleed Ambient Radial Lights */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-rose-100/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4 sm:py-8">
            
            {/* Left Column: Bold Hero Text & CTAs */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 text-[#0a193d] text-xs font-black tracking-wider uppercase shadow-2xs">
                <BadgeIcon className="w-3.5 h-3.5 text-rose-600" />
                <span>{slide.badge}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              </div>

              {/* Main Headline */}
              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#0a193d]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-rose-600 block">
                    {slide.titlePrefix}
                  </span>
                  <span className="block text-2xl sm:text-4xl font-extrabold text-slate-800 mt-2">
                    {slide.titleHighlight}
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mt-3 leading-relaxed mx-auto lg:mx-0">
                  {slide.subtitle}
                </p>
              </div>

              {/* Coupon Code Pill & Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 text-white text-xs font-bold shadow-md">
                  <Tag className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-300">Code:</span>
                  <span className="text-amber-300 font-mono font-black text-sm tracking-wider">
                    {slide.code}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="btn-navy-red px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Subtext */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>AYUSH Certified</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Transfer Rate</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Confidential Courier OTP</span>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Product Lineup Cards */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {slide.products.map((prod) => (
                  <Link
                    key={prod.id}
                    href={prod.id === 'pt-power-duo-bundle' ? '/products/pt-power-duo-bundle' : `/products/${prod.id}`}
                    className="group relative rounded-2xl p-3.5 bg-white border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${prod.badgeColor}`}>
                        {prod.badge}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 transition-colors" />
                    </div>

                    {/* High-Resolution Product Image */}
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden my-1 bg-slate-50 border border-slate-100">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                      />
                    </div>

                    <div className="text-center pt-2">
                      <p className="text-xs font-black text-[#0a193d] line-clamp-1 group-hover:text-rose-600 transition-colors">
                        {prod.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium line-clamp-1">
                        {prod.type}
                      </p>
                      <div className="flex items-baseline justify-center gap-1.5 mt-1">
                        <span className="text-xs font-black text-rose-600">
                          {prod.price}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through">
                            {prod.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* 3. SLIDER CONTROLS: PREV / NEXT ARROWS & PROGRESS DOTS */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200/60">
            
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={prevSlide}
              className="p-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0a193d] transition-colors cursor-pointer border border-slate-200 shadow-xs"
              title="Previous Slide"
              aria-label="Previous Slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'w-10 btn-navy-red' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={nextSlide}
              className="p-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0a193d] transition-colors cursor-pointer border border-slate-200 shadow-xs"
              title="Next Slide"
              aria-label="Next Slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}
