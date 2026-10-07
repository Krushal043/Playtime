'use client';

import React from 'react';
import Image from 'next/image';
import {
  X,
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  HelpCircle,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface DoctorConsultationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DoctorConsultationDrawer({ isOpen, onClose }: DoctorConsultationDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md h-full bg-white/95 backdrop-blur-2xl border-l border-white/90 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10 text-[#0a193d]">
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#0a193d]">Doctor &amp; Medical Panel</h3>
                <p className="text-[11px] text-slate-500 font-medium">Certified Intimate Health Advisory</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Doctor Profile Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-blue-50/70 to-slate-50 border border-blue-100/80 flex items-center gap-3.5 shadow-2xs">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80"
                alt="Dr. Aarav Mehta"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-black text-[#0a193d]">Dr. Aarav Mehta</h4>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-current" />
              </div>
              <p className="text-[10px] text-slate-500 font-semibold">BAMS, MD &bull; 12+ Yrs Clinical Experience</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-0.5">Specialist in Male &amp; Couple Intimacy</p>
            </div>
          </div>

          {/* Clinical Reassurance Q&A */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
              Frequently Answered by Our Doctors
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <p className="font-black text-[#0a193d]">
                  Q: Will my partner feel numb or lose sensation?
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  <strong>Doctor&apos;s Answer:</strong> Absolutely not. Because Playtime Extend utilizes botanical micro-molecules, 100% of the active compound absorbs into your dermis within 10 minutes. Zero transfer occurs during intimacy.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <p className="font-black text-[#0a193d]">
                  Q: Is it safe for oral play and with condoms?
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  <strong>Doctor&apos;s Answer:</strong> Yes. Once 10 minutes have elapsed, the skin is completely dry. The aqueous botanical formula is non-toxic, safe for oral intimacy, and 100% compatible with latex and polyurethane condoms.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <p className="font-black text-[#0a193d]">
                  Q: Are there any side-effects or dependence?
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  <strong>Doctor&apos;s Answer:</strong> None. Our formulations do not contain systemic narcotics or heavy desensitizers. They act only locally on hyperactive superficial receptors and wash away cleanly with water.
                </p>
              </div>
            </div>
          </div>

          {/* Discreet Certifications */}
          <div className="p-3 rounded-2xl bg-white border border-slate-200 text-[11px] text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-[#0a193d]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified Quality &amp; AYUSH Approved</span>
            </div>
            <p className="text-[10px] text-slate-500">
              GMP Certified Facilities &bull; Cruelty Free &bull; Hypoallergenic &bull; Zero Heavy Metals
            </p>
          </div>
        </div>

        {/* WhatsApp Doctor Chat CTA */}
        <div className="pt-4 border-t border-slate-200/80 space-y-2 mt-4">
          <a
            href="https://wa.me/919876543210?text=Hi%20Dr.%20Aarav,%20I%20have%20a%20confidential%20question%20about%20Playtime%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat Confidentially on WhatsApp</span>
          </a>
          <p className="text-center text-[10px] text-slate-400">100% Anonymous &bull; No Chat History Stored</p>
        </div>

      </div>
    </div>
  );
}
