'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, Heart, Quote, CheckCircle2 } from 'lucide-react';

interface CoupleStory {
  id: number;
  coupleNames: string;
  city: string;
  yearsTogether: string;
  productUsed: string;
  rating: number;
  coupleImage: string;
  hisQuote: string;
  herQuote: string;
}

const COUPLE_STORIES: CoupleStory[] = [
  {
    id: 1,
    coupleNames: 'Vikram & Radhika',
    city: 'Mumbai',
    yearsTogether: 'Married 6 Years',
    productUsed: 'The Power Duo Kit (Double Orgasm Edition)',
    rating: 5,
    coupleImage: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80',
    hisQuote: 'Zero performance anxiety now. The metered spray took me from 3 minutes to a solid 25 minutes without feeling like rubber. Clean, natural, and completely game-changing.',
    herQuote: 'For the first time in years, we are actually climaxing together. The bullet vibes while he penetrates are intense beyond words. Truly brought our honeymoon spark back.'
  },
  {
    id: 2,
    coupleNames: 'Sameer & Tanvi',
    city: 'Bengaluru',
    yearsTogether: 'Together 3 Years',
    productUsed: 'Climax Delay Spray + Dual Thrill Bullet',
    rating: 5,
    coupleImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
    hisQuote: 'The 10-minute wait time is totally worth it because once it absorbs, there is literally zero transfer. We love that oral intimacy is completely unaffected.',
    herQuote: 'I was hesitant about adult wellness products arriving at our apartment society, but the brown box had literally zero markings. Totally discreet and the product feels like luxury cosmetics.'
  }
];

export default function CouplesDualPerspectiveReviews() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden text-[#0a193d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black uppercase tracking-wider mb-4 shadow-2xs">
            <Heart className="w-4 h-4 text-rose-500 fill-current" />
            Synchronized Intimacy Stories
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0a193d] tracking-tight mb-4">
            His Perspective. Her Perspective.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Real verified Indian couples share how Playtime eliminated timing friction and synchronized their deepest climaxes.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="space-y-8">
          {COUPLE_STORIES.map((story) => (
            <div
              key={story.id}
              className="glass-card-elevated rounded-3xl p-6 sm:p-10 border border-white/95 shadow-2xl bg-white/95 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Couple Visual Profile */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <Image
                    src={story.coupleImage}
                    alt={story.coupleNames}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-[#0a193d]">{story.coupleNames}</h4>
                  <p className="text-xs text-slate-500 font-bold">{story.city} &bull; {story.yearsTogether}</p>
                  
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Couple Purchase</span>
                  </div>

                  <p className="text-[11px] font-extrabold text-rose-600 mt-2">
                    Used: {story.productUsed}
                  </p>
                </div>
              </div>

              {/* Side-by-Side Dual Quotes */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* His Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/60 border border-blue-100/80 relative space-y-2 text-left">
                  <Quote className="w-6 h-6 text-blue-300 mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                    His Experience
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium pt-1">
                    &ldquo;{story.hisQuote}&rdquo;
                  </p>
                </div>

                {/* Her Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/60 border border-rose-100/80 relative space-y-2 text-left">
                  <Quote className="w-6 h-6 text-rose-300 mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
                    Her Experience
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium pt-1">
                    &ldquo;{story.herQuote}&rdquo;
                  </p>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
