'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Address, Order } from '@/types';

interface AuthContextType {
  user: User | null;
  orders: Order[];
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (phoneOrEmail: string, name?: string) => void;
  logout: () => void;
  demoLogin: () => void;
  addAddress: (address: Omit<Address, 'id'>) => Address;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'usr_demo_882',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '9876543210',
  addresses: [
    {
      id: 'addr_demo_1',
      fullName: 'Rahul Sharma',
      phone: '9876543210',
      pincode: '400050',
      addressLine1: 'Flat 402, Sea Breeze Apts, Hill Road',
      addressLine2: 'Near Mehboob Studio, Bandra West',
      landmark: 'Opposite Costa Coffee',
      city: 'Mumbai',
      state: 'Maharashtra',
      addressType: 'Home',
      isDefault: true
    }
  ],
  defaultAddressId: 'addr_demo_1'
};

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'PT-839210',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      {
        productId: 'pt-extend-spray',
        productName: 'Extend Long Last Delay Spray (50g)',
        productImage: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=800&auto=format&fit=crop&q=80',
        packLabel: 'Single Canister (50g)',
        packSize: 1,
        price: 499,
        quantity: 1
      }
    ],
    shippingAddress: DEMO_USER.addresses[0],
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    billingDescriptor: 'PT Logistics',
    subtotal: 499,
    discount: 50,
    couponCode: 'PLAY10',
    shippingFee: 0,
    totalAmount: 449,
    discreetDeliveryPreference: {
      unmarkedBox: true,
      discreteCallOnArrival: true,
      hideContentsFromPartner: true
    },
    status: 'Delivered',
    estimatedDelivery: 'Delivered discreetly on 25 Sep',
    trackingNumber: 'DELIV-IN-839210'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load user and orders from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('playtime_user');
      const savedOrders = localStorage.getItem('playtime_orders');

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders(SAMPLE_ORDERS);
        localStorage.setItem('playtime_orders', JSON.stringify(SAMPLE_ORDERS));
      }
    } catch {
      // fallback in case of JSON parse error
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync user updates to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    if (user) {
      localStorage.setItem('playtime_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('playtime_user');
    }
  }, [user, isInitialized]);

  // Sync orders to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('playtime_orders', JSON.stringify(orders));
  }, [orders, isInitialized]);

  const login = (phoneOrEmail: string, name?: string) => {
    const isEmail = phoneOrEmail.includes('@');
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name?.trim() || (isEmail ? phoneOrEmail.split('@')[0] : 'Playtime Member'),
      email: isEmail ? phoneOrEmail : `${phoneOrEmail.replace(/\D/g, '')}@privatemail.in`,
      phone: !isEmail ? phoneOrEmail : '9876543210',
      addresses: user?.addresses || [],
      defaultAddressId: user?.defaultAddressId
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const demoLogin = () => {
    setUser(DEMO_USER);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const addAddress = (addressData: Omit<Address, 'id'>): Address => {
    const newAddress: Address = {
      ...addressData,
      id: `addr_${Date.now()}`
    };

    setUser((prev) => {
      if (!prev) return null;
      const updatedAddresses = [...prev.addresses, newAddress];
      return {
        ...prev,
        addresses: updatedAddresses,
        defaultAddressId: prev.defaultAddressId || newAddress.id
      };
    });

    return newAddress;
  };

  const updateAddress = (id: string, addressData: Partial<Address>) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: prev.addresses.map((a) => (a.id === id ? { ...a, ...addressData } : a))
      };
    });
  };

  const deleteAddress = (id: string) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: prev.addresses.filter((a) => a.id !== id),
        defaultAddressId: prev.defaultAddressId === id ? undefined : prev.defaultAddressId
      };
    });
  };

  const setDefaultAddress = (id: string) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        defaultAddressId: id
      };
    });
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find((o) => o.id === id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        logout,
        demoLogin,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        addOrder,
        getOrderById
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
