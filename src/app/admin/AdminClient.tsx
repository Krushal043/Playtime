'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Eye,
  Trash2,
  Edit,
  Save,
  RefreshCw,
  Database,
  ShieldCheck,
  Sparkles,
  Zap,
  TrendingUp,
  DollarSign,
  Video,
  Film,
  Play,
  UploadCloud
} from 'lucide-react';
import CloudinaryMediaUpload from '@/components/admin/CloudinaryMediaUpload';
import CloudinaryMultiImageUpload from '@/components/admin/CloudinaryMultiImageUpload';
import CloudinaryMediaManager from '@/components/admin/CloudinaryMediaManager';

interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  basePrice: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  videoUrl?: string;
  images?: { url: string; label?: string; caption?: string }[];
  inStock: boolean;
  galleryText?: string;
  packs?: any[];
}

interface VideoItem {
  id: string;
  creatorName: string;
  creatorHandle: string;
  avatar: string;
  videoUrl: string;
  poster: string;
  rating: number;
  views: string;
  likes: string;
  quote: string;
  productName: string;
  productId: string;
  productPrice: number;
  productOriginalPrice: number;
  productImage: string;
  isPublished: boolean;
  sortOrder?: number;
}

interface OrderItem {
  orderId: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: any[];
  pricing: {
    subtotal: number;
    discount: number;
    shippingFee: number;
    totalAmount: number;
    promoCode?: string;
  };
  paymentMethod: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  tracking?: {
    courierPartner?: string;
    trackingNumber?: string;
  };
  createdAt: string;
}

interface CouponItem {
  code: string;
  discountType: string;
  discountValue: number;
  minSpend: number;
  timesUsed: number;
  isActive: boolean;
}

export default function AdminClient() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'cms' | 'videos' | 'media' | 'database'>('overview');

  // Data states
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [cmsSettings, setCmsSettings] = useState<any>({
    promo_banner: {
      tickerText: '100% Plain Box: Discreet Box • Zero outer logos',
      couponCode: 'PLAY10',
      countdownHours: 4,
      countdownMinutes: 28,
    },
    hero_section: {
      heading1: 'Peak Intimate Endurance.',
      headingGreen: '100% Herbal.',
      headingGradient: 'Zero Numbness.',
      subtitle: 'Formulated with pure botanical clove, jaiphal and pure Himalayan Shilajit.',
    },
    marquee_items: [],
    faqs: [],
    testimonials: [],
    timeline_steps: [],
    standards_grid: [],
    footer_config: {
      email: 'care@playtime.in',
      phone: '+91 800-PLAYTIME',
      workingHours: 'Daily 9:00 AM - 9:00 PM',
      companyName: 'Playtime Botanical Labs',
      companyAddress: 'Mumbai, MH, India',
      discreetNotice: 'All orders are packed in unmarked plain cartons with no product descriptions or brand identifiers.',
    },
  });
  const [cmsSubTab, setCmsSubTab] = useState<'marquee' | 'reviews' | 'faqs' | 'timeline' | 'standards' | 'footer' | 'banner'>('marquee');

  // Filter states
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  // Modals
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductData, setNewProductData] = useState<any>({
    name: '',
    tagline: '',
    category: 'extend',
    basePrice: 499,
    originalPrice: 699,
    badge: 'New Release',
    image: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-glass-of-water-and-taking-a-pill-42588-large.mp4',
    galleryImagesText: '',
    description: 'Ayurvedic intimacy formula crafted for natural endurance and pure satisfaction.',
    inStock: true,
  });

  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [newVideoData, setNewVideoData] = useState<Partial<VideoItem>>({
    creatorName: '',
    creatorHandle: '@',
    avatar: 'https://images.unsplash.com/photo-1594824813627-8a6e4d5885c5?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-glass-of-water-and-taking-a-pill-42588-large.mp4',
    poster: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    rating: 5,
    views: '150K',
    likes: '12.4K',
    quote: '100% natural Ayurvedic formulation with remarkable results and zero numbness.',
    productName: 'Extend Delay Spray (50g)',
    productId: 'pt-extend-spray',
    productPrice: 799,
    productOriginalPrice: 1299,
    productImage: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=600&auto=format&fit=crop&q=80',
    isPublished: true,
    sortOrder: 0,
  });

  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [newCouponData, setNewCouponData] = useState<any>({
    code: '',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 499,
    isActive: true,
  });

  const [fulfillmentModalOrder, setFulfillmentModalOrder] = useState<OrderItem | null>(null);
  const [courierPartner, setCourierPartner] = useState('BlueDart Air');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [newStatus, setNewStatus] = useState('dispatched');

  // Toast / feedback message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();
        setIsAuthenticated(data.authenticated === true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchAllData();
  }, [isAuthenticated, activeTab]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'overview') {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
          setOrders(data.recentOrders || []);
        }
      } else if (activeTab === 'products') {
        const res = await fetch('/api/admin/products');
        const data = await res.json();
        if (data.success) setProducts(data.products || []);
      } else if (activeTab === 'orders') {
        const res = await fetch(`/api/admin/orders?status=${orderStatusFilter}&search=${orderSearch}`);
        const data = await res.json();
        if (data.success) setOrders(data.orders || []);
      } else if (activeTab === 'coupons') {
        const res = await fetch('/api/admin/coupons');
        const data = await res.json();
        if (data.success) setCoupons(data.coupons || []);
      } else if (activeTab === 'cms') {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data.success && data.settings) {
          setCmsSettings(data.settings);
        }
      } else if (activeTab === 'videos') {
        const res = await fetch('/api/admin/videos');
        const data = await res.json();
        if (data.success) {
          setVideos(data.videos || []);
        }
      }

      // Always keep CMS settings updated in background
      if (activeTab !== 'cms') {
        fetch('/api/admin/settings')
          .then((r) => r.json())
          .then((d) => {
            if (d.success && d.settings) setCmsSettings(d.settings);
          })
          .catch(() => {});
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch {
      setLoginError('Server error logging in');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
  };

  // Product Actions
  const handleSaveProduct = async (product: any) => {
    try {
      let imagesToSave = product.images;
      if (typeof product.galleryText === 'string') {
        imagesToSave = product.galleryText
          .split('\n')
          .map((s: string) => s.trim())
          .filter(Boolean)
          .map((url: string, idx: number) => ({
            url,
            label: `Photo ${idx + 1}`,
            caption: product.name,
          }));
      }

      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, images: imagesToSave }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Product updated successfully in MongoDB!');
        setEditingProduct(null);
        fetchAllData();
      } else {
        alert(data.message || data.error || 'Failed to update product in MongoDB');
      }
    } catch (err: any) {
      alert(`Error updating product: ${err.message || 'Network error'}`);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedImages = newProductData.galleryImagesText
        ? newProductData.galleryImagesText
            .split('\n')
            .map((s: string) => s.trim())
            .filter(Boolean)
            .map((url: string, idx: number) => ({
              url,
              label: `Photo ${idx + 1}`,
              caption: newProductData.name,
            }))
        : [];

      const payload = {
        ...newProductData,
        images: parsedImages.length > 0 ? parsedImages : undefined,
      };

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showToast('New product created in MongoDB!');
        setShowAddProductModal(false);
        setNewProductData({
          name: '',
          tagline: '',
          category: 'extend',
          basePrice: 499,
          originalPrice: 699,
          badge: 'New Release',
          image: '',
          videoUrl: '',
          galleryImagesText: '',
          description: 'Ayurvedic intimacy formula crafted for natural endurance and pure satisfaction.',
          inStock: true,
        });
        fetchAllData();
      } else {
        alert(data.message || data.error || 'Failed to create product in database');
      }
    } catch (err: any) {
      alert(`Error creating product: ${err.message || 'Network error'}`);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm(`Are you sure you want to delete product "${id}"?`)) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('Product deleted from MongoDB.');
        fetchAllData();
      }
    } catch {
      alert('Error deleting product');
    }
  };

  // Order Actions
  const handleUpdateOrderStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fulfillmentModalOrder) return;

    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: fulfillmentModalOrder.orderId,
          fulfillmentStatus: newStatus,
          tracking: {
            courierPartner,
            trackingNumber: trackingNumber || `AWB-${Math.floor(100000 + Math.random() * 900000)}`,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Order ${fulfillmentModalOrder.orderId} updated to ${newStatus}!`);
        setFulfillmentModalOrder(null);
        fetchAllData();
      }
    } catch {
      alert('Error updating order');
    }
  };

  // Coupon Actions
  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCouponData),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Coupon ${newCouponData.code} saved to MongoDB!`);
        setShowAddCouponModal(false);
        fetchAllData();
      }
    } catch {
      alert('Error saving coupon');
    }
  };

  const handleDeleteCoupon = async (code: string) => {
    if (!confirm(`Delete coupon ${code}?`)) return;
    try {
      const res = await fetch(`/api/admin/coupons?code=${code}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(`Coupon ${code} removed.`);
        fetchAllData();
      }
    } catch {
      alert('Error deleting coupon');
    }
  };

  // CMS Actions
  const handleSaveCms = async (key: string, value: any) => {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Storefront settings updated live in MongoDB!');
      }
    } catch {
      alert('Error updating CMS');
    }
  };

  // Video Actions
  const handleSaveVideo = async (video: VideoItem) => {
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Video reel updated live in MongoDB!');
        setEditingVideo(null);
        fetchAllData();
      }
    } catch {
      alert('Error updating video reel');
    }
  };

  const handleCreateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVideoData),
      });
      const data = await res.json();
      if (data.success) {
        showToast('New video reel added to MongoDB!');
        setShowAddVideoModal(false);
        fetchAllData();
      }
    } catch {
      alert('Error creating video reel');
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video reel from MongoDB?')) return;
    try {
      const res = await fetch(`/api/admin/videos?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('Video reel deleted from MongoDB');
        fetchAllData();
      }
    } catch {
      alert('Error deleting video reel');
    }
  };

  const handleToggleVideoPublished = async (video: VideoItem) => {
    try {
      const updated = { ...video, isPublished: !video.isPublished };
      const res = await fetch('/api/admin/videos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Video reel ${updated.isPublished ? 'published' : 'hidden'}!`);
        fetchAllData();
      }
    } catch {
      alert('Error updating video reel status');
    }
  };

  // Re-seed DB
  const handleReseedDb = async () => {
    if (!confirm('This will synchronize and reset all catalog and coupon records with the default database template. Proceed?')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showToast('Database successfully seeded with default data!');
        fetchAllData();
      }
    } catch {
      alert('Error seeding database');
    } finally {
      setLoading(false);
    }
  };

  // 1. Loading check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#051336] flex items-center justify-center text-white">
        <div className="flex items-center gap-3 font-mono text-sm">
          <RefreshCw className="w-5 h-5 animate-spin text-amber-400" />
          <span>Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-radial from-[#071844] via-[#051336] to-[#02091c] flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-blue-900/30 overflow-hidden">
          
          {/* Top Logo */}
          <div className="text-center mb-6">
            <div className="inline-block bg-[#051336] p-3 rounded-2xl shadow-md border border-blue-900 mb-3">
              <Image src="/logo.png" alt="Playtime Admin" width={110} height={45} className="object-contain" priority />
            </div>
            <h1 className="text-2xl font-black text-[#051336] tracking-tight">Playtime Command Center</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">Authorized Operations &amp; Database Desk</p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-[#051336] font-bold focus:outline-none focus:border-[#051336]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Secret Access Key / Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-[#051336] font-mono focus:outline-none focus:border-[#051336]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#071844] via-[#0e2a66] to-[#dc2626] text-white text-xs font-black tracking-widest uppercase shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? 'AUTHENTICATING...' : 'ENTER ADMIN PORTAL'}
            </button>

            {/* Fast 1-Click Admin Access */}
            <div className="pt-2">
              <button
                type="button"
                onClick={async () => {
                  setLoginEmail('admin@playtime.in');
                  setLoginPassword('PlaytimeAdmin#2026!');
                  setIsLoggingIn(true);
                  setLoginError('');
                  try {
                    const res = await fetch('/api/admin/auth', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email: 'admin@playtime.in', password: 'PlaytimeAdmin#2026!' }),
                    });
                    const data = await res.json();
                    if (data.success) {
                      setIsAuthenticated(true);
                      showToast('Logged in via Fast Admin Access!');
                    } else {
                      setLoginError(data.message || 'Fast login failed');
                    }
                  } catch {
                    setLoginError('Server error during fast login');
                  } finally {
                    setIsLoggingIn(false);
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-[#051336] text-xs font-black flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 shadow-xs"
              >
                <Zap className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
                <span>⚡ FAST ADMIN 1-CLICK LOGIN</span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
            </span>
            <Link href="/" className="hover:text-[#051336] underline">
              Return to Store &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Admin Dashboard Layout
  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-800">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-60 bg-[#051336] text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400/40 text-xs font-bold flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-[#051336] text-slate-200 flex flex-col justify-between shrink-0 shadow-2xl border-r border-blue-900/50">
        <div>
          {/* Logo & Status Badge */}
          <div className="p-5 border-b border-blue-900/40">
            <Link href="/" target="_blank" className="flex items-center gap-2">
              <div className="bg-white rounded-xl p-1.5 w-32 shadow-xs">
                <Image src="/logo.png" alt="Playtime" width={110} height={40} className="object-contain" priority />
              </div>
            </Link>
            <div className="mt-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0d2358] text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                <Zap className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                <span>ADMIN v2.0</span>
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>DB Live</span>
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview' ? 'bg-gradient-to-r from-blue-700 to-rose-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'products' ? 'bg-gradient-to-r from-blue-700 to-rose-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Product Catalog</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'orders' ? 'bg-gradient-to-r from-blue-700 to-rose-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders &amp; Dispatch</span>
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'coupons' ? 'bg-gradient-to-r from-blue-700 to-rose-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Coupons &amp; Offers</span>
            </button>

            <button
              onClick={() => setActiveTab('cms')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'cms' ? 'bg-gradient-to-r from-blue-700 to-rose-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <Edit className="w-4 h-4" />
              <span>Storefront CMS</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'videos' ? 'bg-gradient-to-r from-blue-700 to-rose-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video Reels</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'media' ? 'bg-gradient-to-r from-blue-700 to-rose-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <UploadCloud className="w-4 h-4 text-sky-400" />
                <span>Cloudinary Media</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono">
                CDN
              </span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'database' ? 'bg-gradient-to-r from-blue-700 to-rose-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Database Status</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-blue-900/40 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 transition-colors"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-xs font-bold text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div>
            <h2 className="text-xl font-black text-[#051336] capitalize">{activeTab} Desk</h2>
            <p className="text-xs text-slate-500 font-medium">MongoDB Dynamic E-Commerce Operations</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all cursor-pointer shadow-2xs"
              title="Refresh Live Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
            </button>

            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#051336] to-rose-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                PA
              </div>
              <div className="hidden sm:block text-left text-xs">
                <p className="font-bold text-[#051336] leading-none">Super Admin</p>
                <p className="text-[10px] text-slate-400">admin@playtime.in</p>
              </div>
            </div>
          </div>
        </header>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="p-6 space-y-6">
            
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Sales</p>
                  <h3 className="text-2xl font-black text-[#051336] mt-1">₹{(stats?.totalRevenue || 1708).toLocaleString('en-IN')}</h3>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Live Gross Volume
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                  ₹
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders</p>
                  <h3 className="text-2xl font-black text-[#051336] mt-1">{stats?.totalOrders || 2}</h3>
                  <p className="text-[10px] text-slate-400 mt-1">100% Discreet Packaging</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Awaiting Dispatch</p>
                  <h3 className="text-2xl font-black text-amber-600 mt-1">{stats?.pendingFulfillments || 1}</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-[10px] text-amber-700 font-bold hover:underline mt-1">
                    View &amp; Print Slips &rarr;
                  </button>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Catalog</p>
                  <h3 className="text-2xl font-black text-rose-600 mt-1">{stats?.productsCount || 3}</h3>
                  <button onClick={() => setActiveTab('products')} className="text-[10px] text-rose-700 font-bold hover:underline mt-1">
                    Manage Products &rarr;
                  </button>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Live Regional Dispatch Velocity & Discretion Compliance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <h3 className="text-sm font-black text-[#051336]">Regional Dispatch Velocity Radar</h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
                    BlueDart Air &bull; Delhivery Prime
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Mumbai MMR</span>
                    <p className="text-lg font-black text-[#051336] mt-0.5">42%</p>
                    <span className="text-[9px] text-emerald-600 font-bold">Same-Day Dispatch</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Delhi-NCR</span>
                    <p className="text-lg font-black text-[#051336] mt-0.5">28%</p>
                    <span className="text-[9px] text-blue-600 font-bold">24-48h Transit</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Bangalore</span>
                    <p className="text-lg font-black text-[#051336] mt-0.5">18%</p>
                    <span className="text-[9px] text-indigo-600 font-bold">Express Transit</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Tier 2 / Rest</span>
                    <p className="text-lg font-black text-[#051336] mt-0.5">12%</p>
                    <span className="text-[9px] text-slate-500 font-bold">OTP-Delivery</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-black text-[#051336] uppercase tracking-wider">Packaging Compliance</h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    100% Strict
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Unmarked Brown Box:</span>
                    <span className="font-bold text-emerald-700">✓ Verified</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Airway Bill Descriptor:</span>
                    <span className="font-mono text-[11px] font-bold text-slate-800">PT Logistics</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Tamper Tape Security:</span>
                    <span className="font-bold text-emerald-700">✓ Activated</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-[#051336]">Recent Customer Orders</h3>
                  <p className="text-xs text-slate-500">Live order queue from MongoDB</p>
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#051336] transition-colors cursor-pointer"
                >
                  View All Orders &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Products</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.orderId} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-black text-[#051336]">{order.orderId}</td>
                        <td className="py-3 px-4">
                          <p className="font-bold text-[#051336]">{order.customer.name}</p>
                          <p className="text-[10px] text-slate-500">{order.customer.city}, {order.customer.state}</p>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {order.items?.map((i) => `${i.productName} (${i.quantity})`).join(', ')}
                        </td>
                        <td className="py-3 px-4 font-black text-[#051336]">
                          ₹{(order.pricing?.totalAmount || 0).toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {order.paymentMethod} &bull; {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            order.fulfillmentStatus === 'delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.fulfillmentStatus === 'dispatched'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.fulfillmentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setFulfillmentModalOrder(order);
                              setNewStatus(order.fulfillmentStatus);
                              setCourierPartner(order.tracking?.courierPartner || 'BlueDart Air');
                              setTrackingNumber(order.tracking?.trackingNumber || '');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#051336] text-white hover:bg-blue-900 text-[11px] font-bold cursor-pointer"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PRODUCT CATALOG */}
        {activeTab === 'products' && (
          <div className="p-6 space-y-6">
            
            {/* Header with Search and Add Product Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search products by name or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#051336] bg-white shadow-2xs"
                />
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#071844] via-[#0e2a66] to-[#dc2626] text-white text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Base Price</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4">In Stock</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {products
                      .filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()))
                      .map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative shrink-0">
                              <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-[#051336]">{product.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{product.id}</p>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                              {product.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-black text-[#051336]">
                            ₹{product.basePrice.toLocaleString('en-IN')}
                            {product.originalPrice && (
                              <span className="text-slate-400 line-through text-[10px] ml-1.5 font-normal">
                                ₹{product.originalPrice}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-amber-500 font-bold">
                            ★ {product.rating} <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => handleSaveProduct({ ...product, inStock: !product.inStock })}
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                                product.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#051336] cursor-pointer"
                              title="Edit Product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: ORDERS & DISPATCH */}
        {activeTab === 'orders' && (
          <div className="p-6 space-y-6">
            
            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {['all', 'pending', 'confirmed', 'dispatched', 'in_transit', 'delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setOrderStatusFilter(st);
                      fetchAllData();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer whitespace-nowrap ${
                      orderStatusFilter === st
                        ? 'bg-[#051336] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div className="relative max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by order ID, name, phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') fetchAllData(); }}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#051336] bg-white shadow-2xs"
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Order Details</th>
                      <th className="py-3 px-4">Discreet Shipping Destination</th>
                      <th className="py-3 px-4">Items Ordered</th>
                      <th className="py-3 px-4">Total Amount</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Dispatch Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {orders.map((order) => (
                      <tr key={order.orderId} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <p className="font-mono font-black text-[#051336]">{order.orderId}</p>
                          <p className="text-[10px] text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="font-bold text-[#051336]">{order.customer.name}</p>
                          <p className="text-[11px] text-slate-600">{order.customer.phone}</p>
                          <p className="text-[10px] text-slate-400 truncate">{order.customer.address}, {order.customer.city} - {order.customer.pincode}</p>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">
                          {order.items?.map((item, i) => (
                            <div key={i} className="text-[11px]">
                              <strong>{item.quantity}x</strong> {item.productName} ({item.packLabel})
                            </div>
                          ))}
                        </td>
                        <td className="py-3.5 px-4 font-black text-[#051336]">
                          ₹{(order.pricing?.totalAmount || 0).toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {order.paymentMethod} &bull; {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            order.fulfillmentStatus === 'delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.fulfillmentStatus === 'dispatched'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.fulfillmentStatus.replace('_', ' ')}
                          </span>
                          {order.tracking?.trackingNumber && (
                            <p className="text-[9px] text-slate-400 font-mono mt-0.5">
                              {order.tracking.courierPartner}: {order.tracking.trackingNumber}
                            </p>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setFulfillmentModalOrder(order);
                              setNewStatus(order.fulfillmentStatus);
                              setCourierPartner(order.tracking?.courierPartner || 'BlueDart Air');
                              setTrackingNumber(order.tracking?.trackingNumber || '');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#051336] text-white hover:bg-blue-900 text-xs font-bold transition-all cursor-pointer shadow-xs"
                          >
                            Dispatch Desk
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-[#051336]">Active Promo Codes &amp; Flash Drops</h3>
                <p className="text-xs text-slate-500">Live coupons validated on checkout</p>
              </div>

              <button
                onClick={() => setShowAddCouponModal(true)}
                className="px-4 py-2 rounded-xl bg-[#051336] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Promo Code</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coupons.map((coupon) => (
                <div key={coupon.code} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-base font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-xl border border-rose-200">
                        {coupon.code}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${coupon.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                        {coupon.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </div>

                    <p className="text-sm font-black text-[#051336]">
                      {coupon.discountValue}% Instant Discount
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Min order spend: ₹{coupon.minSpend}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Redeemed {coupon.timesUsed} times
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
                    <button
                      onClick={() => handleDeleteCoupon(coupon.code)}
                      className="text-xs font-bold text-rose-600 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: STOREFRONT CMS */}
        {activeTab === 'cms' && (
          <div className="p-6 space-y-6 max-w-5xl">
            
            {/* CMS Header & Demo Data Synchronizer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              {/* CMS Sub-Navigation Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'marquee', label: '📌 Top Marquee Bar' },
                  { id: 'reviews', label: '🌟 Customer Reviews' },
                  { id: 'faqs', label: '❓ FAQ Manager' },
                  { id: 'timeline', label: '⏱️ Clinical Timeline' },
                  { id: 'standards', label: '🌿 Science Grid' },
                  { id: 'footer', label: '📞 Footer & Contacts' },
                  { id: 'banner', label: '📢 Hero & Promo Banner' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCmsSubTab(tab.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      cmsSubTab === tab.id
                        ? 'bg-[#051336] text-white shadow-sm'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Quick Demo Data Seed Button */}
              <button
                type="button"
                onClick={async () => {
                  try {
                    const res = await fetch('/api/admin/seed', { method: 'POST' });
                    const data = await res.json();
                    if (data.success) {
                      showToast('Demo data seeded & synchronized live with User Panel!');
                      fetchAllData();
                    } else {
                      alert('Failed to seed demo data');
                    }
                  } catch {
                    alert('Error seeding demo data');
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-[#051336] text-xs font-black flex items-center gap-1.5 cursor-pointer shrink-0 transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Synchronize Demo Data to Store</span>
              </button>
            </div>

            {/* 1. TOP MARQUEE CMS */}
            {cmsSubTab === 'marquee' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="text-base font-black text-[#051336]">Top Running Marquee Items</h4>
                    <p className="text-xs text-slate-500">Add, edit, or remove ticker points running above the header</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const current = Array.isArray(cmsSettings.marquee_items) ? [...cmsSettings.marquee_items] : [];
                        current.push({
                          id: `m-${Date.now()}`,
                          iconName: 'Leaf',
                          text: '100% Ayurvedic Formulation • Dispatched in Plain Box',
                          isCoupon: false,
                          couponCode: '',
                        });
                        setCmsSettings({ ...cmsSettings, marquee_items: current });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Item</span>
                    </button>
                    <button
                      onClick={() => handleSaveCms('marquee_items', cmsSettings.marquee_items)}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#071844] to-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Marquee</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {(Array.isArray(cmsSettings.marquee_items) && cmsSettings.marquee_items.length > 0
                    ? cmsSettings.marquee_items
                    : []
                  ).map((item: any, idx: number) => (
                    <div key={item.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="w-28 shrink-0">
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Icon</label>
                        <select
                          value={item.iconName || 'Leaf'}
                          onChange={(e) => {
                            const updated = [...cmsSettings.marquee_items];
                            updated[idx].iconName = e.target.value;
                            setCmsSettings({ ...cmsSettings, marquee_items: updated });
                          }}
                          className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                        >
                          <option value="Leaf">Leaf 🌿</option>
                          <option value="EyeOff">EyeOff 📦</option>
                          <option value="Lock">Lock 🔒</option>
                          <option value="Zap">Zap ⚡</option>
                          <option value="ShieldCheck">Shield 🛡️</option>
                          <option value="Star">Star ⭐</option>
                          <option value="Tag">Coupon Tag 🏷️</option>
                        </select>
                      </div>

                      <div className="flex-1 w-full">
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Ticker Text</label>
                        <input
                          type="text"
                          value={item.text || ''}
                          onChange={(e) => {
                            const updated = [...cmsSettings.marquee_items];
                            updated[idx].text = e.target.value;
                            setCmsSettings({ ...cmsSettings, marquee_items: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                          placeholder="e.g. 100% Plain Unmarked Box • PT Logistics"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-4">
                        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.isCoupon || false}
                            onChange={(e) => {
                              const updated = [...cmsSettings.marquee_items];
                              updated[idx].isCoupon = e.target.checked;
                              setCmsSettings({ ...cmsSettings, marquee_items: updated });
                            }}
                            className="rounded"
                          />
                          <span>Coupon</span>
                        </label>

                        {item.isCoupon && (
                          <input
                            type="text"
                            value={item.couponCode || 'PLAY10'}
                            onChange={(e) => {
                              const updated = [...cmsSettings.marquee_items];
                              updated[idx].couponCode = e.target.value;
                              setCmsSettings({ ...cmsSettings, marquee_items: updated });
                            }}
                            className="w-20 px-2 py-1 rounded-lg border border-slate-300 text-xs font-mono font-bold bg-white"
                            placeholder="CODE"
                          />
                        )}

                        <button
                          onClick={() => {
                            const updated = cmsSettings.marquee_items.filter((_: any, i: number) => i !== idx);
                            setCmsSettings({ ...cmsSettings, marquee_items: updated });
                          }}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. REVIEWS CMS */}
            {cmsSubTab === 'reviews' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="text-base font-black text-[#051336]">Customer Testimonials &amp; Verified Reviews</h4>
                    <p className="text-xs text-slate-500">Live testimonials showcased on home and product pages</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const current = Array.isArray(cmsSettings.testimonials) ? [...cmsSettings.testimonials] : [];
                        current.unshift({
                          id: `rev-${Date.now()}`,
                          name: 'New Verified Buyer',
                          location: 'Mumbai, Maharashtra',
                          product: 'Extend Long Last Delay Spray',
                          rating: 5,
                          date: 'Verified Buyer • Just now',
                          comment: 'Authentic Ayurvedic product with complete delivery privacy. Box arrived in plain packaging with no marks.',
                          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                        });
                        setCmsSettings({ ...cmsSettings, testimonials: current });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Review</span>
                    </button>
                    <button
                      onClick={() => handleSaveCms('testimonials', cmsSettings.testimonials)}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#071844] to-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Reviews</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {(Array.isArray(cmsSettings.testimonials) && cmsSettings.testimonials.length > 0
                    ? cmsSettings.testimonials
                    : []
                  ).map((rev: any, idx: number) => (
                    <div key={rev.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Customer Name</label>
                          <input
                            type="text"
                            value={rev.name || ''}
                            onChange={(e) => {
                              const updated = [...cmsSettings.testimonials];
                              updated[idx].name = e.target.value;
                              setCmsSettings({ ...cmsSettings, testimonials: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Location</label>
                          <input
                            type="text"
                            value={rev.location || ''}
                            onChange={(e) => {
                              const updated = [...cmsSettings.testimonials];
                              updated[idx].location = e.target.value;
                              setCmsSettings({ ...cmsSettings, testimonials: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Product Name</label>
                          <input
                            type="text"
                            value={rev.product || ''}
                            onChange={(e) => {
                              const updated = [...cmsSettings.testimonials];
                              updated[idx].product = e.target.value;
                              setCmsSettings({ ...cmsSettings, testimonials: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Rating (1-5)</label>
                          <select
                            value={rev.rating || 5}
                            onChange={(e) => {
                              const updated = [...cmsSettings.testimonials];
                              updated[idx].rating = Number(e.target.value);
                              setCmsSettings({ ...cmsSettings, testimonials: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                          >
                            <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                            <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                            <option value={3}>3 Stars ⭐⭐⭐</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Review Feedback</label>
                        <textarea
                          rows={2}
                          value={rev.comment || ''}
                          onChange={(e) => {
                            const updated = [...cmsSettings.testimonials];
                            updated[idx].comment = e.target.value;
                            setCmsSettings({ ...cmsSettings, testimonials: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-medium"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-1">
                        <div className="flex-1 max-w-sm">
                          <input
                            type="text"
                            value={rev.avatar || ''}
                            onChange={(e) => {
                              const updated = [...cmsSettings.testimonials];
                              updated[idx].avatar = e.target.value;
                              setCmsSettings({ ...cmsSettings, testimonials: updated });
                            }}
                            placeholder="Avatar image URL"
                            className="w-full px-2.5 py-1 rounded-lg border border-slate-300 text-[11px] bg-white text-slate-600"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const updated = cmsSettings.testimonials.filter((_: any, i: number) => i !== idx);
                            setCmsSettings({ ...cmsSettings, testimonials: updated });
                          }}
                          className="px-2.5 py-1 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. FAQ CMS */}
            {cmsSubTab === 'faqs' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="text-base font-black text-[#051336]">Frequently Asked Questions (FAQ)</h4>
                    <p className="text-xs text-slate-500">Manages question &amp; answer accordions on homepage</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const current = Array.isArray(cmsSettings.faqs) ? [...cmsSettings.faqs] : [];
                        current.push({
                          id: `faq-${Date.now()}`,
                          q: 'New Question regarding Playtime discreet delivery or usage?',
                          a: 'Detailed and reassuring answer explaining the discreet delivery and Ayurvedic science.',
                        });
                        setCmsSettings({ ...cmsSettings, faqs: current });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add FAQ</span>
                    </button>
                    <button
                      onClick={() => handleSaveCms('faqs', cmsSettings.faqs)}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#071844] to-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save FAQs</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {(Array.isArray(cmsSettings.faqs) && cmsSettings.faqs.length > 0 ? cmsSettings.faqs : []).map(
                    (faq: any, idx: number) => (
                      <div key={faq.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2.5">
                        <div className="flex items-center justify-between gap-3">
                          <input
                            type="text"
                            value={faq.q || ''}
                            onChange={(e) => {
                              const updated = [...cmsSettings.faqs];
                              updated[idx].q = e.target.value;
                              setCmsSettings({ ...cmsSettings, faqs: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-black text-[#051336] bg-white"
                            placeholder="Question"
                          />
                          <button
                            onClick={() => {
                              const updated = cmsSettings.faqs.filter((_: any, i: number) => i !== idx);
                              setCmsSettings({ ...cmsSettings, faqs: updated });
                            }}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
                            title="Delete FAQ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={faq.a || ''}
                          onChange={(e) => {
                            const updated = [...cmsSettings.faqs];
                            updated[idx].a = e.target.value;
                            setCmsSettings({ ...cmsSettings, faqs: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-600 bg-white leading-relaxed font-medium"
                          placeholder="Answer"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* 4. TIMELINE CMS */}
            {cmsSubTab === 'timeline' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="text-base font-black text-[#051336]">Clinical Absorption Milestones</h4>
                    <p className="text-xs text-slate-500">Live 4-step timeline slider displayed on product pages</p>
                  </div>
                  <button
                    onClick={() => handleSaveCms('timeline_steps', cmsSettings.timeline_steps)}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#071844] to-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Timeline</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {(Array.isArray(cmsSettings.timeline_steps) && cmsSettings.timeline_steps.length > 0
                    ? cmsSettings.timeline_steps
                    : []
                  ).map((step: any, idx: number) => (
                    <div key={step.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Time Label</label>
                          <input
                            type="text"
                            value={step.time || ''}
                            onChange={(e) => {
                              const updated = [...cmsSettings.timeline_steps];
                              updated[idx].time = e.target.value;
                              setCmsSettings({ ...cmsSettings, timeline_steps: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Step Badge</label>
                          <input
                            type="text"
                            value={step.badge || ''}
                            onChange={(e) => {
                              const updated = [...cmsSettings.timeline_steps];
                              updated[idx].badge = e.target.value;
                              setCmsSettings({ ...cmsSettings, timeline_steps: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Highlight</label>
                          <input
                            type="text"
                            value={step.highlight || ''}
                            onChange={(e) => {
                              const updated = [...cmsSettings.timeline_steps];
                              updated[idx].highlight = e.target.value;
                              setCmsSettings({ ...cmsSettings, timeline_steps: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Headline</label>
                        <input
                          type="text"
                          value={step.headline || ''}
                          onChange={(e) => {
                            const updated = [...cmsSettings.timeline_steps];
                            updated[idx].headline = e.target.value;
                            setCmsSettings({ ...cmsSettings, timeline_steps: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-black bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Description</label>
                        <textarea
                          rows={2}
                          value={step.description || ''}
                          onChange={(e) => {
                            const updated = [...cmsSettings.timeline_steps];
                            updated[idx].description = e.target.value;
                            setCmsSettings({ ...cmsSettings, timeline_steps: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-medium"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. STANDARDS GRID CMS */}
            {cmsSubTab === 'standards' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="text-base font-black text-[#051336]">Ayurvedic Science &amp; Standards Grid</h4>
                    <p className="text-xs text-slate-500">6-Card clinical guarantee cards on homepage</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const current = Array.isArray(cmsSettings.standards_grid) ? [...cmsSettings.standards_grid] : [];
                        current.push({
                          id: `std-${Date.now()}`,
                          iconName: 'Leaf',
                          title: 'NEW STANDARD',
                          description: 'Description of the clinical standard or AYUSH certification.',
                        });
                        setCmsSettings({ ...cmsSettings, standards_grid: current });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Card</span>
                    </button>
                    <button
                      onClick={() => handleSaveCms('standards_grid', cmsSettings.standards_grid)}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#071844] to-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Grid</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(Array.isArray(cmsSettings.standards_grid) && cmsSettings.standards_grid.length > 0
                    ? cmsSettings.standards_grid
                    : []
                  ).map((card: any, idx: number) => (
                    <div key={card.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <select
                          value={card.iconName || 'Zap'}
                          onChange={(e) => {
                            const updated = [...cmsSettings.standards_grid];
                            updated[idx].iconName = e.target.value;
                            setCmsSettings({ ...cmsSettings, standards_grid: updated });
                          }}
                          className="px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                        >
                          <option value="Zap">Zap ⚡</option>
                          <option value="ShieldCheck">Shield 🛡️</option>
                          <option value="Sparkles">Sparkles ✨</option>
                          <option value="EyeOff">Plain Box 📦</option>
                          <option value="Stethoscope">Doctor 🩺</option>
                          <option value="Leaf">Leaf 🌿</option>
                        </select>
                        <button
                          onClick={() => {
                            const updated = cmsSettings.standards_grid.filter((_: any, i: number) => i !== idx);
                            setCmsSettings({ ...cmsSettings, standards_grid: updated });
                          }}
                          className="p-1 rounded text-rose-600 hover:bg-rose-50 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={card.title || ''}
                        onChange={(e) => {
                          const updated = [...cmsSettings.standards_grid];
                          updated[idx].title = e.target.value;
                          setCmsSettings({ ...cmsSettings, standards_grid: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-black uppercase bg-white"
                        placeholder="Card Title"
                      />
                      <textarea
                        rows={2}
                        value={card.description || ''}
                        onChange={(e) => {
                          const updated = [...cmsSettings.standards_grid];
                          updated[idx].description = e.target.value;
                          setCmsSettings({ ...cmsSettings, standards_grid: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-600 font-medium"
                        placeholder="Card Description"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. FOOTER CMS */}
            {cmsSubTab === 'footer' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="text-base font-black text-[#051336]">Footer &amp; Store Contact Information</h4>
                    <p className="text-xs text-slate-500">Live contact details, registered address, and hours</p>
                  </div>
                  <button
                    onClick={() => handleSaveCms('footer_config', cmsSettings.footer_config)}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#071844] to-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Footer</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Customer Care Phone</label>
                    <input
                      type="text"
                      value={cmsSettings.footer_config?.phone || ''}
                      onChange={(e) =>
                        setCmsSettings({
                          ...cmsSettings,
                          footer_config: { ...cmsSettings.footer_config, phone: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Support Email</label>
                    <input
                      type="email"
                      value={cmsSettings.footer_config?.email || ''}
                      onChange={(e) =>
                        setCmsSettings({
                          ...cmsSettings,
                          footer_config: { ...cmsSettings.footer_config, email: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Working Hours</label>
                    <input
                      type="text"
                      value={cmsSettings.footer_config?.workingHours || ''}
                      onChange={(e) =>
                        setCmsSettings({
                          ...cmsSettings,
                          footer_config: { ...cmsSettings.footer_config, workingHours: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company Registered Name</label>
                    <input
                      type="text"
                      value={cmsSettings.footer_config?.companyName || ''}
                      onChange={(e) =>
                        setCmsSettings({
                          ...cmsSettings,
                          footer_config: { ...cmsSettings.footer_config, companyName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Registered Address</label>
                    <input
                      type="text"
                      value={cmsSettings.footer_config?.companyAddress || ''}
                      onChange={(e) =>
                        setCmsSettings({
                          ...cmsSettings,
                          footer_config: { ...cmsSettings.footer_config, companyAddress: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 7. HERO & PROMO BANNER CMS */}
            {cmsSubTab === 'banner' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="text-base font-black text-[#051336]">Hero Headline &amp; Subtitle CMS</h4>
                      <p className="text-xs text-slate-500">Customizes the main homepage hero copy</p>
                    </div>
                    <button
                      onClick={() => handleSaveCms('hero_section', cmsSettings.hero_section)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#071844] via-[#0e2a66] to-[#dc2626] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Hero</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={cmsSettings.hero_section?.heading1 || ''}
                        onChange={(e) =>
                          setCmsSettings({
                            ...cmsSettings,
                            hero_section: { ...cmsSettings.hero_section, heading1: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle Description</label>
                      <textarea
                        rows={3}
                        value={cmsSettings.hero_section?.subtitle || ''}
                        onChange={(e) =>
                          setCmsSettings({
                            ...cmsSettings,
                            hero_section: { ...cmsSettings.hero_section, subtitle: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="text-base font-black text-[#051336]">Top Announcement Bar &amp; Flash Ticker</h4>
                      <p className="text-xs text-slate-500">Updates live across all pages instantly</p>
                    </div>
                    <button
                      onClick={() => handleSaveCms('promo_banner', cmsSettings.promo_banner)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#071844] via-[#0e2a66] to-[#dc2626] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Banner</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ticker Discretion Notice</label>
                      <input
                        type="text"
                        value={cmsSettings.promo_banner?.tickerText || ''}
                        onChange={(e) =>
                          setCmsSettings({
                            ...cmsSettings,
                            promo_banner: { ...cmsSettings.promo_banner, tickerText: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Featured Coupon Code</label>
                      <input
                        type="text"
                        value={cmsSettings.promo_banner?.couponCode || ''}
                        onChange={(e) =>
                          setCmsSettings({
                            ...cmsSettings,
                            promo_banner: { ...cmsSettings.promo_banner, couponCode: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 6: VIDEOS & REELS */}
        {activeTab === 'videos' && (
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-[#051336]">Creator Reels &amp; Video Reviews</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Dynamic influencer unboxings, medical breakdowns, and review videos stored in MongoDB
                </p>
              </div>
              <button
                onClick={() => setShowAddVideoModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#051336] to-rose-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Video Reel</span>
              </button>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[9/12] w-full bg-slate-950 overflow-hidden group">
                    <video
                      src={vid.videoUrl}
                      poster={vid.poster}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold border border-white/20">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
                        <Image src={vid.avatar} alt={vid.creatorName} fill className="object-cover" />
                      </div>
                      <span className="truncate">{vid.creatorName}</span>
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          vid.isPublished ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-200'
                        }`}
                      >
                        {vid.isPublished ? 'Published' : 'Hidden'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="font-mono text-slate-600">{vid.creatorHandle}</span>
                        <span className="font-bold text-amber-500">{'★'.repeat(vid.rating || 5)}</span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium italic line-clamp-2">
                        &ldquo;{vid.quote}&rdquo;
                      </p>
                    </div>

                    {/* Linked Product Box */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                      <div className="min-w-0">
                        <p className="font-bold text-[#051336] truncate">{vid.productName}</p>
                        <p className="text-rose-600 font-black">₹{vid.productPrice}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{vid.views} views</span>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleVideoPublished(vid)}
                        className="text-xs font-bold text-slate-600 hover:text-[#051336] transition-colors cursor-pointer"
                      >
                        {vid.isPublished ? 'Hide from Store' : 'Publish to Store'}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingVideo(vid)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                          title="Edit Video Reel"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(vid.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                          title="Delete Video Reel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CLOUDINARY MEDIA MANAGER */}
        {activeTab === 'media' && <CloudinaryMediaManager />}

        {/* TAB 8: DATABASE STATUS */}
        {activeTab === 'database' && (
          <div className="p-6 space-y-6 max-w-3xl">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-black text-[#051336]">MongoDB Atlas Connection Health</h3>
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Database Name:</span>
                  <span className="font-bold text-[#051336]">playtime</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cluster:</span>
                  <span className="font-bold text-[#051336]">atlas-j9691g-shard-0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">State:</span>
                  <span className="font-bold text-emerald-600">ReadyState: 1 (Connected)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Auth Mechanism:</span>
                  <span className="font-bold text-blue-600">SCRAM-SHA-1 / SSL Verified</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#051336]">Catalog &amp; Sample Data Reset</h4>
                  <p className="text-[11px] text-slate-500">Resets or synchronizes all default products, packs, and coupons</p>
                </div>
                <button
                  onClick={handleReseedDb}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Synchronize Default Seed
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-[#051336] mb-4">Edit Product in MongoDB</h3>
            
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingProduct.tagline}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Base Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.basePrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, basePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Stock Status</label>
                <select
                  value={editingProduct.inStock ? 'true' : 'false'}
                  onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.value === 'true' })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>

              <CloudinaryMediaUpload
                label="Main Cover Image"
                value={editingProduct.image}
                onChange={(url) => setEditingProduct({ ...editingProduct, image: url })}
                folder="playtime/products"
                resourceType="image"
              />

              <CloudinaryMediaUpload
                label="Product Demo Video (MP4 / WebM)"
                value={editingProduct.videoUrl || ''}
                onChange={(url) => setEditingProduct({ ...editingProduct, videoUrl: url })}
                folder="playtime/videos"
                resourceType="video"
                placeholder="https://res.cloudinary.com/... or cloud MP4 URL"
              />

              <div className="space-y-2">
                <CloudinaryMultiImageUpload
                  label="Gallery Images (Cloudinary Multi-Upload)"
                  urls={
                    typeof (editingProduct as any).galleryText === 'string'
                      ? (editingProduct as any).galleryText.split('\n').map((u: string) => u.trim()).filter(Boolean)
                      : editingProduct.images?.map((im: any) => typeof im === 'string' ? im : im.url).filter(Boolean) || []
                  }
                  onChange={(newUrls) => {
                    setEditingProduct({
                      ...editingProduct,
                      images: newUrls.map((u) => ({ url: u })),
                      galleryText: newUrls.join('\n'),
                    });
                  }}
                  folder="playtime/products"
                />
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Or edit Gallery URLs directly (1 URL per line):
                  </label>
                  <textarea
                    rows={2}
                    placeholder="https://res.cloudinary.com/...&#10;https://res.cloudinary.com/..."
                    value={
                      typeof (editingProduct as any).galleryText === 'string'
                        ? (editingProduct as any).galleryText
                        : editingProduct.images?.map((im: any) => im.url).join('\n') || ''
                    }
                    onChange={(e) =>
                      setEditingProduct({ ...(editingProduct as any), galleryText: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveProduct(editingProduct)}
                  className="px-5 py-2 rounded-xl bg-[#051336] text-white hover:bg-blue-950 text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-[#051336] mb-4">Add New Product to Catalog</h3>
            
            <form onSubmit={handleCreateProduct} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Natural Organic Aloe Glide (100ml)"
                  value={newProductData.name}
                  onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure water-based intimacy lubricant safe for sensitive skin"
                  value={newProductData.tagline}
                  onChange={(e) => setNewProductData({ ...newProductData, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProductData.category}
                    onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  >
                    <option value="extend">Extend Range</option>
                    <option value="supplements">Supplements &amp; Shilajit</option>
                    <option value="lubes">Lubricants &amp; Glides</option>
                    <option value="couples">Couples &amp; Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Base Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProductData.basePrice}
                    onChange={(e) => setNewProductData({ ...newProductData, basePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
              </div>

              <CloudinaryMediaUpload
                label="Main Cover Image"
                value={newProductData.image}
                onChange={(url) => setNewProductData({ ...newProductData, image: url })}
                folder="playtime/products"
                resourceType="image"
              />

              <CloudinaryMediaUpload
                label="Product Demo Video (MP4 / WebM)"
                value={newProductData.videoUrl || ''}
                onChange={(url) => setNewProductData({ ...newProductData, videoUrl: url })}
                folder="playtime/videos"
                resourceType="video"
                placeholder="https://res.cloudinary.com/... or cloud MP4 URL"
              />

              <div className="space-y-2">
                <CloudinaryMultiImageUpload
                  label="Gallery Images (Cloudinary Multi-Upload)"
                  urls={
                    newProductData.galleryImagesText
                      ? newProductData.galleryImagesText.split('\n').map((u: string) => u.trim()).filter(Boolean)
                      : []
                  }
                  onChange={(newUrls) => {
                    setNewProductData({
                      ...newProductData,
                      galleryImagesText: newUrls.join('\n'),
                    });
                  }}
                  folder="playtime/products"
                />
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Or edit Gallery URLs directly (1 URL per line):
                  </label>
                  <textarea
                    rows={2}
                    placeholder="https://res.cloudinary.com/...&#10;https://res.cloudinary.com/..."
                    value={newProductData.galleryImagesText || ''}
                    onChange={(e) => setNewProductData({ ...newProductData, galleryImagesText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#051336] text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Create In MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DISPATCH / FULFILLMENT MODAL */}
      {fulfillmentModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-black text-[#051336] mb-1">Discreet Fulfillment Desk</h3>
            <p className="text-xs text-slate-500 mb-4">Update Order #{fulfillmentModalOrder.orderId}</p>

            <form onSubmit={handleUpdateOrderStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fulfillment Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="dispatched">Dispatched (Courier Picked Up)</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Courier Partner</label>
                <select
                  value={courierPartner}
                  onChange={(e) => setCourierPartner(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                >
                  <option value="BlueDart Air">BlueDart Air (Discreet Packaging)</option>
                  <option value="Delhivery Express">Delhivery Express</option>
                  <option value="Shadowfax Local">Shadowfax Local</option>
                  <option value="DTDC Surface">DTDC Surface</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tracking Number (AWB)</label>
                <input
                  type="text"
                  placeholder="e.g. BLUEDART-99210293"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px]">
                <strong>Plain Packaging Verified:</strong> Dispatched under entity name &ldquo;PT Logistics&rdquo; with 100% plain outer tape.
              </div>

              <div className="pt-2 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setFulfillmentModalOrder(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#051336] text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Save Dispatch Info
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD COUPON MODAL */}
      {showAddCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-black text-[#051336] mb-4">Create Promo Code</h3>

            <form onSubmit={handleCreateCoupon} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SECRET25"
                  value={newCouponData.code}
                  onChange={(e) => setNewCouponData({ ...newCouponData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-black uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Discount %</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={90}
                  value={newCouponData.discountValue}
                  onChange={(e) => setNewCouponData({ ...newCouponData, discountValue: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Minimum Order Amount (₹)</label>
                <input
                  type="number"
                  value={newCouponData.minSpend}
                  onChange={(e) => setNewCouponData({ ...newCouponData, minSpend: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-3 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddCouponModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#051336] text-white text-xs font-black uppercase cursor-pointer shadow-md"
                >
                  Create Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD VIDEO REEL MODAL */}
      {showAddVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-[#051336] mb-4">Add Creator Video Reel to MongoDB</h3>

            <form onSubmit={handleCreateVideo} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Creator Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Ananya Mehta"
                    value={newVideoData.creatorName || ''}
                    onChange={(e) => setNewVideoData({ ...newVideoData, creatorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Creator Handle</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. @dr.ananya.wellness"
                    value={newVideoData.creatorHandle || ''}
                    onChange={(e) => setNewVideoData({ ...newVideoData, creatorHandle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>
              </div>

              <CloudinaryMediaUpload
                label="Video MP4 / Reel URL"
                value={newVideoData.videoUrl || ''}
                onChange={(url) => setNewVideoData({ ...newVideoData, videoUrl: url })}
                folder="playtime/reels"
                resourceType="video"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <CloudinaryMediaUpload
                  label="Poster Image"
                  value={newVideoData.poster || ''}
                  onChange={(url) => setNewVideoData({ ...newVideoData, poster: url })}
                  folder="playtime/reels"
                  resourceType="image"
                />
                <CloudinaryMediaUpload
                  label="Avatar Photo"
                  value={newVideoData.avatar || ''}
                  onChange={(url) => setNewVideoData({ ...newVideoData, avatar: url })}
                  folder="playtime/creators"
                  resourceType="image"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Creator Quote / Review</label>
                <textarea
                  rows={2}
                  required
                  placeholder="What did the creator say about the product?"
                  value={newVideoData.quote || ''}
                  onChange={(e) => setNewVideoData({ ...newVideoData, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Views</label>
                  <input
                    type="text"
                    placeholder="120K"
                    value={newVideoData.views || ''}
                    onChange={(e) => setNewVideoData({ ...newVideoData, views: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Likes</label>
                  <input
                    type="text"
                    placeholder="14.2K"
                    value={newVideoData.likes || ''}
                    onChange={(e) => setNewVideoData({ ...newVideoData, likes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stars (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={newVideoData.rating || 5}
                    onChange={(e) => setNewVideoData({ ...newVideoData, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <p className="text-[11px] font-black uppercase text-slate-500">Linked Product</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Product Title"
                    value={newVideoData.productName || ''}
                    onChange={(e) => setNewVideoData({ ...newVideoData, productName: e.target.value })}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Product Slug ID (e.g. pt-extend-spray)"
                    value={newVideoData.productId || ''}
                    onChange={(e) => setNewVideoData({ ...newVideoData, productId: e.target.value })}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Discount Price (₹)"
                    value={newVideoData.productPrice || 499}
                    onChange={(e) => setNewVideoData({ ...newVideoData, productPrice: Number(e.target.value) })}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                  <input
                    type="number"
                    placeholder="Original Price (₹)"
                    value={newVideoData.productOriginalPrice || 699}
                    onChange={(e) => setNewVideoData({ ...newVideoData, productOriginalPrice: Number(e.target.value) })}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newVideoData.isPublished !== false}
                    onChange={(e) => setNewVideoData({ ...newVideoData, isPublished: e.target.checked })}
                    className="rounded text-rose-600 w-4 h-4"
                  />
                  <span>Publish to Storefront Immediately</span>
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddVideoModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#051336] to-rose-600 text-white text-xs font-black uppercase shadow-md cursor-pointer"
                  >
                    Add Reel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT VIDEO REEL MODAL */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-[#051336] mb-4">Edit Video Reel #{editingVideo.id}</h3>

            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Creator Name</label>
                  <input
                    type="text"
                    value={editingVideo.creatorName}
                    onChange={(e) => setEditingVideo({ ...editingVideo, creatorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Creator Handle</label>
                  <input
                    type="text"
                    value={editingVideo.creatorHandle}
                    onChange={(e) => setEditingVideo({ ...editingVideo, creatorHandle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>
              </div>

              <CloudinaryMediaUpload
                label="Video MP4 / Reel URL"
                value={editingVideo.videoUrl}
                onChange={(url) => setEditingVideo({ ...editingVideo, videoUrl: url })}
                folder="playtime/reels"
                resourceType="video"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <CloudinaryMediaUpload
                  label="Poster Image"
                  value={editingVideo.poster || ''}
                  onChange={(url) => setEditingVideo({ ...editingVideo, poster: url })}
                  folder="playtime/reels"
                  resourceType="image"
                />
                <CloudinaryMediaUpload
                  label="Avatar Photo"
                  value={editingVideo.avatar || ''}
                  onChange={(url) => setEditingVideo({ ...editingVideo, avatar: url })}
                  folder="playtime/creators"
                  resourceType="image"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Creator Quote / Review</label>
                <textarea
                  rows={2}
                  value={editingVideo.quote}
                  onChange={(e) => setEditingVideo({ ...editingVideo, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Views</label>
                  <input
                    type="text"
                    value={editingVideo.views}
                    onChange={(e) => setEditingVideo({ ...editingVideo, views: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Likes</label>
                  <input
                    type="text"
                    value={editingVideo.likes}
                    onChange={(e) => setEditingVideo({ ...editingVideo, likes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingVideo.isPublished}
                    onChange={(e) => setEditingVideo({ ...editingVideo, isPublished: e.target.checked })}
                    className="rounded text-rose-600 w-4 h-4"
                  />
                  <span>Published to Storefront</span>
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingVideo(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveVideo(editingVideo)}
                    className="px-5 py-2 rounded-xl bg-[#051336] text-white text-xs font-black uppercase shadow-md cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

