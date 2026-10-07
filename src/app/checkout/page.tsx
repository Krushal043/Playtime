import type { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Discreet Encrypted Checkout | 100% Plain Packaging Guarantee',
  description:
    '100% Encrypted & Confidential Checkout with Playtime. Plain unmarked box delivery, anonymous billing descriptor, and tamper-proof security tape across India.',
  openGraph: {
    title: 'Discreet Encrypted Checkout | Playtime Luxury Wellness',
    description:
      '100% Plain box delivery guarantee and anonymous billing descriptors across India.',
    url: 'https://playtime.in/checkout',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discreet Encrypted Checkout | Playtime',
    description: '100% Plain unmarked box delivery across India.',
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://playtime.in/checkout',
  },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
