'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { INFLUENCER_VIDEOS, InfluencerVideo } from '@/data/influencerVideos';
import { Product, ProductPack } from '@/types';
import { LAUNCH_PRODUCTS } from '@/data/products';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  ShoppingBag,
  ExternalLink,
  Flame,
  Heart
} from 'lucide-react';

interface InfluencerVideoSectionProps {
  onAddToCart?: (product: Product, pack: ProductPack) => void;
}

export default function InfluencerVideoSection({ onAddToCart }: InfluencerVideoSectionProps) {
  const [videos, setVideos] = useState<InfluencerVideo[]>(INFLUENCER_VIDEOS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [activeMutedMap, setActiveMutedMap] = useState<Record<string, boolean>>({});
  const [selectedVideo, setSelectedVideo] = useState<InfluencerVideo | null>(null);
  const [modalMuted, setModalMuted] = useState(false);
  const [addedVideoId, setAddedVideoId] = useState<string | null>(null);

  // Fetch dynamic videos from MongoDB
  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.videos) && data.videos.length > 0) {
          setVideos(data.videos);
        }
      })
      .catch((err) => console.error('Error fetching videos from API:', err));
  }, []);

  // References to video elements
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const totalVideos = videos.length;
  // On desktop we display 4 videos at a time, so max sliding index is totalVideos - 4 (with infinite loop wrapping)
  const maxIndex = totalVideos;

  const nextSlide = useCallback(() => {
    if (totalVideos === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalVideos);
  }, [totalVideos]);

  const prevSlide = useCallback(() => {
    if (totalVideos === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalVideos) % totalVideos);
  }, [totalVideos]);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling || isHovered || selectedVideo !== null) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3600);

    return () => clearInterval(interval);
  }, [isAutoScrolling, isHovered, selectedVideo, nextSlide]);

  const toggleSound = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMutedMap((prev) => {
      const current = prev[videoId] ?? true;
      const nextState = !current;
      const el = videoRefs.current[videoId];
      if (el) {
        el.muted = nextState;
      }
      return { ...prev, [videoId]: nextState };
    });
  };

  const handleQuickAdd = (video: InfluencerVideo, e: React.MouseEvent) => {
    e.stopPropagation();
    const product = LAUNCH_PRODUCTS.find((p) => p.id === video.productId);
    if (product && onAddToCart) {
      onAddToCart(product, product.packs[0]);
      setAddedVideoId(video.id);
      setTimeout(() => setAddedVideoId(null), 1800);
    }
  };

  // Build doubled array for seamless infinite carousel wrap
  const displayVideos = videos.length > 0 ? [...videos, ...videos] : [];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/85 border border-slate-200/80 shadow-xs mb-3">
            <Flame className="w-3.5 h-3.5 text-[#FF2D95] fill-current animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0A0A0A]">
              Real Creators &bull; Verified Reviews
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D95]" />
            <span className="text-[10px] font-bold text-slate-500">Trending On Instagram</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0A0A0A] tracking-tight">
            Loved by Doctors, Creators &amp; Couples
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Watch candid unboxings, medical breakdowns, and honest reviews from certified educators and real users.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
          {/* Pause / Play auto-scroll toggle */}
          <button
            type="button"
            onClick={() => setIsAutoScrolling(!isAutoScrolling)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-slate-200/90 text-[#0A0A0A] text-xs font-bold shadow-xs transition-all cursor-pointer"
            title={isAutoScrolling ? 'Pause Auto-Scroll' : 'Resume Auto-Scroll'}
          >
            {isAutoScrolling ? (
              <>
                <Pause className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline text-[11px]">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#FF2D95] fill-current" />
                <span className="hidden sm:inline text-[11px]">Auto-Scroll</span>
              </>
            )}
          </button>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 text-[#0A0A0A] flex items-center justify-center shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
              aria-label="Previous videos"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 text-[#0A0A0A] flex items-center justify-center shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
              aria-label="Next videos"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Track Container (Displays 4 videos at a time on desktop) */}
      <div
        className="overflow-hidden rounded-3xl [--card-step:85%] sm:[--card-step:50%] lg:[--card-step:25%]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(calc(-1 * var(--card-step) * ${currentIndex}))`
          }}
        >
          {displayVideos.map((video, idx) => {
            const isMuted = activeMutedMap[video.id] ?? true;

            return (
              <div
                key={`${video.id}-${idx}`}
                className="w-[var(--card-step)] shrink-0 px-2 sm:px-2.5"
              >
                <div
                  onClick={() => setSelectedVideo(video)}
                  className="group relative h-[410px] sm:h-[480px] rounded-3xl overflow-hidden glass-card card-3d-hover border border-white/95 shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-500 select-none flex flex-col justify-between hover:border-emerald-500/40"
                >
                  {/* Background Video / Animated Poster Loop */}
                  <div className="absolute inset-0 bg-slate-900 z-0">
                    <video
                      ref={(el) => {
                        videoRefs.current[video.id] = el;
                      }}
                      src={video.videoUrl}
                      poster={video.poster}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />

                    {/* Gradient Overlay for Readable Typography */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/70 pointer-events-none" />
                  </div>

                  {/* Top Bar: Creator Info & Sound Control */}
                  <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/80 shrink-0 shadow-sm">
                        <Image
                          src={video.avatar}
                          alt={video.creatorName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-black text-white truncate drop-shadow-sm">
                            {video.creatorName}
                          </p>
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-current shrink-0" />
                        </div>
                        <p className="text-[10px] text-slate-300 truncate font-mono drop-shadow-sm">
                          {video.creatorHandle}
                        </p>
                      </div>
                    </div>

                    {/* Sound Toggle Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleSound(video.id, e)}
                      className="p-2 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 transition-colors cursor-pointer shrink-0 shadow-sm"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-3.5 h-3.5 text-slate-300" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-[#FF2D95]" />
                      )}
                    </button>
                  </div>

                  {/* Center Play Button Overlay (Reveals on Hover) */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:bg-[#FF2D95] transition-all duration-300">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Area: Quote & Tagged Product Card */}
                  <div className="relative z-10 p-3 sm:p-4 space-y-2.5">
                    
                    {/* View Metrics Badge */}
                    <div className="flex items-center justify-between text-[11px] text-white/90">
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 font-bold">
                        <Flame className="w-3 h-3 text-[#FF2D95] fill-current" />
                        {video.views} views
                      </span>
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 font-bold">
                        <Heart className="w-3 h-3 text-[#FF2D95] fill-current" />
                        {video.likes}
                      </span>
                    </div>

                    {/* Creator Quote Bubble */}
                    <p className="text-[11px] text-slate-100 font-medium leading-relaxed line-clamp-2 drop-shadow-sm bg-slate-950/40 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                      &ldquo;{video.quote}&rdquo;
                    </p>

                    {/* Tagged Product Box */}
                    <div className="p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-white text-slate-900 shadow-md flex items-center justify-between gap-2">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <Image
                          src={video.productImage}
                          alt={video.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-xs font-black text-[#0A0A0A] truncate">
                          {video.productName}
                        </p>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xs font-black text-[#FF2D95]">
                            ₹{video.productPrice}
                          </span>
                          <span className="text-[10px] text-slate-400 line-through">
                            ₹{video.productOriginalPrice}
                          </span>
                        </div>
                      </div>

                      {/* Quick Buy / Add Button */}
                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(video, e)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shrink-0 transition-all cursor-pointer shadow-xs ${
                          addedVideoId === video.id
                            ? 'bg-emerald-600 text-white'
                            : 'btn-navy-red text-white hover:opacity-95'
                        }`}
                      >
                        {addedVideoId === video.id ? 'Added!' : 'Shop'}
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {videos.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentIndex % (totalVideos || 1) === idx
                ? 'w-8 btn-navy-red'
                : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Interactive Full-Screen Reel Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg glass-card-elevated rounded-3xl overflow-hidden border border-white/95 shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white border border-white/30 transition-colors cursor-pointer shadow-md"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Area */}
            <div className="relative aspect-[9/14] sm:aspect-[9/13] w-full bg-slate-950 overflow-hidden">
              <video
                src={selectedVideo.videoUrl}
                poster={selectedVideo.poster}
                autoPlay
                controls
                loop
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Creator Info Overlay */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 p-2 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-white">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/80">
                  <Image
                    src={selectedVideo.avatar}
                    alt={selectedVideo.creatorName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="pr-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black">{selectedVideo.creatorName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#007BA7] fill-current" />
                  </div>
                  <span className="text-[10px] text-slate-300">{selectedVideo.creatorHandle}</span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Product Bar */}
            <div className="p-4 sm:p-5 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-500 font-black">
                    {'★'.repeat(selectedVideo.rating)}
                    <span className="text-slate-600 font-bold ml-1">Verified Review</span>
                  </div>
                  <p className="text-xs text-slate-700 italic mt-1 font-medium">
                    &ldquo;{selectedVideo.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Product Direct Action */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 border border-slate-200">
                  <Image
                    src={selectedVideo.productImage}
                    alt={selectedVideo.productName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-[#0A0A0A] truncate">
                    {selectedVideo.productName}
                  </h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-black text-[#FF2D95]">
                      ₹{selectedVideo.productPrice}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{selectedVideo.productOriginalPrice}
                    </span>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Free Shipping
                    </span>
                  </div>
                </div>

                <Link
                  href={`/products/${selectedVideo.productId}`}
                  onClick={() => setSelectedVideo(null)}
                  className="px-5 py-2.5 rounded-full btn-navy-red text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-md hover:shadow-lg transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Buy Now</span>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Plain Unmarked Box Guaranteed &bull; Fast Delivery</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
