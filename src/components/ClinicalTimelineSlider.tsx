'use client';

import React, { useState } from 'react';
import { Clock, ShieldCheck, CheckCircle2, Sparkles, Zap, Heart, EyeOff } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function ClinicalTimelineSlider() {
  const { timelineSteps } = useSettings();
  const [activeStep, setActiveStep] = useState(2); // Default on 10 min mark

  const current = timelineSteps[activeStep] || timelineSteps[0];
  if (!current) return null;

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
            How Micro-Absorption Works In Real-Time
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-500">Zero Lidocaine &bull; 100% Ayurvedic</span>
        </div>
      </div>

      {/* Interactive Step Switcher Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {timelineSteps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={step.id || idx}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                isActive
                  ? 'bg-gradient-to-br from-[#051336] to-[#0e2a66] text-white border-blue-500/40 shadow-lg scale-[1.02]'
                  : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {step.time}
                </span>
                {isActive && <Sparkles className="w-3 h-3 text-amber-300" />}
              </div>
              <h4 className="text-xs font-black truncate">{step.label}</h4>
            </button>
          );
        })}
      </div>

      {/* Detail Showcase Card for Active Milestone */}
      <div className="bg-slate-50/90 rounded-2xl p-5 sm:p-6 border border-slate-200/90 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">
              {current.badge}
            </span>
            <h4 className="text-lg font-black text-[#051336] mt-0.5">{current.headline}</h4>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black self-start sm:self-auto border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{current.highlight}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
          {current.description}
        </p>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-black text-[#051336]">
          <span>Verified Clinical Data:</span>
          <span className="text-rose-600 font-black tracking-wide">{current.stats}</span>
        </div>
      </div>
    </div>
  );
}
