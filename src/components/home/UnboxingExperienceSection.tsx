'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ShieldCheck,
  Package,
  EyeOff,
  Lock,
  Play,
  CheckCircle2,
  FileText,
  Truck,
  Sparkles
} from 'lucide-react';

interface UnboxingStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  imageUrl: string;
  features: string[];
}

const UNBOXING_STEPS: UnboxingStep[] = [
  {
    id: 1,
    title: 'The Outer Brown Box',
    subtitle: 'Zero markings. Zero hints. 100% Ordinary.',
    description: 'Looks identical to an everyday electronics or bookstore delivery from Amazon. The shipping label only mentions "PT Logistics Pvt Ltd - Lifestyle Products".',
    badge: 'Step 1: Doorstep Delivery',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1000&auto=format&fit=crop&q=80',
    features: [
      'Unmarked heavy-duty corrugated cardboard',
      'Neutral sender name: "PT Logistics"',
      'No adult product classification or logos',
      'Confidential courier OTP handover'
    ]
  },
  {
    id: 2,
    title: 'Tamper-Evident Security Seal',
    subtitle: 'Ensuring pristine, untampered medical hygiene.',
    description: 'A holographic safety seal guarantees that your order has remained completely untouched and factory-sealed since leaving our certified facility.',
    badge: 'Step 2: Verification',
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1000&auto=format&fit=crop&q=80',
    features: [
      'Holographic void security tape',
      'Moisture-resistant inner vapor barrier',
      'AYUSH & ISO 9001 certified facility seal',
      'Guaranteed untouched by delivery personnel'
    ]
  },
  {
    id: 3,
    title: 'The Luxury Keepsake Box',
    subtitle: 'Midnight Navy & Silver foil aesthetic.',
    description: 'Inside lies our signature matte-finish magnetic closure box. Designed with discreet elegance so it can rest naturally on your bedroom nightstand or dresser.',
    badge: 'Step 3: Reveal',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&auto=format&fit=crop&q=80',
    features: [
      'Soft-touch matte midnight navy finish',
      'Custom molded protective foam tray',
      'Foil-stamped Playtime monogram',
      'Child-safe magnetic closure'
    ]
  },
  {
    id: 4,
    title: 'Blackout Velvet Travel Pouch',
    subtitle: 'For discreet storage and weekend getaways.',
    description: 'Every formula arrives with a complimentary plush velvet travel pouch, allowing you to slip your wellness essentials into any luggage without a second glance.',
    badge: 'Step 4: Everyday Discretion',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1000&auto=format&fit=crop&q=80',
    features: [
      'Thick opaque velvet drawstring pouch',
      'Protects amber glass jars and herbal canisters from light & dust',
      'Fits neatly in any toiletry or overnight bag',
      'Included FREE with orders over ₹999'
    ]
  }
];

export default function UnboxingExperienceSection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  const current = UNBOXING_STEPS[activeStep];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white text-[#0a193d] relative overflow-hidden border-y border-slate-200/70">
      
      {/* Background Subtle Gradient Spheres */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider mb-4 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Plain Packaging &bull; Blind Delivery
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0a193d] tracking-tight mb-4">
            The Blind Box Unboxing Experience
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            We understand discretion isn&apos;t just a feature&mdash;it&apos;s a fundamental requirement. Take a visual walkthrough of exactly what arrives at your doorstep:
          </p>
        </div>

        {/* Step Navigation Pills - Mobile Horizontal Snap Bar */}
        <div className="flex md:grid md:grid-cols-4 overflow-x-auto gap-2.5 sm:gap-4 mb-6 sm:mb-10 pb-2 scrollbar-none snap-x snap-mandatory">
          {UNBOXING_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`w-[68vw] sm:w-[220px] md:w-auto shrink-0 md:shrink snap-start p-3 sm:p-4 rounded-2xl text-left transition-all duration-300 border cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#0a193d] text-white border-[#0a193d] shadow-lg scale-[1.01]'
                    : 'bg-white hover:bg-slate-50 hover:scale-[1.01] text-[#0a193d] border-slate-200/90 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-rose-400' : 'text-slate-500'}`}>
                    0{step.id} &bull; Step
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
                </div>
                <h4 className="text-xs sm:text-sm font-black truncate">{step.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Display Grid */}
        <div className="glass-card-elevated rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/90 card-3d-hover">
          
          {/* Left Column: Visual Photo & Video Embed */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 group">
              <Image
                src={current.imageUrl}
                alt={current.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* Step Pill */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/20">
                  {current.badge}
                </span>
              </div>

              {/* Bottom Image Caption */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                <p className="text-xs font-mono text-slate-300">Verified Confidential Delivery Guarantee</p>
                <p className="text-sm font-black text-white">{current.title}</p>
              </div>
            </div>

            {/* Video Play Trigger Bar */}
            <div className="mt-4 p-3 rounded-2xl bg-slate-100/90 border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-rose-600" />
                <span className="font-bold text-slate-700">Need real video proof of our packaging?</span>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full btn-navy-red text-white text-[11px] font-black cursor-pointer shadow-xs btn-shimmer active:scale-95"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isVideoPlaying ? 'Hide Video' : 'Watch Unboxing'}</span>
              </button>
            </div>

            {/* In-Line Video Player when toggled */}
            {isVideoPlaying && (
              <div className="mt-4 rounded-2xl overflow-hidden border border-slate-300 shadow-xl bg-black">
                <video
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  poster={current.imageUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-56 object-cover"
                />
              </div>
            )}
          </div>

          {/* Right Column: Step Explanations & Features */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-black uppercase tracking-wider mb-2">
                {current.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0a193d] tracking-tight">
                {current.title}
              </h3>
              <p className="text-rose-600 text-xs sm:text-sm font-bold mt-1">
                {current.subtitle}
              </p>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              {current.description}
            </p>

            {/* Bullet Proof Points */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              {current.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Bottom Courier Reassurance */}
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-3">
              <Truck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-black text-blue-950">Courier Confidentiality Agreement</p>
                <p className="text-blue-900/80 font-medium mt-0.5">
                  Our delivery partners sign an enforceable NDA. Delivery executives have zero access to order items or customer medical notes.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
