'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  MessageCircle,
  X,
  Bot,
  Send,
  Sparkles,
  Zap,
  ShoppingBag,
  Gift
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { LAUNCH_PRODUCTS, DUO_BUNDLE } from '@/data/products';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  cta?: {
    label: string;
    action: () => void;
  };
}

export default function WhatsAppChatButton() {
  const pathname = usePathname();
  const { addToCart } = useCart();
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Position offset on mobile if sticky bar exists on product details page
  const isProductPage = pathname?.startsWith('/products/');
  const bottomOffsetClass = isProductPage ? 'bottom-24 sm:bottom-6' : 'bottom-6 sm:bottom-6';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Namaste! 🙏 I am your Playtime Ayurvedic Wellness Concierge. How can I assist you with stamina, dosage, or 100% discreet packaging today?',
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isBotOpen) {
      scrollToBottom();
    }
  }, [messages, isBotOpen]);

  const handleWhatsApp = (customText?: string) => {
    const text = encodeURIComponent(
      customText || 'Hi Playtime, I would like confidential assistance regarding your Ayurvedic wellness products & discreet delivery.'
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  const handleInstagram = () => {
    window.open('https://instagram.com/playtime.wellness', '_blank');
  };

  const quickPrompts = [
    '🌿 How does Extend Spray work?',
    '👑 How to take 24K Shilajit Resin?',
    '⚡ What is in the Power Duo Kit?',
    '📦 Is packaging 100% discreet?',
    '💳 What name shows on my bank card?'
  ];

  const generateBotReply = (query: string) => {
    const q = query.toLowerCase();

    if (q.includes('extend') || q.includes('spray') || q.includes('last longer') || q.includes('delay')) {
      return {
        text: '🌿 Playtime Extend Spray is a 100% Ayurvedic botanical formula made from pure Clove Extract (Lavang), Pudina Satva, and Jaiphal. Each spray delivers a precise 0.08mL micro-dose that calms overactive sensory nerves in 10 minutes without deadening sensation or transferring to your partner during intimacy. Zero synthetic lidocaine!',
        cta: {
          label: 'Add Extend Spray (₹499)',
          action: () => addToCart(LAUNCH_PRODUCTS[0], LAUNCH_PRODUCTS[0].packs[0], 1)
        }
      };
    }

    if (q.includes('shilajit') || q.includes('resin') || q.includes('gold') || q.includes('vitality') || q.includes('testosterone')) {
      return {
        text: '👑 Our Pure Himalayan Shilajit Gold Resin is harvested at 18,000+ ft elevations and purified through traditional Ayurvedic Agnitapi Shodhana. Enriched with 24K Swarna Bhasma (Gold Dust) and >75% Fulvic Acid. Simply dissolve a pea-sized amount (300-500mg) in warm milk or water daily for natural stamina, cellular energy, and peak performance.',
        cta: {
          label: 'Add 24K Shilajit Resin (₹999)',
          action: () => addToCart(LAUNCH_PRODUCTS[1], LAUNCH_PRODUCTS[1].packs[0], 1)
        }
      };
    }

    if (q.includes('duo') || q.includes('bundle') || q.includes('kit') || q.includes('both') || q.includes('combo')) {
      return {
        text: '⚡ The Ayurvedic Power Duo Kit combines both signature flagships: Pure Himalayan Shilajit Gold Resin (for internal core vitality & testosterone) + Extend Delay Spray (for external climax endurance). Includes a complimentary brass dosing spoon and saves you 36% (Flat ₹799 OFF)!',
        cta: {
          label: 'Add Power Duo Kit (₹1,399)',
          action: () => {
            const duoProduct = {
              id: DUO_BUNDLE.id,
              name: DUO_BUNDLE.name,
              tagline: DUO_BUNDLE.tagline,
              category: 'couples' as const,
              basePrice: DUO_BUNDLE.price,
              rating: 5.0,
              reviewsCount: 1420,
              badge: DUO_BUNDLE.badge,
              badgeType: 'red' as const,
              image: DUO_BUNDLE.image,
              description: 'The ultimate 100% Ayurvedic vitality kit for couples.',
              features: DUO_BUNDLE.includes,
              specs: { safeForSkin: '100% Ayurvedic, AYUSH Approved' },
              packs: [{ packSize: 1, label: 'Complete Duo Box Set', price: DUO_BUNDLE.price, originalPrice: DUO_BUNDLE.originalPrice, discount: DUO_BUNDLE.discount }],
              inStock: true,
              discreetPackagingGuaranteed: true
            };
            addToCart(duoProduct, duoProduct.packs[0], 1);
          }
        }
      };
    }

    if (q.includes('discreet') || q.includes('box') || q.includes('package') || q.includes('plain') || q.includes('courier')) {
      return {
        text: '📦 100% Discretion Guaranteed! Your order arrives in an unprinted, plain brown corrugated box with zero brand logos or product descriptions. The courier shipping label only mentions "PT Logistics Pvt Ltd - Lifestyle Goods". Handover is verified via confidential OTP.'
      };
    }

    if (q.includes('bank') || q.includes('card') || q.includes('billing') || q.includes('statement') || q.includes('upi')) {
      return {
        text: '💳 100% Discreet Billing: Your bank, credit card, or UPI statement will display "PT Logistics" or "PT Retail Enterprises". The words "Playtime", "Ayurveda", or any intimate references will NEVER appear on your statement.'
      };
    }

    return {
      text: 'Thank you for reaching out! All Playtime formulations are 100% Ayurvedic, AYUSH Ministry approved, and NABL lab certified heavy-metal free. Would you like to chat 1-on-1 with our confidential Ayurvedic doctor on WhatsApp?',
      cta: {
        label: 'Chat on WhatsApp with Doctor',
        action: () => handleWhatsApp(`Hi, I have a specific question about: "${query}"`)
      }
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const replyData = generateBotReply(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyData.text,
        timestamp: 'Just now',
        cta: replyData.cta
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 550);
  };

  return (
    <>
      {/* ======================================================== */}
      {/* 1. LEFT SIDE: VERTICALLY STACKED ICONS ONLY (SPIN, IG, WA) */}
      {/* ======================================================== */}
      <aside aria-label="Social, Lucky Spin and WhatsApp" className={`fixed ${bottomOffsetClass} left-4 sm:left-6 z-40 flex flex-col items-center gap-3 animate-slide-in-left`}>
        
        {/* Lucky Spin & Win Floating Icon (Icon Only) */}
        <div className="relative group animate-float-slow">
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('open-spin-modal'));
              }
            }}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-amber-500 via-rose-600 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/40 hover:shadow-amber-500/70 hover:scale-115 hover:rotate-6 active:scale-90 transition-all duration-300 cursor-pointer border-2 border-amber-300/60"
            title="Spin & Win Secret Discount"
            aria-label="Spin & Win Secret Discount"
          >
            <Gift className="w-5 h-5 text-yellow-200 animate-bounce" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border border-[#0A0A0A]" />
            </span>
          </button>

          {/* Desktop Hover Tooltip */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-white/15 text-white text-[11px] font-bold shadow-xl whitespace-nowrap backdrop-blur-md pointer-events-none transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
            <span>Spin & Win 🎁</span>
          </div>
        </div>

        {/* Instagram Floating Button */}
        <div className="relative group animate-float-slow">
          <button
            onClick={handleInstagram}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-lg shadow-rose-600/35 hover:shadow-rose-600/60 hover:scale-115 hover:-rotate-3 active:scale-90 transition-all duration-300 cursor-pointer border-2 border-white/40 backdrop-blur-md"
            title="Follow on Instagram"
            aria-label="Follow on Instagram"
          >
            {/* Official Instagram Camera SVG */}
            <svg className="w-5 h-5 fill-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </button>

          {/* Desktop Hover Tooltip with Smooth Slide Transition */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-white/15 text-white text-[11px] font-bold shadow-xl whitespace-nowrap backdrop-blur-md pointer-events-none transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
            <span>Instagram @playtime</span>
          </div>
        </div>

        {/* WhatsApp Floating Button */}
        <div className="relative group animate-float-alt">
          <button
            onClick={() => handleWhatsApp()}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/40 hover:shadow-[#25D366]/70 hover:scale-115 hover:rotate-3 active:scale-90 transition-all duration-300 cursor-pointer border-2 border-white/40"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-white transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border border-[#25D366]" />
            </span>
          </button>

          {/* Desktop Hover Tooltip with Smooth Slide Transition */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-white/15 text-white text-[11px] font-bold shadow-xl whitespace-nowrap backdrop-blur-md pointer-events-none transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
            <span>WhatsApp Advisor</span>
          </div>
        </div>

      </aside>

      {/* ======================================================== */}
      {/* 2. RIGHT SIDE: INDIVIDUAL AYURVEDIC AI BOT CONCIERGE     */}
      {/* ======================================================== */}
      <aside aria-label="Ayurvedic AI Concierge" className={`fixed ${bottomOffsetClass} right-4 sm:right-6 z-40 flex flex-col items-end animate-slide-in-right`}>
        
        {/* Interactive AI Chat Window */}
        {isBotOpen && (
          <div className="mb-3 w-[calc(100vw-32px)] sm:w-[380px] h-[520px] max-h-[75vh] rounded-3xl bg-[#0A0A0A]/95 border border-[#007BA7]/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 text-white z-50">
            
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#0A0A0A] via-[#005f82] to-[#007BA7] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-md">
                  <Bot className="w-5 h-5 text-emerald-400" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#0A0A0A]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-black tracking-tight text-white">Ayurvedic AI Advisor</h4>
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-black">24/7 LIVE</span>
                  </div>
                  <p className="text-[10px] text-slate-300 font-medium">100% Confidential &bull; AYUSH Approved</p>
                </div>
              </div>

              <button
                onClick={() => setIsBotOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close AI Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Scrollable Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed font-medium transition-all duration-200 ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-tr-xs shadow-md'
                        : 'bg-white/10 border border-white/15 text-slate-100 rounded-tl-xs backdrop-blur-md shadow-xs'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Quick Add to Cart Button inside Bot Reply */}
                    {msg.cta && (
                      <button
                        type="button"
                        onClick={msg.cta.action}
                        className="mt-2.5 w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer btn-shimmer"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>{msg.cta.label}</span>
                      </button>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white/10 border border-white/10 w-16">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Chips Bar */}
            <div className="p-2 border-t border-white/10 bg-black/40 overflow-x-auto flex gap-1.5 shrink-0 scrollbar-none">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-[10px] text-slate-200 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Bottom Chat Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#0A0A0A] border-t border-white/10 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                placeholder="Ask about dosage, timing, discretion..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-white/10 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#007BA7] font-medium transition-colors"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#007BA7] to-[#FF2D95] hover:opacity-90 disabled:opacity-40 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

        {/* Right Floating AI Bot Button (Icon Only) */}
        <div className="relative group animate-float-slow">
          <button
            onClick={() => setIsBotOpen(!isBotOpen)}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#0A0A0A] via-[#005f82] to-[#007BA7] border-2 border-[#007BA7]/60 text-white flex items-center justify-center shadow-lg shadow-[#007BA7]/30 hover:shadow-[#007BA7]/60 hover:scale-115 active:scale-90 transition-all duration-300 cursor-pointer relative"
            title={isBotOpen ? 'Close AI Advisor' : 'Open Ayurvedic AI Advisor'}
            aria-label={isBotOpen ? 'Close AI Advisor' : 'Open Ayurvedic AI Advisor'}
          >
            {isBotOpen ? (
              <X className="w-5 h-5 text-slate-200 transition-transform duration-200 rotate-90 hover:rotate-180" />
            ) : (
              <>
                <Bot className="w-5 h-5 text-emerald-400 transition-transform duration-300 group-hover:scale-115" />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-slate-950" />
                </span>
              </>
            )}
          </button>

          {/* Desktop Hover Tooltip with Smooth Slide Transition */}
          <div className="absolute right-0 bottom-full mb-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-white/15 text-white text-[11px] font-bold shadow-xl whitespace-nowrap backdrop-blur-md pointer-events-none transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
            <span>{isBotOpen ? 'Close Assistant' : 'Ayurvedic AI Advisor'}</span>
          </div>
        </div>

      </aside>
    </>
  );
}
