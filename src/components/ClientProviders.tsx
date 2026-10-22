'use client';

import React, { useState } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { SettingsProvider } from '@/context/SettingsContext';
import AuthModal from '@/components/AuthModal';
import CartDrawer from '@/components/CartDrawer';
import SmoothLoader from '@/components/SmoothLoader';
import { useGlobalScrollReveal } from '@/hooks/useScrollReveal';

function GlobalAnimationProvider({ children }: { children: React.ReactNode }) {
  // Wire up IntersectionObserver for all .reveal elements site-wide
  useGlobalScrollReveal(0.1, '0px 0px -50px 0px');
  return <>{children}</>;
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <SettingsProvider>
      <AuthProvider>
        <CartProvider>
          {/* Branded smooth loader — shown once on first paint */}
          {!loaderDone && (
            <SmoothLoader durationMs={2000} onDone={() => setLoaderDone(true)} />
          )}

          <GlobalAnimationProvider>
            {children}
            <AuthModal />
            <CartDrawer />
          </GlobalAnimationProvider>
        </CartProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}
