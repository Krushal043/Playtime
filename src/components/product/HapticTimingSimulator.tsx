'use client';

import React, { useState } from 'react';
import { Clock, ShieldAlert, Sparkles, CheckCircle2, Zap, Heart, ArrowRight } from 'lucide-react';

export default function HapticTimingSimulator() {
  const [selectedMinutes, setSelectedMinutes] = useState(10);

  const checkpoints = [
    {
      minute: 2,
      label: 'Minute 2: Application',
      ayurvedicState: 'Aqueous clove micro-droplets absorb into skin surface. Refreshing botanical cooling sensation.',
      syntheticState: 'Heavy burning sensation; chemical lidocaine begins deadening nerve receptors.',
      intensity: 20,
    },
    {
      minute: 5,
      label: 'Minute 5: Deep Permeation',
      ayurvedicState: 'Active Eugenol molecules reach sub-dermal neuro-sensors. Zero numbness felt in underlying tissue.',
      syntheticState: 'Complete skin numbness; touch sensation drops by 80%. Risk of losing erection.',
      intensity: 50,
    },
    {
      minute: 10,
      label: 'Minute 10: Full Activation',
      ayurvedicState: 'Formula is 100% dry and absorbed. Zero transfer to partner during intimacy. Full pleasure preserved.',
      syntheticState: 'Chemical film remains wet on skin; transfers to partner causing mutual numbness.',
      intensity: 85,
    },
    {
      minute: 40,
      label: 'Minute 40: Peak Intimacy',
      ayurvedicState: 'Prolonged intimate endurance and natural climax control. Deep emotional connection and mutual satisfaction.',
      syntheticState: 'Premature wear-off or unpleasant lingering anesthesia lasting for hours.',
      intensity: 100,
    },
  ];

  const current = checkpoints.find((c) => c.minute === selectedMinutes) || checkpoints[2];

  const handleSelect = (min: number) => {
    setSelectedMinutes(min);
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(35);
      } catch {}
    }
  };

  return (
    <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 w-full">
      <div className="glass-card-elevated rounded-3xl p-6 sm:p-10 border border-white/90 shadow-2xl space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-black uppercase tracking-wider shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Sensory Science</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0a193d] tracking-tight">
            How Botanical Timing Outperforms Chemical Numbing
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Drag through the timeline below to experience how natural Lavang (Clove) preserves 100% of your intimacy sensation while giving 4x natural endurance.
          </p>
        </div>

        {/* Interactive Timeline Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {checkpoints.map((cp) => (
            <button
              key={cp.minute}
              type="button"
              onClick={() => handleSelect(cp.minute)}
              className={`p-3.5 rounded-2xl text-center border transition-all cursor-pointer ${
                selectedMinutes === cp.minute
                  ? 'bg-[#0a193d] text-white border-[#0a193d] shadow-md shadow-blue-950/20 scale-[1.02]'
                  : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200/90'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-black">
                <Clock className={`w-3.5 h-3.5 ${selectedMinutes === cp.minute ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{cp.minute} Mins</span>
              </div>
              <p className={`text-[10px] mt-1 font-semibold truncate ${selectedMinutes === cp.minute ? 'text-slate-300' : 'text-slate-500'}`}>
                {cp.minute === 2 ? 'Onset' : cp.minute === 5 ? 'Absorption' : cp.minute === 10 ? 'Ready' : 'Peak Climax'}
              </p>
            </button>
          ))}
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          {/* Playtime Ayurvedic Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-emerald-50/80 border border-emerald-200/90 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                    Playtime Extend Formula
                  </h4>
                  <p className="text-[10px] text-emerald-700 font-bold">100% Ayurvedic • Zero Transfer</p>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
              {current.ayurvedicState}
            </p>

            <div className="pt-2 flex items-center gap-3 text-[11px] font-bold text-emerald-800">
              <div className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                <span>Pleasure: 100% Intact</span>
              </div>
              <span>&bull;</span>
              <span>Zero Partner Transfer</span>
            </div>
          </div>

          {/* Ordinary Chemical Sprays Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-rose-50/60 border border-rose-200/80 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-600 text-white shadow-xs">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-rose-950 uppercase tracking-wider">
                    Ordinary Lidocaine Sprays
                  </h4>
                  <p className="text-[10px] text-rose-700 font-bold">Synthetic Anesthetic Chemical</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-rose-600 font-bold bg-white px-2 py-0.5 rounded-full border border-rose-200">
                Outdated
              </span>
            </div>

            <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-medium">
              {current.syntheticState}
            </p>

            <div className="pt-2 flex items-center gap-3 text-[11px] font-bold text-rose-700">
              <span>Numb &amp; Deadened Feeling</span>
              <span>&bull;</span>
              <span>Ruins Partner Experience</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
