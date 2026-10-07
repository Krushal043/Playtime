'use client';

import React from 'react';
import Image from 'next/image';
import { TESTIMONIALS } from '@/data/products';
import { Star, ShieldCheck, CheckCircle2, MessageSquareHeart } from 'lucide-react';

export default function CustomerReviews() {
  return (
    <section id="reviews" className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Header with aggregate score */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-[#0a193d] text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <MessageSquareHeart className="w-3.5 h-3.5 text-rose-600" />
            Real Customer Stories
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0a193d] tracking-tight">
            Loved By 5,00,000+ Couples
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Read verified experiences on product performance, quality, and complete delivery discretion.
          </p>
        </div>

        {/* Score Card in Frosted Glass */}
        <div className="flex items-center gap-4 p-4 rounded-2xl glass-card-elevated border border-white/95 shadow-md">
          <div className="text-3xl font-black text-[#0a193d]">4.9</div>
          <div className="space-y-0.5">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-[11px] font-bold text-slate-500">Based on 18,400+ reviews</p>
          </div>
        </div>
      </div>

      {/* Review Cards Grid / Mobile Horizontal Swipe Reel */}
      <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 sm:gap-6 pb-2 scrollbar-none">
        {TESTIMONIALS.map((review, idx) => (
          <div
            key={idx}
            className="w-[84vw] sm:w-[360px] md:w-auto shrink-0 md:shrink snap-center glass-card card-3d-hover p-5 sm:p-6 rounded-3xl flex flex-col justify-between"
          >
            <div>
              {/* Star rating & Date */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-emerald-800 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified Buyer
                </span>
              </div>

              {/* Product purchased tag */}
              <div className="mb-3">
                <span className="px-3 py-1 rounded-full bg-slate-100/90 text-slate-700 border border-slate-200/80 text-[10px] font-bold inline-block">
                  Purchased: {review.product}
                </span>
              </div>

              {/* Comment text */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-6">
                &ldquo;{review.comment}&rdquo;
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#0a193d]">{review.name}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{review.location}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="md:hidden flex items-center justify-center gap-1.5 pt-3 text-[11px] text-slate-500 font-semibold">
        <span>&larr; Swipe verified customer reviews &rarr;</span>
      </div>

    </section>
  );
}
