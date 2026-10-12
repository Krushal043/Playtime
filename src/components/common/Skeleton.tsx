import React from 'react';
import { EyeOff, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import CoupleKissLoader from '@/components/CoupleKissLoader';

// 1. Base Shimmer Primitive
export function Skeleton({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`skeleton-shimmer bg-slate-200/90 rounded-2xl ${className}`}
      {...props}
    />
  );
}

// 2. Glowing Top Micro-Progress Bar (Like YouTube / NProgress for Luxury)
export function TopLoadingBar() {
  return (
    <div className="fixed top-0 inset-x-0 z-[100] h-1 w-full overflow-hidden bg-transparent pointer-events-none">
      <div className="h-full w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-rose-500 animate-[marquee_2s_linear_infinite]" />
    </div>
  );
}

// 3. Floating Hybrid Luxury Brand Status Pill (The "Mix" of Spinner + Skeleton)
export function HybridLoadingBadge({
  text = 'Preparing 100% Discreet Experience...',
}: {
  text?: string;
}) {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[90] pointer-events-none animate-in fade-in slide-in-from-top-3 duration-300">
      <div className="bg-white/95 backdrop-blur-2xl px-4 py-2 rounded-full border border-slate-200/90 shadow-[0_10px_35px_-5px_rgba(5,19,54,0.25)] flex items-center gap-2.5 text-[#051336]">
        {/* Animated Couple Kiss Heart Badge (Blue Man + Red Woman) */}
        <div className="flex items-center gap-0.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-kiss-man" />
          <Heart className="w-3 h-3 fill-rose-600 text-rose-600 animate-kiss-heart" />
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-kiss-woman" />
        </div>
        <span className="text-xs font-black tracking-tight">{text}</span>
        <span className="text-[10px] font-bold text-slate-400 border-l border-slate-200 pl-2 hidden sm:inline">
          PT Logistics
        </span>
      </div>
    </div>
  );
}

// 4. Product Card Skeleton for Grids & Bestsellers Row
export function ProductCardSkeleton() {
  return (
    <div className="rounded-3xl bg-white/90 border border-slate-200/80 p-4 shadow-sm flex flex-col justify-between space-y-4">
      {/* Image box */}
      <Skeleton className="w-full aspect-square rounded-2xl" />

      {/* Title & Tagline */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/3 rounded-full" />
        <Skeleton className="h-5 w-4/5 rounded-lg" />
        <Skeleton className="h-3 w-3/5 rounded-lg" />
      </div>

      {/* Price & Button */}
      <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
        <div className="space-y-1">
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-3 w-14 rounded-md" />
        </div>
        <Skeleton className="h-9 w-24 rounded-full" />
      </div>
    </div>
  );
}

// 5. Complete Product Details Page Skeleton (With Vertical Rail + Above-the-fold Cockpit)
export function ProductDetailSkeleton() {
  return (
    <div className="w-full min-h-screen silver-shade-bg text-slate-900 flex flex-col selection:bg-blue-600/20 selection:text-blue-950">
      <TopLoadingBar />
      <HybridLoadingBadge text="Loading Formulation Details..." />

      {/* Header Placeholder */}
      <div className="sticky top-0 z-50 w-full bg-[#051336] h-16 border-b border-blue-900/40 flex items-center px-4 sm:px-8 justify-between">
        <Skeleton className="h-8 w-36 rounded-xl bg-slate-800/80" />
        <Skeleton className="h-9 w-72 rounded-full hidden lg:block bg-slate-800/80" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-full bg-slate-800/80" />
          <Skeleton className="h-9 w-20 rounded-full bg-slate-800/80" />
        </div>
      </div>

      {/* Breadcrumb Placeholder */}
      <div className="w-full bg-white/70 h-10 border-b border-slate-200/80 px-4 sm:px-8 flex items-center">
        <Skeleton className="h-4 w-48 rounded-md" />
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left 7 cols: Vertical Rail + Main Stage */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <Skeleton className="h-9 w-3/4 rounded-full" />
            <div className="flex flex-col-reverse sm:flex-row gap-3 items-start">
              {/* Vertical Rail */}
              <div className="flex sm:flex-col gap-2.5 w-full sm:w-20 shrink-0">
                <Skeleton className="aspect-square w-14 sm:w-20 rounded-2xl" />
                <Skeleton className="aspect-square w-14 sm:w-20 rounded-2xl" />
                <Skeleton className="aspect-square w-14 sm:w-20 rounded-2xl" />
                <Skeleton className="aspect-square w-14 sm:w-20 rounded-2xl" />
              </div>
              {/* Main Stage with Couple Kiss Loader */}
              <div className="flex-1 aspect-[4/3] max-h-[460px] w-full rounded-3xl bg-white/95 border border-slate-200/90 shadow-sm flex items-center justify-center p-4">
                <CoupleKissLoader size="sm" showLogo={false} subtitle="Loading Formulation Visuals..." />
              </div>
            </div>
            {/* 4 Trust Ribbons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <Skeleton className="h-16 rounded-2xl" />
              <Skeleton className="h-16 rounded-2xl" />
              <Skeleton className="h-16 rounded-2xl" />
              <Skeleton className="h-16 rounded-2xl" />
            </div>
          </div>

          {/* Right 5 cols: Purchase Cockpit */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-5 sm:p-6 bg-white/90 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-28 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-full" />
              </div>
              <Skeleton className="h-8 w-4/5 rounded-xl" />
              <Skeleton className="h-4 w-3/5 rounded-lg" />

              {/* Price box */}
              <Skeleton className="h-20 w-full rounded-2xl" />

              {/* Pack options */}
              <div className="grid grid-cols-3 gap-2">
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
              </div>

              {/* Stepper */}
              <Skeleton className="h-12 w-full rounded-xl" />

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Skeleton className="h-12 rounded-full" />
                <Skeleton className="h-12 rounded-full" />
              </div>

              {/* Pincode checker */}
              <Skeleton className="h-14 w-full rounded-2xl" />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// 6. Complete Home Page Skeleton
export function HomePageSkeleton() {
  return (
    <div className="w-full min-h-screen silver-shade-bg text-slate-900 flex flex-col selection:bg-blue-600/20 selection:text-blue-950">
      <TopLoadingBar />
      <HybridLoadingBadge text="Loading Playtime Formulations..." />

      {/* Header Placeholder */}
      <div className="sticky top-0 z-50 w-full bg-[#051336] h-16 border-b border-blue-900/40 flex items-center px-4 sm:px-8 justify-between">
        <Skeleton className="h-8 w-36 rounded-xl bg-slate-800/80" />
        <Skeleton className="h-9 w-72 rounded-full hidden lg:block bg-slate-800/80" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-full bg-slate-800/80" />
          <Skeleton className="h-9 w-20 rounded-full bg-slate-800/80" />
        </div>
      </div>

      {/* Grand Hero Island Placeholder with Couple Kiss Animation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        <div className="rounded-3xl bg-white/95 border border-slate-200/90 p-6 sm:p-10 shadow-md flex items-center justify-center">
          <CoupleKissLoader size="md" subtitle="Sculpted for Couple Intimacy & Prolonged Pleasure" />
        </div>
      </div>

      {/* Search & Category Pills Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 w-full space-y-4">
        <Skeleton className="h-12 w-full max-w-xl mx-auto rounded-full" />
        <div className="flex justify-center gap-2 overflow-x-auto py-1">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-full" />
          <Skeleton className="h-8 w-32 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>
      </div>

      {/* 4-Card Bestsellers Grid Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48 rounded-xl" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
    </div>
  );
}
