'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  UserCheck, 
  Share2, 
  ExternalLink,
  ChevronRight,
  ShoppingBag
} from 'lucide-react';
import { Product, ProductPack } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Ayurvedic Science' | 'Stamina & Longevity' | 'Couples & Intimacy' | 'Discreet Healthcare';
  categoryColor: string;
  excerpt: string;
  readTime: string;
  publishedDate: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: {
    intro: string;
    keyTakeaways: string[];
    sections: {
      heading: string;
      body: string;
    }[];
    conclusion: string;
  };
  featuredProductId?: string;
  featuredProductName?: string;
  featuredProductPrice?: number;
  featuredProductImage?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'science-of-micro-absorption-vs-lidocaine',
    title: 'The Science of Micro-Absorption: Why Botanical Formulations Outperform Synthetic Lidocaine',
    category: 'Ayurvedic Science',
    categoryColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    excerpt: 'Traditional delay sprays use harsh chemical anesthetics that numb both partners. Here is how Ayurvedic clove extract (Lavang) and Pudina Satva desensitize hyper-responsive nerves naturally.',
    readTime: '4 min read',
    publishedDate: 'Oct 10, 2026',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Dr. Vikramaditya Rao',
      role: 'BAMS, Ayurvedic Sexologist & Urologist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    },
    featuredProductId: 'pt-extend-spray',
    featuredProductName: 'Extend Long Last Delay Spray (50g)',
    featuredProductPrice: 499,
    featuredProductImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80',
    content: {
      intro: 'For decades, men seeking to extend their intimate endurance have relied on synthetic topical anesthetics like lidocaine and benzocaine. While effective at dampening sensation, they often introduce an unwelcome consequence: complete numbness, loss of erection firmness, and unintentional partner transfer during intimacy.',
      keyTakeaways: [
        'Synthetic anesthetics numb sensory nerve blocks indiscriminately, often leading to loss of firmness.',
        'Ayurvedic Eugenol (Lavang) and Pudina Satva selectively modulate tactile sensitivity without total numbness.',
        '10-minute micro-absorption technology leaves zero topical chemical residue for 100% partner comfort.'
      ],
      sections: [
        {
          heading: 'How Synthetic Lidocaine Interrupts Intimacy',
          body: 'Lidocaine works by blocking sodium channels along the nerve fibers. While this delays climax, it also shuts down pleasurable sensations entirely. Furthermore, unless thoroughly wiped, the chemical transfers to the partner upon contact, leading to numbness for both partners and disrupting arousal.'
        },
        {
          heading: 'The Ayurvedic Alternative: Standardized Eugenol Micro-Absorption',
          body: 'Playtime’s Extend spray utilizes cold-pressed Syzygium aromaticum (Clove Extract) standardized to >85% eugenol, combined with natural mentha leaf extracts. When applied in a fine metered spray, the micro-droplets penetrate the stratum corneum in 10 to 12 minutes, soothing overactive nerve endings without numbing underlying blood vessels or erector muscles.'
        },
        {
          heading: 'Clinical Protocol for Optimal Performance',
          body: 'Apply 2-3 sprays to the targeted sensitive area 10-15 minutes prior to intimacy. Once fully absorbed, the skin feels completely dry and smooth. There is zero greasy residue, zero strong medicinal odor, and complete safety for oral intimacy.'
        }
      ],
      conclusion: 'By shifting from chemical desensitizers to biological nerve-calming botanicals, men can achieve lasting control while preserving 100% of the mutual intimacy and pleasure.'
    }
  },
  {
    id: 'post-2',
    slug: 'himalayan-shilajit-cellular-energy-vitality',
    title: 'Himalayan Shilajit & 24K Gold: Cellular Mitochondria & Libido Restoration Explained',
    category: 'Stamina & Longevity',
    categoryColor: 'bg-amber-50 text-amber-800 border-amber-200',
    excerpt: 'Harvested from high-altitude Himalayan rock faces at 18,000+ feet, fulvic acid resin combined with Swarna Bhasma accelerates ATP production and counteracts chronic intimate fatigue.',
    readTime: '5 min read',
    publishedDate: 'Oct 08, 2026',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Dr. Aarav Mehta',
      role: 'Men’s Health & Integrative Medicine Specialist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
    },
    featuredProductId: 'pt-shilajit-gold',
    featuredProductName: 'Pure Himalayan Shilajit Gold Resin (20g)',
    featuredProductPrice: 999,
    featuredProductImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80',
    content: {
      intro: 'Modern stress, poor sleep, and nutritional depletion take a quiet toll on testosterone, bedroom stamina, and daytime vitality. In classical Ayurvedic texts like the Charaka Samhita, Shilajit is hailed as "Sthairya Karaka" — the ultimate mineral resin for physical endurance.',
      keyTakeaways: [
        'Fulvic acid (>75% concentration) acts as a high-potency cellular carrier, transporting 84+ trace minerals directly into cells.',
        'Swarna Bhasma (nanoparticle 24K Gold) supports neuro-endocrine balance and sustained vigour.',
        'NABL 3rd-party lab testing ensures strict 0% heavy metals (Lead, Mercury, Arsenic <0.01 ppm).'
      ],
      sections: [
        {
          heading: 'The Mitochondrial Engine: How Shilajit Increases ATP',
          body: 'Inside our cells, mitochondria generate Adenosine Triphosphate (ATP) — the raw currency of physical stamina. Shilajit’s rich fulvic and humic acids supercharge the electron transport chain, restoring ATP output and reducing lactic acid buildup during extended physical exertion.'
        },
        {
          heading: 'Why 24K Swarna Bhasma Matters',
          body: 'Traditional Ayurvedic alchemy combines pure Himalayan resin with incinerated micro-purified 24K gold foil (Swarna Bhasma). The nano-sized gold particles act as an adaptogenic catalyst, calming cortisol and enhancing blood flow to vital organs.'
        },
        {
          heading: 'How to Test Purity at Home',
          body: 'Authentic resin should dissolve 100% cleanly in lukewarm milk or water without leaving any sandy or grimy sediment. When held to a low flame, pure Shilajit bubbles without smoking or catching fire.'
        }
      ],
      conclusion: 'A single pea-sized serving (300mg to 500mg) dissolved in warm water or milk every morning systematically rebuilds baseline stamina, testosterone health, and vitality.'
    }
  },
  {
    id: 'post-3',
    slug: 'breaking-bedroom-anxiety-couples-intimacy-guide',
    title: 'Deconstructing Bedroom Performance Anxiety: A Modern Guide for Couples',
    category: 'Couples & Intimacy',
    categoryColor: 'bg-rose-50 text-rose-800 border-rose-200',
    excerpt: 'Performance pressure is the #1 psychological trigger for premature climax. Certified relationship educators share 4 science-backed exercises to synchronize intimacy and deepen connection.',
    readTime: '6 min read',
    publishedDate: 'Oct 04, 2026',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Priya & Rohan S.',
      role: 'Relationship & Intimate Wellness Educators',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80'
    },
    featuredProductId: 'pt-power-duo-bundle',
    featuredProductName: 'The Power Duo Kit (Extend + Shilajit)',
    featuredProductPrice: 1299,
    featuredProductImage: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&auto=format&fit=crop&q=80',
    content: {
      intro: 'Up to 40% of men report experiencing bedroom performance anxiety at some point in their lives. The cycle is well understood: the fear of finishing too quickly triggers sympathetic nervous system arousal, speeding up heart rate and inadvertently causing the exact premature climax the man feared.',
      keyTakeaways: [
        'Performance anxiety activates the sympathetic "fight or flight" reflex, directly triggering premature ejaculation.',
        'Sensate focus and synchronized breathing help ground both partners in tactile sensations rather than stopwatch timing.',
        'External support (like non-numbing delay formulations) breaks the cycle of psychological fear, restoring natural confidence.'
      ],
      sections: [
        {
          heading: 'The Sympathetic Trap: Adrenaline vs. Arousal',
          body: 'Climax control requires balanced parasympathetic activation — the "rest and digest" physiological state. When anxiety introduces adrenaline into the bloodstream, the autonomic nervous system accelerates reflex loops, making voluntary control nearly impossible.'
        },
        {
          heading: 'The "Start-Stop" and Sensate Focus Technique',
          body: 'Couples who deliberately shift their focus from goal-oriented performance to open-ended sensory exploration consistently report 3x greater intimate satisfaction. Practicing mindful breathing and pacing techniques eliminates the stopwatch pressure from the bedroom.'
        },
        {
          heading: 'Creating a Safe Dialogue',
          body: 'Speaking openly about timing and using modern wellness aids should be viewed as mutual care rather than a taboo flaw. When both partners embrace supportive wellness routines, intimacy transforms into a shared sanctuary of pleasure and trust.'
        }
      ],
      conclusion: 'Intimate stamina is both physiological and mental. By pairing proven Ayurvedic botanical support with empathetic communication, couples rediscover effortless intimacy.'
    }
  },
  {
    id: 'post-4',
    slug: 'discreet-packaging-banking-privacy-guarantee',
    title: 'Zero Awkward Encounters: How Blind Box Logistics Protects Your Privacy',
    category: 'Discreet Healthcare',
    categoryColor: 'bg-purple-50 text-purple-800 border-purple-200',
    excerpt: 'From unprinted plain cardboard boxes to neutral billing statements reading "PT Logistics", explore how we engineered complete confidentiality across 27,000+ PIN codes.',
    readTime: '3 min read',
    publishedDate: 'Sep 28, 2026',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Playtime Clinical Panel',
      role: 'Confidential Patient Care & Fulfillment Team',
      avatar: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=200&auto=format&fit=crop&q=80'
    },
    featuredProductId: 'pt-extend-spray',
    featuredProductName: 'Extend Long Last Delay Spray (50g)',
    featuredProductPrice: 499,
    featuredProductImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80',
    content: {
      intro: 'The biggest friction in personal wellness is discretion. When ordering intimate care, customers deserve total peace of mind that roommates, family members, office colleagues, or delivery personnel will never know what is inside the parcel.',
      keyTakeaways: [
        'Outer packaging is 100% blind: unprinted plain brown corrugated cardboard with zero logos or descriptions.',
        'Shipping airway bills and invoices state only "PT Logistics Services" as the sender.',
        'Bank SMS and credit card transactions list a neutral descriptor without any adult keywords.'
      ],
      sections: [
        {
          heading: 'The 100% Blind Box Standard',
          body: 'Every order leaves our fulfillment center inside a plain corrugated box. No logos, no product names, no slogans, and no hints of the contents. Even the delivery driver cannot decipher what is inside.'
        },
        {
          heading: 'Discreet Billing Statement Protection',
          body: 'Whether paying via UPI, credit card, net banking, or debit card, the transaction statement appears as "PT LOGISTICS SERVICES". You can comfortably review your monthly bank statement without fear of unwanted questions.'
        },
        {
          heading: 'Real-Time Neutral Courier Tracking',
          body: 'Automated WhatsApp and SMS delivery alerts provide neutral shipment tracking links. Orders are dispatched with top tier courier partners reaching 27,000+ PIN codes with tamper-evident security tape.'
        }
      ],
      conclusion: 'Healthcare should be empowering and entirely private. Our multi-layer discretion guarantee ensures you can focus on your wellness with total confidence.'
    }
  }
];

interface AeroBlogSectionProps {
  onAddToCart?: (product: Product, pack: ProductPack) => void;
}

export default function AeroBlogSection({ onAddToCart }: AeroBlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const sectionRef = useScrollReveal<HTMLElement>();

  const categories = ['All', 'Ayurvedic Science', 'Stamina & Longevity', 'Couples & Intimacy', 'Discreet Healthcare'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  return (
    <section ref={sectionRef} id="blog-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
      
      {/* Section Header */}
      <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/85 border border-slate-200/90 shadow-2xs mb-3 animate-badge-pop">
            <BookOpen className="w-3.5 h-3.5 text-[#007BA7]" />
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0A0A0A]">
              Clinical Journal &bull; Medical Insights
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-slate-500">Doctor Verified</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0A0A0A] tracking-tight">
            Intimate Wellness &amp; Science Journal
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl font-medium">
            Doctor-backed guides, Ayurvedic research breakdowns, and candid advice for deeper intimacy and peak endurance.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer whitespace-nowrap magnetic-btn ${
                selectedCategory === cat
                  ? 'bg-[#0A0A0A] text-white shadow-xs'
                  : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200/80 hover:text-[#007BA7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPosts.map((post, idx) => (
          <article
            key={post.id}
            onClick={() => setActiveArticle(post)}
            className={`reveal stagger-${Math.min(idx + 1, 4)} product-card-3d group relative rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_-5px_rgba(10,10,10,0.06)] cursor-pointer`}
          >
            <div>
              {/* Card Thumbnail Image */}
              <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-xs backdrop-blur-md ${post.categoryColor}`}>
                    {post.category}
                  </span>
                </div>

                {/* Read time badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                  <Clock className="w-3 h-3 text-white/80" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-2.5">
                <p className="text-[11px] font-semibold text-slate-400">
                  {post.publishedDate}
                </p>

                <h3 className="text-sm sm:text-base font-black text-[#0A0A0A] leading-snug line-clamp-2 group-hover:text-[#FF2D95] transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>

            {/* Author Footer & Read Action */}
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-slate-100/80 flex items-center justify-between gap-3 mt-auto">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-black text-[#0A0A0A] truncate leading-tight">
                    {post.author.name}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate leading-tight">
                    {post.author.role.split(',')[0]}
                  </p>
                </div>
              </div>

              <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-black text-[#0A0A0A] group-hover:text-[#FF2D95] group-hover:translate-x-0.5 transition-all">
                <span>Read</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* ========================================================
          FULL ARTICLE READER MODAL
          Allows users to read complete verified clinical guides
         ======================================================== */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${activeArticle.categoryColor}`}>
                  {activeArticle.category}
                </span>
                <span className="text-xs font-semibold text-slate-400">&bull;</span>
                <span className="text-xs font-bold text-slate-500">{activeArticle.readTime}</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Article Body */}
            <div className="overflow-y-auto px-6 sm:px-10 py-6 space-y-6 text-[#0A0A0A]">
              
              {/* Article Title & Hero */}
              <div className="space-y-3">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A0A0A] leading-tight">
                  {activeArticle.title}
                </h1>
                
                {/* Author Byline */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-300">
                    <Image
                      src={activeArticle.author.avatar}
                      alt={activeArticle.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-black text-[#0A0A0A]">{activeArticle.author.name}</p>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">{activeArticle.author.role}</p>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Key Clinical Takeaways Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#007BA7]/10 border border-[#007BA7]/30 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#007BA7]">
                  <Sparkles className="w-4 h-4 text-[#007BA7]" />
                  <span>Key Clinical Takeaways</span>
                </div>
                <ul className="space-y-2 text-xs text-[#0A0A0A] font-medium">
                  {activeArticle.content.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#007BA7] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Content Intro */}
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {activeArticle.content.intro}
              </p>

              {/* Article Sections */}
              <div className="space-y-6 pt-2">
                {activeArticle.content.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-base sm:text-lg font-black text-[#0A0A0A]">
                      {sec.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Conclusion */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Clinical Summary
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {activeArticle.content.conclusion}
                </p>
              </div>

              {/* Related Formulation Callout */}
              {activeArticle.featuredProductId && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0A0A0A] to-[#005f82] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-[#007BA7]/30">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="px-2 py-0.5 rounded-full bg-[#FF2D95]/20 text-[#FF2D95] border border-[#FF2D95]/30 text-[10px] font-black uppercase tracking-wider">
                      Recommended Formulation
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-white">
                      {activeArticle.featuredProductName}
                    </h4>
                    <p className="text-xs text-slate-300">
                      Standardized Ayurvedic protocol • 100% Plain Box Delivery
                    </p>
                  </div>

                  <Link
                    href={`/products/${activeArticle.featuredProductId}`}
                    onClick={() => setActiveArticle(null)}
                    className="shrink-0 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF2D95] to-[#e0167d] hover:from-[#ff4da6] hover:to-[#FF2D95] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

            </div>

            {/* Bottom Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">
                Playtime Clinical Editorial Review Board
              </span>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-4 py-1.5 rounded-full bg-[#0A0A0A] hover:bg-[#007BA7] text-white text-xs font-black transition-colors cursor-pointer"
              >
                Done Reading
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
