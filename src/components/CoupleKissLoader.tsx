'use client';

import React from 'react';
import Image from 'next/image';
import { EyeOff, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface CoupleKissLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  subtitle?: string;
  showLogo?: boolean;
}

export default function CoupleKissLoader({
  size = 'md',
  subtitle = 'Formulated for Couple Intimacy & Connection',
  showLogo = true,
}: CoupleKissLoaderProps) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';
  const isFullscreen = size === 'fullscreen';

  return (
    <div
      className={`flex flex-col items-center justify-center select-none text-center ${
        isFullscreen
          ? 'min-h-[70vh] w-full flex items-center justify-center p-6'
          : isSm
          ? 'p-3'
          : 'p-6 sm:p-8'
      }`}
    >
      {/* Ambient Couple Glow (Blue Man Glow + Red Woman Glow) */}
      <div className="relative flex items-center justify-center">
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-32 h-32 bg-[#007BA7]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-32 h-32 bg-[#FF2D95]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 m-auto w-24 h-24 bg-[#0A0A0A]/20 rounded-full blur-2xl pointer-events-none" />

        {/* ARTISTIC MAN & WOMAN KISSING SILHOUETTE (INSPIRED DIRECTLY BY PLAYTIME BRAND LOGO) */}
        <div
          className={`relative ${
            isSm
              ? 'w-40 h-32'
              : isLg
              ? 'w-72 sm:w-80 h-52 sm:h-60'
              : 'w-56 sm:w-64 h-44 sm:h-52'
          }`}
        >
          <svg
            viewBox="0 0 320 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full filter drop-shadow-[0_12px_28px_rgba(0,123,167,0.18)]"
          >
            <defs>
              {/* Man: Jet Black to Cerulean Blue Ribbon */}
              <linearGradient id="manLogoGradient" x1="50" y1="30" x2="160" y2="190" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0A0A0A" />
                <stop offset="40%" stopColor="#00587a" />
                <stop offset="85%" stopColor="#007BA7" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>

              {/* Woman: Jet Black to Neon Rose Ribbon */}
              <linearGradient id="womanLogoGradient" x1="270" y1="40" x2="160" y2="190" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0A0A0A" />
                <stop offset="40%" stopColor="#9b1150" />
                <stop offset="85%" stopColor="#FF2D95" />
                <stop offset="100%" stopColor="#ff70b5" />
              </linearGradient>

              {/* Center Kiss Union Heart */}
              <linearGradient id="kissHeartGlow" x1="145" y1="90" x2="175" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#007BA7" />
                <stop offset="50%" stopColor="#c026d3" />
                <stop offset="100%" stopColor="#FF2D95" />
              </linearGradient>

              {/* Ayurvedic Leaf Emerald Gradient */}
              <linearGradient id="leafEmeraldGrad" x1="150" y1="20" x2="170" y2="45" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="60%" stopColor="#16a34a" />
                <stop offset="100%" stopColor="#14532d" />
              </linearGradient>

              <filter id="kissHeartDropGlow" x="130" y="80" width="60" height="60" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#FF2D95" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* ---------------- MAN (LEFT PROFILE - INTERTWINED ELECTRIC BLUE RIBBON) ---------------- */}
            <g className="animate-kiss-man">
              {/* Head Hair & Forehead */}
              <path
                d="M 125 38 C 120 32, 110 32, 102 36 C 92 40, 85 52, 88 64 C 90 72, 97 78, 100 85 C 96 86, 92 84, 88 80 C 86 92, 96 102, 108 102 C 104 108, 98 114, 94 122 C 86 138, 76 156, 60 172 C 55 177, 60 184, 68 181 C 92 172, 110 152, 122 134 C 128 124, 131 114, 134 105 C 137 96, 135 91, 130 89 C 137 84, 142 75, 139 65 C 136 54, 130 44, 125 38 Z"
                fill="url(#manLogoGradient)"
                opacity="0.95"
              />
              {/* Masculine Jawline & Gentle Neck Ribbon Swirl */}
              <path
                d="M 122 66 C 131 72, 137 78, 140 86 C 135 90, 131 92, 128 92 C 135 98, 136 104, 131 108 C 123 114, 115 114, 108 122 C 98 134, 92 152, 90 178"
                stroke="#93c5fd"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.95"
              />
              {/* Soft Closed Eye */}
              <path
                d="M 115 72 Q 124 75, 128 72"
                stroke="#bfdbfe"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />
              {/* Swirling Logo Infinity Ribbon Loop Base */}
              <path
                d="M 68 181 C 90 172, 125 155, 145 175 C 155 185, 168 190, 185 186 C 170 195, 145 196, 130 184 C 112 170, 85 184, 68 181 Z"
                fill="url(#manLogoGradient)"
                opacity="0.8"
              />
            </g>

            {/* ---------------- WOMAN (RIGHT PROFILE - PASSION RUBY RED RIBBON) ---------------- */}
            <g className="animate-kiss-woman">
              {/* Elegant Feminine Head Silhouette & Curving Back Ribbon */}
              <path
                d="M 195 48 C 205 38, 220 38, 230 46 C 240 54, 244 68, 240 82 C 236 94, 226 102, 222 114 C 218 126, 219 138, 228 148 C 240 160, 256 168, 265 174 C 270 178, 266 185, 258 184 C 240 182, 222 170, 210 155 C 200 142, 196 128, 192 115 C 188 104, 185 96, 190 90 C 182 85, 178 75, 181 65 C 184 56, 189 51, 195 48 Z"
                fill="url(#womanLogoGradient)"
                opacity="0.95"
              />
              {/* Feminine Lip & Nose Profile Contour */}
              <path
                d="M 198 66 C 189 72, 183 78, 180 86 C 185 90, 189 92, 192 92 C 185 98, 184 104, 189 108 C 197 114, 205 114, 212 122 C 222 134, 228 152, 230 178"
                stroke="#fda4af"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.95"
              />
              {/* Gentle Feminine Eyelash */}
              <path
                d="M 205 72 Q 196 75, 192 72"
                stroke="#fecdd3"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />
              {/* Interlocking Ribbon Sweep under Man */}
              <path
                d="M 258 184 C 235 186, 195 175, 175 195 C 160 208, 135 204, 120 196 C 140 204, 165 202, 180 188 C 200 170, 235 180, 258 184 Z"
                fill="url(#womanLogoGradient)"
                opacity="0.8"
              />
            </g>

            {/* ---------------- AYURVEDIC GREEN LEAF (FROM THE PLAYTIME LOGO) ---------------- */}
            <g className="animate-pulse">
              <path
                d="M 160 24 C 152 28, 148 38, 153 47 C 161 47, 171 42, 173 33 C 174 25, 168 22, 160 24 Z"
                fill="url(#leafEmeraldGrad)"
              />
              <path
                d="M 155 38 Q 163 35, 168 30"
                stroke="#bbf7d0"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* ---------------- CENTER KISS UNION HEART (LIPS TOUCH POINT) ---------------- */}
            <g className="animate-kiss-heart">
              <path
                d="M 160 92 C 160 84, 150 78, 142 81 C 132 85, 132 98, 142 106 L 160 122 L 178 106 C 188 98, 188 85, 178 81 C 170 78, 160 84, 160 92 Z"
                fill="url(#kissHeartGlow)"
                filter="url(#kissHeartDropGlow)"
              />
            </g>

            {/* ---------------- FLOATING VITALITY SPARKLES ---------------- */}
            <g className="animate-kiss-sparkle">
              {/* Central Golden Ayurvedic Sparkle */}
              <path
                d="M 160 58 L 162 65 L 169 67 L 162 69 L 160 76 L 158 69 L 151 67 L 158 65 Z"
                fill="#fbbf24"
                opacity="0.95"
              />
              {/* Emerald Vitality Sparkle */}
              <circle cx="140" cy="52" r="3.5" fill="#22c55e" opacity="0.9" />
              {/* Passion Ruby Sparkle */}
              <circle cx="180" cy="54" r="3.5" fill="#f43f5e" opacity="0.9" />
              {/* Electric Cyan Sparkle */}
              <circle cx="160" cy="45" r="2.8" fill="#38bdf8" opacity="0.85" />
            </g>
          </svg>
        </div>
      </div>

      {/* Brand & Loading Labels */}
      <div className="mt-4 space-y-2.5 max-w-sm mx-auto">
        {showLogo && (
          <div className="relative h-10 w-40 sm:h-11 sm:w-44 mx-auto filter drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)]">
            <Image
              src="/logo.png"
              alt="Playtime"
              fill
              priority
              className="object-contain"
            />
          </div>
        )}

        {/* Dynamic Micro-Progress Bar in Playtime Colors (Jet Black, Cerulean Blue, Neon Rose) */}
        <div className="w-40 sm:w-48 h-1.5 rounded-full bg-slate-200/90 mx-auto overflow-hidden shadow-inner">
          <div className="h-full w-full bg-gradient-to-r from-[#0A0A0A] via-[#007BA7] to-[#FF2D95] animate-[marquee_1.5s_linear_infinite]" />
        </div>

        <p className="text-xs sm:text-sm font-black text-[#0A0A0A] tracking-tight">
          {subtitle}
        </p>

        {/* 100% Blind Box Confidential Reassurance */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border border-slate-200/90 text-slate-600 text-[10px] font-bold shadow-2xs">
          <EyeOff className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>100% Plain Unmarked Box &bull; Billed as &ldquo;PT Logistics&rdquo;</span>
        </div>
      </div>
    </div>
  );
}
