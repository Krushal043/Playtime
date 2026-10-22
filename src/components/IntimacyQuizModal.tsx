'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { LAUNCH_PRODUCTS } from '@/data/products';
import { Product, ProductPack } from '@/types';
import {
  Sparkles,
  X,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Flame,
  Heart,
  Users
} from 'lucide-react';

interface IntimacyQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, pack: ProductPack) => void;
}

export default function IntimacyQuizModal({ isOpen, onClose, onAddToCart }: IntimacyQuizModalProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: '',
    forWhom: '',
    priority: ''
  });
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (field: 'goal' | 'forWhom' | 'priority', value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    if (step < 3) {
      setStep((s) => s + 1);
    } else {
      setStep(4); // Results step
    }
  };

  // Determine recommended product
  const getRecommendation = () => {
    if (answers.forWhom === 'both' || answers.goal === 'couples') {
      return {
        type: 'duo',
        title: 'The Couples Power Duo Kit',
        subtitle: 'Extend Delay Spray + Rose Pleasure Stimulator',
        price: 1699,
        originalPrice: 2998,
        discount: 'Save 43% (₹1,299 OFF)',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
        reason: 'Recommended because you want to elevate mutual pleasure with prolonged endurance for him and intense sonic waves for her.',
        coupon: 'MATCH10'
      };
    } else if (answers.forWhom === 'her' || answers.goal === 'her_pleasure') {
      const prod = LAUNCH_PRODUCTS[1]; // Rose Stimulator
      return {
        type: 'single',
        product: prod,
        title: prod.name,
        subtitle: '10-Frequency Sonic Wave Pulse',
        price: prod.packs[0].price,
        originalPrice: prod.packs[0].originalPrice,
        discount: prod.packs[0].discount,
        image: prod.image,
        reason: 'Recommended for targeted clitoral stimulation with medical-grade velvety silicone and whisper-quiet motor.',
        coupon: 'MATCH10'
      };
    } else {
      const prod = LAUNCH_PRODUCTS[0]; // Extend Spray
      return {
        type: 'single',
        product: prod,
        title: prod.name,
        subtitle: 'Micro-Absorption Transfer-Free Formula',
        price: prod.packs[0].price,
        originalPrice: prod.packs[0].originalPrice,
        discount: prod.packs[0].discount,
        image: prod.image,
        reason: 'Recommended for prolonged stamina and control without numbness or transfer to your partner.',
        coupon: 'MATCH10'
      };
    }
  };

  const rec = getRecommendation();

  const handleClaim = () => {
    if (rec.type === 'single' && rec.product && onAddToCart) {
      onAddToCart(rec.product, rec.product.packs[0]);
    } else if (onAddToCart) {
      // Add duo kit flagships
      onAddToCart(LAUNCH_PRODUCTS[0], LAUNCH_PRODUCTS[0].packs[0]);
      onAddToCart(LAUNCH_PRODUCTS[1], LAUNCH_PRODUCTS[1].packs[0]);
    }
    setIsAdded(true);
    setTimeout(() => {
      onClose();
      setIsAdded(false);
      setStep(1);
    }, 1200);
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ goal: '', forWhom: '', priority: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-card-elevated rounded-3xl p-6 sm:p-8 border border-white/95 shadow-2xl overflow-hidden text-[#0A0A0A]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-[#0A0A0A] transition-colors cursor-pointer"
          aria-label="Close Quiz"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Quiz Steps */}
        {step < 4 && (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF2D95]/10 text-[#FF2D95] text-[10px] font-black uppercase tracking-wider border border-[#FF2D95]/20">
                  <Sparkles className="w-3 h-3 text-[#FF2D95]" />
                  30-Second Intimacy Matcher
                </span>
                <span className="text-xs font-bold text-slate-400">Step {step} of 3</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#007BA7] to-[#FF2D95] transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Question 1: Goal */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-[#0A0A0A]">
                  What is your primary intimacy goal right now?
                </h3>
                <div className="space-y-2.5">
                  {[
                    { id: 'him_stamina', title: 'Lasting longer & controlling timing', desc: 'Boost endurance without feeling numb', icon: Zap },
                    { id: 'her_pleasure', title: 'Intense sensory pleasure & multiple climaxes', desc: 'Deep sonic wave vibrations for her', icon: Flame },
                    { id: 'couples', title: 'Mutual ecstasy for both partners', desc: 'Prolong the moment and explore new heights together', icon: Users },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelect('goal', opt.id)}
                        className="w-full p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 text-left transition-all hover:scale-[1.01] hover:border-[#007BA7] cursor-pointer shadow-xs group flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-[#007BA7]/10 text-[#0A0A0A] group-hover:text-[#007BA7] transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-[#0A0A0A]">{opt.title}</p>
                            <p className="text-[11px] text-slate-500">{opt.desc}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#007BA7] group-hover:translate-x-1 transition-all" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question 2: For Whom */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-[#0A0A0A]">
                  Who are you shopping for today?
                </h3>
                <div className="space-y-2.5">
                  {[
                    { id: 'him', title: 'For Him', desc: 'Delay spray engineered for male stamina' },
                    { id: 'her', title: 'For Her', desc: 'Sonic clitoral pulse stimulator in velvety silicone' },
                    { id: 'both', title: 'For Both of Us (Couples)', desc: 'The complete mutual satisfaction duo bundle' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelect('forWhom', opt.id)}
                      className="w-full p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 text-left transition-all hover:scale-[1.01] hover:border-[#007BA7] cursor-pointer shadow-xs group flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-black text-[#0A0A0A]">{opt.title}</p>
                        <p className="text-[11px] text-slate-500">{opt.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#007BA7] group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 3: Priority */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-[#0A0A0A]">
                  What is most critical for your experience?
                </h3>
                <div className="space-y-2.5">
                  {[
                    { id: 'transfer_free', title: '100% Transfer-Free & Natural Feeling', desc: 'Partner feels zero numbness, completely oral safe' },
                    { id: 'whisper_quiet', title: 'Whisper-Quiet & Discreet Delivery', desc: 'Under 40dB sound profile with plain carton delivery' },
                    { id: 'value_bundle', title: 'Maximum Savings & Instant Chemistry', desc: 'High-value duo kit for unforgettable intimacy' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelect('priority', opt.id)}
                      className="w-full p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 text-left transition-all hover:scale-[1.01] hover:border-[#007BA7] cursor-pointer shadow-xs group flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-black text-[#0A0A0A]">{opt.title}</p>
                        <p className="text-[11px] text-slate-500">{opt.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#007BA7] group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Results Recommendation */}
        {step === 4 && (
          <div className="space-y-5 animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-black uppercase tracking-wider border border-emerald-200 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Match Found &bull; 98% Compatibility
              </span>
              <h3 className="text-2xl font-black text-[#0A0A0A]">Your Tailored Intimacy Match</h3>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                {rec.reason}
              </p>
            </div>

            {/* Product Feature Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-md flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                <Image src={rec.image} alt={rec.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <span className="text-[10px] font-bold text-[#FF2D95] uppercase tracking-wide">
                  {rec.subtitle}
                </span>
                <h4 className="text-sm font-black text-[#0A0A0A] truncate mt-0.5">
                  {rec.title}
                </h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-base font-black text-[#0A0A0A]">₹{rec.price}</span>
                  <span className="text-xs text-slate-400 line-through">₹{rec.originalPrice}</span>
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {rec.discount}
                  </span>
                </div>
              </div>
            </div>

            {/* Special Quiz Promo */}
            <div className="p-3 rounded-2xl bg-[#FF2D95]/10 border border-[#FF2D95]/30 text-xs text-[#0A0A0A] flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF2D95] shrink-0" />
                Bonus Quiz Discount Applied: <strong className="font-mono text-[#FF2D95]">{rec.coupon}</strong>
              </span>
              <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleClaim}
                className="w-full py-4 rounded-full btn-gradient text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer transition-all"
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Added Match To Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Claim My Match &bull; Add To Bag &rarr;</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetQuiz}
                className="w-full py-2 text-center text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Retake Quiz
              </button>
            </div>

            <div className="text-center text-[10px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ships in 100% Plain Unmarked Outer Carton</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
