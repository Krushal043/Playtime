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
  HelpCircle,
  BadgeCheck,
  Package,
  Layers,
  FileCheck,
  Check,
  ExternalLink,
  Flame,
  Minus,
  Plus,
  Play
} from 'lucide-react';

// Product Gallery Visual Assets
const PRODUCT_GALLERY: Record<string, { url: string; label: string; caption: string }[]> = {
  'pt-extend-spray': [
    {
      url: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=1200&auto=format&fit=crop&q=80',
      label: 'Canister',
      caption: 'Aluminium 50g Pocket Canister • ~120 Metered Micro-Dose Sprays'
    },
    {
      url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=80',
      label: 'Pocket Size',
      caption: 'Pocket-Sized & Discreet Design • Fits Neatly in Any Pocket or Nightstand'
    },
    {
      url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&auto=format&fit=crop&q=80',
      label: 'Formula',
      caption: 'Ayurvedic Botanical Micro-Absorption Droplet • Non-Greasy & Quick Absorbing'
    },
    {
      url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=80',
      label: 'Plain Box',
      caption: 'What The Delivery Courier Hands You • 100% Unmarked Ordinary Carton'
    },
    {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
      label: 'AYUSH Seal',
      caption: 'NABL 3rd-Party Lab Verified • Zero Chemical Numbness Guarantee'
    }
  ],
  'pt-shilajit-gold': [
    {
      url: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=1200&auto=format&fit=crop&q=80',
      label: 'Amber Jar',
      caption: 'Pure Himalayan Shilajit Resin (20g) Infused with 24K Swarna Bhasma'
    },
    {
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80',
      label: 'Brass Spoon',
      caption: 'Complimentary Handcrafted Ayurvedic Brass Measuring Spoon Included'
    },
    {
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80',
      label: 'Resin',
      caption: '>75% Active Fulvic Acid • Pure Resin Dissolves Smoothly in Lukewarm Milk'
    },
    {
      url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=80',
      label: 'Plain Box',
      caption: '100% Blind Box Guarantee • Neutral Label: "PT Logistics"'
    },
    {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
      label: 'NABL Cert',
      caption: '0% Heavy Metals • Tested for Zero Lead, Mercury or Synthetic Steroids'
    }
  ],
  'pt-power-duo-bundle': [
    {
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80',
      label: 'Power Duo',
      caption: 'Extend Delay Spray + Himalayan Shilajit Gold Resin in Luxury Keepsake Box'
    },
    {
      url: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=1200&auto=format&fit=crop&q=80',
      label: 'Extend Spray',
      caption: 'External Climax Control • 10-Minute Micro-Absorption Formula'
    },
    {
      url: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=1200&auto=format&fit=crop&q=80',
      label: 'Shilajit Gold',
      caption: 'Internal Core Stamina & Cellular Vitality with 24K Gold Bhasma'
    },
    {
      url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=80',
      label: 'Plain Box',
      caption: 'Zero Adult Product Classification • Unmarked Outer Corrugated Box'
    },
    {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
      label: 'Lab Cert',
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
    badge: 'Couples Pack Verified'
  },
  {
    author: 'Amitabh M.',
    location: 'South Delhi, New Delhi',
    verified: true,
    rating: 5,
    title: 'Pure Himalayan Shilajit of the highest purity',
    date: 'Verified Buyer • 2 weeks ago',
    comment:
      'The resin passes the flame test and water dissolution test instantly. The complimentary brass spoon gives the exact pea-sized dosage. Sensation and morning energy are at peak levels. 10/10 discreet delivery.',
    badge: 'Lab Tested Batch'
  }
];

export default function ProductDetailsClient({
  initialData,
  initialProduct,
}: {
  initialData?: Product;
  initialProduct?: Product;
}) {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const productId = (params?.id as string) || 'pt-extend-spray';
  const product: Product = initialData || initialProduct || getProductById(productId) || ALL_PRODUCTS[0];

  // Compile multi-images gallery
  const galleryItems =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images.map((img, i) => ({
          url: img.url,
          label: img.label || `View ${i + 1}`,
          caption: img.caption || product.name,
        }))
      : PRODUCT_GALLERY[product.id] && PRODUCT_GALLERY[product.id].length > 0
      ? PRODUCT_GALLERY[product.id]
      : [
          { url: product.image, label: 'Main View', caption: product.name },
          {
            url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=80',
            label: 'Plain Box',
            caption: '100% Unmarked Plain Cardboard Outer Box',
          },
          {
            url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
            label: 'AYUSH Seal',
            caption: 'Govt. AYUSH Approved Ayurvedic Standard',
          },
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
    <div className="w-full min-h-screen silver-shade-bg text-[#0A0A0A] flex flex-col selection:bg-[#007BA7]/25 selection:text-[#0A0A0A]">
      
      {/* 1. Unified Header with Top Marquee Line */}
      <Navbar />

      {/* 2. Modern Frosted Breadcrumb Strip */}
      <nav aria-label="Breadcrumb" className="w-full bg-white/75 backdrop-blur-xl border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2 truncate">
            <Link href="/" className="hover:text-[#007BA7] font-bold transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/" className="hover:text-[#007BA7] font-bold capitalize transition-colors">
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-extrabold text-[#0A0A0A] truncate">
              {product.name}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[11px] font-bold">
            <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Plain Box Guaranteed
            </span>
            <span className="flex items-center gap-1.5 text-[#007BA7] bg-[#007BA7]/10 px-3 py-0.5 rounded-full border border-[#007BA7]/20">
              <Truck className="w-3.5 h-3.5 text-[#007BA7]" />
              Express 24-48h Dispatch
            </span>
          </div>
        </div>
      </nav>

      {/* 3. Main Product Showcase Stage */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-10 sm:space-y-14 w-full">
        
        {/* ========================================================
            HERO STAGE: 12-COLUMN EDITORIAL SPLIT
            Left 7 Cols: Vertical Gallery + Main Viewport
            Right 5 Cols: Compact Purchase Cockpit (Add to Cart visible above fold!)
           ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ---------------- LEFT: VERTICAL MULTI-IMAGES & VIDEO GALLERY (7 COLS) ---------------- */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            
            {/* View Mode Switcher Pill Bar */}
            <div className="flex items-center justify-between gap-2 p-1.5 rounded-full bg-white/85 border border-slate-200/90 shadow-2xs backdrop-blur-md">
              <div className="flex items-center gap-1 text-xs font-bold flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('product');
                    setActiveImageIndex(0);
                  }}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    viewMode === 'product'
                      ? 'bg-[#0A0A0A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0A0A0A] hover:bg-slate-100'
                  }`}
                >
                  ✨ Product Detail
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('box');
                    setActiveImageIndex(Math.min(1, galleryItems.length - 1));
                  }}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'box'
                      ? 'bg-[#0A0A0A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0A0A0A] hover:bg-slate-100'
                  }`}
                >
                  <Package className="w-3.5 h-3.5 text-amber-500" />
                  <span>Plain Box View</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('certificate');
                    setActiveImageIndex(Math.min(2, galleryItems.length - 1));
                  }}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'certificate'
                      ? 'bg-[#0A0A0A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0A0A0A] hover:bg-slate-100'
                  }`}
                >
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>AYUSH Lab Seal</span>
                </button>

                {product.videoUrl && (
                  <button
                    type="button"
                    onClick={() => setViewMode('video')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 font-bold ${
                      viewMode === 'video'
                        ? 'bg-[#FF2D95] text-white shadow-xs'
                        : 'text-[#FF2D95] hover:bg-[#FF2D95]/10'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Reel</span>
                  </button>
                )}
              </div>

              <span className="hidden sm:inline-block text-[11px] font-bold text-slate-500 pr-3">
                {viewMode === 'video'
                  ? 'Video Demo'
                  : `Photo ${activeImageIndex + 1} of ${galleryItems.length}`}
              </span>
            </div>

            {/* Split Media View: Vertical Thumbnails on Left + Main Stage on Right */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 items-start">
              
              {/* VERTICAL THUMBNAIL RAIL */}
              <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[460px] w-full sm:w-20 shrink-0 scrollbar-none py-1">
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
                      className={`relative aspect-square w-14 sm:w-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-white shrink-0 ${
                        isActive
                          ? 'border-[#007BA7] ring-4 ring-[#007BA7]/25 scale-102 shadow-md'
                          : 'border-slate-200/90 hover:border-slate-400 opacity-80 hover:opacity-100'
                      }`}
                      title={item.label}
                    >
                      <Image src={item.url} alt={item.label} fill className="object-cover" />
                    </button>
                  );
                })}

                {/* Vertical Video Thumbnail */}
                {product.videoUrl && (
                  <button
                    type="button"
                    onClick={() => setViewMode('video')}
                    className={`relative aspect-square w-14 sm:w-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-[#0A0A0A] shrink-0 flex flex-col items-center justify-center group ${
                      viewMode === 'video'
                        ? 'border-[#FF2D95] ring-4 ring-[#FF2D95]/25 scale-102 shadow-md'
                        : 'border-slate-700 hover:border-[#FF2D95] opacity-85 hover:opacity-100'
                    }`}
                    title="Watch Product Video"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#FF2D95] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                    <span className="text-[9px] font-black text-white mt-1 uppercase tracking-wider">Reel</span>
                  </button>
                )}
              </div>

              {/* MAIN VIEWPORT (Images + Video) */}
              <div className="flex-1 relative aspect-[4/3] sm:aspect-[4/3] max-h-[460px] w-full rounded-3xl overflow-hidden border border-white/95 bg-white shadow-[0_16px_40px_rgba(0,123,167,0.08)] group">
                {viewMode === 'video' && product.videoUrl ? (
                  <div className="relative w-full h-full bg-slate-950 flex items-center justify-center">
                    <video
                      src={product.videoUrl}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-[#FF2D95] text-white text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        Product Reel
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewMode('product')}
                      className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-[#0A0A0A]/80 hover:bg-[#0A0A0A] text-white text-xs font-bold border border-white/20 transition-all cursor-pointer shadow-md"
                    >
                      ✕ Photos
                    </button>
                  </div>
                ) : (
                  <>
                    <Image
                      src={galleryItems[activeImageIndex]?.url || product.image}
                      alt={galleryItems[activeImageIndex]?.caption || product.name}
                      fill
                      priority
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Top-Left: Category Badge */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-[#0A0A0A]/90 backdrop-blur-md text-white text-[10px] font-black tracking-wide shadow-md uppercase">
                        {product.badge || 'Ayurvedic Flagship'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/85 backdrop-blur-md text-emerald-200 border border-emerald-400/30 text-[9px] font-black uppercase tracking-wider shadow-xs">
                        ● 100% Ayurvedic
                      </span>
                    </div>

                    {/* Top-Right: Batch Scarcity Meter */}
                    <div className="absolute top-3 right-3 z-10">
                      <div className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-[#0A0A0A] text-[10px] font-black flex items-center gap-1.5 shadow-md">
                        <Flame className="w-3 h-3 text-[#FF2D95] fill-[#FF2D95] animate-pulse" />
                        <span>Fresh Batch PT-2026</span>
                      </div>
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-3">
                      <div className="max-w-md bg-[#0A0A0A]/85 backdrop-blur-md px-3 py-1.5 rounded-2xl text-white">
                        <p className="text-[9px] font-mono text-slate-300 uppercase tracking-wider">
                          Formulation Spec
                        </p>
                        <p className="text-xs font-black text-white truncate max-w-[220px] xs:max-w-xs">
                          {galleryItems[activeImageIndex]?.caption}
                        </p>
                      </div>

                      <div className="shrink-0 px-2.5 py-1 rounded-full bg-white/95 text-slate-900 text-[10px] font-black flex items-center gap-1 shadow-md">
                        <EyeOff className="w-3 h-3 text-emerald-600" />
                        <span>Plain Outer Box</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* 4-Pillar Clinical Confidence Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-2.5 rounded-2xl bg-white/90 border border-slate-200/90 text-center shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs font-black text-[#0A0A0A]">AYUSH Certified</p>
                <p className="text-[10px] text-slate-500 font-semibold">100% Body Safe</p>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/90 border border-slate-200/90 text-center shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#007BA7] mx-auto mb-1" />
                <p className="text-xs font-black text-[#0A0A0A]">Zero Transfer</p>
                <p className="text-[10px] text-slate-500 font-semibold">No partner numbness</p>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/90 border border-slate-200/90 text-center shadow-2xs">
                <EyeOff className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <p className="text-xs font-black text-[#0A0A0A]">Plain Outer Box</p>
                <p className="text-[10px] text-slate-500 font-semibold">Zero brand marks</p>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/90 border border-slate-200/90 text-center shadow-2xs">
                <Lock className="w-4 h-4 text-[#FF2D95] mx-auto mb-1" />
                <p className="text-xs font-black text-[#0A0A0A]">PT Logistics</p>
                <p className="text-[10px] text-slate-500 font-semibold">Neutral bank SMS</p>
              </div>
            </div>

          </div>

          {/* ---------------- RIGHT: COMPACT LUXURY PURCHASE COCKPIT (5 COLS) ---------------- */}
          {/* Engineered to fit Add To Bag and Buy Now directly on screen above the fold */}
          <div className="lg:col-span-5">
            <div className="glass-card-elevated rounded-3xl p-5 sm:p-6 border border-white/95 shadow-[0_20px_60px_-15px_rgba(0,123,167,0.14)] space-y-4">
              
              {/* Category, Rating & Verified Badges */}
              <div className="flex items-center justify-between gap-3 flex-wrap pb-2 border-b border-slate-200/70">
                <span className="text-[11px] uppercase tracking-wider font-black text-[#FF2D95] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF2D95] animate-ping" />
                  {product.category} Formulation
                </span>

                <a
                  href="#reviews-section"
                  className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-amber-500 text-xs font-black shadow-2xs hover:border-amber-400 transition-colors"
                >
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-[#0A0A0A] font-black">{product.rating}</span>
                  <span className="text-slate-500 font-semibold text-[10px]">({product.reviewsCount.toLocaleString()})</span>
                </a>
              </div>

              {/* Main Product Title & Scientific Tagline */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 line-clamp-2 leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Dynamic Compact Price Box */}
              <div className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/90 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
                      ₹{selectedPack.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-slate-400 line-through font-semibold">
                      ₹{selectedPack.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#FF2D95]/15 text-[#FF2D95] border border-[#FF2D95]/30">
                      {selectedPack.discount}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 font-bold mt-0.5 flex items-center gap-1.5">
                    <span className="text-emerald-700 font-black">₹{unitPrice} / unit</span>
                    <span>&bull;</span>
                    <span>Free express delivery &bull; Taxes included</span>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black border border-emerald-200">
                    ● In Stock
                  </span>
                  {totalSavings > 0 && (
                    <p className="text-[10px] font-black text-[#FF2D95] mt-0.5">
                      Save ₹{totalSavings.toLocaleString('en-IN')}
                    </p>
                  )}
                </div>
              </div>

              {/* Interactive Pack Size Selector Cards */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-black">
                  <span className="text-slate-700 uppercase tracking-wide">1. Select Pack:</span>
                  <span className="text-[#FF2D95] font-bold">Multi-packs save up to 40%</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {product.packs.map((pack, index) => {
                    const isSelected = selectedPackIndex === index;
                    const packUnitPrice = Math.round(pack.price / pack.packSize);
                    return (
                      <button
                        key={pack.packSize}
                        type="button"
                        onClick={() => setSelectedPackIndex(index)}
                        className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-[#007BA7]/10 border-[#007BA7] shadow-sm ring-2 ring-[#007BA7]/30 scale-[1.01]'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {index === 1 && (
                          <span className="absolute -top-2 right-1 px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[8px] font-black uppercase tracking-wider">
                            Popular
                          </span>
                        )}
                        {index === 2 && (
                          <span className="absolute -top-2 right-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[8px] font-black uppercase tracking-wider">
                            Value
                          </span>
                        )}

                        <p className="text-[10px] font-black text-[#0A0A0A] truncate leading-tight">
                          {pack.label}
                        </p>
                        <p className="text-xs sm:text-sm font-black text-[#0A0A0A] mt-0.5">
                          ₹{pack.price.toLocaleString('en-IN')}
                        </p>
                        <p className="text-[9px] font-bold text-emerald-700 mt-0.5">
                          ₹{packUnitPrice}/unit
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper & Live Subtotal */}
              <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/90">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black text-slate-700 uppercase">Qty:</span>
                  <div className="flex items-center border border-slate-300 rounded-full bg-white text-xs font-black text-[#0A0A0A]">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1 px-2.5 text-slate-600 hover:text-[#0A0A0A] transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1 px-2.5 text-slate-600 hover:text-[#0A0A0A] transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold">Subtotal: </span>
                  <span className="text-sm font-black text-[#0A0A0A]">
                    ₹{(selectedPack.price * quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* ---------------- ACTION BUTTONS (ADD TO BAG & BUY NOW) ---------------- */}
              {/* FIRMLY PLACED ABOVE THE FOLD SO USER SEES THEM DIRECTLY ON SCREEN */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-3 rounded-full bg-[#0A0A0A] hover:bg-[#181818] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-1.5 border border-[#007BA7]/30"
                >
                  <ShoppingBag className="w-4 h-4 text-[#007BA7]" />
                  <span>Add To Bag</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-3 rounded-full bg-gradient-to-r from-[#0A0A0A] via-[#007BA7] to-[#FF2D95] hover:opacity-95 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[0_4px_16px_rgba(0,123,167,0.35)] active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-current text-white" />
                  <span>Buy Now &rarr;</span>
                </button>
              </div>

              {/* Added Toast Notification */}
              {addedToast && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Added {quantity}x to Bag!</span>
                  </div>
                  <Link href="/checkout" className="text-emerald-950 underline font-black">
                    Checkout &rarr;
                  </Link>
                </div>
              )}

              {/* Interactive PIN Code Fast Delivery Estimator */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-black text-[#0A0A0A]">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#007BA7]" />
                    Check PIN Code Delivery:
                  </span>
                  <span className="text-emerald-700 font-bold">Free Express Delivery</span>
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
                    placeholder="Enter 6-digit PIN code"
                    className="flex-1 px-3 py-1.5 rounded-full border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#007BA7] bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-full bg-[#0A0A0A] hover:bg-[#007BA7] text-white text-[11px] font-black uppercase tracking-wider cursor-pointer shadow-xs transition-colors"
                  >
                    Check
                  </button>
                </form>

                {pincodeStatus === 'valid' && (
                  <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      Delivery available to {pincode}! Ships in <strong>2 days</strong> in plain box. COD enabled.
                    </span>
                  </div>
                )}

                {pincodeStatus === 'invalid' && (
                  <p className="text-[11px] font-bold text-[#FF2D95] bg-[#FF2D95]/10 p-1.5 rounded-xl border border-[#FF2D95]/20">
                    Please enter a valid 6-digit Indian PIN code.
                  </p>
                )}
              </div>

              {/* Discreet Billing Statement Guarantee + Modal Trigger */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-black text-[#0A0A0A] text-[11px]">
                    <Lock className="w-3.5 h-3.5 text-[#FF2D95]" />
                    100% Confidential Billing Guarantee
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsBillingModalOpen(true)}
                    className="text-[#007BA7] hover:text-[#0A0A0A] font-black underline cursor-pointer text-[10px] flex items-center gap-0.5"
                  >
                    <span>Preview SMS</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Your bank SMS or card statement states only &ldquo;<strong>PT LOGISTICS SERVICES</strong>&rdquo;. Never any adult product name.
                </p>
              </div>

            </div>
          </div>

        </section>


        {/* ========================================================
            SECTION 2: CLINICAL EFFICACY & TIMELINE VISUALIZER
            3-Phase Mode of Action Cards
           ======================================================== */}
        <section className="w-full glass-card rounded-3xl p-6 sm:p-10 border border-white/95 shadow-xl text-[#0A0A0A]">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#007BA7]/10 border border-[#007BA7]/20 text-[#007BA7] text-xs font-black uppercase tracking-wider mb-2">
              <Clock className="w-4 h-4 text-[#007BA7]" />
              Clinical Mode of Action Visualizer
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
              How the Formulation Works Inside Your Body
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Engineered with micro-absorption technology. Targets hyper-sensitive nerve endings naturally with zero partner transfer.
            </p>
          </div>

          {/* 3-Step Interactive Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5 relative overflow-hidden group hover:border-[#007BA7] hover:shadow-md transition-all">
              <div className="w-9 h-9 rounded-2xl bg-[#007BA7]/10 text-[#007BA7] flex items-center justify-center font-black text-sm border border-[#007BA7]/30 shadow-xs">
                01
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#007BA7] block">
                Minute 0 &ndash; 10: Micro-Absorption
              </span>
              <h3 className="text-sm font-black text-[#0A0A0A]">
                Targeted Sensory Calming
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Botanical Clove Extract (Eugenol) and Pudina Satva rapidly penetrate the superficial stratum corneum to gently desensitize over-excited tactile nerve endings without affecting muscle firmness.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero burning sensation</span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5 relative overflow-hidden group hover:border-emerald-400 hover:shadow-md transition-all">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-sm border border-emerald-200 shadow-xs">
                02
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                Minute 10 &ndash; 15: Zero-Transfer Lock
              </span>
              <h3 className="text-sm font-black text-[#0A0A0A]">
                No Partner Numbness
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                The solution dries completely dry and non-sticky. There is zero residual chemical residue on the skin, meaning your partner feels 100% natural pleasure, zero numbness, and it is 100% safe for oral contact.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Latex condom compatible</span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5 relative overflow-hidden group hover:border-[#FF2D95]/40 hover:shadow-md transition-all">
              <div className="w-9 h-9 rounded-2xl bg-[#FF2D95]/10 text-[#FF2D95] flex items-center justify-center font-black text-sm border border-[#FF2D95]/30 shadow-xs">
                03
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FF2D95] block">
                Minute 20 &ndash; 45+: Sustained Climax
              </span>
              <h3 className="text-sm font-black text-[#0A0A0A]">
                Natural Climax Synchronization
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Enjoy prolonged thrusting endurance and mental relaxation. Climax happens naturally when you choose, allowing both partners to achieve synchronized mutual satisfaction.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>+25 to 45 mins extended time</span>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 3: AYURVEDIC BOTANICAL PHARMACOPEIA
            Standardized Botanical Ingredients & Lab Purity
           ======================================================== */}
        <section className="w-full glass-card-elevated rounded-3xl p-6 sm:p-10 border border-white/95 shadow-xl text-[#0A0A0A]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
                <Award className="w-4 h-4 text-emerald-600" />
                Standardized Botanical Herbarium
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
                Active Botanical Ingredients &amp; Purity
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Zero synthetic lidocaine. Zero chemical benzocaine. 100% Ayurvedic Rasayana compounds tested under NABL protocols.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3 shrink-0">
              <FileCheck className="w-7 h-7 text-[#007BA7] shrink-0" />
              <div className="text-xs">
                <p className="font-black text-[#0A0A0A]">NABL Lab Tested Batch</p>
                <p className="text-[11px] text-slate-500 font-semibold">Zero heavy metals • AYUSH GMP Certified</p>
              </div>
            </div>
          </div>

          {/* Botanical Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {ingredientsList.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black border border-emerald-200">
                      {item.purity}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-[#0A0A0A]">{item.name}</h3>
                  <p className="text-[10px] italic font-serif text-slate-500">{item.botanical}</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1.5">
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
            SECTION 4: 360° BLIND BOX UNBOXING EXPERIENCE
            Discreet Packaging Step-by-Step
           ======================================================== */}
        <section className="w-full rounded-3xl overflow-hidden shadow-2xl">
          <UnboxingExperienceSection />
        </section>


        {/* ========================================================
            SECTION 5: CLINICAL DOSSIER & SPEC ACCORDIONS
            Tabs: Clinical Overview, How To Use, Specifications, FAQ
           ======================================================== */}
        <section className="w-full glass-card rounded-3xl p-6 sm:p-10 border border-white/95 shadow-xl text-[#0A0A0A]">
          {/* Tabs bar */}
          <div className="flex border-b border-slate-200 gap-4 sm:gap-8 overflow-x-auto text-sm font-bold scrollbar-none">
            <button
              onClick={() => setActiveTab('science')}
              className={`pb-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'science'
                  ? 'border-[#FF2D95] text-[#FF2D95] font-black'
                  : 'border-transparent text-slate-500 hover:text-[#0A0A0A]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Clinical Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('howToUse')}
              className={`pb-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'howToUse'
                  ? 'border-[#FF2D95] text-[#FF2D95] font-black'
                  : 'border-transparent text-slate-500 hover:text-[#0A0A0A]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Step-by-Step Application</span>
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'ingredients'
                  ? 'border-[#FF2D95] text-[#FF2D95] font-black'
                  : 'border-transparent text-slate-500 hover:text-[#0A0A0A]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Safety &amp; Toxicology</span>
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'specs'
                  ? 'border-[#FF2D95] text-[#FF2D95] font-black'
                  : 'border-transparent text-slate-500 hover:text-[#0A0A0A]'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Specifications</span>
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`pb-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'faq'
                  ? 'border-[#FF2D95] text-[#FF2D95] font-black'
                  : 'border-transparent text-slate-500 hover:text-[#0A0A0A]'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Medical Q&amp;A</span>
            </button>
          </div>

          {/* Tab Contents */}
          <div className="py-6">
            {activeTab === 'science' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#0A0A0A] mb-1.5">
                    Engineered for Intimate Confidence &amp; Natural Control
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider mb-3">
                    Key Clinical Advantages:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'howToUse' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#0A0A0A] mb-1">
                    Simple 4-Step Application Protocol
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Follow these guidelines for optimal absorption, heightened endurance, and zero partner transfer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {(product.howToUse || [
                    'Shake the canister well for 5 seconds to activate the botanical extract suspension.',
                    'Hold 5 cm away and apply 2-3 sprays directly onto the targeted sensitive area.',
                    'Allow 10-15 minutes for complete micro-absorption before any physical contact.',
                    'Optionally wipe gently with a soft damp cloth before intimate contact if preferred.'
                  ]).map((step, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                      <div className="w-7 h-7 rounded-full bg-[#FF2D95]/10 text-[#FF2D95] font-black text-xs flex items-center justify-center border border-[#FF2D95]/30">
                        {idx + 1}
                      </div>
                      <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#0A0A0A] mb-1.5">
                    Safety, Toxicology &amp; Dermatology Assurance
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Every batch undergoes stringent third-party microbiological and heavy metal testing. Completely free from synthetic numbing anesthetics, phthalates, parabens, and animal cruelty.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
                    <p className="font-black text-sm text-emerald-950">100% Mucosal Safe</p>
                    <p className="font-medium text-[11px]">Formulated with skin-identical botanical lipids that do not disrupt vaginal pH or latex condoms.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#007BA7]/10 border border-[#007BA7]/20 text-[#007BA7] text-xs space-y-1">
                    <p className="font-black text-sm text-[#007BA7]">Safe for Oral Contact</p>
                    <p className="font-medium text-[11px] text-slate-700">Once absorbed (10-15 minutes), the formula leaves no residue, safe for oral intimacy.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-800 text-xs space-y-1">
                    <p className="font-black text-sm text-[#0A0A0A]">Zero Heavy Metals</p>
                    <p className="font-medium text-[11px]">NABL certified: Lead, Mercury, and Arsenic are verified below non-detectable limits (&lt;0.01 ppm).</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-black text-[#0A0A0A] mb-3">
                  Technical &amp; Medical Specifications
                </h3>
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden text-xs bg-white shadow-2xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between p-3 even:bg-slate-50">
                      <span className="font-bold text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-black text-[#0A0A0A] text-right">{val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between p-3 bg-white">
                    <span className="font-bold text-slate-600">Outer Box Type</span>
                    <span className="font-black text-emerald-700">100% Plain Unmarked Outer Box (PT Logistics)</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50">
                    <span className="font-bold text-slate-600">Regulatory Approval</span>
                    <span className="font-black text-[#007BA7]">Ministry of AYUSH, Govt. of India</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-2.5">
                <h3 className="text-lg sm:text-xl font-black text-[#0A0A0A] mb-3">
                  Frequently Asked Questions
                </h3>
                {(product.faq || [
                  { q: 'Is the packaging completely discreet?', a: 'Yes. It arrives in an unprinted plain brown cardboard box. No delivery agent can identify the contents.' },
                  { q: 'What name shows on my bank transaction?', a: 'Your statement will display "PT Logistics" only.' },
                  { q: 'Can I track my shipment?', a: 'Yes, full tracking details will be sent via SMS/WhatsApp with neutral courier updates.' }
                ]).map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <p className="text-xs font-black text-[#0A0A0A] flex items-center gap-2">
                      <span className="text-[#FF2D95] font-bold">Q:</span>
                      {item.q}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium pl-4">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>


        {/* ========================================================
            SECTION 6: VERIFIED REVIEWS & RATINGS
           ======================================================== */}
        <section id="reviews-section" className="w-full glass-card-elevated rounded-3xl p-6 sm:p-10 border border-white/95 shadow-xl text-[#0A0A0A]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pb-6 border-b border-slate-200">
            
            {/* Aggregate Score */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-1.5">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black uppercase tracking-wider">
                Verified Customer Sentiment
              </span>
              <div className="flex items-baseline justify-center lg:justify-start gap-3">
                <span className="text-4xl sm:text-5xl font-black text-[#0A0A0A]">{product.rating}</span>
                <span className="text-base text-slate-400 font-bold">/ 5.0</span>
              </div>
              <div className="flex justify-center lg:justify-start text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Based on {product.reviewsCount.toLocaleString()} verified purchases
              </p>
            </div>

            {/* Star Distribution Bars */}
            <div className="lg:col-span-8 space-y-1.5">
              {[
                { star: 5, pct: 93 },
                { star: 4, pct: 6 },
                { star: 3, pct: 1 },
                { star: 2, pct: 0 },
                { star: 1, pct: 0 },
              ].map((item) => (
                <div key={item.star} className="flex items-center gap-3 text-xs font-bold text-slate-600">
                  <span className="w-8 shrink-0">{item.star} Star</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#007BA7] to-[#FF2D95]"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <span className="w-10 text-right font-black text-[#0A0A0A]">{item.pct}%</span>
                </div>
              ))}
            </div>

          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {VERIFIED_REVIEWS.map((rev, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black border border-emerald-200">
                      {rev.badge}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-black text-[#0A0A0A] mb-1">{rev.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 text-[11px]">
                  <p className="font-black text-[#0A0A0A]">{rev.author}</p>
                  <p className="text-slate-400 font-semibold">{rev.location} &bull; {rev.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ========================================================
            SECTION 7: COMPLETE THE RITUAL - SYNERGY PAIRING
           ======================================================== */}
        <section className="w-full">
          <div className="p-5 sm:p-8 rounded-3xl glass-card-elevated border border-white/95 text-[#0A0A0A] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-white border border-slate-200 shadow-md">
                <Image src={relatedProduct.image} alt={relatedProduct.name} fill className="object-cover" />
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-white text-[10px] font-black uppercase tracking-wider">
                  Recommended Synergy Pairing
                </span>
                <h3 className="text-base sm:text-xl font-black mt-1 text-[#0A0A0A]">
                  {relatedProduct.name}
                </h3>
                <p className="text-xs text-slate-600 font-medium max-w-xl mt-0.5">
                  Pairs harmoniously with {product.name.split(' ')[0]} for complete inside-and-out intimate endurance.
                </p>
                <p className="text-xs font-black text-emerald-700 mt-1">
                  From ₹{relatedProduct.basePrice} &bull; 100% Plain Box Delivery
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Link
                href={`/products/${relatedProduct.id}`}
                className="px-5 py-3 rounded-full bg-gradient-to-r from-[#0A0A0A] via-[#007BA7] to-[#FF2D95] hover:opacity-95 text-white text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shadow-[0_4px_16px_rgba(0,123,167,0.35)] active:scale-95"
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

      {/* 4. Unified Footer */}
      <Footer />
      <WhatsAppChatButton />
    </div>
  );
}
