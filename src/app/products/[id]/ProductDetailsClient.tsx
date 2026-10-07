'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, ALL_PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PromoBanner from '@/components/PromoBanner';
import WhatsAppChatButton from '@/components/WhatsAppChatButton';
import UnboxingExperienceSection from '@/components/UnboxingExperienceSection';
import FloatingStickyBuyBar from '@/components/FloatingStickyBuyBar';
import DiscreetBillingPreviewModal from '@/components/DiscreetBillingPreviewModal';
import {
  Star,
  ShieldCheck,
  EyeOff,
  Lock,
  CheckCircle2,
  ChevronRight,
  Zap,
  ShoppingBag,
  Clock,
  Sparkles,
  Award,
  Truck,
  ThumbsUp,
  RefreshCw,
  HelpCircle,
  Heart,
  ArrowRight,
  Eye,
  ShieldAlert,
  BadgeCheck,
  Package,
  Layers,
  FileCheck,
  Check,
  ExternalLink,
  Flame,
  Minus,
  Plus,
  Play,
  Video
} from 'lucide-react';

// Product Gallery Visual Assets
const PRODUCT_GALLERY: Record<string, { url: string; label: string; caption: string }[]> = {
  'pt-extend-spray': [
    {
      url: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=1200&auto=format&fit=crop&q=80',
      label: 'Main Canister',
      caption: 'Aluminium 50g Pocket Canister • ~120 Metered Micro-Dose Sprays'
    },
    {
      url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=80',
      label: 'Pocket Scale',
      caption: 'Pocket-Sized & Discreet Design • Fits Neatly in Any Pocket or Nightstand'
    },
    {
      url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&auto=format&fit=crop&q=80',
      label: 'Herbal Formula',
      caption: 'Ayurvedic Botanical Micro-Absorption Droplet • Non-Greasy & Quick Absorbing'
    },
    {
      url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=80',
      label: 'Plain Box Shipping',
      caption: 'What The Delivery Courier Hands You • 100% Unmarked Ordinary Carton'
    },
    {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
      label: 'AYUSH Certified',
      caption: 'NABL 3rd-Party Lab Verified • Zero Chemical Numbness Guarantee'
    }
  ],
  'pt-shilajit-gold': [
    {
      url: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=1200&auto=format&fit=crop&q=80',
      label: 'Amber Gold Jar',
      caption: 'Pure Himalayan Shilajit Resin (20g) Infused with 24K Swarna Bhasma'
    },
    {
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80',
      label: 'Brass Spoon Dosing',
      caption: 'Complimentary Handcrafted Ayurvedic Brass Measuring Spoon Included'
    },
    {
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80',
      label: 'Viscous Resin',
      caption: '>75% Active Fulvic Acid • Pure Resin Dissolves Smoothly in Lukewarm Milk'
    },
    {
      url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=80',
      label: 'Plain Box Shipping',
      caption: '100% Blind Box Guarantee • Neutral Label: "PT Logistics"'
    },
    {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
      label: 'NABL Certified',
      caption: '0% Heavy Metals • Tested for Zero Lead, Mercury or Synthetic Steroids'
    }
  ],
  'pt-power-duo-bundle': [
    {
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80',
      label: 'Power Duo Kit',
      caption: 'Extend Delay Spray + Himalayan Shilajit Gold Resin in Luxury Keepsake Box'
    },
    {
      url: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=1200&auto=format&fit=crop&q=80',
      label: 'Extend Delay Spray',
      caption: 'External Climax Control • 10-Minute Micro-Absorption Formula'
    },
    {
      url: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=1200&auto=format&fit=crop&q=80',
      label: 'Shilajit Gold Resin',
      caption: 'Internal Core Stamina & Cellular Vitality with 24K Gold Bhasma'
    },
    {
      url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=80',
      label: 'Plain Box Shipping',
      caption: 'Zero Adult Product Classification • Unmarked Outer Corrugated Box'
    },
    {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
      label: 'Lab Certified',
      caption: 'AYUSH Approved • GMP Facility Manufactured Standards'
    }
  ]
};

// Botanical Ingredients Showcase Data
const BOTANICAL_INGREDIENTS: Record<string, { name: string; botanical: string; role: string; purity: string; icon: string }[]> = {
  'pt-extend-spray': [
    {
      name: 'Lavang (Clove) Extract',
      botanical: 'Syzygium aromaticum',
      role: 'Naturally desensitizes hyper-reactive surface nerve receptors without inducing total numbness.',
      purity: '98% Bioactive Eugenol',
      icon: '🌿'
    },
    {
      name: 'Pudina Satva (Mint Extract)',
      botanical: 'Mentha arvensis',
      role: 'Delivers a soothing, cooling sensation to balance thermal friction and prevent tingling.',
      purity: '100% Pure Crystal Distillate',
      icon: '❄️'
    },
    {
      name: 'Jaiphal (Nutmeg)',
      botanical: 'Myristica fragrans',
      role: 'Ancient Ayurvedic Rasayana traditionally used to soothe involuntary neuromuscular reflexes.',
      purity: 'Standardized Botanical Oleoresin',
      icon: '🌰'
    },
    {
      name: 'Natural Tocopherol',
      botanical: 'Vitamin E Organic',
      role: 'Nourishes sensitive dermal tissue and ensures smooth micro-encapsulation absorption.',
      purity: 'Non-GMO Dermal Grade',
      icon: '✨'
    }
  ],
  'pt-shilajit-gold': [
    {
      name: 'Shuddh Himalayan Shilajit',
      botanical: 'Asphaltum punjabianum',
      role: 'Harvested above 18,000 ft in the Himalayas. Fuels cellular ATP mitochondria and physical endurance.',
      purity: '>75% Bioactive Fulvic Acid',
      icon: '⛰️'
    },
    {
      name: '24K Swarna Bhasma',
      botanical: 'Aurum Vegetabilis (Gold Dust)',
      role: 'Ancient Ayurvedic nano-gold particles that enhance micro-circulation, libido, and sustained vigor.',
      purity: '100% Ayurvedic Agnitapi Shodhana',
      icon: '🪙'
    },
    {
      name: 'Nagori Ashwagandha',
      botanical: 'Withania somnifera',
      role: 'Potent adaptogen that reduces performance anxiety, optimizes stamina, and lowers stress hormones.',
      purity: '5% Withanolides Standardized',
      icon: '🌱'
    },
    {
      name: 'Gokshura & Safed Musli',
      botanical: 'Tribulus terrestris & Chlorophytum',
      role: 'Boosts free testosterone synthesis, physical power, and natural nocturnal recovery.',
      purity: 'Full-Spectrum Ayurvedic Extract',
      icon: '⚡'
    }
  ],
  'pt-power-duo-bundle': [
    {
      name: 'External Climax Shield',
      botanical: 'Syzygium aromaticum + Mentha',
      role: 'Controls local sensation on contact with 10-minute micro-absorption and zero partner transfer.',
      purity: '120+ Metered Sprays (50g)',
      icon: '🛡️'
    },
    {
      name: 'Internal Core Vitality',
      botanical: 'Himalayan Shilajit + 24K Gold',
      role: 'Restores baseline cellular stamina, mitochondrial endurance, and overall physical energy.',
      purity: '>75% Fulvic Acid + Swarna Bhasma',
      icon: '⛰️'
    },
    {
      name: 'Ayurvedic Synergistic Ratio',
      botanical: 'Dual Action Protocol',
      role: 'Simultaneously tackles performance stamina from the inside while regulating timing on the outside.',
      purity: 'AYUSH Approved Master Formulation',
      icon: '⚖️'
    },
    {
      name: 'Handcrafted Brass Spoon',
      botanical: 'Pure Ayurvedic Kansa Brass',
      role: 'Ensures precision 300mg-500mg daily pea-sized dosage without resin oxidation.',
      purity: '100% Food-Grade Brass',
      icon: '🥄'
    }
  ]
};

// Verified Reviews Data for Product
const VERIFIED_REVIEWS = [
  {
    author: 'Vikram R.',
    location: 'Bandra West, Mumbai',
    verified: true,
    rating: 5,
    title: 'Genuinely works with zero numbness!',
    date: 'Verified Buyer • 3 days ago',
    comment:
      'I was very skeptical because other delay sprays make you feel completely frozen and ruin intimacy. Playtime Extend absorbed completely in 12 minutes, my wife felt absolutely nothing transferred to her, and our session lasted over 35 minutes! Delivery arrived in an unprinted plain brown box. Sender was PT Logistics.',
    badge: 'Verified 45-Min Session'
  },
  {
    author: 'Karan & Ananya S.',
    location: 'Indiranagar, Bangalore',
    verified: true,
    rating: 5,
    title: 'The Duo Kit is life changing',
    date: 'Verified Buyer • 1 week ago',
    comment:
      'Taking the Shilajit resin in warm milk every morning has boosted my stamina noticeably, and the spray handles the anxiety of climax control effortlessly. The fact that the box has zero adult branding meant I could comfortably receive it at my office reception.',
    badge: 'Discreet Office Delivery'
  },
  {
    author: 'Devendra P.',
    location: 'Ahmedabad, Gujarat',
    verified: true,
    rating: 5,
    title: 'Pure Ayurvedic quality with lab verification',
    date: 'Verified Buyer • 2 weeks ago',
    comment:
      'The Shilajit resin melts completely in warm water without leaving any gritty residue, exactly how genuine Shilajit should. The brass spoon is a classy touch. Very impressed with the transparent NABL lab certification.',
    badge: 'Pure Himalayan Resin'
  }
];

interface ProductDetailsClientProps {
  initialData?: Product;
}

export default function ProductDetailsClient({ initialData }: ProductDetailsClientProps = {}) {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const productId = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';
  const initialProduct = initialData || getProductById(productId) || ALL_PRODUCTS[0];
  const [product, setProduct] = useState<Product>(initialProduct);

  // Fetch live product from MongoDB
  useEffect(() => {
    if (!productId) return;
    fetch(`/api/products?id=${encodeURIComponent(productId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.product) {
          setProduct(data.product);
        }
      })
      .catch((err) => console.error('Product fetch error:', err));
  }, [productId]);

  // Gallery state - combines MongoDB dynamic images or fallback gallery
  const galleryItems =
    product.images && product.images.length > 0
      ? product.images.map((img, i) => ({
          url: img.url,
          label: img.label || `Photo ${i + 1}`,
          caption: img.caption || product.name
        }))
      : PRODUCT_GALLERY[product.id] || [
          { url: product.image, label: 'Main View', caption: product.name }
        ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'product' | 'box' | 'certificate' | 'video'>('product');

  // Pack & Quantity state
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  // Tab & Modal state
  const [activeTab, setActiveTab] = useState<'science' | 'howToUse' | 'ingredients' | 'specs' | 'faq'>('science');
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);

  // Pincode interactive checker state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  const selectedPack = product.packs[selectedPackIndex] || product.packs[0];
  const unitPrice = Math.round(selectedPack.price / selectedPack.packSize);
  const totalSavings = (selectedPack.originalPrice - selectedPack.price) * quantity;

  // Handlers
  const handleAddToCart = () => {
    addToCart(product, selectedPack, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2600);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedPack, quantity);
    router.push('/checkout');
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      setPincodeStatus('valid');
    } else {
      setPincodeStatus('invalid');
    }
  };

  // Complementary Product
  const relatedProduct = ALL_PRODUCTS.find((p) => p.id !== product.id) || ALL_PRODUCTS[0];

  // Ingredients for active product
  const ingredientsList = BOTANICAL_INGREDIENTS[product.id] || BOTANICAL_INGREDIENTS['pt-extend-spray'];

  return (
    <div className="w-full min-h-screen silver-lighting-bg text-slate-900 flex flex-col selection:bg-red-600/30 selection:text-white">
      <PromoBanner />
      <Navbar />

      {/* Full-Width Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="w-full bg-white/70 backdrop-blur-md border-b border-slate-300/80 sticky top-16 z-30 shadow-2xs">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-3 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2 truncate">
            <Link href="/" className="hover:text-red-600 font-bold transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/products" className="hover:text-red-600 font-bold capitalize transition-colors">
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-extrabold text-[#051336] truncate">
              {product.name}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] font-bold text-slate-600">
            <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Blind Box Guarantee
            </span>
            <span className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/80">
              <Truck className="w-3.5 h-3.5" />
              Express 48h Courier Dispatch
            </span>
          </div>
        </div>
      </nav>

      {/* Main Product Container - Full Width Edge-to-Edge */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6 sm:py-10 space-y-12 sm:space-y-16">
        
        {/* ========================================================
            HERO STAGE: FULL-WIDTH 12-COLUMN EDITORIAL SPLIT
            Left 7 Cols: High-Res Multi-Angle Gallery + Unboxing Preview
            Right 5 Cols: Luxury Purchase Cockpit & Real-Time Math
           ======================================================== */}
        <section className="w-full glass-card-elevated rounded-3xl p-4 sm:p-8 lg:p-10 border border-white/95 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ---------------- LEFT: INTERACTIVE MEDIA GALLERY ---------------- */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Top View Mode Switcher Pill Bar */}
              <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-white/80 border border-slate-200/90 shadow-2xs backdrop-blur-md">
                <div className="flex items-center gap-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('product');
                      setActiveImageIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      viewMode === 'product'
                        ? 'bg-[#051336] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#051336]'
                    }`}
                  >
                    ✨ Product Detail
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('box');
                      setActiveImageIndex(3);
                    }}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      viewMode === 'box'
                        ? 'bg-[#051336] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#051336]'
                    }`}
                  >
                    <Package className="w-3.5 h-3.5 text-amber-400" />
                    <span>Plain Box View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('certificate');
                      setActiveImageIndex(4);
                    }}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      viewMode === 'certificate'
                        ? 'bg-[#051336] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#051336]'
                    }`}
                  >
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>AYUSH Lab Seal</span>
                  </button>

                  {product.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setViewMode('video')}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-bold ${
                        viewMode === 'video'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'text-rose-600 hover:bg-rose-50'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Product Video</span>
                    </button>
                  )}
                </div>

                <span className="hidden sm:inline-block text-[11px] font-bold text-slate-500 pr-2">
                  {viewMode === 'video'
                    ? 'Video Mode'
                    : `Photo ${activeImageIndex + 1} of ${galleryItems.length}`}
                </span>
              </div>

              {/* Main Stage with Floating Badges / Video Player */}
              {viewMode === 'video' && product.videoUrl ? (
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-3xl bg-slate-950 overflow-hidden border border-slate-900 shadow-2xl flex items-center justify-center group">
                  <video
                    src={product.videoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-rose-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      Product Reel &amp; Demo
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setViewMode('product')}
                    className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer shadow-md"
                  >
                    ✕ Back to Photos
                  </button>
                </div>
              ) : (
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-3xl bg-gradient-to-b from-white via-slate-50 to-slate-100 overflow-hidden border border-slate-200/90 shadow-lg group">
                  <Image
                    src={galleryItems[activeImageIndex]?.url || product.image}
                    alt={galleryItems[activeImageIndex]?.caption || product.name}
                    fill
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Ambient Soft Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top-Left: Category / Flagship Badge */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                    <span className="px-3.5 py-1.5 rounded-full btn-navy-red text-white text-[11px] font-black tracking-wide shadow-md uppercase">
                      {product.badge || 'Ayurvedic Flagship'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-900/85 backdrop-blur-md text-emerald-200 border border-emerald-400/30 text-[10px] font-black uppercase tracking-wider shadow-xs">
                      ● 100% Ayurvedic Herbals
                    </span>
                  </div>

                  {/* Top-Right: Batch Scarcity Meter */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-black flex items-center gap-1.5 shadow-md">
                      <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                      <span>Only 14 left from today&apos;s batch</span>
                    </div>
                  </div>

                  {/* Bottom-Left & Bottom-Right Captions */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-4 text-white">
                    <div className="max-w-md">
                      <p className="text-[11px] font-mono text-slate-300 uppercase tracking-wider">
                        Verified Clinical Specification
                      </p>
                      <p className="text-xs sm:text-sm font-black text-white drop-shadow-md">
                        {galleryItems[activeImageIndex]?.caption}
                      </p>
                    </div>

                    <div className="shrink-0 px-3 py-1.5 rounded-full bg-white/90 text-slate-900 text-[11px] font-black flex items-center gap-1.5 shadow-md">
                      <EyeOff className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Plain Box Outer</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Thumbnails Strip */}
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5 sm:gap-3">
                {galleryItems.map((item, idx) => {
                  const isActive = viewMode !== 'video' && activeImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setViewMode('product');
                        setActiveImageIndex(idx);
                      }}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-white ${
                        isActive
                          ? 'border-rose-600 ring-2 ring-rose-500/30 scale-102 shadow-md'
                          : 'border-slate-200/90 hover:border-slate-400 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <Image src={item.url} alt={item.label} fill className="object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 py-0.5 text-[9px] font-black text-white text-center truncate px-1">
                        {item.label}
                      </div>
                    </button>
                  );
                })}

                {product.videoUrl && (
                  <button
                    type="button"
                    onClick={() => setViewMode('video')}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-900 flex flex-col items-center justify-center group ${
                      viewMode === 'video'
                        ? 'border-rose-600 ring-2 ring-rose-500/30 scale-102 shadow-md'
                        : 'border-slate-700 hover:border-rose-500 opacity-85 hover:opacity-100'
                    }`}
                    title="Watch Product Video"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <span className="text-[9px] font-black text-white mt-1 uppercase tracking-wider">Video</span>
                  </button>
                )}
              </div>

              {/* 4-Pillar Clinical Confidence Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/85 border border-slate-200/90 text-center shadow-2xs">
                  <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
                  <p className="text-xs font-black text-[#051336]">AYUSH Approved</p>
                  <p className="text-[10px] text-slate-500 font-semibold">100% Body Safe</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/85 border border-slate-200/90 text-center shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
                  <p className="text-xs font-black text-[#051336]">Zero Transfer</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Partner feels no numbness</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/85 border border-slate-200/90 text-center shadow-2xs">
                  <EyeOff className="w-5 h-5 text-amber-600 mx-auto mb-1.5" />
                  <p className="text-xs font-black text-[#051336]">Plain Outer Box</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Zero brand marks</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/85 border border-slate-200/90 text-center shadow-2xs">
                  <Lock className="w-5 h-5 text-rose-600 mx-auto mb-1.5" />
                  <p className="text-xs font-black text-[#051336]">PT Logistics</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Neutral bank statement</p>
                </div>
              </div>

            </div>

            {/* ---------------- RIGHT: LUXURY PURCHASE COCKPIT ---------------- */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              <div>
                {/* Category, Rating & Verified Badges */}
                <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-slate-200/70">
                  <span className="text-xs uppercase tracking-widest font-black text-rose-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                    {product.category} Formulation
                  </span>

                  <a
                    href="#reviews-section"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-amber-500 text-xs font-black shadow-2xs hover:border-amber-400 transition-colors"
                  >
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[#051336] font-black">{product.rating}</span>
                    <span className="text-slate-500 font-semibold">({product.reviewsCount.toLocaleString()})</span>
                  </a>
                </div>

                {/* Main Product Title & Scientific Tagline */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#051336] tracking-tight mt-3">
                  {product.name}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 font-medium mt-2 leading-relaxed">
                  {product.tagline}
                </p>

                {/* Urgency Trigger Bar */}
                <div className="mt-4 p-3 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-900 text-xs font-bold flex items-center gap-2.5 shadow-2xs">
                  <Zap className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
                  <span>
                    <strong>High Demand:</strong> 48 orders packed in the last 2 hours. Ships within 24 hours in a plain unmarked box.
                  </span>
                </div>

                {/* Dynamic Price Box with Unit Economics */}
                <div className="mt-5 p-5 rounded-3xl bg-white/95 border border-slate-200/90 shadow-md flex items-baseline justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-black text-[#051336]">
                        ₹{selectedPack.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-lg text-slate-400 line-through font-semibold">
                        ₹{selectedPack.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {selectedPack.discount}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-bold mt-1.5 flex items-center gap-1.5">
                      <span className="text-emerald-700 font-black">₹{unitPrice} / unit</span>
                      <span>&bull;</span>
                      <span>Inclusive of all taxes &bull; Free express delivery</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black border border-emerald-200">
                      ● In Stock (Batch #PT-2026)
                    </span>
                    {totalSavings > 0 && (
                      <p className="text-[11px] font-black text-rose-600 mt-1">
                        Total savings: ₹{totalSavings.toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Interactive Pack Size Selector (Cards with live savings) */}
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-slate-700 uppercase tracking-wide">1. Select Your Dosage Pack:</span>
                    <span className="text-rose-600">Multi-packs save up to 40%</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {product.packs.map((pack, index) => {
                      const isSelected = selectedPackIndex === index;
                      const packUnitPrice = Math.round(pack.price / pack.packSize);
                      return (
                        <button
                          key={pack.packSize}
                          type="button"
                          onClick={() => setSelectedPackIndex(index)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                            isSelected
                              ? 'bg-blue-50/80 border-[#051336] shadow-md ring-2 ring-[#051336]/15 scale-[1.02]'
                              : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-700 shadow-2xs hover:border-slate-300'
                          }`}
                        >
                          {index === 1 && (
                            <span className="absolute -top-2.5 right-3 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider shadow-xs">
                              Most Popular
                            </span>
                          )}
                          {index === 2 && (
                            <span className="absolute -top-2.5 right-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-wider shadow-xs">
                              Best Value
                            </span>
                          )}

                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <p className="text-xs font-black text-[#051336] leading-snug">
                              {pack.label}
                            </p>
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                              isSelected ? 'bg-[#051336] text-white' : 'border-2 border-slate-300'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>

                          <div className="mt-1 flex items-baseline gap-1.5">
                            <span className="text-base font-black text-[#051336]">
                              ₹{pack.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[11px] line-through text-slate-400">
                              ₹{pack.originalPrice}
                            </span>
                          </div>

                          <div className="mt-2 flex items-center justify-between text-[10px] font-bold pt-1.5 border-t border-slate-100">
                            <span className="text-emerald-700 font-black">
                              ₹{packUnitPrice}/unit
                            </span>
                            <span className="px-2 py-0.5 rounded-full font-black bg-rose-50 text-rose-700 border border-rose-200">
                              {pack.discount}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Stepper & Live Subtotal */}
                <div className="mt-6 flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-white/80 border border-slate-200/90">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-wide">Quantity:</span>
                    <div className="flex items-center border border-slate-300 rounded-full bg-slate-100 text-sm font-black text-[#051336]">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="p-2 text-slate-600 hover:text-[#051336] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3.5">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="p-2 text-slate-600 hover:text-[#051336] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-bold block">Cart Subtotal:</span>
                    <span className="text-base font-black text-[#051336]">
                      ₹{(selectedPack.price * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Dual Gradient Action Buttons: Add To Bag (Liquid Chrome Silver) & Buy Now (Navy Blue + Red Sheen) */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full py-4 px-6 rounded-full btn-silver text-[#051336] text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add To Bag</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full py-4 px-6 rounded-full btn-navy-red text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-xl active:scale-[0.98] btn-shimmer"
                  >
                    <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span>Buy Now &bull; Discreet &rarr;</span>
                  </button>
                </div>

                {/* Added Toast Notification */}
                {addedToast && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Added {quantity}x &ldquo;{selectedPack.label}&rdquo; to your shopping bag!</span>
                    </div>
                    <Link href="/checkout" className="text-emerald-950 underline font-black">
                      Checkout &rarr;
                    </Link>
                  </div>
                )}

                {/* Interactive PIN Code Fast Delivery Estimator */}
                <div className="mt-6 p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-black text-[#051336]">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-blue-600" />
                      Check Discreet Delivery to Your Pincode:
                    </span>
                    <span className="text-emerald-700">Free Air Shipping</span>
                  </div>

                  <form onSubmit={handlePincodeCheck} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => {
                        setPincode(e.target.value);
                        setPincodeStatus('idle');
                      }}
                      placeholder="Enter 6-digit Pincode (e.g. 400001)"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl btn-navy-red text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-xs"
                    >
                      Check
                    </button>
                  </form>

                  {pincodeStatus === 'valid' && (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>
                        Express Courier Delivery Available to {pincode}! Expected within <strong>2 business days</strong> in plain unmarked box. Cash on Delivery (COD) enabled.
                      </span>
                    </div>
                  )}

                  {pincodeStatus === 'invalid' && (
                    <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2 rounded-xl border border-rose-200">
                      Please enter a valid 6-digit Indian PIN code.
                    </p>
                  )}
                </div>

                {/* Discreet Billing Statement Guarantee + Modal Trigger */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-100/90 border border-slate-200/90 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-black text-[#051336]">
                      <Lock className="w-4 h-4 text-rose-600" />
                      100% Confidential Billing Guarantee
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsBillingModalOpen(true)}
                      className="text-blue-700 hover:text-blue-900 font-black underline cursor-pointer text-[11px] flex items-center gap-1"
                    >
                      <span>Preview Statement</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    Your credit card or bank SMS will state only &ldquo;<strong>PT LOGISTICS SERVICES</strong>&rdquo;. Never any mention of Playtime or sexual wellness. Delivered in unprinted brown cardboard.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* ========================================================
            UNIQUE UX SECTION 1: CLINICAL EFFICACY & TIMELINE VISUALIZER
            Full-Width Interactive 3-Phase Endurance / Vitality Progression
           ======================================================== */}
        <section className="w-full glass-card rounded-3xl p-6 sm:p-10 border border-white/95 shadow-xl text-[#051336]">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-3">
              <Clock className="w-4 h-4 text-blue-600" />
              Clinical Mode of Action Visualizer
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#051336] tracking-tight">
              How the Formulation Works Inside Your Body
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              Engineered with micro-absorption technology. Unlike generic chemical sprays that cause severe numbness, our Ayurvedic botanicals target hyper-sensitive nerve endings naturally.
            </p>
          </div>

          {/* 3-Step Interactive Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 relative overflow-hidden group hover:border-blue-400 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-sm border border-blue-200">
                01
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-700 block">
                Minute 0 &ndash; 10: Micro-Absorption
              </span>
              <h3 className="text-base font-black text-[#051336]">
                Targeted Sensory Calming
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Botanical Clove Extract (Eugenol) and Pudina Satva rapidly penetrate the superficial stratum corneum to gently desensitize over-excited tactile nerve endings without affecting muscle firmness.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero burning sensation</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 relative overflow-hidden group hover:border-emerald-400 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-sm border border-emerald-200">
                02
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 block">
                Minute 10 &ndash; 15: Zero-Transfer Lock
              </span>
              <h3 className="text-base font-black text-[#051336]">
                No Partner Numbness
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                The solution dries completely dry and non-sticky. There is zero residual chemical residue on the skin, meaning your partner feels 100% natural pleasure, zero numbness, and it is 100% safe for oral contact.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Latex condom compatible</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 relative overflow-hidden group hover:border-rose-400 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-black text-sm border border-rose-200">
                03
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-700 block">
                Minute 20 &ndash; 45+: Sustained Climax
              </span>
              <h3 className="text-base font-black text-[#051336]">
                Natural Climax Synchronization
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Enjoy prolonged thrusting endurance and mental relaxation. Climax happens naturally when you choose, allowing both partners to achieve synchronized mutual satisfaction.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>+25 to 45 mins extended time</span>
              </div>
            </div>

          </div>
        </section>


        {/* ========================================================
            UNIQUE UX SECTION 2: AYURVEDIC BOTANICAL PHARMACOPEIA
            Full-Width Herbarium Deep-Dive with Purity Metrics
           ======================================================== */}
        <section className="w-full glass-card-elevated rounded-3xl p-6 sm:p-10 border border-white/95 shadow-xl text-[#051336]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
                <Award className="w-4 h-4 text-emerald-600" />
                Standardized Botanical Herbarium
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#051336] tracking-tight">
                Active Botanical Ingredients &amp; Purity
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Zero synthetic lidocaine. Zero chemical benzocaine. 100% Ayurvedic Rasayana compounds tested under NABL protocols.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3 shrink-0">
              <FileCheck className="w-8 h-8 text-blue-600 shrink-0" />
              <div className="text-xs">
                <p className="font-black text-[#051336]">NABL Lab Tested Batch</p>
                <p className="text-[11px] text-slate-500 font-semibold">Zero heavy metals • AYUSH GMP Certified</p>
              </div>
            </div>
          </div>

          {/* Botanical Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {ingredientsList.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black border border-emerald-200">
                      {item.purity}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-[#051336]">{item.name}</h3>
                  <p className="text-[11px] italic font-serif text-slate-500">{item.botanical}</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium mt-2">
                    {item.role}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[10px] font-bold text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Ayurvedic Pharmacopeia Compliant</span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ========================================================
            UNIQUE UX SECTION 3: 360° BLIND BOX UNBOXING EXPERIENCE
            Full-Width Interactive Walkthrough (Courier vs You)
           ======================================================== */}
        <section className="w-full rounded-3xl overflow-hidden shadow-2xl">
          <UnboxingExperienceSection />
        </section>


        {/* ========================================================
            FULL-WIDTH CLINICAL DOSSIER & SPEC ACCORDIONS
            Tabs: Clinical Science, How To Use, Specifications, FAQ
           ======================================================== */}
        <section className="w-full glass-card rounded-3xl p-6 sm:p-10 border border-white/95 shadow-xl text-[#051336]">
          {/* Tabs bar */}
          <div className="flex border-b border-slate-200 gap-4 sm:gap-8 overflow-x-auto text-sm font-bold scrollbar-none">
            <button
              onClick={() => setActiveTab('science')}
              className={`pb-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'science'
                  ? 'border-rose-600 text-rose-600 font-black'
                  : 'border-transparent text-slate-500 hover:text-[#051336]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Clinical Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('howToUse')}
              className={`pb-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'howToUse'
                  ? 'border-rose-600 text-rose-600 font-black'
                  : 'border-transparent text-slate-500 hover:text-[#051336]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Step-by-Step Application</span>
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'ingredients'
                  ? 'border-rose-600 text-rose-600 font-black'
                  : 'border-transparent text-slate-500 hover:text-[#051336]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Safety &amp; Toxicology</span>
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'specs'
                  ? 'border-rose-600 text-rose-600 font-black'
                  : 'border-transparent text-slate-500 hover:text-[#051336]'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Specifications</span>
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`pb-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'faq'
                  ? 'border-rose-600 text-rose-600 font-black'
                  : 'border-transparent text-slate-500 hover:text-[#051336]'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Medical Q&amp;A</span>
            </button>
          </div>

          {/* Tab Contents */}
          <div className="py-8">
            
            {activeTab === 'science' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-[#051336] mb-2">
                    Engineered for Intimate Confidence &amp; Natural Control
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-black text-[#051336] uppercase tracking-wider mb-4">
                    Key Clinical Advantages:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'howToUse' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-[#051336] mb-1">
                    Simple 4-Step Application Protocol
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Follow these guidelines for optimal absorption, heightened endurance, and zero partner transfer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(product.howToUse || [
                    'Shake the canister well for 5 seconds to activate the botanical extract suspension.',
                    'Hold 5 cm away and apply 2-3 sprays directly onto the targeted sensitive area.',
                    'Allow 10-15 minutes for complete micro-absorption before any physical contact.',
                    'Optionally wipe gently with a soft damp cloth before intimate contact if preferred.'
                  ]).map((step, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                      <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 font-black text-xs flex items-center justify-center border border-rose-200">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-[#051336] mb-2">
                    Safety, Toxicology &amp; Dermatology Assurance
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    Every batch undergoes stringent third-party microbiological and heavy metal testing. Completely free from synthetic numbing anesthetics, phthalates, parabens, and animal cruelty.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
                    <p className="font-black text-sm text-emerald-950">100% Mucosal Safe</p>
                    <p className="font-medium">Formulated with skin-identical botanical lipids that do not disrupt vaginal pH or latex condoms.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs space-y-1">
                    <p className="font-black text-sm text-blue-950">Safe for Oral Contact</p>
                    <p className="font-medium">Once absorbed (10-15 minutes), the formula leaves no residue, safe for oral intimacy.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-800 text-xs space-y-1">
                    <p className="font-black text-sm text-[#051336]">Zero Heavy Metals</p>
                    <p className="font-medium">NABL certified: Lead, Mercury, and Arsenic are verified below non-detectable limits (&lt;0.01 ppm).</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-[#051336] mb-4">
                  Technical &amp; Medical Specifications
                </h3>
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-3xl overflow-hidden text-xs sm:text-sm bg-white shadow-2xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between p-4 even:bg-slate-50">
                      <span className="font-bold text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-black text-[#051336] text-right">{val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between p-4 bg-white">
                    <span className="font-bold text-slate-600">Outer Box Type</span>
                    <span className="font-black text-emerald-700">100% Plain Unmarked Outer Box (PT Logistics)</span>
                  </div>
                  <div className="flex justify-between p-4 bg-slate-50">
                    <span className="font-bold text-slate-600">Regulatory Approval</span>
                    <span className="font-black text-blue-800">Ministry of AYUSH, Govt. of India</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-3">
                <h3 className="text-xl font-black text-[#051336] mb-4">
                  Frequently Asked Questions
                </h3>
                {(product.faq || [
                  { q: 'Is the packaging completely discreet?', a: 'Yes. It arrives in an unprinted plain brown cardboard box. No delivery agent can identify the contents.' },
                  { q: 'What name shows on my bank transaction?', a: 'Your statement will display "PT Logistics" only.' },
                  { q: 'Can I track my shipment?', a: 'Yes, full tracking details will be sent via SMS/WhatsApp with neutral courier updates.' }
                ]).map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                    <p className="text-sm font-black text-[#051336] flex items-center gap-2">
                      <span className="text-rose-600 font-bold">Q:</span>
                      {item.q}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pl-5">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>


        {/* ========================================================
            UNIQUE UX SECTION 4: VERIFIED REVIEWS & STAR DISTRIBUTION
            Social Proof, Sentiment Metrics & Testimonials
           ======================================================== */}
        <section id="reviews-section" className="w-full glass-card-elevated rounded-3xl p-6 sm:p-10 border border-white/95 shadow-xl text-[#051336]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-200">
            
            {/* Aggregate Score */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black uppercase tracking-wider">
                Verified Customer Sentiment
              </span>
              <div className="flex items-baseline justify-center lg:justify-start gap-3">
                <span className="text-5xl font-black text-[#051336]">{product.rating}</span>
                <span className="text-lg text-slate-400 font-bold">/ 5.0</span>
              </div>
              <div className="flex justify-center lg:justify-start text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Based on {product.reviewsCount.toLocaleString()} verified discreet purchases
              </p>
            </div>

            {/* Star Distribution Bars */}
            <div className="lg:col-span-8 space-y-2">
              {[
                { star: 5, pct: 93 },
                { star: 4, pct: 6 },
                { star: 3, pct: 1 },
                { star: 2, pct: 0 },
                { star: 1, pct: 0 },
              ].map((item) => (
                <div key={item.star} className="flex items-center gap-3 text-xs font-bold text-slate-600">
                  <span className="w-8 shrink-0">{item.star} Star</span>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full btn-navy-red"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <span className="w-10 text-right font-black text-[#051336]">{item.pct}%</span>
                </div>
              ))}
            </div>

          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {VERIFIED_REVIEWS.map((rev, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black border border-emerald-200">
                      {rev.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-[#051336] mb-1">{rev.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px]">
                  <p className="font-black text-[#051336]">{rev.author}</p>
                  <p className="text-slate-400 font-semibold">{rev.location} &bull; {rev.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ========================================================
            COMPLETE THE RITUAL: COMPLEMENTARY PRODUCT PAIRING
           ======================================================== */}
        <section className="w-full">
          <div className="p-6 sm:p-10 rounded-3xl glass-card-elevated border border-white/95 text-[#051336] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-white border border-slate-200 shadow-md">
                <Image src={relatedProduct.image} alt={relatedProduct.name} fill className="object-cover" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full btn-navy-red text-white text-[10px] font-black uppercase tracking-wider">
                  Recommended Synergy Pairing
                </span>
                <h3 className="text-lg sm:text-2xl font-black mt-2 text-[#051336]">
                  {relatedProduct.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mt-1">
                  Pairs harmoniously with {product.name.split(' ')[0]} for complete inside-and-out intimate endurance.
                </p>
                <p className="text-xs font-black text-emerald-700 mt-2">
                  From ₹{relatedProduct.basePrice} &bull; 100% Discreet Packaging Guaranteed
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Link
                href={`/products/${relatedProduct.id}`}
                className="px-6 py-4 rounded-full btn-silver text-[#051336] text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shadow-md hover:shadow-lg active:scale-95"
              >
                View {relatedProduct.name.split(' ')[0]} &rarr;
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Sticky Buy Pill Bar - Active on scroll past 320px */}
      <FloatingStickyBuyBar
        product={product}
        selectedPack={selectedPack}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        threshold={320}
      />

      {/* Discreet Billing Statement Preview Modal */}
      <DiscreetBillingPreviewModal
        isOpen={isBillingModalOpen}
        onClose={() => setIsBillingModalOpen(false)}
      />

      <Footer />
      <WhatsAppChatButton />
    </div>
  );
}
