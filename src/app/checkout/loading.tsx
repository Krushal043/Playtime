import React from 'react';
import { Skeleton, TopLoadingBar, HybridLoadingBadge } from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="w-full min-h-screen silver-shade-bg text-slate-900 flex flex-col">
      <TopLoadingBar />
      <HybridLoadingBadge text="Preparing Secure Discreet Checkout..." />

      {/* Header Placeholder */}
      <div className="sticky top-0 z-50 w-full bg-[#051336] h-16 border-b border-blue-900/40 flex items-center px-4 sm:px-8 justify-between">
        <Skeleton className="h-8 w-36 rounded-xl bg-slate-800/80" />
        <Skeleton className="h-9 w-24 rounded-full bg-slate-800/80" />
      </div>

      {/* Stepper Placeholder */}
      <div className="w-full bg-white/80 h-14 border-b border-slate-200/80 flex items-center justify-center gap-4">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-6 w-32 rounded-full" />
      </div>

      {/* Checkout Content Placeholder */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <Skeleton className="h-48 w-full rounded-3xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
        <div className="lg:col-span-5">
          <Skeleton className="h-96 w-full rounded-3xl" />
        </div>
      </main>
    </div>
  );
}
