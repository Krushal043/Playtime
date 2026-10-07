'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Shield, RefreshCw, FileSpreadsheet, Lock } from 'lucide-react';

export default function BossKeyDiscretion() {
  const [isDisguised, setIsDisguised] = useState(false);

  // Esc key trigger for emergency discretion
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If user presses Esc and is not inside an input, toggle disguise
      if (e.key === 'Escape') {
        const target = e.target as HTMLElement;
        const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
        if (!isInput) {
          setIsDisguised((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isDisguised) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#f3f2f1] text-[#252423] font-sans flex flex-col select-none overflow-auto">
        {/* Office 365 / Excel Top Bar */}
        <div className="bg-[#107c41] text-white px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-5 h-5" />
            <span className="font-bold">Excel Online &bull; Q3_Logistics_Supply_Chain_Forecast.xlsx</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">Saved to OneDrive</span>
          </div>
          
          <button
            onClick={() => setIsDisguised(false)}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-white text-[#107c41] font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
            title="Press Esc to exit panic mode"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Return to Browsing (Esc)</span>
          </button>
        </div>

        {/* Excel Ribbon */}
        <div className="bg-white border-b border-slate-300 px-4 py-1.5 text-xs text-slate-700 flex gap-6 font-medium">
          <span className="text-[#107c41] font-bold border-b-2 border-[#107c41] pb-1">Home</span>
          <span>Insert</span>
          <span>Page Layout</span>
          <span>Formulas</span>
          <span>Data</span>
          <span>Review</span>
          <span>View</span>
        </div>

        {/* Mock Spreadsheet Grid */}
        <div className="flex-1 p-4 bg-white overflow-x-auto text-xs">
          <table className="w-full border-collapse border border-slate-300 font-mono text-[11px]">
            <thead>
              <tr className="bg-slate-100 text-slate-600">
                <th className="border border-slate-300 px-3 py-1.5 w-12 text-center font-normal">#</th>
                <th className="border border-slate-300 px-3 py-1.5 text-left font-bold">SKU ID</th>
                <th className="border border-slate-300 px-3 py-1.5 text-left font-bold">Category</th>
                <th className="border border-slate-300 px-3 py-1.5 text-right font-bold">Q1 Volume</th>
                <th className="border border-slate-300 px-3 py-1.5 text-right font-bold">Q2 Actual</th>
                <th className="border border-slate-300 px-3 py-1.5 text-right font-bold">Q3 Target</th>
                <th className="border border-slate-300 px-3 py-1.5 text-left font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sku: 'PT-LOG-4091', cat: 'Warehouse Freight', q1: '14,200', q2: '18,450', q3: '22,000', status: 'On Schedule' },
                { sku: 'PT-LOG-8812', cat: 'Packaging Ingress', q1: '8,400', q2: '9,120', q3: '11,500', status: 'Optimal' },
                { sku: 'PT-LOG-3304', cat: 'Cold Chain Transit', q1: '5,100', q2: '6,200', q3: '7,800', status: 'Reviewing' },
                { sku: 'PT-LOG-1192', cat: 'Surface Couriers', q1: '32,400', q2: '38,900', q3: '44,200', status: 'On Schedule' },
                { sku: 'PT-LOG-7721', cat: 'Airway Bills - Tier 1', q1: '19,300', q2: '21,500', q3: '26,000', status: 'Optimal' },
                { sku: 'PT-LOG-6643', cat: 'Hub Distribution', q1: '11,800', q2: '13,200', q3: '15,400', status: 'On Schedule' },
                { sku: 'PT-LOG-2299', cat: 'Inventory Auditing', q1: '4,200', q2: '4,900', q3: '5,800', status: 'Optimal' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-blue-50/50">
                  <td className="border border-slate-300 px-3 py-1 text-center bg-slate-50 text-slate-400">{i + 1}</td>
                  <td className="border border-slate-300 px-3 py-1 font-bold text-slate-800">{row.sku}</td>
                  <td className="border border-slate-300 px-3 py-1 text-slate-600">{row.cat}</td>
                  <td className="border border-slate-300 px-3 py-1 text-right text-slate-700">{row.q1}</td>
                  <td className="border border-slate-300 px-3 py-1 text-right text-slate-700">{row.q2}</td>
                  <td className="border border-slate-300 px-3 py-1 text-right font-bold text-emerald-700">{row.q3}</td>
                  <td className="border border-slate-300 px-3 py-1 text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-sans text-[10px] font-bold">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-[10px] text-slate-400">Press [Esc] or click top right button to exit disguise mode.</p>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsDisguised(true)}
      className="fixed bottom-6 left-6 z-40 px-3.5 py-2 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white text-[11px] font-bold backdrop-blur-md border border-slate-700/60 shadow-lg flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95 group"
      title="Discretion Mode: Instantly disguise screen if someone approaches (Hotkey: Esc)"
    >
      <EyeOff className="w-3.5 h-3.5 text-rose-400 group-hover:text-rose-300" />
      <span className="hidden sm:inline">Discreet Mode</span>
      <span className="px-1.5 py-0.2 rounded bg-white/20 text-[9px] font-mono">Esc</span>
    </button>
  );
}
