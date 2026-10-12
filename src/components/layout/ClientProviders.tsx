'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { SettingsProvider } from '@/context/SettingsContext';
import AuthModal from '@/components/AuthModal';
import CartDrawer from '@/components/CartDrawer';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <AuthProvider>
        <CartProvider>
          {children}
          <AuthModal />
          <CartDrawer />
        </CartProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}
