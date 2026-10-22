'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

interface SmoothLoaderProps {
  onDone?: () => void;
  durationMs?: number;
}

export default function SmoothLoader({
  onDone,
  durationMs = 2200,
}: SmoothLoaderProps) {
  const [phase, setPhase] = useState<'loading' | 'dissolving' | 'done'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress
    const milestones = [
      { pct: 35, delay: 300 },
      { pct: 68, delay: 900 },
      { pct: 88, delay: 1500 },
      { pct: 100, delay: durationMs - 300 },
    ];

    const timers = milestones.map(({ pct, delay }) =>
      setTimeout(() => setProgress(pct), delay)
    );

    // Begin dissolve
    const dissolveTimer = setTimeout(() => {
      setPhase('dissolving');
    }, durationMs);

    // Remove from DOM
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onDone?.();
    }, durationMs + 600);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(dissolveTimer);
      clearTimeout(doneTimer);
    };
  }, [durationMs, onDone]);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A] transition-all duration-600 ease-out ${
        phase === 'dissolving' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-hidden
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#007BA7]/20 rounded-full blur-[120px] pointer-events-none animate-aurora-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF2D95]/15 rounded-full blur-[100px] pointer-events-none animate-aurora-pulse [animation-delay:2s]" />

      {/* Logo */}
      <div className="relative mb-10 loader-logo-pulse">
        <div className="w-40 h-16 relative">
          <Image
            src="/logo.png"
            alt="Playtime"
            fill
            className="object-contain brightness-[2] saturate-0 invert"
            priority
          />
        </div>
      </div>

      {/* Progress bar track */}
      <div className="relative w-64 sm:w-80 h-1 bg-white/10 rounded-full overflow-hidden mb-5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#007BA7] via-[#0095cc] to-[#FF2D95] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
        {/* Moving glow dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,45,149,0.9)] -translate-x-1/2 transition-all duration-500 ease-out"
          style={{ left: `${progress}%` }}
        />
      </div>

      {/* Status text */}
      <p className="text-[11px] font-bold text-slate-400 tracking-[0.15em] uppercase mb-2">
        {progress < 40
          ? 'Preparing formulations…'
          : progress < 80
          ? 'Securing discreet channel…'
          : progress < 100
          ? 'Almost there…'
          : 'Welcome to Playtime'}
      </p>

      {/* Trust pill */}
      <div className="flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-[10px] text-slate-400 font-medium">100% Discreet Delivery Guaranteed</span>
      </div>
    </div>
  );
}
