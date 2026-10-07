'use client';

import React, { useState } from 'react';
import { Clock, ShieldCheck, CheckCircle2, Sparkles, Zap, Heart, EyeOff } from 'lucide-react';

export default function ClinicalTimelineSlider() {
  const [activeStep, setActiveStep] = useState(2); // Default on 10 min mark (Key differentiator)

  const steps = [
    {
      time: '0 - 2 Min',
      label: 'Metered Spray',
      headline: 'Targeted Micro-Dispersion',
      badge: 'Step 1: Application',
      description: 'Spray 2-3 metered bursts onto the most sensitive nerve endings of the glans and frenulum. Fast-absorbing aqueous botanical formula with zero greasy residue.',
      stats: '120+ Metered Sprays per Canister',
      highlight: 'Non-greasy, fast penetration'
    },
    {
      time: '5 Min',
      label: 'Nerve Soothing',
      headline: 'Gentle Botanical Desensitization',
      badge: 'Step 2: Active Activation',
      description: 'Active Syzygium aromaticum (pure clove extract) and Pudina Satva gently soothe hyperactive sensory neurons without causing complete numbness or flaccidity.',
      stats: 'Maintains 100% Natural Sensation',
      highlight: 'Zero loss of firmness'
    },
    {
      time: '10 Min',
      label: '100% Absorbed',
      headline: 'Completely Transfer-Free & Dry',
      badge: 'Step 3: Transfer-Free Gate',
      description: 'The formula absorbs fully into epidermal layers. Zero transfer to your partner upon contact, and 100% safe for oral intimate play. No need to wash off.',
      stats: '100% Oral & Condom Safe',
      highlight: 'Partner feels zero numbness'
    },
    {
      time: '15 - 45+ Min',
      label: 'Peak Timing',
      headline: 'Prolonged Control & Stamina',
      badge: 'Step 4: Mutual Harmony',
      description: 'Enjoy prolonged intimacy with complete sensory satisfaction. Enables partners to sync their climaxes and reach deeper connection without psychological performance pressure.',
      stats: 'Clinically Proven 3x Longer Endurance',
      highlight: 'Synchronized mutual climaxes'
    }
  ];

  const current = steps[activeStep];

  return (
    <div className="glass-card-elevated rounded-3xl p-6 sm:p-8 border border-white/95 shadow-xl space-y-6 text-[#0a193d]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider border border-blue-200 mb-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Clinical Absorption Timeline
          </div>
          <h3 className="text-xl font-black text-[#0a193d]">
            How It Works in 10 Minutes
          </h3>
        </div>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          AYUSH Approved &bull; Clinically Tested
        </span>
      </div>

      {/* Interactive Timeline Stepper Buttons */}
      <div className="relative">
        {/* Connecting Progress Track */}
        <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
        <div
          className="hidden sm:block absolute top-1/2 left-0 h-1 btn-navy-red -translate-y-1/2 z-0 transition-all duration-300"
          style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
          {steps.map((st, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-2xl text-center transition-all cursor-pointer border ${
                  isActive
                    ? 'glass-card-elevated border-rose-500 shadow-md ring-2 ring-rose-500/20 scale-[1.02]'
                    : 'bg-white/80 hover:bg-white border-slate-200/80 text-slate-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-black mb-1.5 transition-all ${
                  isActive ? 'btn-navy-red text-white shadow-xs' : 'bg-slate-100 text-slate-500'
                }`}>
                  {idx + 1}
                </div>
                <p className="text-xs font-black text-[#0a193d]">{st.time}</p>
                <p className="text-[10px] text-slate-500 font-medium truncate">{st.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Details Card */}
      <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs space-y-3 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-600">
              {current.badge}
            </span>
            <h4 className="text-base font-black text-[#0a193d]">
              {current.headline}
            </h4>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 self-start sm:self-auto">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>{current.highlight}</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          {current.description}
        </p>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="font-bold text-[#0a193d] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {current.stats}
          </span>
          <span className="text-slate-400">Click steps 1-4 to explore</span>
        </div>
      </div>

    </div>
  );
}
