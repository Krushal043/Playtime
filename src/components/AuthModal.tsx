'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  HelpCircle, 
  ArrowLeft, 
  MessageCircle,
  EyeOff
} from 'lucide-react';

interface Perk {
  title: string;
  desc: string;
  badge: string;
}

const PLAYTIME_PERKS: Perk[] = [
  {
    title: 'Free Express Delivery!',
    desc: 'Enjoy Zero Shipping on all orders above ₹499. Same-day discreet dispatch.',
    badge: 'Free Shipping on orders above ₹499 / $60!',
  },
  {
    title: 'Play Coins Cashback!',
    desc: 'Earn 10% back on every purchase. 1 Play Coin = ₹1 on your next order!',
    badge: 'Cashback* on all orders (1 Coin = ₹1)!',
  },
  {
    title: '100% Discreet Guarantee!',
    desc: 'Plain unmarked brown boxes & discreet billing. Zero mention of intimate items.',
    badge: '100% Plain Unmarked Box & Discreet Billing!',
  },
];

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [inputValue, setInputValue] = useState('');
  const [userName, setUserName] = useState('');
  const [notifyConsent, setNotifyConsent] = useState(true);
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [otp, setOtp] = useState(['5', '8', '2', '0']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activePerkIndex, setActivePerkIndex] = useState(0);
  const [resendCountdown, setResendCountdown] = useState(30);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Body scroll lock when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isAuthModalOpen]);

  // Keyboard Escape listener
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showHelpModal) {
          setShowHelpModal(false);
        } else {
          handleClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, showHelpModal]);

  // Auto-focus first OTP input when step switches to OTP
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 60);
    }
  }, [step]);

  // Rotate perks banner
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const interval = setInterval(() => {
      setActivePerkIndex((prev) => (prev + 1) % PLAYTIME_PERKS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAuthModalOpen]);

  // Resend countdown timer for OTP step
  useEffect(() => {
    if (step !== 'otp' || resendCountdown <= 0) return;
    const timer = setInterval(() => {
      setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [step, resendCountdown]);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setStep('input');
    setInputValue('');
    setShowHelpModal(false);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      setResendCountdown(30);
      setOtp(['5', '8', '2', '0']);
    }, 550);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login(inputValue, userName || (activeTab === 'signup' ? 'Playtime Member' : undefined));
      handleClose();
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login('vip.member@gmail.com', 'VIP Member');
      handleClose();
    }, 650);
  };

  const handleOtpChange = (index: number, value: string) => {
    const clean = value.replace(/\D/g, '');
    const char = clean.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    // Auto advance focus
    if (char && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pasted) return;
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    const targetIdx = Math.min(pasted.length, 3);
    otpInputRefs.current[targetIdx]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto select-none">
      {/* Dark backdrop with blur */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[#020817]/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200 cursor-pointer"
      />

      {/* ========================================================================= */}
      {/* 1. DESKTOP VIEW (Two-Column Side-by-Side: Playtime Theme) */}
      {/* ========================================================================= */}
      <div className="hidden md:flex relative w-full max-w-[920px] bg-[#0A0A0A] rounded-[32px] shadow-2xl overflow-hidden z-10 border border-[#007BA7]/40 animate-in fade-in zoom-in-95 duration-200 my-auto min-h-[580px]">
        
        {/* LEFT COLUMN: Deep Luxury Midnight Jet Black & Cerulean Gradient */}
        <div className="w-1/2 bg-gradient-to-br from-[#0A0A0A] via-[#005f82] to-[#007BA7] p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden border-r border-[#007BA7]/30">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#FF2D95]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#007BA7]/15 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Top Row: Brand Logo Box + QUICKPASS Badge */}
            <div className="flex items-center justify-between gap-4">
              <div className="bg-white rounded-2xl px-5 py-3 shadow-md border border-white/80 w-40 h-24 relative transition-transform hover:scale-[1.02] flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Playtime"
                  width={130}
                  height={60}
                  priority
                  className="object-contain"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0A0A0A]/70 text-amber-300 border border-amber-400/40 text-xs font-black tracking-wider uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>QUICKPASS</span>
                <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-2xl lg:text-[27px] font-bold text-white font-serif leading-[1.3] mt-8">
              Trusted by 100,000+ Indian Couples. Never miss private drops &amp; member perks
            </h2>

            {/* 3 Benefit Feature Cards */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              {PLAYTIME_PERKS.map((perk, index) => (
                <div
                  key={index}
                  className="bg-[#0A0A0A]/75 border border-[#007BA7]/30 rounded-2xl p-3.5 flex flex-col justify-start text-left shadow-sm min-h-[145px] transition-all hover:bg-[#0A0A0A]/95 hover:border-[#007BA7]/60"
                >
                  <div className="text-amber-400 text-lg leading-none mb-2">★</div>
                  <h3 className="text-xs font-black text-white leading-tight mb-1.5">
                    {perk.title}
                  </h3>
                  <p className="text-[10.5px] text-slate-300 leading-relaxed font-normal">
                    {perk.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Guarantee Strip */}
          <div className="border-t border-[#007BA7]/30 pt-4 mt-6 flex items-center justify-between text-[11px] text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Encrypted &amp; Safe</span>
            </div>
            <div className="flex items-center gap-1 text-slate-300">
              <EyeOff className="w-3.5 h-3.5 text-blue-400" />
              <span>Instant OTP Login</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Pure Pearl White & Deep Navy Form Panel */}
        <div className="w-1/2 bg-white p-8 lg:p-10 flex flex-col justify-between relative">
          
          {/* Top Right Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-[#051336] flex items-center justify-center transition-colors cursor-pointer z-10 shadow-xs"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {step === 'input' ? (
            <div>
              {/* Header */}
              <div className="text-center sm:text-left pt-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-wider mb-2 border border-rose-200">
                  Welcome Privilege
                </span>
                <h3 className="text-2xl lg:text-[28px] font-bold text-[#051336] font-serif tracking-tight leading-tight">
                  Play Like A 10/10 With 10% Off
                </h3>
                <p className="text-xs lg:text-sm text-slate-500 mt-1.5 font-medium">
                  Enter your mobile number or email to continue
                </p>
              </div>

              {/* Tabs Switcher: [LOG IN] [SIGN UP] */}
              <div className="bg-slate-100 p-1 rounded-xl flex gap-1 mt-5 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-[#051336] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#051336]'
                  }`}
                >
                  LOG IN
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
                    activeTab === 'signup'
                      ? 'bg-[#0A0A0A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#007BA7]'
                  }`}
                >
                  SIGN UP
                </button>
              </div>

              {/* Google 1-Tap Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full mt-4 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-3 text-xs sm:text-sm font-bold text-[#0A0A0A] shadow-2xs transition-all cursor-pointer hover:shadow-xs disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google (1-Tap Sign In)</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  OR CONTINUE WITH EMAIL / MOBILE OTP
                </span>
                <div className="h-px bg-slate-200 flex-1" />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendOtp} className="space-y-3.5">
                {activeTab === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none focus:border-[#007BA7] focus:ring-2 focus:ring-[#007BA7]/20 font-medium"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Enter Email Address or Mobile
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter email or 10-digit mobile number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none focus:border-[#007BA7] focus:ring-2 focus:ring-[#007BA7]/20 transition-all font-semibold"
                  />
                </div>

                {/* Consent Checkbox */}
                <label className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer pt-1 select-none">
                  <input
                    type="checkbox"
                    checked={notifyConsent}
                    onChange={(e) => setNotifyConsent(e.target.checked)}
                    className="w-4 h-4 rounded text-[#FF2D95] accent-[#FF2D95] cursor-pointer"
                  />
                  <span>Notify me for secret updates, VIP drops &amp; offers</span>
                </label>

                {/* Submit Button (Signature Jet Black + Cerulean + Neon Rose Gradient) */}
                <button
                  type="submit"
                  disabled={isSubmitting || !inputValue.trim()}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0A0A0A] via-[#007BA7] to-[#FF2D95] hover:from-[#171717] hover:to-[#ff4da6] text-white text-sm font-black tracking-widest uppercase shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? 'PROCESSING...' : 'SUBMIT'}
                </button>
              </form>
            </div>
          ) : (
            /* OTP Verification Step */
            <div className="py-2">
              <button
                type="button"
                onClick={() => setStep('input')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A0A0A] hover:text-[#FF2D95] mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to login</span>
              </button>

              <h3 className="text-2xl font-bold text-[#0A0A0A] font-serif leading-tight">
                Enter Verification Code
              </h3>
              <p className="text-xs text-slate-500 mt-1.5">
                We sent a 4-digit verification code to{' '}
                <span className="font-bold text-[#0A0A0A]">{inputValue}</span>
              </p>

              <form onSubmit={handleVerifyOtp} className="mt-6 space-y-5">
                <div className="flex justify-center gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => { otpInputRefs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete={idx === 0 ? 'one-time-code' : 'off'}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      onPaste={handleOtpPaste}
                      className="w-13 h-14 text-center text-xl font-black rounded-xl border-2 border-slate-300 bg-white text-[#051336] focus:outline-none focus:border-[#051336] shadow-xs"
                      aria-label={`Digit ${idx + 1} of verification code`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>Didn&apos;t receive code?</span>
                  {resendCountdown > 0 ? (
                    <span className="font-bold text-slate-400">
                      Resend in {resendCountdown}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setResendCountdown(30);
                        setOtp(['5', '8', '2', '0']);
                      }}
                      className="font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || otp.some((d) => !d)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#071844] via-[#0e2a66] to-[#dc2626] hover:from-[#0a1f58] hover:to-[#ef4444] text-white text-sm font-black tracking-widest uppercase shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'VERIFYING...' : 'VERIFY &amp; ENTER'}
                </button>
              </form>
            </div>
          )}

          {/* Desktop Footer Disclaimer */}
          <div className="pt-4 text-center space-y-1">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              I accept that I have read &amp; understood Playtime&apos;s{' '}
              <a href="#terms" className="underline hover:text-[#051336]">
                Privacy Policy
              </a>
              ,{' '}
              <a href="#terms" className="underline hover:text-[#051336]">
                Terms &amp; Conditions
              </a>
              .
            </p>
            <div>
              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                className="text-xs font-bold text-[#051336] underline hover:text-rose-600 cursor-pointer"
              >
                Trouble logging in?
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEW (Playtime Signature Jet Black & Pearl White Theme) */}
      {/* ========================================================================= */}
      <div className="md:hidden relative w-full max-w-[360px] mx-auto bg-[#0A0A0A] rounded-[26px] p-2.5 pb-3 shadow-2xl overflow-hidden z-10 border border-[#007BA7]/40 animate-in fade-in zoom-in-95 duration-200 my-auto">
        
        {/* TOP ROW: Brand Logo + QUICKPASS Badge + Circular Close Button */}
        <div className="flex items-center justify-between gap-2 px-1 pt-0.5">
          {/* Brand Logo Box (White Rounded Card) */}
          <div className="bg-white rounded-xl px-2 py-1 shadow-xs border border-white/80 w-24 h-13 flex items-center justify-center relative shrink-0">
            <Image
              src="/logo.png"
              alt="Playtime"
              width={82}
              height={36}
              priority
              className="object-contain"
            />
          </div>

          {/* QUICKPASS Badge */}
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0A0A0A]/70 text-amber-300 border border-amber-400/40 text-[10px] font-black tracking-wider uppercase shadow-xs">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            <span>QUICKPASS</span>
            <Zap className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          </div>

          {/* Circular Close Button (Top right circle with X) */}
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-xs ml-auto"
            aria-label="Close dialog"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PERKS TICKER PILL (Gold star + Text + Indicator Dots on Right) */}
        <div className="mt-2 mb-2 bg-[#007BA7]/20 text-slate-100 px-3 py-1.5 rounded-full border border-[#007BA7]/30 flex items-center justify-between text-[10.5px] font-medium shadow-xs">
          <div className="flex items-center gap-1.5 truncate pr-1">
            <span className="text-amber-400 text-xs leading-none">★</span>
            <span className="truncate font-bold text-white tracking-tight">
              {PLAYTIME_PERKS[activePerkIndex].badge}
            </span>
          </div>

          {/* Indicator: Dots and Pill */}
          <div className="flex items-center gap-1 shrink-0">
            {PLAYTIME_PERKS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePerkIndex(idx)}
                className={`rounded-full transition-all cursor-pointer ${
                  activePerkIndex === idx
                    ? 'w-3.5 h-1 bg-white'
                    : 'w-1 h-1 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* INNER PEARL WHITE CARD (Curved with rounded-[20px] nestled inside the dark frame) */}
        <div className="bg-white rounded-[20px] p-3.5 sm:p-4 shadow-sm space-y-2.5 border border-slate-100">
          
          {step === 'input' ? (
            <>
              {/* 1. Heading & Subtitle */}
              <div>
                <h3 className="text-lg font-black text-[#0A0A0A] font-serif leading-tight">
                  Sign In to Account
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Enter your mobile or email to continue
                </p>
              </div>

              {/* 2. Google 1-Tap Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-2 text-xs font-bold text-[#0A0A0A] shadow-2xs cursor-pointer transition-all disabled:opacity-50"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google (1-Tap)</span>
              </button>

              {/* 3. Divider */}
              <div className="flex items-center gap-2">
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  OR VERIFY WITH OTP
                </span>
                <div className="h-px bg-slate-200 flex-1" />
              </div>

              {/* 4. Tab Switcher: [Log In] [Sign Up] */}
              <div className="bg-slate-100 p-0.5 rounded-lg flex gap-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-[#0A0A0A] text-white shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'signup'
                      ? 'bg-[#0A0A0A] text-white shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* 5. Input Form */}
              <form onSubmit={handleSendOtp} className="space-y-2">
                {activeTab === 'signup' && (
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none focus:border-[#007BA7]"
                  />
                )}

                <input
                  type="text"
                  required
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  placeholder="Enter mobile number or email"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none focus:border-[#007BA7] shadow-2xs font-medium"
                />

                {/* 6. Consent Checkbox */}
                <label className="flex items-center gap-1.5 text-[10px] text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={notifyConsent}
                    onChange={(e) => setNotifyConsent(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-[#FF2D95] accent-[#FF2D95] cursor-pointer"
                  />
                  <span>Notify me for order updates &amp; exclusive offers</span>
                </label>

                {/* 7. Action Button: GET OTP CODE (Playtime Signature Gradient) */}
                <button
                  type="submit"
                  disabled={isSubmitting || !inputValue.trim()}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0A0A0A] via-[#007BA7] to-[#FF2D95] hover:from-[#171717] hover:to-[#ff4da6] text-white text-xs font-black tracking-widest uppercase shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'PROCESSING...' : 'GET OTP CODE'}
                </button>
              </form>
            </>
          ) : (
            /* Mobile OTP Step */
            <div className="space-y-3 py-1">
              <button
                type="button"
                onClick={() => setStep('input')}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A0A0A] hover:text-[#FF2D95] cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Back to login</span>
              </button>

              <div>
                <h3 className="text-lg font-bold text-[#0A0A0A] font-serif leading-tight">
                  Enter Verification Code
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Sent to <span className="font-bold text-[#0A0A0A]">{inputValue}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-3">
                <div className="flex justify-center gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => { otpInputRefs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete={idx === 0 ? 'one-time-code' : 'off'}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      onPaste={handleOtpPaste}
                      className="w-11 h-12 text-center text-lg font-black rounded-xl border border-slate-300 bg-white text-[#0A0A0A] focus:outline-none focus:border-[#007BA7] shadow-2xs"
                      aria-label={`Digit ${idx + 1} of verification code`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Didn&apos;t receive code?</span>
                  {resendCountdown > 0 ? (
                    <span className="font-bold text-slate-400">
                      Resend in {resendCountdown}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setResendCountdown(30);
                        setOtp(['5', '8', '2', '0']);
                      }}
                      className="font-bold text-[#FF2D95] hover:underline cursor-pointer"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || otp.some((d) => !d)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0A0A0A] via-[#007BA7] to-[#FF2D95] text-white text-xs font-black tracking-widest uppercase shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'VERIFYING...' : 'VERIFY &amp; ENTER'}
                </button>
              </form>
            </div>
          )}

          {/* 8. Mobile Footer */}
          <div className="pt-0.5 flex items-center justify-between text-[9px] text-slate-400">
            <span>
              By continuing, you agree to Playtime&apos;s{' '}
              <a href="#terms" className="underline hover:text-[#0A0A0A]">
                Privacy Policy
              </a>{' '}
              &amp;{' '}
              <a href="#terms" className="underline hover:text-[#0A0A0A]">
                Terms
              </a>
              .
            </span>
            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              className="p-1 rounded-full text-slate-400 hover:text-[#0A0A0A] cursor-pointer"
              title="Trouble logging in?"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Troubleshooting Help Modal / Overlay */}
      {showHelpModal && (
        <div 
          onClick={() => setShowHelpModal(false)}
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 cursor-default"
          >
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h4 className="text-base font-bold text-[#051336] font-serif mb-2">
              Trouble Logging In?
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <p>
                <strong>1. Fast SMS/Email OTP:</strong> Codes arrive in &lt;10 seconds. Check SMS spam filter or promotion inbox.
              </p>
              <p>
                <strong>2. Zero-Trace Sender ID:</strong> OTPs are sent under a neutral sender ID (e.g. &ldquo;PT-SECURE&rdquo;) with zero mention of intimate wellness.
              </p>
              <p>
                <strong>3. VIP Concierge Help:</strong> Contact our team on WhatsApp for discreet assistance.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex gap-2">
              <a
                href="https://wa.me/919876543210?text=Hi%20Playtime,%20I%20need%20help%20logging%20in"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp VIP Support</span>
              </a>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#051336] text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
