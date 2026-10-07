'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { LAUNCH_PRODUCTS } from '@/data/products';
import { Product, ProductPack, CategoryType } from '@/types';
import { useCart } from '@/context/CartContext';
import PromoBanner from '@/components/PromoBanner';
import Navbar from '@/components/Navbar';
import DualProductShowcase from '@/components/DualProductShowcase';
import ProductCard from '@/components/ProductCard';
import ProductQuickView from '@/components/ProductQuickView';
import InfluencerVideoSection from '@/components/InfluencerVideoSection';
import DuoBundleBanner from '@/components/DuoBundleBanner';
import ClinicalStandardsBanner from '@/components/ClinicalStandardsBanner';
import UnboxingExperienceSection from '@/components/UnboxingExperienceSection';
import CustomerReviews from '@/components/CustomerReviews';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import DiscreetBillingPreviewModal from '@/components/DiscreetBillingPreviewModal';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import WhatsAppChatButton from '@/components/WhatsAppChatButton';
import IntimacyQuizModal from '@/components/IntimacyQuizModal';
import DoctorConsultationDrawer from '@/components/DoctorConsultationDrawer';
import SpinAndWinModal from '@/components/SpinAndWinModal';
import SpinTeaserBanner from '@/components/SpinTeaserBanner';
import ModernLuxuryHero from '@/components/ModernLuxuryHero';
import { Sparkles, Search, SlidersHorizontal, Package, Tag } from 'lucide-react';

export default function Home() {
  const { addToCart, setIsCartOpen } = useCart();
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isDoctorDrawerOpen, setIsDoctorDrawerOpen] = useState(false);
  
  // Live products from MongoDB
  const [products, setProducts] = useState<Product[]>(LAUNCH_PRODUCTS);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Filters & Quick View
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Fetch live products from MongoDB on load
  const fetchLiveProducts = () => {
    setLoadingProducts(true);
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error('Failed to fetch live products:', err))
      .finally(() => setLoadingProducts(false));
  };

  useEffect(() => {
    fetchLiveProducts();
  }, []);

  const handleAddToCart = (product: Product, pack: ProductPack, quantity = 1) => {
    addToCart(product, pack, quantity);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFlagships = () => {
    const el = document.getElementById('flagship-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' ||
        prod.category === selectedCategory ||
        (selectedCategory === 'bestsellers' && (prod.badge || prod.isFeatured));

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        prod.name.toLowerCase().includes(q) ||
        prod.tagline.toLowerCase().includes(q) ||
        prod.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen silver-lighting-bg flex flex-col selection:bg-emerald-600/20 selection:text-emerald-950">
      
      {/* 18+ Discretion Gate */}
      <AgeVerificationModal />

      {/* Top Promotional Announcement Bar */}
      <PromoBanner />

      {/* Main Brand Navbar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBillingModal={() => setIsBillingModalOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenDoctor={() => setIsDoctorDrawerOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          scrollToCatalog();
        }}
      />

      {/* Editorial Clean Luxury Hero Section */}
      <ModernLuxuryHero
        flagship={products[0]}
        onShopClick={scrollToCatalog}
        onQuizClick={() => setIsQuizOpen(true)}
      />

      {/* Sleek Clinical Credibility Strip */}
      <ClinicalStandardsBanner onExploreClick={scrollToCatalog} />

      {/* 2 Flagship Products Showcase */}
      <DualProductShowcase
        products={products}
        onAddToCart={(prod, pack) => handleAddToCart(prod, pack, 1)}
        onQuickView={(prod) => setQuickViewProduct(prod)}
      />

      {/* COMPLETE CATALOG SECTION (Dynamic MongoDB Products) */}
      <section id="catalog-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-[#0a193d] text-[11px] font-black uppercase tracking-wider mb-2.5 shadow-2xs">
            <Package className="w-3.5 h-3.5 text-blue-900" />
            <span>FULL BOTANICAL COLLECTION ({products.length} FORMULATIONS)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0a193d] tracking-tight">
            Explore All Playtime Formulations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">
            Discover our complete lineup of certified Ayurvedic wellness solutions. 100% plain box delivery guaranteed.
          </p>
        </div>

        {/* Category Pills & Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
            {[
              { id: 'all', label: `All Products (${products.length})` },
              { id: 'extend', label: 'Extend Range' },
              { id: 'supplements', label: 'Supplements & Shilajit' },
              { id: 'lubes', label: 'Lubricants & Glides' },
              { id: 'couples', label: 'Couples' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryType)}
                className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#051336] text-white shadow-md shadow-blue-900/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Filter Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search formulations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-[#051336]/20 font-medium"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-white/50">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-700">No formulations found</h3>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search query or selecting another category.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#051336] text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={(p, pack) => handleAddToCart(p, pack, 1)}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Influencer Video Reels Section */}
      <InfluencerVideoSection
        onAddToCart={(prod, pack) => handleAddToCart(prod, pack, 1)}
      />

      {/* The Power Duo Kit Banner */}
      <DuoBundleBanner
        onAddToCart={(prod, pack) => handleAddToCart(prod, pack, 1)}
      />

      {/* Gamified Lucky Spin Teaser Banner */}
      <SpinTeaserBanner />

      {/* Step-by-Step Visual Blind Unboxing Experience */}
      <UnboxingExperienceSection />

      {/* Verified Customer Reviews & Testimonials */}
      <CustomerReviews />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Brand Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        onOpenBillingModal={() => setIsBillingModalOpen(true)}
      />

      {/* Floating Discreet WhatsApp Concierge */}
      <WhatsAppChatButton />

      {/* Discreet Billing Preview Modal */}
      <DiscreetBillingPreviewModal
        isOpen={isBillingModalOpen}
        onClose={() => setIsBillingModalOpen(false)}
      />

      {/* 30-Second Intimacy Matcher Quiz Modal */}
      <IntimacyQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={(prod, pack) => handleAddToCart(prod, pack, 1)}
      />

      {/* In-House Doctor & Medical Panel Consultation Drawer */}
      <DoctorConsultationDrawer
        isOpen={isDoctorDrawerOpen}
        onClose={() => setIsDoctorDrawerOpen(false)}
      />

      {/* Gamified Interactive Spin The Wheel & Scratch Card */}
      <SpinAndWinModal />

      {/* Product Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(p, pack, qty) => handleAddToCart(p, pack, qty)}
        />
      )}

    </div>
  );
}
