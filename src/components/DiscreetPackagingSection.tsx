'use client';

import React from 'react';
import { Package, ShieldCheck, EyeOff, CreditCard, Lock, CheckCircle2 } from 'lucide-react';

interface DiscreetPackagingSectionProps {
  onOpenBillingModal: () => void;
}

export default function DiscreetPackagingSection({ onOpenBillingModal }: DiscreetPackagingSectionProps) {
  return (
    <section id="discreet-packaging" className="py-16 md:py-20 relative overflow-hidden text-[#0a193d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider mb-4 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Zero Compromise On Privacy
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0a193d] mb-3 tracking-tight">
            100% Discreet Packaging &amp; Billing
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Your intimacy is strictly your personal business. Here is our solemn 4-layer discretion guarantee on every order:
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Card 1 */}
          <div className="glass-card p-6 rounded-3xl relative group">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-[#0a193d] mb-2">1. Plain Brown Outer Box</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Every item is sealed in an unmarked corrugated box or heavy-duty opaque poly-mailer. Zero photos, illustrations, or hints of the contents whatsoever.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-6 rounded-3xl relative group">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 group-hover:scale-110 transition-transform">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-[#0a193d] mb-2">2. Generic Shipping Label</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              The return address reads as <strong className="text-[#0a193d]">&quot;PT Logistics Pvt Ltd&quot;</strong> and contents are classified neutrally as <strong className="text-[#0a193d]">&quot;Personal Care / Lifestyle Goods&quot;</strong>.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-6 rounded-3xl relative group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-[#0a193d] mb-2">3. Discreet Bank Statement</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3 font-medium">
              Neither &quot;Playtime&quot; nor any sexual health term appears on your credit card, debit card, or UPI statement.
            </p>
            <button
              onClick={onOpenBillingModal}
              className="text-[11px] text-rose-600 hover:text-rose-700 font-extrabold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              See Sample Statement &rarr;
            </button>
          </div>

          {/* Card 4 */}
          <div className="glass-card p-6 rounded-3xl relative group">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-[#0a193d] mb-2">4. Direct Courier OTP Handover</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Shipped via trusted tier-1 couriers (Bluedart, Delhivery). Delivery agents have no visibility into package contents and handover via confidential OTP.
            </p>
          </div>

        </div>

        {/* Visual Box Diagram */}
        <div className="glass-card-elevated p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-center relative overflow-hidden">
            <div className="border-2 border-dashed border-amber-400/50 rounded-xl p-6 bg-white/80">
              <span className="text-[10px] uppercase tracking-widest text-amber-800 font-mono font-black block mb-2">
                UNMARKED CORRUGATED BOX (OUTER VIEW)
              </span>
              <div className="h-28 flex flex-col items-center justify-center text-amber-700">
                <Package className="w-12 h-12 mb-2 stroke-[1.5]" />
                <p className="text-xs font-mono text-[#0a193d] font-black">Shipment Ref: PT-82914-IN</p>
                <p className="text-[10px] text-slate-500 mt-1 font-medium">To: Customer Name &amp; Address Only</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-3.5 text-xs text-slate-600 font-medium">
            <h4 className="text-base font-black text-[#0a193d]">What Anyone Seeing The Box Notices:</h4>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Standard brown carton identical to an Amazon or electronics package.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Heavy-duty security tape that prevents tampering or peeking.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Zero words like &quot;condom&quot;, &quot;massager&quot;, &quot;shilajit&quot;, or &quot;pleasure&quot; printed anywhere.</span>
            </div>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-[11px] font-black border border-emerald-300/60">
                ✓ 100% Privacy Protected
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
