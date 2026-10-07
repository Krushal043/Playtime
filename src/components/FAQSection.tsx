'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'Will anyone at my house or office know what is inside the package?',
    a: 'Absolutely not. All Playtime orders are shipped in 100% plain, unmarked brown cardboard boxes or thick opaque courier bags with tamper-proof security tape. There is zero mention of the word "Playtime", "adult", or any intimate product names anywhere on the exterior.'
  },
  {
    q: 'What company name will appear on my bank account, UPI, or credit card statement?',
    a: 'Your bank statement or UPI transaction alert will display a generic entity name like "PT Logistics Services" or "PT Retail Enterprises". It will never disclose any adult wellness or sexual wellness references.'
  },
  {
    q: 'Will the Extend Herbal Delay Spray cause numbness or irritation to either partner?',
    a: 'No. Unlike synthetic chemical sprays containing high-dose lidocaine, Playtime Extend is formulated with micro-encapsulated Ayurvedic clove extract (Lavang) and Pudina Satva. It absorbs fully in 10 minutes into sub-dermal nerve endings without deadening touch sensation or transferring to your partner during intimacy.'
  },
  {
    q: 'Are the Shilajit, Ashwagandha, and herbal elixirs certified and natural?',
    a: 'Yes. All our herbal vitality formulations are manufactured in GMP-certified facilities with Ministry of AYUSH approval. Each batch of Himalayan Shilajit is third-party NABL lab tested for purity, heavy metals, and guarantees >75% active Fulvic Acid.'
  },
  {
    q: 'How fast is dispatch and delivery across India?',
    a: 'Orders placed before 2:00 PM are dispatched on the same business day in plain parcels. Standard express delivery takes 2 to 3 days for metro cities, and 3 to 5 days for the rest of India with encrypted SMS tracking and delivery OTP.'
  },
  {
    q: 'How should I take Pure Himalayan Shilajit Gold Resin for best results?',
    a: 'Dissolve a pea-sized amount (300-500mg) using the included Ayurvedic brass spoon in lukewarm milk or water once daily. Consistent use for 4 to 8 weeks provides sustained cellular vitality, natural stamina, and enhanced physical endurance.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-16 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-[#0a193d] text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a193d] mb-2 tracking-tight">
            Discretion, Quality &amp; Safety Answers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Everything you need to know about our discrete packaging, billing privacy, and premium products.
          </p>
        </div>

        {/* Accordion in Frosted Pearl Glass */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-card overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-black text-[#0a193d] hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-rose-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3.5 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
