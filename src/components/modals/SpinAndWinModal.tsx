'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Gift, Check, Clock, Trophy, ArrowRight, RotateCw } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Segment {
  label: string;
  code: string;
  discountDesc: string;
  color: string;
  textColor: string;
}

const SEGMENTS: Segment[] = [
  { label: '₹150 FLAT OFF', code: 'SECRET150', discountDesc: 'Flat ₹150 Instant Off on cart', color: '#b91c1c', textColor: '#ffffff' },
  { label: '20% EXTRA OFF', code: 'PLAY20', discountDesc: 'Huge 20% Off on entire order', color: '#15803d', textColor: '#ffffff' },
  { label: 'FREE DELIVERY', code: 'FREESHIP', discountDesc: 'Free Discreet Express Shipping', color: '#1d4ed8', textColor: '#ffffff' },
  { label: '₹100 INSTANT', code: 'LUCKY100', discountDesc: 'Flat ₹100 Off on your order', color: '#c2410c', textColor: '#ffffff' },
  { label: '15% OFF DUO', code: 'PLAY15', discountDesc: '15% Off on flagship bundles', color: '#4338ca', textColor: '#ffffff' },
  { label: 'MYSTERY GIFT', code: 'AYURGIFT', discountDesc: 'Free Ayurvedic Herb Bonus + ₹120 OFF', color: '#854d0e', textColor: '#ffffff' },
];

export default function SpinAndWinModal() {
  const { applyPromo, setIsCartOpen } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonSegment, setWonSegment] = useState<Segment | null>(null);
  const [stage, setStage] = useState<'wheel' | 'scratch' | 'claimed'>('wheel');
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [scratchPercent, setScratchPercent] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  // Check saved state from localStorage
  useEffect(() => {
    try {
      const savedWon = localStorage.getItem('playtime_won_prize');
      if (savedWon) {
        const parsed = JSON.parse(savedWon);
        setWonSegment(parsed);
        setHasSpun(true);
        setStage('scratch');
      }
    } catch {
      // fallback
    }

    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener('open-spin-modal', handleCustomOpen);
    return () => window.removeEventListener('open-spin-modal', handleCustomOpen);
  }, []);

  // Urgency Countdown timer
  useEffect(() => {
    if (stage !== 'scratch' && stage !== 'claimed') return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [stage]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Spin the wheel handler
  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Pick a winning index (favoring high-conversion rewards like SECRET150 or PLAY20)
    const luckyIndices = [0, 1, 3, 5];
    const winningIndex = luckyIndices[Math.floor(Math.random() * luckyIndices.length)];
    const segmentAngle = 360 / SEGMENTS.length;
    
    // Calculate total rotation: at least 5 full rotations (1800 deg) + segment target offset
    // In SVG roulette: 0 deg points right, top pointer is at 270 deg
    const targetOffset = 360 - (winningIndex * segmentAngle + segmentAngle / 2);
    const totalSpins = 360 * 5;
    const finalRotation = rotation + totalSpins + targetOffset;

    setRotation(finalRotation);

    setTimeout(() => {
      const winner = SEGMENTS[winningIndex];
      setWonSegment(winner);
      setHasSpun(true);
      setIsSpinning(false);
      try {
        localStorage.setItem('playtime_won_prize', JSON.stringify(winner));
      } catch {
        // ignore
      }
      // Auto transition to scratch card after slight pause
      setTimeout(() => {
        setStage('scratch');
      }, 1200);
    }, 4500);
  };

  // Initialize Canvas Scratch foil
  useEffect(() => {
    if (stage !== 'scratch' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Create luxury golden foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#eab308');
    grad.addColorStop(0.3, '#fef08a');
    grad.addColorStop(0.5, '#ca8a04');
    grad.addColorStop(0.8, '#fef9c3');
    grad.addColorStop(1, '#a16207');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add luxury sparkling pattern text over the foil
    ctx.fillStyle = '#713f12';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE WITH FINGER ✨', width / 2, height / 2 - 8);
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#854d0e';
    ctx.fillText('Rub to reveal your secret code', width / 2, height / 2 + 16);
  }, [stage]);

  // Scratch action handlers (mouse & touch)
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Estimate scratch percentage
    setScratchPercent((prev) => Math.min(prev + 4, 100));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  // Quick reveal helper
  const handleRevealAll = () => {
    setScratchPercent(100);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleCopyAndApply = () => {
    if (!wonSegment) return;
    navigator.clipboard?.writeText(wonSegment.code);
    setCopied(true);
    applyPromo(wonSegment.code);
    setApplied(true);
    setStage('claimed');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShopNow = () => {
    setIsOpen(false);
    setIsCartOpen(true);
    const el = document.getElementById('flagship-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const segmentAngle = 360 / SEGMENTS.length;

  return (
    <>
      {/* Main Interactive Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#0a193d] rounded-3xl p-6 sm:p-7 border border-amber-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.6)] text-white text-center overflow-hidden">
            
            {/* Ambient Background Aura */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-black uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Playtime Lucky Spin & Win</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
              {stage === 'wheel' ? 'Spin The Ayurvedic Wheel!' : 'Scratch & Claim Your Prize!'}
            </h3>
            <p className="text-xs text-slate-300 mt-1 mb-5">
              {stage === 'wheel'
                ? 'Unlock 100% genuine instant savings on your intimate wellness kit'
                : 'Rub the card below to reveal your exclusive secret coupon code'}
            </p>

            {/* VIEW 1: THE WHEEL */}
            {stage === 'wheel' && (
              <div className="relative flex flex-col items-center justify-center py-2">
                
                {/* Pointer Arrow */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-amber-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                </div>

                {/* The SVG Wheel */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2.5 bg-linear-to-b from-amber-400 via-amber-600 to-amber-800 shadow-[0_0_35px_rgba(245,158,11,0.35)]">
                  <div
                    className="w-full h-full rounded-full overflow-hidden transition-transform duration-[4500ms] ease-[cubic-bezier(0.17,0.67,0.12,0.99)]"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                      {SEGMENTS.map((seg, idx) => {
                        const startAngle = idx * segmentAngle;
                        const endAngle = (idx + 1) * segmentAngle;
                        const rad1 = ((startAngle - 90) * Math.PI) / 180;
                        const rad2 = ((endAngle - 90) * Math.PI) / 180;
                        const x1 = 150 + 150 * Math.cos(rad1);
                        const y1 = 150 + 150 * Math.sin(rad1);
                        const x2 = 150 + 150 * Math.cos(rad2);
                        const y2 = 150 + 150 * Math.sin(rad2);
                        const pathData = `M 150 150 L ${x1} ${y1} A 150 150 0 0 1 ${x2} ${y2} Z`;

                        // Text positioning angle
                        const midAngle = startAngle + segmentAngle / 2;
                        const textRad = ((midAngle - 90) * Math.PI) / 180;
                        const tx = 150 + 95 * Math.cos(textRad);
                        const ty = 150 + 95 * Math.sin(textRad);

                        return (
                          <g key={idx}>
                            <path d={pathData} fill={seg.color} stroke="#fbbf24" strokeWidth="2" />
                            <text
                              x={tx}
                              y={ty}
                              fill={seg.textColor}
                              fontSize="11"
                              fontWeight="900"
                              textAnchor="middle"
                              dominantBaseline="central"
                              transform={`rotate(${midAngle + 90}, ${tx}, ${ty})`}
                            >
                              {seg.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Center Spin Button Hub */}
                  <button
                    type="button"
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-linear-to-b from-amber-200 via-amber-400 to-amber-600 border-3 border-white text-[#0a193d] font-black text-xs uppercase shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-80"
                  >
                    {isSpinning ? (
                      <RotateCw className="w-5 h-5 animate-spin text-[#0a193d]" />
                    ) : (
                      <span className="tracking-widest">SPIN</span>
                    )}
                  </button>
                </div>

                {/* Subtext info */}
                <p className="text-[11px] text-amber-200/80 mt-4 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>100% Win Guarantee • Every Customer Wins</span>
                </p>
              </div>
            )}

            {/* VIEW 2: SCRATCH CARD STAGE */}
            {(stage === 'scratch' || stage === 'claimed') && wonSegment && (
              <div className="py-2 flex flex-col items-center">
                
                {/* Urgency Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[11px] font-bold mb-3 animate-pulse">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Offer Expires In: {formatTime(timeLeft)}</span>
                </div>

                {/* Scratch Area Container */}
                <div className="relative w-full max-w-xs h-44 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl bg-linear-to-br from-amber-900/60 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-4">
                  
                  {/* The Revealed Prize Underneath */}
                  <div className="text-center z-0">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 block mb-1">
                      🎉 YOU WON!
                    </span>
                    <h4 className="text-2xl font-black text-white leading-tight">
                      {wonSegment.label}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 mb-2 font-medium">
                      {wonSegment.discountDesc}
                    </p>

                    {/* Secret Promo Code Display */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 border border-amber-400/60 font-mono font-black text-amber-300 text-sm tracking-widest shadow-inner">
                      <span>{wonSegment.code}</span>
                    </div>
                  </div>

                  {/* Canvas Scratch Foil Overlay */}
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={176}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none z-10 transition-opacity duration-500 ${
                      scratchPercent >= 45 ? 'pointer-events-none opacity-0' : 'opacity-100'
                    }`}
                  />
                </div>

                {/* Scratch Helpers */}
                {scratchPercent < 45 && (
                  <button
                    type="button"
                    onClick={handleRevealAll}
                    className="text-[11px] text-amber-300 underline mt-2 font-bold cursor-pointer hover:text-amber-200"
                  >
                    Can&apos;t scratch? Click here to reveal code instantly &rarr;
                  </button>
                )}

                {/* Action Buttons */}
                <div className="w-full space-y-2 mt-4">
                  <button
                    type="button"
                    onClick={handleCopyAndApply}
                    className="w-full py-3 rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-[#0a193d] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all cursor-pointer"
                  >
                    {applied ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3] text-emerald-800" />
                        <span>Applied To Cart!</span>
                      </>
                    ) : copied ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Code Copied!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Auto-Apply &quot;{wonSegment.code}&quot; &rarr;</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleShopNow}
                    className="w-full py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Claim Now & Shop Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
