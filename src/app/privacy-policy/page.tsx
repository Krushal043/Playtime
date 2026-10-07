import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PromoBanner from '@/components/PromoBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ShieldCheck,
  EyeOff,
  Lock,
  Truck,
  CheckCircle2,
  FileText,
  UserCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Discreet Shipping & Privacy Policy | 100% Confidential Guarantee',
  description:
    'Playtime Privacy Policy & Discreet Delivery Protocol. Learn how our 100% plain, unmarked brown boxes, anonymous billing statements, and 256-bit data encryption keep your intimate wellness completely private.',
  openGraph: {
    title: 'Discreet Shipping & Privacy Policy | Playtime Luxury Wellness',
    description:
      'Learn how our 100% plain unmarked packaging and anonymous billing statements keep your adult wellness purchases completely private.',
    url: 'https://playtime.in/privacy-policy',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discreet Shipping & Privacy Policy | Playtime',
    description: '100% Plain packaging guarantee and anonymous billing descriptors across India.',
  },
  alternates: {
    canonical: 'https://playtime.in/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen silver-lighting-bg text-slate-900 flex flex-col selection:bg-red-600/30 selection:text-white">
      <PromoBanner />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-12 w-full">
        
        {/* Header Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-bold uppercase tracking-wider shadow-2xs">
            <EyeOff className="w-3.5 h-3.5 text-emerald-600" />
            100% Zero-Trace Confidentiality
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0a193d] tracking-tight">
            Discreet Shipping &amp; Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Your intimacy is deeply personal. At Playtime, complete discretion is not an afterthought — it is the cornerstone of our company.
          </p>
          <p className="text-xs text-slate-400 font-mono">
            Last Updated: October 2026 • Verified Compliant with Indian Digital Data Protection Act
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl glass-card-elevated border border-white/95 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0a193d]">100% Plain Packaging</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every parcel leaves our facility in a plain, unmarked brown cardboard box or heavy opaque polybag with tamper-proof black security tape. Zero outer logos, zero product descriptions, zero brand names.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card-elevated border border-white/95 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0a193d]">Anonymous Billing Descriptor</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your bank account, credit card, or UPI statement will display only a generic billing descriptor such as &ldquo;PT Logistics Services&rdquo;. No mention of adult products or wellness.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card-elevated border border-white/95 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0a193d]">Zero Third-Party Data Sharing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never sell, rent, or monetize your contact information, phone numbers, or order histories with data brokers, ad networks, or telemarketers.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card-elevated border border-white/95 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0a193d]">Discreet Delivery Couriers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We partner exclusively with top tier logistics providers (BlueDart, Delhivery, Xpressbees). Delivery couriers have zero knowledge of parcel contents and require an OTP upon handover.
            </p>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/90 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0a193d] flex items-center gap-2">
              <FileText className="w-5 h-5 text-rose-600" />
              1. What Information We Collect
            </h2>
            <p>
              To process and fulfill your orders, we collect strictly necessary transactional information:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Contact Information:</strong> Full name, shipping address, pin code, phone number, and optional email.</li>
              <li><strong>Order History:</strong> Products purchased, pack sizes, and timestamp for fulfillment purposes.</li>
              <li><strong>Payment Records:</strong> Transaction reference IDs and payment method (UPI, Card, COD). We <em>never</em> store your credit card CVV or net-banking credentials on our servers.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-slate-200/80 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#0a193d] flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-rose-600" />
              2. Strict 18+ Age Verification
            </h2>
            <p>
              Playtime products and services are exclusively intended for adult individuals aged 18 and older. We do not knowingly collect personal information from minors. By using our website and placing an order, you verify that you are at least 18 years of age.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-200/80 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#0a193d] flex items-center gap-2">
              <Lock className="w-5 h-5 text-rose-600" />
              3. Data Encryption &amp; Security Standards
            </h2>
            <p>
              All traffic between your browser and our servers is secured using 256-bit TLS encryption (HTTPS). Furthermore:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Our production servers operate behind strict Content Security Policies and Next.js Edge proxy guards.</li>
              <li>Administrative access requires cryptographic HMAC-SHA256 session tokens with brute-force rate-limiting.</li>
              <li>Order confirmation URLs utilize cryptographic tokens to prevent unauthorized scraping or enumeration.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-slate-200/80 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#0a193d] flex items-center gap-2">
              <Truck className="w-5 h-5 text-rose-600" />
              4. Return &amp; Hygiene Policy
            </h2>
            <p>
              Due to strict hygiene, medical, and wellness safety regulations, intimate formulas (sprays, oils, personal consumables) cannot be accepted for return once opened. However, if your order arrives damaged, defective, or incorrect, our customer care concierge will dispatch a replacement immediately.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-200/80 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#0a193d] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-rose-600" />
              5. Contact Our Privacy Officer
            </h2>
            <p>
              If you have any questions regarding your confidential records, or wish to request data deletion, contact our Data Privacy Officer:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
              <p>Email: <strong>privacy@playtime.in</strong></p>
              <p>Postal Address: Playtime Wellness Labs, Bandra West, Mumbai, Maharashtra 400050, India</p>
              <p>Confidential WhatsApp Helpline: +91 98765 43210</p>
            </div>
          </section>

        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full btn-navy-red text-white text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
          >
            <span>Return to Storefront</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
