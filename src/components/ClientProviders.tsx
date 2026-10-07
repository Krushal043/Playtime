'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import AuthModal from '@/components/AuthModal';
import CartDrawer from '@/components/CartDrawer';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <AuthModal />
        <CartDrawer />
      </CartProvider>
    </AuthProvider>
  );
}
