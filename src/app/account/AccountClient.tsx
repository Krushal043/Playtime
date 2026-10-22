'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Address } from '@/types';
import AeroNavbar from '@/components/AeroNavbar';
import AeroFooter from '@/components/AeroFooter';
import {
  Package,
  MapPin,
  ShieldCheck,
  EyeOff,
  Lock,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  LogOut,
  User as UserIcon,
  Zap,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function AccountClient() {
  const {
    user,
    orders,
    logout,
    demoLogin,
    setIsAuthModalOpen,
    addAddress,
    deleteAddress,
    setDefaultAddress
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'privacy'>('orders');
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  const [newAddr, setNewAddr] = useState<Omit<Address, 'id'>>({
    fullName: user?.name || '',
    phone: user?.phone || '',
    pincode: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    addressType: 'Home',
    isDefault: false
  });

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.phone || !newAddr.addressLine1 || !newAddr.pincode) {
      alert('Please fill out all required fields.');
      return;
    }
    addAddress(newAddr);
    setShowAddAddressModal(false);
    setNewAddr({
      fullName: user?.name || '',
      phone: user?.phone || '',
      pincode: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      addressType: 'Home',
      isDefault: false
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen silver-shade-bg text-[#0A0A0A] flex flex-col selection:bg-[#007BA7]/25 selection:text-[#0A0A0A]">
        <AeroNavbar />

        <main className="flex-1 max-w-lg mx-auto px-4 py-16 text-center space-y-6">
          <div className="glass-card-elevated rounded-3xl p-8 sm:p-10 border border-white/95 shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#FF2D95]/10 border border-[#FF2D95]/30 text-[#FF2D95] flex items-center justify-center mx-auto shadow-sm">
              <UserIcon className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-black text-[#0A0A0A]">Sign In to Your Account</h1>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto font-medium">
                Access your discreet order tracking, confidential invoices, and manage saved delivery addresses.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#0A0A0A] via-[#007BA7] to-[#FF2D95] hover:opacity-95 text-white text-xs font-black uppercase tracking-wider shadow-[0_4px_16px_rgba(0,123,167,0.35)] cursor-pointer transition-all active:scale-95"
              >
                Sign In with Mobile OTP / Email &rarr;
              </button>

              <button
                type="button"
                onClick={demoLogin}
                className="w-full py-3.5 rounded-full bg-[#0A0A0A] hover:bg-[#181818] text-slate-100 border border-[#007BA7]/30 text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
              >
                <Zap className="w-4 h-4 fill-current text-[#007BA7]" />
                <span>⚡ 1-Click Instant Demo Login (Rahul Sharma)</span>
              </button>
            </div>
          </div>
        </main>

        <AeroFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen silver-shade-bg text-[#0A0A0A] flex flex-col selection:bg-[#007BA7]/25 selection:text-[#0A0A0A]">
      <AeroNavbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full space-y-8">
        
        {/* User Profile Header Card */}
        <div className="glass-card-elevated rounded-3xl p-6 sm:p-8 border border-white/90 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0A0A0A] to-[#007BA7] text-white font-black text-2xl flex items-center justify-center shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0A]">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF2D95]/15 text-[#FF2D95] border border-[#FF2D95]/30 text-[10px] font-black uppercase tracking-wider">
                  Member
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                +91 {user.phone} • {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-full border border-slate-300/80 bg-white/80 hover:bg-[#FF2D95]/10 hover:text-[#FF2D95] hover:border-[#FF2D95]/30 text-slate-700 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200/80 gap-4 sm:gap-8 text-sm font-bold overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 flex items-center gap-2 cursor-pointer transition-all whitespace-nowrap ${
              activeTab === 'orders' ? 'border-[#FF2D95] text-[#FF2D95] font-black' : 'border-transparent text-slate-500 hover:text-[#0A0A0A]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 border-b-2 flex items-center gap-2 cursor-pointer transition-all whitespace-nowrap ${
              activeTab === 'addresses' ? 'border-[#FF2D95] text-[#FF2D95] font-black' : 'border-transparent text-slate-500 hover:text-[#0A0A0A]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses ({user.addresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-3 border-b-2 flex items-center gap-2 cursor-pointer transition-all whitespace-nowrap ${
              activeTab === 'privacy' ? 'border-[#FF2D95] text-[#FF2D95] font-black' : 'border-transparent text-slate-500 hover:text-[#0A0A0A]'
            }`}
          >
            <EyeOff className="w-4 h-4" />
            <span>Discretion Guarantee</span>
          </button>
        </div>

        {/* TAB 1: MY ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="glass-card-elevated rounded-3xl p-12 text-center border border-white/90 shadow-2xl space-y-4">
                <Package className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="font-black text-[#0A0A0A] text-base">No Orders Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You haven&apos;t placed any discreet orders yet. Browse our flagships and elevate your intimacy.
                </p>
                <Link href="/" className="inline-block px-6 py-2.5 rounded-full btn-gradient text-white text-xs font-black shadow-md hover:shadow-lg transition-all">
                  Start Shopping &rarr;
                </Link>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="glass-card-elevated rounded-3xl p-6 sm:p-8 border border-white/90 shadow-2xl space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-[#0A0A0A] font-mono">#{ord.id}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black uppercase">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Placed on {new Date(ord.createdAt).toLocaleDateString()} • Tracking: <span className="font-mono text-[#FF2D95] font-bold">{ord.trackingNumber}</span>
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-base font-black text-[#0A0A0A]">
                        ₹{ord.totalAmount.toLocaleString('en-IN')}
                      </p>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Paid via {ord.paymentMethod} • Billed as &ldquo;{ord.billingDescriptor}&rdquo;
                      </span>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ord.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 border border-slate-200/60 shadow-xs">
                          <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 text-xs">
                          <p className="font-black text-[#0A0A0A] truncate">{item.productName}</p>
                          <p className="text-[11px] text-[#FF2D95] font-bold">{item.packLabel}</p>
                          <p className="text-[10px] text-slate-500">Qty: {item.quantity} • ₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer & link to full summary */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                      <EyeOff className="w-4 h-4 shrink-0" />
                      <span>Packaging: 100% Plain Unmarked Outer Box Guaranteed</span>
                    </div>

                    <Link
                      href={`/order-success/${ord.id}`}
                      className="px-5 py-2.5 rounded-full bg-white/80 hover:bg-white text-[#0A0A0A] font-black flex items-center gap-1.5 cursor-pointer shadow-sm border border-slate-300/80 hover:shadow-md transition-all"
                    >
                      <span>View Full Order Summary &amp; Invoice</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#FF2D95]" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-[#0A0A0A]">Saved Delivery Addresses</h2>
                <p className="text-xs text-slate-500 font-medium">Manage addresses for fast, discreet 1-click checkout.</p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddAddressModal(true)}
                className="px-5 py-2.5 rounded-full btn-gradient text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.addresses.map((addr) => {
                const isDefault = user.defaultAddressId === addr.id || addr.isDefault;
                return (
                  <div
                    key={addr.id}
                    className={`rounded-3xl p-6 border transition-all text-xs flex flex-col justify-between space-y-4 ${
                      isDefault
                        ? 'glass-card-elevated border-[#FF2D95]/80 shadow-xl ring-2 ring-[#FF2D95]/20'
                        : 'glass-card border-white/80 shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-[#0A0A0A] text-sm">{addr.fullName}</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold">
                            {addr.addressType}
                          </span>
                          {isDefault && (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FF2D95] text-white text-[10px] font-black shadow-xs">
                              Default
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-slate-600 leading-relaxed">
                        {addr.addressLine1}, {addr.addressLine2 && `${addr.addressLine2}, `}
                        {addr.city}, {addr.state} - <strong className="text-[#0A0A0A]">{addr.pincode}</strong>
                      </p>
                      <p className="text-slate-500 mt-2 font-semibold">Phone: +91 {addr.phone}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                      {!isDefault && (
                        <button
                          type="button"
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-xs text-[#FF2D95] font-bold hover:underline cursor-pointer"
                        >
                          Set as Default
                        </button>
                      )}
                      {isDefault && <span />}

                      <button
                        type="button"
                        onClick={() => deleteAddress(addr.id)}
                        className="text-slate-400 hover:text-[#FF2D95] p-1 cursor-pointer transition-colors"
                        title="Delete Address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal to Add New Address */}
            {showAddAddressModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
                <div className="glass-card-elevated rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-white/90 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
                  <h3 className="text-lg font-black text-[#0A0A0A]">Add New Delivery Address</h3>

                  <form onSubmit={handleCreateAddress} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={newAddr.fullName}
                        onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200 text-[#0A0A0A] focus:outline-none focus:border-[#007BA7] font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Mobile Phone *</label>
                        <input
                          type="tel"
                          required
                          value={newAddr.phone}
                          onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200 text-[#0A0A0A] focus:outline-none focus:border-[#007BA7] font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">PIN Code *</label>
                        <input
                          type="text"
                          required
                          value={newAddr.pincode}
                          onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200 text-[#0A0A0A] focus:outline-none focus:border-[#007BA7] font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Flat / Building / House *</label>
                      <input
                        type="text"
                        required
                        value={newAddr.addressLine1}
                        onChange={(e) => setNewAddr({ ...newAddr, addressLine1: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200 text-[#0A0A0A] focus:outline-none focus:border-[#007BA7]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Area / Street</label>
                      <input
                        type="text"
                        value={newAddr.addressLine2}
                        onChange={(e) => setNewAddr({ ...newAddr, addressLine2: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200 text-[#0A0A0A] focus:outline-none focus:border-[#007BA7]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">City *</label>
                        <input
                          type="text"
                          required
                          value={newAddr.city}
                          onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200 text-[#0A0A0A] focus:outline-none focus:border-[#007BA7]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">State *</label>
                        <input
                          type="text"
                          required
                          value={newAddr.state}
                          onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200 text-[#0A0A0A] focus:outline-none focus:border-[#007BA7]"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setShowAddAddressModal(false)}
                        className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-full btn-gradient text-white font-black cursor-pointer shadow-md hover:shadow-lg transition-all"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DISCRETION GUARANTEE */}
        {activeTab === 'privacy' && (
          <div className="glass-card-elevated rounded-3xl p-6 sm:p-10 border border-white/90 shadow-2xl space-y-6 text-xs">
            <div>
              <h2 className="text-xl font-black text-[#0A0A0A] flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-emerald-600" />
                The Playtime Discretion Standard
              </h2>
              <p className="text-slate-600 mt-1">
                How we protect your intimate choices with uncompromising confidentiality.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white/70 border border-slate-200/80 space-y-2 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-black">
                  📦
                </div>
                <h3 className="font-black text-[#0A0A0A] text-sm">100% Plain Unmarked Box</h3>
                <p className="text-slate-600 leading-relaxed">
                  Every parcel is shipped in an unprinted, sturdy brown corrugated box with no pictures or logos.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/70 border border-slate-200/80 space-y-2 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#007BA7]/10 text-[#007BA7] border border-[#007BA7]/20 flex items-center justify-center font-black">
                  💳
                </div>
                <h3 className="font-black text-[#0A0A0A] text-sm">PT Logistics Statement</h3>
                <p className="text-slate-600 leading-relaxed">
                  Credit cards, UPI, and bank SMS statements will read &ldquo;PT Logistics&rdquo; with zero adult references.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/70 border border-slate-200/80 space-y-2 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#FF2D95]/10 text-[#FF2D95] border border-[#FF2D95]/20 flex items-center justify-center font-black">
                  🔒
                </div>
                <h3 className="font-black text-[#0A0A0A] text-sm">Zero Courier Leakage</h3>
                <p className="text-slate-600 leading-relaxed">
                  Delivery airway bill classifies contents as &ldquo;Health Supplements / Personal Care&rdquo;.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      <AeroFooter />
    </div>
  );
}
