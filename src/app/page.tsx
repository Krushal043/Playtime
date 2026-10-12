'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { LAUNCH_PRODUCTS } from '@/data/products';
import { Product, ProductPack, CategoryType } from '@/types';
import { useCart } from '@/context/CartContext';
import AeroNavbar from '@/components/AeroNavbar';
import AeroHeroIsland from '@/components/AeroHeroIsland';
import AeroSearchCategoryBar from '@/components/AeroSearchCategoryBar';
import AeroBestsellersRow from '@/components/AeroBestsellersRow';
import AeroBentoCategories from '@/components/AeroBentoCategories';
import AeroTechnologyGrid from '@/components/AeroTechnologyGrid';
import AeroTrustStrip from '@/components/AeroTrustStrip';
import AeroFooter from '@/components/AeroFooter';
import InfluencerVideoSection from '@/components/home/InfluencerVideoSection';
import DiscreetBillingPreviewModal from '@/components/DiscreetBillingPreviewModal';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import IntimacyQuizModal from '@/components/IntimacyQuizModal';
import DoctorConsultationDrawer from '@/components/DoctorConsultationDrawer';
import ProductQuickView from '@/components/ProductQuickView';

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
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('search');
      const cat = params.get('category');
      if (q) setSearchQuery(q);
      if (cat) setSelectedCategory(cat as CategoryType);
      if (q || cat) {
        setTimeout(() => {
          const el = document.getElementById('flagship-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, []);

  const handleAddToCart = (product: Product, pack: ProductPack, quantity = 1) => {
    addToCart(product, pack, quantity);
  };

  const scrollToBestsellers = () => {
    const el = document.getElementById('flagship-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered products list based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        prod.category === selectedCategory ||
        (selectedCategory === 'bestsellers' && (prod.badge || prod.isFeatured));

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
    <div className="min-h-screen silver-shade-bg flex flex-col selection:bg-blue-600/20 selection:text-blue-950">
      
      {/* 18+ Discretion Gate */}
      <AgeVerificationModal />

      {/* Clean Colorful Header with Integrated Search */}
      <AeroNavbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDoctor={() => setIsDoctorDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* SECTION 1: Grand Hero Island Container */}
      <AeroHeroIsland
        flagship={products[0]}
        onShopClick={scrollToBestsellers}
        onQuizClick={() => setIsQuizOpen(true)}
      />

      {/* SECTION 2: Search Bar & Category Filter Pills */}
      <AeroSearchCategoryBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenDoctor={() => setIsDoctorDrawerOpen(true)}
      />

      {/* SECTION 3: Bestseller Formulations (Hit of Sales Row) */}
      <AeroBestsellersRow
        products={filteredProducts.length > 0 ? filteredProducts : products}
        loading={loadingProducts}
        onAddToCart={(prod, pack) => handleAddToCart(prod, pack, 1)}
        onQuickView={(prod) => setQuickViewProduct(prod)}
      />

      {/* SECTION 4: 2x2 Bento Category Collection Cards */}
      <AeroBentoCategories
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToBestsellers();
        }}
      />

      {/* SECTION 5: Influencer Video Reels & Unboxing UGC */}
      <InfluencerVideoSection
        onAddToCart={(prod, pack) => handleAddToCart(prod, pack, 1)}
      />

      {/* SECTION 6: 6-Column Ayurvedic Science & Clinical Standards Grid */}
      <AeroTechnologyGrid />

      {/* SECTION 7: 4 Horizontal Trust Badges Strip */}
      <AeroTrustStrip />

      {/* Clean Minimalist Footer (From Reference Design) */}
      <AeroFooter
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToBestsellers();
        }}
        onOpenBillingModal={() => setIsBillingModalOpen(true)}
      />

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

      {/* In-House Doctor Consultation Drawer */}
      <DoctorConsultationDrawer
        isOpen={isDoctorDrawerOpen}
        onClose={() => setIsDoctorDrawerOpen(false)}
      />

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
