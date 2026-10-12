'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import PromoBanner from '@/components/PromoBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  AlertTriangle,
  RotateCcw,
  Home,
  ShieldAlert,
  MessageCircle,
  Lock
} from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error securely for diagnostics
    console.error('Playtime runtime error captured:', error);
  }, [error]);

  return (
    <div className="min-h-screen silver-shade-bg text-slate-900 flex flex-col selection:bg-blue-600/20 selection:text-blue-950">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-xl w-full text-center space-y-8 glass-card-elevated rounded-3xl p-8 sm:p-12 border border-white/90 shadow-2xl">
          
          {/* Error Icon */}
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-inner animate-pulse">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>

          {/* Heading & Information */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-300 text-rose-900 text-[11px] font-bold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              Secure Error Recovery
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0a193d]">
              Something Didn&apos;t Go As Planned
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              We encountered an unexpected glitch while loading this view. Your session, cart, and confidential information remain safe and fully encrypted.
            </p>
          </div>

          {/* Error Digest (if available) */}
          {error?.digest && (
            <div className="bg-slate-100/80 border border-slate-200 rounded-xl px-4 py-2 text-[11px] font-mono text-slate-500 max-w-sm mx-auto select-all">
              Diagnostic Reference: #{error.digest}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full btn-gradient text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Request</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-[#0a193d] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </div>

          {/* Contact Support */}
          <div className="pt-6 border-t border-slate-200/80 text-xs text-slate-500 flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Need immediate assistance? WhatsApp support is available.</span>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
