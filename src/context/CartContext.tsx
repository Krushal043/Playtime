'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, ProductPack, CartItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, pack: ProductPack, quantity?: number) => void;
  updateQuantity: (productId: string, packSize: number, delta: number) => void;
  removeItem: (productId: string, packSize: number) => void;
  clearCart: () => void;
  promoCode: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('playtime_cart');
      const savedPromo = localStorage.getItem('playtime_promo');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      if (savedPromo) {
        setPromoCode(savedPromo);
      }
    } catch {
      // fallback
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('playtime_cart', JSON.stringify(cart));
  }, [cart, isInitialized]);

  // Save promo to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    if (promoCode) {
      localStorage.setItem('playtime_promo', promoCode);
    } else {
      localStorage.removeItem('playtime_promo');
    }
  }, [promoCode, isInitialized]);

  const addToCart = (product: Product, pack: ProductPack, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedPack.packSize === pack.packSize
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedPack.packSize === pack.packSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, selectedPack: pack, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, packSize: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedPack.packSize === packSize) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (productId: string, packSize: number) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedPack.packSize === packSize)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const [promoDiscount, setPromoDiscount] = useState<{ type: string; value: number } | null>(null);

  const applyPromo = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    const validCodes = [
      'PLAY10',
      'MATCH10',
      'VIP20',
      'DISCREET10',
      'WELCOME10',
      'PLAY15',
      'PLAY20',
      'SECRET150',
      'LUCKY100',
      'FREESHIP',
      'AYURGIFT',
    ];

    // Optimistic local match
    if (validCodes.includes(clean)) {
      setPromoCode(clean);
      if (clean === 'VIP20' || clean === 'PLAY20') setPromoDiscount({ type: 'percentage', value: 20 });
      else if (clean === 'PLAY15') setPromoDiscount({ type: 'percentage', value: 15 });
      else setPromoDiscount({ type: 'percentage', value: 10 });
      return true;
    }

    // Also trigger async validation against MongoDB
    fetch('/api/coupons/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: clean, cartTotal: subtotal }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          setPromoCode(data.code);
          setPromoDiscount({ type: data.discountType, value: data.discountValue });
        }
      })
      .catch(() => {});

    return false;
  };

  const removePromo = () => {
    setPromoCode(null);
    setPromoDiscount(null);
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.selectedPack.price * item.quantity, 0),
    [cart]
  );

  const discount = useMemo(() => {
    if (!promoCode || subtotal === 0) return 0;
    if (promoDiscount) {
      if (promoDiscount.type === 'percentage') {
        return Math.round((subtotal * promoDiscount.value) / 100);
      }
      return Math.min(subtotal, promoDiscount.value);
    }
    if (promoCode === 'PLAY20' || promoCode === 'VIP20') return Math.round(subtotal * 0.2);
    if (promoCode === 'PLAY15') return Math.round(subtotal * 0.15);
    if (promoCode === 'SECRET150') return Math.min(subtotal, 150);
    if (promoCode === 'LUCKY100') return Math.min(subtotal, 100);
    if (promoCode === 'AYURGIFT') return Math.min(subtotal, 120);
    return Math.round(subtotal * 0.1);
  }, [promoCode, subtotal, promoDiscount]);

  const shippingFee = useMemo(() => {
    if (subtotal === 0 || subtotal >= 999 || promoCode === 'FREESHIP') return 0;
    return 99;
  }, [subtotal, promoCode]);

  const finalTotal = useMemo(
    () => Math.max(0, subtotal - discount + shippingFee),
    [subtotal, discount, shippingFee]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        promoCode,
        applyPromo,
        removePromo,
        cartCount,
        subtotal,
        discount,
        shippingFee,
        finalTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
