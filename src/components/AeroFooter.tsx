'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Send, Phone, Mail, MapPin, Clock, ShieldCheck, EyeOff, Lock, Truck } from 'lucide-react';
import { CategoryType } from '@/types';
import DiscreetBillingPreviewModal from '@/components/DiscreetBillingPreviewModal';
import { useSettings } from '@/context/SettingsContext';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export interface AeroFooterProps {
  onSelectCategory?: (cat: CategoryType) => void;
  onOpenBillingModal?: () => void;
}

export default function AeroFooter({ onSelectCategory, onOpenBillingModal }: AeroFooterProps) {
  const { footerConfig } = useSettings();
  const router = useRouter();
  const pathname = usePathname();
  const [internalBillingOpen, setInternalBillingOpen] = useState(false);
  const footerRef = useScrollReveal<HTMLElement>();

  const handleBillingModal = () => {
    if (onOpenBillingModal) {
      onOpenBillingModal();
    } else {
      setInternalBillingOpen(true);
    }
  };

  const scrollTo = (id: string) => {
    if (pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${id}`);
    }
  };

  const handleCategoryClick = (cat: CategoryType) => {
    if (pathname === '/' && onSelectCategory) {
      onSelectCategory(cat);
      scrollTo('flagship-section');
    } else {
      router.push(`/?category=${cat}#flagship-section`);
    }
  };

  return (
    <>
      <footer ref={footerRef} className="reveal w-full bg-white/80 backdrop-blur-xl border-t border-slate-200/90 text-slate-600 text-xs mt-auto">
        
        {/* Subtle Trust Strip at top of footer */}
        <div className="border-b border-slate-200/80 bg-slate-100/60 py-4 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <EyeOff className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-[#0A0A0A] text-[11px] leading-tight">100% Plain Box</p>
                <p className="text-[10px] text-slate-500">Zero outer intimate branding</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <div className="w-8 h-8 rounded-full bg-[#007BA7]/15 text-[#007BA7] flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div className="text-left">
                <button
                  type="button"
                  onClick={handleBillingModal}
                  className="font-extrabold text-[#0A0A0A] hover:text-[#007BA7] text-[11px] leading-tight text-left cursor-pointer"
                >
                  Discreet Billing &rarr;
                </button>
                <p className="text-[10px] text-slate-500">Billed as &ldquo;PT Logistics&rdquo;</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <div className="w-8 h-8 rounded-full bg-[#FF2D95]/15 text-[#FF2D95] flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-[#0A0A0A] text-[11px] leading-tight">Express Dispatch</p>
                <p className="text-[10px] text-slate-500">27,000+ PIN codes across India</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-[#0A0A0A] text-[11px] leading-tight">AYUSH Approved</p>
                <p className="text-[10px] text-slate-500">100% Ayurvedic &amp; chemical-free</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          
          {/* 5-Column Clean Modern Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
            
            {/* Column 1: Brand Info & Socials */}
            <div className="space-y-4 lg:col-span-1">
              <Link href="/" className="flex items-center cursor-pointer group">
                <div className="relative h-11 w-40 transition-all duration-200 group-hover:scale-105">
                  <Image
                    src="/logo.png"
                    alt="Playtime"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </Link>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Certified Ayurvedic intimate wellness formulations engineered for endurance, vitality, and connection.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                  aria-label="Telegram"
                >
                  <Send className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Catalog */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#0A0A0A]">
                Catalog
              </h4>
              <ul className="space-y-2 font-medium text-slate-500">
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('extend')}
                    className="hover:text-[#007BA7] transition-colors cursor-pointer"
                  >
                    Climax Delay Sprays
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('supplements')}
                    className="hover:text-[#007BA7] transition-colors cursor-pointer"
                  >
                    Himalayan Shilajit Gold
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('lubes')}
                    className="hover:text-[#007BA7] transition-colors cursor-pointer"
                  >
                    Organic Lubes &amp; Glides
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('couples')}
                    className="hover:text-[#007BA7] transition-colors cursor-pointer"
                  >
                    Couples Date Night Kits
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('all')}
                    className="hover:text-[#007BA7] transition-colors cursor-pointer"
                  >
                    All Formulations
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Care */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#0A0A0A]">
                Customer Care
              </h4>
              <ul className="space-y-2 font-medium text-slate-500">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollTo('trust-strip')}
                    className="hover:text-[#007BA7] transition-colors cursor-pointer"
                  >
                    Discreet Packaging Guide
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleBillingModal}
                    className="hover:text-[#007BA7] transition-colors cursor-pointer"
                  >
                    Discreet Billing Preview
                  </button>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-[#007BA7] transition-colors">
                    Delivery &amp; Privacy Policy
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollTo('tech-grid')}
                    className="hover:text-[#007BA7] transition-colors cursor-pointer"
                  >
                    AYUSH Certifications
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#0A0A0A]">
                Company
              </h4>
              <ul className="space-y-2 font-medium text-slate-500">
                <li>
                  <Link href="/" className="hover:text-[#007BA7] transition-colors">
                    About Playtime Labs
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollTo('tech-grid')}
                    className="hover:text-[#007BA7] transition-colors cursor-pointer"
                  >
                    Ayurvedic Science
                  </button>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-[#007BA7] transition-colors">
                    Medical Panel &amp; Ethics
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="hover:text-[#007BA7] transition-colors">
                    My Account
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Contacts */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#0A0A0A]">
                Contacts
              </h4>
              <ul className="space-y-2.5 font-medium text-slate-500">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{footerConfig.phone || '+91 800-PLAYTIME'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{footerConfig.email || 'care@playtime.in'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{footerConfig.companyAddress || 'Mumbai, MH, India'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{footerConfig.workingHours || 'Daily 9:00 AM - 9:00 PM'}</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="mt-12 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium">
            <p>&copy; 2026 {footerConfig.companyName || 'Playtime Botanical Labs'}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="hover:text-slate-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/privacy-policy" className="hover:text-slate-600 transition-colors">
                User Agreement
              </Link>
            </div>
          </div>

        </div>
      </footer>

      {/* Internal Discreet Billing Modal if opened directly */}
      <DiscreetBillingPreviewModal
        isOpen={internalBillingOpen}
        onClose={() => setInternalBillingOpen(false)}
      />
    </>
  );
}
