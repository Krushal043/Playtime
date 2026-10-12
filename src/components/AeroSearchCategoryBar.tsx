'use client';

import React from 'react';
import { Search, Sparkles, Zap, Flame, Droplets, Heart, Stethoscope, SlidersHorizontal } from 'lucide-react';
import { CategoryType } from '@/types';

interface AeroSearchCategoryBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onOpenDoctor: () => void;
}

export default function AeroSearchCategoryBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onOpenDoctor,
}: AeroSearchCategoryBarProps) {
  const categories = [
    { id: 'all' as CategoryType, label: 'All Formulations', icon: Sparkles },
    { id: 'extend' as CategoryType, label: 'Climax & Delay', icon: Zap },
    { id: 'supplements' as CategoryType, label: 'Shilajit & Vitality', icon: Flame },
    { id: 'lubes' as CategoryType, label: 'Lubes & Glides', icon: Droplets },
    { id: 'couples' as CategoryType, label: 'Couples Kits', icon: Heart },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-2 w-full">
      {/* Category Filter Pills (Centered Without Duplicate Search Bar) */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto w-full py-1 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-black whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-xs ${
                isSelected
                  ? 'bg-gradient-to-r from-[#051336] via-[#0b2560] to-[#1d4ed8] text-white shadow-md ring-2 ring-blue-400/30'
                  : 'bg-white/85 hover:bg-white border border-white/90 text-slate-700 hover:text-blue-700'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-200' : 'text-slate-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}

        {/* Doctor Consultation Pill */}
        <button
          type="button"
          onClick={onOpenDoctor}
          className="px-4 py-2.5 rounded-full text-xs font-black whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-800 shadow-xs"
        >
          <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
          <span>Doctor Consult</span>
        </button>
      </div>
    </section>
  );
}
