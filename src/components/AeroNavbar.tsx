'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingBag, User as UserIcon, Menu, X, Search, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import TopMarqueeBar from '@/components/TopMarqueeBar';
import { CategoryType } from '@/types';

export interface AeroNavbarProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenBillingModal?: () => void;
  onOpenQuiz?: () => void;
  onOpenDoctor?: () => void;
  selectedCategory?: CategoryType;
  onSelectCategory?: (cat: CategoryType) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export default function AeroNavbar({
  cartCount: propCartCount,
  onOpenCart: propOnOpenCart,
  onOpenBillingModal,
  onOpenQuiz,
  onOpenDoctor,
  selectedCategory = 'all',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
}: AeroNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsAuthModalOpen } = useAuth();
  const { cartCount: contextCartCount, setIsCartOpen } = useCart();
  
  const cartCount = propCartCount !== undefined ? propCartCount : contextCartCount;
  const onOpenCart = propOnOpenCart || (() => setIsCartOpen(true));
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${id}`);
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = localSearch.trim();
    if (!query) return;

    if (pathname === '/') {
      if (onSearchChange) onSearchChange(query);
      const el = document.getElementById('flagship-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/?search=${encodeURIComponent(query)}#flagship-section`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all shadow-[0_10px_35px_-5px_rgba(5,19,54,0.35)]">
      {/* 1. MARQUEE LINE ON TOP BEFORE HEADER */}
      <TopMarqueeBar />

      {/* 2. TOP MICRO-ACCENT COLOR STRIP (Playtime Green, Blue & Red) */}
      <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-rose-500" />

      {/* 3. MAIN LUXURY NAVBAR */}
      <div className="w-full bg-gradient-to-r from-[#040d24]/95 via-[#071844]/95 to-[#0d1430]/95 backdrop-blur-2xl border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center cursor-pointer group shrink-0">
            <div className="relative h-10 w-36 sm:h-11 sm:w-44 transition-all duration-200 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(59,130,246,0.35)]">
              <Image
                src="/logo.png"
                alt="Playtime"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Center: Search Bar + Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Search Input Form */}
            <form onSubmit={handleSearchSubmit} className="relative w-72 xl:w-80">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  if (pathname === '/' && onSearchChange) {
                    onSearchChange(e.target.value);
                  }
                }}
                placeholder="Search formulations, ingredients, concerns..."
                className="w-full bg-white text-slate-800 placeholder:text-slate-400 text-xs font-medium pl-4 pr-10 py-2.5 rounded-full border border-slate-200/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#051336] text-white flex items-center justify-center cursor-pointer hover:bg-blue-900 transition-colors shadow-xs"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Navigation Links */}
            <nav className="flex items-center gap-5 xl:gap-6 text-xs font-bold text-slate-200">
              <button
                type="button"
                onClick={() => scrollTo('flagship-section')}
                className="hover:text-blue-400 hover:scale-105 transition-all cursor-pointer relative py-1 group"
              >
                <span>Catalog</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full rounded-full" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo('bento-categories')}
                className="hover:text-rose-400 hover:scale-105 transition-all cursor-pointer relative py-1 group"
              >
                <span>Formulations</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-400 transition-all duration-200 group-hover:w-full rounded-full" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo('tech-grid')}
                className="hover:text-emerald-400 hover:scale-105 transition-all cursor-pointer relative py-1 group"
              >
                <span>Ayurvedic Science</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-200 group-hover:w-full rounded-full" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo('trust-strip')}
                className="hover:text-amber-400 hover:scale-105 transition-all cursor-pointer relative py-1 group"
              >
                <span>Discreet Delivery</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-200 group-hover:w-full rounded-full" />
              </button>
            </nav>
          </div>

          {/* Right: Account & Cart Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Account Button */}
            <button
              type="button"
              onClick={() => {
                if (user) {
                  router.push('/account');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:text-blue-300 text-xs font-bold cursor-pointer transition-all shadow-xs"
            >
              <UserIcon className="w-3.5 h-3.5 text-blue-300" />
              <span>{user ? user.name.split(' ')[0] : 'Sign In'}</span>
            </button>

            {/* Cart Pill Button (Vibrant Ruby & Rose Gradient with Glow) */}
            <button
              type="button"
              onClick={onOpenCart}
              className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all duration-300 shadow-[0_4px_16px_rgba(225,29,72,0.45)] hover:shadow-[0_6px_22px_rgba(225,29,72,0.6)] active:scale-95 group"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-4 h-4 rounded-full bg-white text-rose-700 text-[10px] font-black flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-blue-900/40 bg-[#06122e]/98 backdrop-blur-2xl px-5 py-5 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                if (pathname === '/' && onSearchChange) {
                  onSearchChange(e.target.value);
                }
              }}
              placeholder="Search formulations..."
              className="w-full bg-white text-slate-800 placeholder:text-slate-400 text-xs font-medium pl-4 pr-10 py-2.5 rounded-full border border-slate-200/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#051336] text-white flex items-center justify-center cursor-pointer hover:bg-blue-900 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          <button
            type="button"
            onClick={() => scrollTo('flagship-section')}
            className="block w-full text-left py-2 text-sm font-bold text-blue-300 hover:text-white transition-colors"
          >
            Catalog
          </button>
          <button
            type="button"
            onClick={() => scrollTo('bento-categories')}
            className="block w-full text-left py-2 text-sm font-bold text-rose-300 hover:text-white transition-colors"
          >
            Formulations
          </button>
          <button
            type="button"
            onClick={() => scrollTo('tech-grid')}
            className="block w-full text-left py-2 text-sm font-bold text-emerald-300 hover:text-white transition-colors"
          >
            Ayurvedic Science
          </button>
          <button
            type="button"
            onClick={() => scrollTo('trust-strip')}
            className="block w-full text-left py-2 text-sm font-bold text-amber-300 hover:text-white transition-colors"
          >
            Discreet Delivery
          </button>

          <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (user) {
                  router.push('/account');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="text-xs font-black text-white flex items-center gap-1.5"
            >
              <UserIcon className="w-4 h-4 text-blue-300" />
              <span>{user ? user.name : 'Sign In to Account'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
