import React from 'react';
import Link from 'next/link';
import PromoBanner from '@/components/PromoBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  HelpCircle,
  Package,
  Home
} from 'lucide-react';

export default function NotFound() {
  const quickLinks = [
    { label: 'Long Last Spray (Extend)', href: '/#products', icon: Sparkles },
    { label: 'Himalayan Shilajit Gold', href: '/#products', icon: Package },
    { label: 'Track Existing Order', href: '/account', icon: ShoppingBag },
    { label: 'Checkout & Discreet Cart', href: '/checkout', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen silver-shade-bg text-slate-900 flex flex-col selection:bg-blue-600/20 selection:text-blue-950">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-2xl w-full text-center space-y-8">
          
          {/* Badge & Big 404 Illustration */}
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-rose-500/10 to-indigo-500/20 blur-2xl rounded-full pointer-events-none" />
            <div className="relative">
              <span className="text-8xl sm:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#0a193d] via-slate-700 to-rose-600 font-mono select-none drop-shadow-sm">
                404
              </span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-slate-200/90 shadow-md text-[11px] font-black uppercase tracking-wider text-rose-600">
                <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                Lost In Transition
              </div>
            </div>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl font-black text-[#0a193d] tracking-tight">
              Page Disappeared Discreetly
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
              Just like our 100% unmarked packaging, this page left zero trace. The link may have moved, expired, or been removed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full btn-navy-red text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Back To Storefront</span>
            </Link>

            <Link
              href="/#products"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-[#0a193d] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Explore Formulations</span>
              <ArrowRight className="w-4 h-4 text-rose-600" />
            </Link>
          </div>

          {/* Helpful Category Shortcuts */}
          <div className="pt-8 border-t border-slate-200/60 max-w-lg mx-auto">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Popular Destinations
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="p-3 rounded-2xl bg-white/70 hover:bg-white border border-slate-200/80 hover:border-slate-300 text-left flex items-center gap-2.5 group transition-all shadow-xs hover:shadow-sm"
                  >
                    <div className="w-7 h-7 rounded-xl bg-slate-100 group-hover:bg-rose-50 text-slate-700 group-hover:text-rose-600 flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-[#0a193d] truncate">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Discreet Help Assurance */}
          <div className="inline-flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Need immediate discreet assistance? Our team is active 24/7.</span>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
