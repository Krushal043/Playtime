'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ShoppingBag, User as UserIcon, X, ChevronDown, ShieldCheck, EyeOff, Zap, Sparkles, LogOut, Package, MapPin, Stethoscope } from 'lucide-react';
import { CategoryType } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
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

export default function Navbar({
  cartCount: propCartCount,
  onOpenCart: propOnOpenCart,
  onOpenBillingModal,
  onOpenQuiz,
  onOpenDoctor,
  selectedCategory = 'all',
  onSelectCategory,
  searchQuery = '',
  onSearchChange
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsAuthModalOpen, logout } = useAuth();
  const { cartCount: contextCartCount, setIsCartOpen } = useCart();

  const cartCount = propCartCount !== undefined ? propCartCount : contextCartCount;
  const onOpenCart = propOnOpenCart || (() => setIsCartOpen(true));

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Close account dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavCategory = (catId: CategoryType) => {
    setIsShopMenuOpen(false);
    setMobileMenuOpen(false);
    if (pathname === '/') {
      if (onSelectCategory) onSelectCategory(catId);
      const el = document.getElementById('catalog-section') || document.getElementById('flagship-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/?category=${catId}`);
    }
  };

  const scrollToDiscreet = () => {
    if (pathname === '/') {
      const el = document.getElementById('discreet-packaging');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#discreet-packaging');
    }
  };

  const scrollToFaq = () => {
    if (pathname === '/') {
      const el = document.getElementById('faq-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#faq-section');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#051336]/95 backdrop-blur-xl border-b border-blue-900/50 shadow-md text-slate-100">
      
      {/* MAIN TOP NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center cursor-pointer group shrink-0"
        >
          <div className="relative h-11 w-36 sm:h-12 sm:w-44 px-2 py-1 rounded-xl transition-all group-hover:scale-105 duration-200">
            <Image
              src="/logo.png"
              alt="Playtime"
              fill
              priority
              className="object-contain p-0.5"
            />
          </div>
        </Link>

        {/* Center: Luxury Navigation Links (Strictly Single Line) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-7 text-xs xl:text-sm font-bold text-slate-200 whitespace-nowrap shrink-0">
          
          <Link
            href="/"
            className={`transition-colors cursor-pointer py-1 relative hover:text-red-400 whitespace-nowrap ${
              pathname === '/' && selectedCategory === 'all' && !searchQuery ? 'text-red-400 font-black' : 'text-slate-200'
            }`}
          >
            Home
            {pathname === '/' && selectedCategory === 'all' && !searchQuery && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-blue-500 via-rose-500 to-red-500 rounded-full" />
            )}
          </Link>

          {/* Shop All with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsShopMenuOpen(true)}
            onMouseLeave={() => setIsShopMenuOpen(false)}
          >
            <button
              onClick={() => handleNavCategory('all')}
              className="flex items-center gap-1 py-1 text-slate-200 hover:text-red-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Shop Solutions</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isShopMenuOpen ? 'rotate-180 text-red-400' : 'text-slate-400'}`} />
            </button>

            {/* Dropdown Menu */}
            {isShopMenuOpen && (
              <div className="absolute top-full left-0 w-80 rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-[#090d16]">
                <div className="space-y-1">
                  <Link
                    href="/products/pt-extend-spray"
                    onClick={() => setIsShopMenuOpen(false)}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <p className="text-xs font-black text-[#090d16] group-hover:text-emerald-700 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500" /> Extend Long Last Spray
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">Flagship transfer-free endurance formula</p>
                    </div>
                  </Link>

                  <Link
                    href="/products/pt-shilajit-gold"
                    onClick={() => setIsShopMenuOpen(false)}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <p className="text-xs font-black text-[#090d16] group-hover:text-emerald-700 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Pure Himalayan Shilajit Gold
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">18,000+ ft harvest with 24K Gold &gt;75% Fulvic</p>
                    </div>
                  </Link>

                  <Link
                    href="/products/pt-power-duo-bundle"
                    onClick={() => setIsShopMenuOpen(false)}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <p className="text-xs font-black text-[#090d16] group-hover:text-emerald-700 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500" /> The Ayurvedic Power Duo Kit
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">Herbal endurance spray + Himalayan Shilajit resin</p>
                    </div>
                  </Link>

                  <div className="pt-2 border-t border-slate-100 mt-1">
                    <button
                      onClick={() => handleNavCategory('bestsellers')}
                      className="w-full p-2 text-left text-xs font-bold text-emerald-700 hover:bg-emerald-50 rounded-lg flex items-center justify-between"
                    >
                      <span>View All Solutions &rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/products/pt-extend-spray"
            className="transition-colors cursor-pointer py-1 hover:text-red-400 text-slate-200 whitespace-nowrap"
          >
            Extend Range
          </Link>

          <Link
            href="/products/pt-power-duo-bundle"
            className="transition-colors cursor-pointer py-1 hover:text-red-400 text-slate-200 whitespace-nowrap"
          >
            Couples Kit
          </Link>

          {onOpenQuiz && (
            <button
              onClick={onOpenQuiz}
              className="text-slate-200 hover:text-amber-300 transition-colors cursor-pointer py-1 whitespace-nowrap"
            >
              Intimacy Matcher
            </button>
          )}

          {onOpenDoctor && (
            <button
              onClick={onOpenDoctor}
              className="px-3 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
            >
              <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
              <span>Doctor Consultation</span>
            </button>
          )}

          <button
            onClick={scrollToDiscreet}
            className="text-slate-200 hover:text-emerald-400 transition-colors cursor-pointer py-1 whitespace-nowrap"
          >
            Discreet Guarantee
          </button>

          <button
            onClick={scrollToFaq}
            className="text-slate-200 hover:text-red-400 transition-colors cursor-pointer py-1 whitespace-nowrap"
          >
            FAQ
          </button>
        </nav>

        {/* Right: Search, Account Menu, and Bag Icons (Icons Only) */}
        <div className="flex items-center gap-2 sm:gap-3 text-slate-100">
          
          {/* Search Trigger (Icon Only) */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
            title="Search Products"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* User Account Dropdown / Auth Button (Icon Only) */}
          <div className="relative" ref={accountMenuRef}>
            {user ? (
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="p-1 rounded-full hover:ring-2 hover:ring-rose-500 transition-all cursor-pointer text-slate-200"
                title="Account Menu"
                aria-label="Account Menu"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 via-indigo-600 to-rose-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Sign In / Account"
                aria-label="Account"
              >
                <UserIcon className="w-5 h-5 stroke-[1.8]" />
              </button>
            )}

            {/* Account Popover Menu */}
            {accountMenuOpen && user && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-[#091f52] border border-blue-700/60 shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-100">
                <div className="px-3 py-2 border-b border-blue-800/60 mb-1">
                  <p className="text-xs font-black text-slate-100 leading-tight">{user.name}</p>
                  <p className="text-[11px] text-slate-300 truncate">{user.phone || user.email}</p>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/account"
                    onClick={() => setAccountMenuOpen(false)}
                    className="w-full px-3 py-2 text-xs font-bold text-slate-100 hover:bg-[#0f2d72] hover:text-red-400 rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <Package className="w-4 h-4 text-slate-300" />
                    <span>My Orders &amp; Tracking</span>
                  </Link>

                  <Link
                    href="/account#addresses"
                    onClick={() => setAccountMenuOpen(false)}
                    className="w-full px-3 py-2 text-xs font-bold text-slate-100 hover:bg-[#0f2d72] hover:text-red-400 rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-slate-300" />
                    <span>Saved Addresses</span>
                  </Link>

                  {onOpenBillingModal && (
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        onOpenBillingModal();
                      }}
                      className="w-full px-3 py-2 text-xs font-bold text-slate-100 hover:bg-[#0f2d72] hover:text-red-400 rounded-xl flex items-center gap-2 text-left cursor-pointer transition-colors"
                    >
                      <EyeOff className="w-4 h-4 text-slate-300" />
                      <span>Discreet Billing Preview</span>
                    </button>
                  )}

                  <div className="pt-1 border-t border-blue-800/60">
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        logout();
                      }}
                      className="w-full px-3 py-2 text-xs font-bold text-red-300 hover:bg-red-950/40 rounded-xl flex items-center gap-2 text-left cursor-pointer transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Shopping Cart Button with Red Counter and Silver Ring */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-xl text-slate-200 hover:text-red-400 hover:bg-white/10 transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
            title="View Bag"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8] transition-transform duration-200 group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-linear-to-r from-red-600 to-rose-600 text-white text-[10px] font-black flex items-center justify-center animate-pulse shadow-md ring-2 ring-[#051336]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/10 text-slate-200 hover:bg-white/20 transition-colors cursor-pointer border border-white/20"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Expandable Search Bar on Search Click */}
      {isSearchOpen && (
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 animate-in fade-in slide-from-top-1 duration-200">
          <div className="max-w-2xl mx-auto flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search herbal delay spray, pure Himalayan Shilajit, Ayurvedic vitality..."
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full bg-transparent text-sm text-[#090d16] placeholder-slate-400 focus:outline-none font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange && onSearchChange('')}
                className="text-xs text-slate-500 hover:text-[#051336] font-bold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu - Clean Luxury D2C Style */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-2xl px-4 py-4 space-y-4 animate-in fade-in slide-in-from-top-3 duration-250 text-[#090d16] shadow-xl">
          
          {/* Quick Ayurvedic Solution Cards */}
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-1">
              Ayurvedic Solutions
            </p>

            <Link
              href="/products/pt-power-duo-bundle"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between transition-all active:scale-98 hover:bg-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 overflow-hidden relative shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&auto=format&fit=crop&q=80"
                    alt="Power Duo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-black text-[#090d16]">The Power Duo Kit</h4>
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-black bg-rose-600 text-white">SAVE ₹799</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 font-semibold">Extend Spray + 24K Shilajit Resin</p>
                </div>
              </div>
              <span className="text-xs font-black text-[#090d16]">₹1,399</span>
            </Link>

            <Link
              href="/products/pt-extend-spray"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between transition-all active:scale-98 hover:bg-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 overflow-hidden relative shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=200&auto=format&fit=crop&q=80"
                    alt="Extend Spray"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#090d16]">Extend Long Last Spray</h4>
                  <p className="text-[10px] text-slate-500">0.08mL Metered Valve &bull; Zero Numbness</p>
                </div>
              </div>
              <span className="text-xs font-black text-[#090d16]">₹499</span>
            </Link>

            <Link
              href="/products/pt-shilajit-gold"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between transition-all active:scale-98 hover:bg-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 overflow-hidden relative shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1617897903246-719242758050?w=200&auto=format&fit=crop&q=80"
                    alt="Shilajit Gold"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#090d16]">24K Shilajit Gold Resin</h4>
                  <p className="text-[10px] text-slate-500">18,000+ ft Harvest &bull; 24K Swarna Bhasma</p>
                </div>
              </div>
              <span className="text-xs font-black text-[#090d16]">₹999</span>
            </Link>
          </div>

          {/* Interactive Tools */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {onOpenQuiz && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2 active:scale-95 transition-all text-left"
              >
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-[11px] font-black leading-tight">30-Sec Matcher</span>
              </button>
            )}

            {onOpenDoctor && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDoctor();
                }}
                className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 active:scale-95 transition-all text-left"
              >
                <Stethoscope className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-black leading-tight">Doctor Panel</span>
              </button>
            )}
          </div>

          {/* Account Quick Link & Mobile Login Button */}
          {!user && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#051336] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-[#091f52] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Sign In &amp; Unlock 10% Off &bull; QUICKPASS</span>
            </button>
          )}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 font-bold hover:text-[#090d16] flex items-center gap-1.5"
            >
              <Package className="w-3.5 h-3.5 text-slate-500" />
              <span>Track Orders &amp; Account</span>
            </Link>

            <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
              <EyeOff className="w-3 h-3" /> Blind Box Shipping
            </span>
          </div>
        </div>
      )}

    </header>
  );
}
