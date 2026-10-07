'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Volume2, VolumeX, Sparkles, BatteryCharging, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { LAUNCH_PRODUCTS } from '@/data/products';
import { Product, ProductPack } from '@/types';

interface VibrationMode {
  id: number;
  name: string;
  category: string;
  hz: number;
  db: number;
  description: string;
  intensity: 'Gentle' | 'Moderate' | 'Intense' | 'Surge';
}

const MODES: VibrationMode[] = [
  {
    id: 1,
    name: 'Whisper Flutter',
    category: 'Sensory Awakening',
    hz: 45,
    db: 28,
    description: 'Ultra-gentle rhythmic pulses mimicking a feather-light butterfly touch for initial arousal.',
    intensity: 'Gentle'
  },
  {
    id: 2,
    name: 'Ocean Ripple',
    category: 'Escalation',
    hz: 75,
    db: 31,
    description: 'Harmonic rolling waves that stimulate deeper nerve endings without overwhelming sensation.',
    intensity: 'Moderate'
  },
  {
    id: 3,
    name: 'Sonic Clitoral Surge',
    category: 'Climax Drive',
    hz: 120,
    db: 34,
    description: 'Continuous deep resonant vibrations engineered to trigger quick, intense clitoral release.',
    intensity: 'Intense'
  },
  {
    id: 4,
    name: 'Synchronized Staccato',
    category: 'Couples Intercourse',
    hz: 145,
    db: 35,
    description: 'Dual-frequency micro-pulses designed to rest comfortably between bodies during penetrative lovemaking.',
    intensity: 'Surge'
  }
];

interface InteractiveVibrationSimulatorProps {
  onAddToCart?: (product: Product, pack: ProductPack) => void;
}

export default function InteractiveVibrationSimulator({ onAddToCart }: InteractiveVibrationSimulatorProps) {
  const [selectedMode, setSelectedMode] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  const bulletProduct = LAUNCH_PRODUCTS[1]; // Dual Thrill Bullet
  const current = MODES[selectedMode];

  const handleAddProduct = () => {
    if (onAddToCart) {
      onAddToCart(bulletProduct, bulletProduct.packs[0]);
    }
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-slate-950 text-white border-y border-white/10">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-black uppercase tracking-wider mb-4 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-rose-400 fill-current" />
            Interactive Sonic Frequency Lab
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Test The 10 Sonic Wave Modes
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            Experience the precision of German whisper-quiet motor engineering. Under 35 decibels—quieter than a whispered secret in a dark bedroom.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="glass-card-elevated rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl bg-slate-900/80 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Product and Live Wave Animation */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-slate-950/60 border border-white/10 relative overflow-hidden text-center">
            
            {/* Decibel Meter Pill */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{current.db} dB (Whisper Silent)</span>
            </div>

            {/* Battery / Charge Spec Pill */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-slate-300 text-xs font-medium">
              <BatteryCharging className="w-3.5 h-3.5 text-blue-400" />
              <span>Magnetic USB Fast Charge</span>
            </div>

            {/* Product Center Photo with Vibration Effect */}
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 my-6">
              <div className={`relative w-full h-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl transition-all duration-300 ${
                isSimulating ? 'animate-[pulse_1.2s_ease-in-out_infinite] shadow-rose-500/30' : ''
              }`}>
                <Image
                  src={bulletProduct.image}
                  alt={bulletProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Dynamic Wave Rings */}
              {isSimulating && (
                <>
                  <div className="absolute -inset-3 rounded-3xl border border-rose-500/40 animate-ping pointer-events-none opacity-40" />
                  <div className="absolute -inset-6 rounded-3xl border border-blue-500/20 animate-pulse pointer-events-none opacity-30" />
                </>
              )}
            </div>

            {/* Live Frequency Wave Bars */}
            <div className="w-full max-w-xs space-y-2 mt-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Frequency: {current.hz} Hz</span>
                <span className="text-rose-400 font-bold">{current.intensity} Intensity</span>
              </div>

              <div className="flex items-center justify-center gap-1.5 h-10 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                {[...Array(16)].map((_, i) => {
                  const delay = (i * 0.08).toFixed(2);
                  const height = isSimulating ? `${Math.min(100, (current.hz / 1.5) * ((i % 4) + 1) * 0.25)}%` : '20%';
                  return (
                    <div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-blue-400 via-rose-400 to-red-400 rounded-full transition-all duration-300"
                      style={{
                        height,
                        animationDelay: `${delay}s`
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Toggle Simulator */}
            <button
              type="button"
              onClick={() => setIsSimulating(!isSimulating)}
              className="mt-4 text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
            >
              {isSimulating ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSimulating ? 'Pause Frequency Simulator' : 'Resume Frequency Simulator'}</span>
            </button>

          </div>

          {/* Right Column: Mode Selectors & Add to Bag */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-rose-400 text-xs font-black uppercase tracking-wider">
                Current Pattern Selected:
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                {current.name} &bull; {current.hz}Hz
              </h3>
              <p className="text-slate-300 text-sm font-medium mt-2 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Mode Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MODES.map((mode, idx) => {
                const isSelected = selectedMode === idx;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      setSelectedMode(idx);
                      setIsSimulating(true);
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-500/20 border-rose-500 text-white shadow-lg ring-1 ring-rose-500/40'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold text-rose-300 uppercase">
                        Mode 0{mode.id}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">{mode.hz}Hz</span>
                    </div>
                    <p className="text-sm font-black text-white">{mode.name}</p>
                    <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">{mode.category}</p>
                  </button>
                );
              })}
            </div>

            {/* Specs Badges */}
            <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/10 text-xs">
              <div>
                <p className="font-black text-white">IPX7</p>
                <p className="text-[10px] text-slate-400">100% Waterproof</p>
              </div>
              <div>
                <p className="font-black text-white">Medical Liquid</p>
                <p className="text-[10px] text-slate-400">Silicone Touch</p>
              </div>
              <div>
                <p className="font-black text-white">2 Hours</p>
                <p className="text-[10px] text-slate-400">Play Per Charge</p>
              </div>
            </div>

            {/* Add to Bag CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAddProduct}
                className="w-full py-4 rounded-full btn-navy-red text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:shadow-2xl transition-all"
              >
                <Zap className="w-4 h-4 fill-current text-rose-300" />
                <span>Order Dual Thrill Bullet &bull; ₹{bulletProduct.basePrice}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">
                100% Plain Cardboard Packaging &bull; Free Blackout Travel Pouch
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
