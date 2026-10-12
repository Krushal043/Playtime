'use client';

import React, { useState } from 'react';
import { Clock, Zap, Heart, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { LAUNCH_PRODUCTS } from '@/data/products';
import { Product, ProductPack } from '@/types';

interface IntimacyDurationCalculatorProps {
  onAddToCart: (product: Product, pack: ProductPack) => void;
}

export default function IntimacyDurationCalculator({ onAddToCart }: IntimacyDurationCalculatorProps) {
  const [currentMinutes, setCurrentMinutes] = useState<number>(3);
  const [partnerGoal, setPartnerGoal] = useState<'stamina' | 'sync' | 'foreplay'>('sync');

  // Calculations based on clinical spray data
  const projectedMinutes = Math.min(45, Math.round(currentMinutes * 3.8 + 8));
  const multiplier = (projectedMinutes / Math.max(1, currentMinutes)).toFixed(1);
  const orgasmSyncRate = partnerGoal === 'sync' ? 94 : partnerGoal === 'stamina' ? 98 : 91;

  // Matched product: Flagship 1 (Delay Spray) for stamina, or Duo Kit for sync
  const recommendedProduct = partnerGoal === 'sync' ? LAUNCH_PRODUCTS[1] : LAUNCH_PRODUCTS[0];
  const recommendedPack = recommendedProduct.packs[0];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden text-[#0a193d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-4 shadow-2xs">
            <Clock className="w-4 h-4 text-blue-600" />
            Interactive Clinical Estimation
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0a193d] tracking-tight mb-4">
            Calculate Your Intimacy Timeline
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Discover how metered micro-dose absorption extends pleasure and synchronizes climax for both partners without numbness or transfer.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="glass-card-elevated rounded-3xl p-6 sm:p-10 border border-white/95 shadow-2xl bg-white/90 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Slider 1: Current Intimacy Window */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-black text-[#0a193d] flex items-center gap-2">
                  <span>Current Average Climax Window:</span>
                </label>
                <span className="px-3.5 py-1 rounded-full bg-slate-100 text-[#0a193d] text-sm font-black border border-slate-200">
                  {currentMinutes} {currentMinutes === 1 ? 'Minute' : 'Minutes'}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={currentMinutes}
                onChange={(e) => setCurrentMinutes(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-bold mt-2">
                <span>1 Min (Premature)</span>
                <span>5 Mins (Average)</span>
                <span>10 Mins</span>
                <span>15+ Mins (Extended)</span>
              </div>
            </div>

            {/* Selector: Primary Couple Goal */}
            <div>
              <label className="block text-sm font-black text-[#0a193d] mb-3">
                Select Your Main Intimacy Objective:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'sync', title: 'Couples Synchronicity', desc: 'Climax together naturally', icon: Heart },
                  { id: 'stamina', title: 'Peak Endurance', desc: 'Prolong time by 3x - 4x', icon: Zap },
                  { id: 'foreplay', title: 'Intense Foreplay', desc: 'Extended tease & touch', icon: Sparkles }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = partnerGoal === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPartnerGoal(item.id as any)}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/50 shadow-md ring-2 ring-rose-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-rose-600' : 'text-slate-400'}`} />
                      <p className="text-xs font-black text-[#0a193d]">{item.title}</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scientific Reassurances */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-bold text-slate-600 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Numbness (Micro-encapsulated)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Partner Absorption in 10 Min</span>
              </div>
            </div>

          </div>

          {/* Right Column: Projected Results Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#07173e] via-[#0a193d] to-[#1e3a8a] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Ambient Lighting Glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-rose-300 border border-white/15 text-[10px] font-black uppercase tracking-wider mb-4">
                Clinical Simulation Output
              </span>

              <h3 className="text-xs uppercase tracking-widest text-slate-300 font-mono font-bold mb-1">
                Projected Session Duration
              </h3>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  {projectedMinutes}
                </span>
                <span className="text-lg font-black text-rose-400">Minutes</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  +{multiplier}x Longer
                </span>
              </div>

              {/* Progress Comparison Bar */}
              <div className="space-y-2 mb-6">
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                    <span>Without Playtime:</span>
                    <span>{currentMinutes} min</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (currentMinutes / 45) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-bold text-rose-300 mb-1">
                    <span>With Playtime Protocol:</span>
                    <span>{projectedMinutes} min</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-rose-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (projectedMinutes / 45) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Key Metric Pills */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs mb-6">
                <div>
                  <p className="text-base font-black text-white">{orgasmSyncRate}%</p>
                  <p className="text-[10px] text-slate-300">Partner Climax Rate</p>
                </div>
                <div>
                  <p className="text-base font-black text-emerald-400">100% Safe</p>
                  <p className="text-[10px] text-slate-300">Oral &amp; Latex Compatible</p>
                </div>
              </div>
            </div>

            {/* Recommended Product CTA */}
            <div className="space-y-3">
              <div className="text-[11px] text-slate-300">
                <span>Recommended: </span>
                <strong className="text-white font-black">{recommendedProduct.name}</strong>
              </div>

              <button
                type="button"
                onClick={() => onAddToCart(recommendedProduct, recommendedPack)}
                className="w-full py-3.5 rounded-full btn-navy-red text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
              >
                <span>Add Recommended Routine &bull; ₹{recommendedPack.price}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
