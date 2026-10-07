/**
 * Google Analytics Helper for Playtime Luxury Wellness
 * Automatically checks for window.gtag and dispatches standard e-commerce events.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-PLAYTIME2026';

/**
 * Log page view in Google Analytics
 */
export function pageview(url: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      anonymize_ip: true,
    });
  }
}

/**
 * Log custom or e-commerce events in Google Analytics
 */
export function trackEvent({
  action,
  category,
  label,
  value,
  params = {},
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  params?: Record<string, any>;
}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...params,
    });
  }
}

/**
 * Convenience methods for e-commerce tracking
 */
export const analytics = {
  viewItem: (product: { id: string; name: string; price: number }) => {
    trackEvent({
      action: 'view_item',
      category: 'Ecommerce',
      params: {
        items: [{ item_id: product.id, item_name: product.name, price: product.price }],
      },
    });
  },
  addToCart: (product: { id: string; name: string; price: number; quantity: number }) => {
    trackEvent({
      action: 'add_to_cart',
      category: 'Ecommerce',
      value: product.price * product.quantity,
      params: {
        items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: product.quantity }],
      },
    });
  },
  beginCheckout: (totalAmount: number, itemCount: number) => {
    trackEvent({
      action: 'begin_checkout',
      category: 'Ecommerce',
      value: totalAmount,
      params: { item_count: itemCount },
    });
  },
  purchase: (orderId: string, totalAmount: number) => {
    trackEvent({
      action: 'purchase',
      category: 'Ecommerce',
      value: totalAmount,
      params: {
        transaction_id: orderId,
        currency: 'INR',
      },
    });
  },
};
