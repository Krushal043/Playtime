'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Play,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Heart,
  EyeOff,
  Flame,
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react';

export default function FullWidthCinematicBanner() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const scrollToFlagships = () => {
    const el = document.getElementById('flagship-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white my-12 sm:my-16">
      
      {/* Background Cinematic Video with High-Res Fallback Poster */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          poster="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1600&auto=format&fit=crop&q=80"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000"
        />

        {/* Sophisticated Multi-Stop Dark Gradient Overlays for High-Contrast Luxury Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
      </div>

      {/* Main Full-Width Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Bold Headline & Story */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-black uppercase tracking-wider backdrop-blur-md">
              <Flame className="w-3.5 h-3.5 text-rose-400 fill-current" />
              The Art of Unhurried Intimacy
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/20 text-[11px] font-bold backdrop-blur-md">
              <EyeOff className="w-3.5 h-3.5 text-emerald-400" />
              100% Unmarked Doorstep Delivery
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
            Closeness Without Pressure. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-rose-300 to-red-400">
              Confidence In Every Touch.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-medium">
            Modern intimacy is about synchronizing pleasure, not racing against the clock. Formulated with fast-absorbing botanicals and whisper-quiet sonic waves, Playtime is engineered for couples who desire deeper connection.
          </p>

          {/* Social Proof & Clinical Reassurances */}
          <div className="grid grid-cols-3 gap-3 max-w-lg py-2 border-y border-white/10 text-xs">
            <div>
              <p className="text-lg sm:text-xl font-black text-white">500,000+</p>
              <p className="text-[11px] text-slate-400">Couples Satisfied</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-black text-rose-400">10 Min</p>
              <p className="text-[11px] text-slate-400">Zero-Transfer Rate</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-black text-emerald-400">100%</p>
              <p className="text-[11px] text-slate-400">Unmarked Plain Box</p>
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={scrollToFlagships}
              className="px-8 py-4 rounded-full btn-navy-red text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:shadow-2xl transition-all"
            >
              <span>Explore Flagship Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="px-6 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold backdrop-blur-md border border-white/25 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <Play className="w-4 h-4 fill-current text-rose-400" />
              <span>Watch Brand Film (1:12)</span>
            </button>
          </div>

        </div>

        {/* Right Column: Visual Photo Gallery Grid with Video Controller */}
        <div className="lg:col-span-5 relative">
          
          <div className="grid grid-cols-2 gap-3.5">
            {/* Visual Photo Card 1: Minimalist Bedroom Lifestyle */}
            <div className="relative h-56 sm:h-64 rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80"
                alt="Aesthetic Bedside Intimacy"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[9px] font-black uppercase tracking-wider text-rose-300 bg-slate-950/60 px-2 py-0.5 rounded-full border border-white/20">
                  Bedside Ready
                </span>
                <p className="text-xs font-bold text-white mt-1">Sleek Minimalist Aesthetic</p>
              </div>
            </div>

            {/* Visual Photo Card 2: Couple Connection */}
            <div className="relative h-56 sm:h-64 rounded-3xl overflow-hidden border border-white/20 shadow-2xl group mt-6 sm:mt-8">
              <Image
                src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80"
                alt="Couple Romance & Passion"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[9px] font-black uppercase tracking-wider text-emerald-300 bg-slate-950/60 px-2 py-0.5 rounded-full border border-white/20">
                  Doctor Approved
                </span>
                <p className="text-xs font-bold text-white mt-1">Synchronized Climax Box</p>
              </div>
            </div>
          </div>

          {/* Video Control Bar Pill (Floating Over Visuals) */}
          <div className="mt-4 p-2.5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/20 flex items-center justify-between shadow-xl text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-bold text-slate-300">Live Ambient Experience</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={togglePlay}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
              >
                <Play className={`w-3.5 h-3.5 ${isPlaying ? 'opacity-40' : 'fill-current text-rose-400'}`} />
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                )}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Brand Film Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl glass-card-elevated rounded-3xl overflow-hidden border border-white/90 shadow-2xl bg-slate-950 text-white">
            
            {/* Close Modal Button */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white border border-white/30 transition-colors cursor-pointer"
              aria-label="Close brand film"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-slate-950">
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                poster="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1600&auto=format&fit=crop&q=80"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Bottom CTA */}
            <div className="p-5 bg-white text-[#0a193d] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-black text-[#0a193d]">The Playtime Intimacy Standard</h4>
                <p className="text-xs text-slate-500 font-medium">100% Plain carton packaging with zero adult labeling.</p>
              </div>

              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  scrollToFlagships();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full btn-navy-red text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
              >
                Shop Flagships &rarr;
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
