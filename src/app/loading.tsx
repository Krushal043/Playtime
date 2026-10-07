import React from 'react';
import { EyeOff } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen silver-lighting-bg flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-6">
        
        {/* Animated Brand Pulse */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-red-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-red-600">
            <EyeOff className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Text & Discreet Notice */}
        <div className="text-center space-y-1.5">
          <p className="text-sm font-black text-[#0a193d] tracking-wide">
            Loading Playtime
          </p>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Preparing 100% Discreet Experience
          </p>
        </div>

      </div>
    </div>
  );
}
