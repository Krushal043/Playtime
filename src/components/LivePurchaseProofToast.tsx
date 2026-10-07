'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShieldCheck, CheckCircle2, X } from 'lucide-react';

interface PurchaseProof {
  id: number;
  customer: string;
  city: string;
  product: string;
  timeAgo: string;
  imageUrl: string;
}

const RECENT_PURCHASES: PurchaseProof[] = [
  {
    id: 1,
    customer: 'Rahul S.',
    city: 'Bengaluru',
    product: 'Playtime Climax Delay Spray (30ml)',
    timeAgo: '2 mins ago',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    customer: 'Pooja & Karan',
    city: 'Mumbai',
    product: 'Playtime Power Duo Kit (Double Orgasm Edition)',
    timeAgo: '5 mins ago',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    customer: 'Aman V.',
    city: 'Delhi NCR',
    product: 'Playtime Climax Delay Spray (Twin Value Pack)',
    timeAgo: '8 mins ago',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    customer: 'Neha M.',
    city: 'Pune',
    product: 'Playtime Dual Thrill Clitoral Bullet',
    timeAgo: '12 mins ago',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    customer: 'Vikram T.',
    city: 'Hyderabad',
    product: 'Playtime Climax Delay Spray (30ml)',
    timeAgo: '15 mins ago',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80'
  }
];

export default function LivePurchaseProofToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show initial toast after 4 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Rotate toast every 12 seconds (show 5s, hide 7s)
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
        setIsVisible(true);
      }, 1500);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const current = RECENT_PURCHASES[currentIndex];

  return (
    <aside 
      aria-label="Recent verified order notification"
      className="fixed bottom-20 left-4 sm:left-6 z-40 max-w-sm w-[calc(100%-2rem)] sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
    >
      <div className="glass-card-elevated p-3 sm:p-3.5 rounded-2xl border border-white/90 shadow-2xl bg-white/95 text-[#0a193d] flex items-center gap-3 relative overflow-hidden">
        
        {/* Thumbnail Image */}
        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
          <Image
            src={current.imageUrl}
            alt={current.product}
            fill
            className="object-cover"
          />
        </div>

        {/* Content details */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
            <span className="text-[#0a193d] font-black">{current.customer}</span>
            <span>&bull;</span>
            <span>{current.city}</span>
            <span>&bull;</span>
            <span className="text-rose-600 font-extrabold">{current.timeAgo}</span>
          </div>

          <p className="text-xs font-black text-[#0a193d] truncate mt-0.5">
            Purchased {current.product}
          </p>

          <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 mt-0.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>100% Unmarked Plain Box Delivery</span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 rounded-full transition-colors cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </aside>
  );
}
