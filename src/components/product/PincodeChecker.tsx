'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Truck, CheckCircle2, ShieldCheck, EyeOff, Sparkles } from 'lucide-react';

interface PincodeCheckerProps {
  compact?: boolean;
}

export default function PincodeChecker({ compact = false }: PincodeCheckerProps) {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<{
    city: string;
    eta: string;
    courier: string;
    serviceable: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check saved pincode
  useEffect(() => {
    const saved = localStorage.getItem('playtime_saved_pincode');
    if (saved && saved.length === 6) {
      setPincode(saved);
      checkPincode(saved, false);
    }
  }, []);

  const checkPincode = (code: string, save = true) => {
    if (code.length !== 6 || !/^\d{6}$/.test(code)) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      let city = 'Your Area';
      let eta = 'Within 48 Hours';
      let courier = 'BlueDart Air Express';

      const prefix = code.substring(0, 2);
      if (['40', '41', '42'].includes(prefix)) {
        city = 'Mumbai / Pune Region';
        eta = '⚡ Tomorrow by 5:00 PM';
        courier = 'BlueDart Same-Day Express';
      } else if (['11', '12', '20'].includes(prefix)) {
        city = 'Delhi NCR / Gurugram';
        eta = '⚡ Tomorrow by 6:00 PM';
        courier = 'Delhivery Air';
      } else if (['56', '57'].includes(prefix)) {
        city = 'Bengaluru Metro';
        eta = '⚡ Tomorrow by 5:00 PM';
        courier = 'BlueDart Express';
      } else if (['50', '51', '52'].includes(prefix)) {
        city = 'Hyderabad Region';
        eta = 'Within 24-36 Hours';
        courier = 'Delhivery Express';
      } else if (['60', '61', '62'].includes(prefix)) {
        city = 'Chennai Metro';
        eta = 'Within 24-36 Hours';
        courier = 'BlueDart Express';
      } else {
        city = 'All-India Serviceable';
        eta = 'In 2-3 Business Days';
        courier = 'Express Air Courier';
      }

      setResult({
        city,
        eta,
        courier,
        serviceable: true
      });

      if (save) {
        localStorage.setItem('playtime_saved_pincode', code);
      }
    }, 400);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(clean);
    if (clean.length === 6) {
      checkPincode(clean);
    } else {
      setResult(null);
    }
  };

  return (
    <div className={`rounded-2xl bg-white/70 border border-slate-200/90 ${compact ? 'p-3 text-xs' : 'p-4 text-xs'} shadow-xs`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-[#0a193d] flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-rose-500" />
          Discreet Delivery &amp; PIN Code ETA
        </span>
        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold flex items-center gap-1">
          <EyeOff className="w-3 h-3" />
          Unmarked Box
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit PIN (e.g. 400001)"
            value={pincode}
            onChange={handleInputChange}
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-[#0a193d] placeholder-slate-400 font-mono text-xs font-bold focus:outline-none focus:border-rose-500 shadow-2xs"
          />
        </div>

        <button
          type="button"
          disabled={pincode.length !== 6 || isLoading}
          onClick={() => checkPincode(pincode)}
          className="px-4 py-2 rounded-xl btn-navy-red text-white text-xs font-black shrink-0 cursor-pointer disabled:opacity-50 transition-all"
        >
          {isLoading ? 'Checking...' : 'Check'}
        </button>
      </div>

      {result && (
        <div className="mt-2.5 pt-2.5 border-t border-slate-200/80 space-y-1 text-[11px] animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-[#0a193d]">
            <span className="font-bold flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Serviceable to {result.city}
            </span>
            <span className="font-black text-rose-600">{result.eta}</span>
          </div>
          <p className="text-slate-500 text-[10px]">
            Delivered via <strong>{result.courier}</strong> in plain brown outer carton. Sender name reads &ldquo;<strong>PT Logistics</strong>&rdquo;.
          </p>
        </div>
      )}
    </div>
  );
}
