'use client';

import React from 'react';
import { X, CheckCircle2, CreditCard } from 'lucide-react';

interface DiscreetBillingPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DiscreetBillingPreviewModal({ isOpen, onClose }: DiscreetBillingPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 rounded-3xl glass-card-elevated border border-white/95 shadow-2xl text-[#0a193d]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-[#0a193d] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#0a193d]">Discreet Billing Preview</h3>
            <p className="text-xs text-slate-500 font-medium">What appears on your bank statement</p>
          </div>
        </div>

        {/* Bank alert mockup */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 mb-4 font-mono text-xs text-slate-800 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-200 text-[11px]">
            <span>BANK TRANSACTION ALERT</span>
            <span>HDFC / ICICI / SBI / UPI</span>
          </div>
          <p className="text-slate-800 font-semibold">
            Debited: <span className="text-emerald-700 font-black">₹ 2,999.00</span>
          </p>
          <p className="text-slate-600 font-medium">
            Merchant: <span className="text-[#0a193d] font-black underline decoration-rose-500">PT LOGISTICS SERVICES</span>
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            Ref: UPI/TXN/9028348912/SUCCESS
          </p>
        </div>

        <div className="space-y-2.5 text-xs text-slate-600 mb-6 font-medium">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong className="text-[#0a193d] font-bold">Never mentions &quot;Playtime&quot;</strong> or any adult/sexual terms.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Appears as standard logistics, utility, or retail merchandise.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>256-bit bank-grade encryption with Razorpay, Cashfree &amp; UPI.</span>
          </div>
        </div>

        {/* Signature Navy-Red Pill Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full btn-navy-red text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg hover:shadow-xl transition-all"
        >
          Got it, Keep Shopping Securely
        </button>
      </div>
    </div>
  );
}
