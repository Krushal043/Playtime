'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Shield, FileText, ArrowLeft, RefreshCw } from 'lucide-react';

export default function BossKeyDiscretion() {
  const [isStealthActive, setIsStealthActive] = useState(false);
  const [originalTitle, setOriginalTitle] = useState('');

  // Handle hotkey (Esc key or Ctrl+B)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Ctrl+B or Esc when stealth is active
      if ((e.ctrlKey && e.key.toLowerCase() === 'b') || (isStealthActive && e.key === 'Escape')) {
        toggleStealth();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStealthActive]);

  const toggleStealth = () => {
    if (!isStealthActive) {
      setOriginalTitle(document.title);
      document.title = 'Quarterly Operations & Performance Report - Google Docs';
      setIsStealthActive(true);
    } else {
      document.title = originalTitle || 'Playtime | Luxury Ayurvedic Adult Wellness';
      setIsStealthActive(false);
    }
  };

  return (
    <>
      {/* Floating Discreet Trigger Button */}
      {!isStealthActive && (
        <button
          type="button"
          onClick={toggleStealth}
          title="Instant Stealth Camouflage (Shortcut: Ctrl+B or Esc)"
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-slate-900/90 hover:bg-slate-950 text-slate-300 hover:text-white border border-slate-700/80 shadow-xl backdrop-blur-md flex items-center gap-2 group transition-all cursor-pointer text-xs font-bold"
        >
          <EyeOff className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline-block text-[11px] font-mono tracking-wider">
            Stealth Mode (Ctrl+B)
          </span>
        </button>
      )}

      {/* Realistic Inconspicuous Camouflage Screen */}
      {isStealthActive && (
        <div className="fixed inset-0 z-[9999] bg-[#f8f9fa] text-[#202124] overflow-y-auto font-sans animate-in fade-in duration-100">
          
          {/* Mock Google Docs / Office Header */}
          <div className="bg-white border-b border-[#dadce0] px-4 py-2.5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#4285f4] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#202124]">
                  Quarterly Operations &amp; Performance Review_FY26.docx
                </h2>
                <div className="flex items-center gap-3 text-[11px] text-[#5f6368]">
                  <span>File</span>
                  <span>Edit</span>
                  <span>View</span>
                  <span>Insert</span>
                  <span>Format</span>
                  <span>Tools</span>
                  <span className="text-emerald-700">✓ Saved to Drive</span>
                </div>
              </div>
            </div>

            {/* Inconspicuous Return Action */}
            <button
              type="button"
              onClick={toggleStealth}
              className="px-4 py-1.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-medium flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Resume Session (Esc)</span>
            </button>
          </div>

          {/* Realistic Corporate Report Content */}
          <main className="max-w-4xl mx-auto my-8 p-8 sm:p-12 bg-white rounded-lg border border-[#dadce0] shadow-sm space-y-6 text-xs leading-relaxed text-[#3c4043]">
            <div className="border-b border-[#e8eaed] pb-4">
              <span className="text-[11px] font-mono text-[#70757a] uppercase tracking-wider">
                Internal Operational Audit &bull; Q3 Summary
              </span>
              <h1 className="text-xl font-bold text-[#202124] mt-1">
                Regional Logistics Efficiency &amp; Supply Chain Analytics
              </h1>
              <p className="text-[#5f6368] text-[11px] mt-0.5">Author: Regional Operations Advisory &bull; Confirmed 2026</p>
            </div>

            <section className="space-y-2">
              <h3 className="text-xs font-bold text-[#202124] uppercase tracking-wider">1. Executive Overview</h3>
              <p>
                During the preceding fiscal cycle, cross-dock distribution velocity improved by 14.8% across metro nodes. Fleet utilization achieved 92.4% consistency, reducing terminal dwell periods across north and western transit hubs.
              </p>
            </section>

            {/* Mock Data Table */}
            <div className="overflow-x-auto border border-[#dadce0] rounded-md">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-[#f1f3f4] text-[#202124] font-semibold">
                  <tr>
                    <th className="p-2.5 border-b border-[#dadce0]">Fulfillment Node</th>
                    <th className="p-2.5 border-b border-[#dadce0]">Throughput Units</th>
                    <th className="p-2.5 border-b border-[#dadce0]">Cycle Duration</th>
                    <th className="p-2.5 border-b border-[#dadce0]">Efficiency Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8eaed]">
                  <tr>
                    <td className="p-2.5 font-medium">Bhiwandi Central (MH)</td>
                    <td className="p-2.5">14,280</td>
                    <td className="p-2.5">1.2 days</td>
                    <td className="p-2.5 text-emerald-700 font-bold">98.2%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium">Manesar Hub (HR)</td>
                    <td className="p-2.5">11,890</td>
                    <td className="p-2.5">1.4 days</td>
                    <td className="p-2.5 text-emerald-700 font-bold">96.8%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium">Hosur Expressway (KA)</td>
                    <td className="p-2.5">9,440</td>
                    <td className="p-2.5">1.1 days</td>
                    <td className="p-2.5 text-emerald-700 font-bold">99.1%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <section className="space-y-2">
              <h3 className="text-xs font-bold text-[#202124] uppercase tracking-wider">2. Variance &amp; Quality Compliance</h3>
              <p>
                Temperature-regulated inventory compliance verified 100% adherence to standard operational procedures. Zero non-conformance incidents noted in outbound sealed consignments.
              </p>
            </section>

            <div className="pt-4 border-t border-[#e8eaed] text-[10px] text-[#70757a] flex items-center justify-between">
              <span>Confidential &bull; Playtime Logistics Review</span>
              <button
                type="button"
                onClick={toggleStealth}
                className="text-[#1a73e8] hover:underline font-semibold cursor-pointer"
              >
                Click here or press Esc to return
              </button>
            </div>
          </main>

        </div>
      )}
    </>
  );
}
