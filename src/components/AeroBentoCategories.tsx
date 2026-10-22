'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CategoryType } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface AeroBentoCategoriesProps {
  onSelectCategory: (cat: CategoryType) => void;
}

export default function AeroBentoCategories({ onSelectCategory }: AeroBentoCategoriesProps) {
  const sectionRef = useScrollReveal<HTMLElement>();

  const bentoItems = [
    {
      id: 'extend' as CategoryType,
      title: 'CLIMAX & ENDURANCE',
      subtitle: 'Transfer-free Ayurvedic micro-absorption sprays engineered for prolonged duration.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
      actionText: 'Explore Extend',
    },
    {
      id: 'supplements' as CategoryType,
      title: 'HIMALAYAN SHILAJIT & VITALITY',
      subtitle: 'Pure 24K Gold Swarna Bhasma resin harvested at 18,000+ ft for core cellular energy.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
      actionText: 'Explore Shilajit',
    },
    {
      id: 'lubes' as CategoryType,
      title: 'ORGANIC LUBES & GLIDES',
      subtitle: 'Silk-smooth botanical hydration formulated with aloe and seaweed. Zero irritation.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80',
      actionText: 'Explore Glides',
    },
    {
      id: 'couples' as CategoryType,
      title: 'COUPLES & DATE NIGHT KITS',
      subtitle: 'Curated intimate discovery boxes designed for couples to explore deeper together.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
      actionText: 'Explore Date Night',
    },
  ];

  return (
    <section ref={sectionRef} id="bento-categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
      {/* 2x2 Bento Grid with 3D depth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {bentoItems.map((item, idx) => (
          <div
            key={item.title}
            onClick={() => onSelectCategory(item.id)}
            className={`reveal stagger-${idx + 1} bento-3d-card group relative rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 overflow-hidden p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer shadow-[0_10px_30px_-5px_rgba(10,10,10,0.06)]`}
          >
            {/* Left Content */}
            <div className="flex-1 space-y-3 z-10 relative">
              <h3 className="text-lg sm:text-xl font-black text-[#0A0A0A] uppercase tracking-tight leading-snug group-hover:text-shimmer-animated transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-xs">
                {item.subtitle}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#0A0A0A] group-hover:text-[#FF2D95] transition-colors">
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </div>
            </div>

            {/* Right Visual Stage — zooms on hover */}
            <div className="relative w-full sm:w-48 md:w-56 h-40 sm:h-44 rounded-2xl overflow-hidden shrink-0 shadow-md img-zoom-container">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
              {/* Cerulean glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-[#007BA7]/20 via-transparent to-[#FF2D95]/15 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
