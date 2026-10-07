'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, EyeOff, Lock, CreditCard } from 'lucide-react';
import { CategoryType } from '@/types';
import DiscreetBillingPreviewModal from '@/components/DiscreetBillingPreviewModal';

interface FooterProps {
  onSelectCategory?: (cat: CategoryType) => void;
  onOpenBillingModal?: () => void;
}

export default function Footer({ onSelectCategory, onOpenBillingModal }: FooterProps) {
  const router = useRouter();
  const [localModalOpen, setLocalModalOpen] = useState(false);

  const handleOpenBilling = () => {
    if (onOpenBillingModal) {
      onOpenBillingModal();
    } else {
      setLocalModalOpen(true);
    }
  };

  const handleCategory = (cat: CategoryType) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      router.push(`/?category=${cat}`);
    }
  };

  return (
    <footer className="bg-[#090d16] border-t border-slate-800 text-slate-400 text-xs">
      {/* Upper Discretion Banner */}
      <div className="border-b border-slate-800/80 py-8 px-4 sm:px-6 bg-[#0d1424]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-xl bg-slate-800/80 text-blue-400 border border-slate-700/50 shadow-sm">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">100% Plain Packaging</h5>
              <p className="text-[11px] text-slate-400">Unmarked brown box guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-xl bg-slate-800/80 text-rose-400 border border-slate-700/50 shadow-sm">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Discreet Billing</h5>
              <button
                onClick={handleOpenBilling}
                className="text-[11px] text-rose-400 hover:text-rose-300 underline font-medium cursor-pointer"
              >
                No adult terms on statement
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-xl bg-slate-800/80 text-emerald-400 border border-slate-700/50 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Medical Grade &amp; Natural</h5>
              <p className="text-[11px] text-slate-400">100% skin-safe &amp; AYUSH tested</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-xl bg-slate-800/80 text-slate-200 border border-slate-700/50 shadow-sm">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Encrypted Payments</h5>
              <p className="text-[11px] text-slate-400">UPI, Cards, NetBanking, COD</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="relative h-12 w-40 bg-[#090d16] px-3 py-1 rounded-xl shadow-sm border border-slate-800 flex items-center justify-center block">
              <Image
                src="/logo.png"
                alt="Playtime"
                fill
                className="object-contain p-1"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              India&apos;s modern sexual wellness &amp; intimacy boutique. Redefining pleasure with medical elegance, natural herbal vigor, and complete discretion.
            </p>
            <div className="inline-block px-2.5 py-1 rounded bg-rose-950/60 border border-rose-800/80 text-[11px] text-rose-400 font-bold">
              18+ ADULTS ONLY
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Collections</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/products/pt-extend-spray" className="hover:text-red-400 transition-colors">
                  Extend Range (Last Longer)
                </Link>
              </li>
              <li>
                <Link href="/products/pt-shilajit-gold" className="hover:text-red-400 transition-colors">
                  Pure Himalayan Shilajit Gold
                </Link>
              </li>
              <li>
                <Link href="/products/pt-power-duo-bundle" className="hover:text-red-400 transition-colors">
                  Ayurvedic Power Duo Kit
                </Link>
              </li>
              <li>
                <button onClick={() => handleCategory('supplements')} className="hover:text-red-400 transition-colors cursor-pointer">
                  Pure Himalayan Shilajit
                </button>
              </li>
              <li>
                <button onClick={() => handleCategory('condoms')} className="hover:text-red-400 transition-colors cursor-pointer">
                  404 Nano Thin Condoms
                </button>
              </li>
              <li>
                <button onClick={() => handleCategory('lubes')} className="hover:text-red-400 transition-colors cursor-pointer">
                  Flavoured Lubes &amp; Oils
                </button>
              </li>
            </ul>
          </div>

          {/* Privacy & Discretion */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Privacy &amp; Trust</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={handleOpenBilling} className="hover:text-red-400 transition-colors cursor-pointer text-left">
                  Discreet Billing Statement
                </button>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-red-400 transition-colors">
                  100% Plain Shipping Protocol
                </Link>
              </li>
              <li>
                <Link href="/#faq-section" className="hover:text-red-400 transition-colors">
                  Frequently Asked Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-red-400 transition-colors">
                  Verified Customer Reviews
                </Link>
              </li>
              <li>
                <span className="text-slate-500">256-Bit Bank Level Encryption</span>
              </li>
            </ul>
          </div>

          {/* Discreet Assistance */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Discreet Concierge</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have questions about sizing, safe usage, or delivery privacy? Our certified intimacy advisors are available 7 days a week.
            </p>
            <p className="text-white font-mono text-xs font-bold">care@playtime.store</p>
            <p className="text-[11px] text-slate-400">Private WhatsApp: +91 98765 43210</p>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="border-t border-slate-800 mt-12 pt-6 text-[11px] text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} Playtime Wellness. All rights reserved. Strictly for individuals aged 18 and older.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Discreet Shipping Policy
            </Link>
            <span>&bull;</span>
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Terms &amp; Hygiene
            </Link>
            <span>&bull;</span>
            <Link href="/admin" className="hover:text-slate-300 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>

      </div>

      <DiscreetBillingPreviewModal
        isOpen={localModalOpen}
        onClose={() => setLocalModalOpen(false)}
      />
    </footer>
  );
}
