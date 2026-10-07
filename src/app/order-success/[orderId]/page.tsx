import type { Metadata } from 'next';
import OrderSuccessClient from './OrderSuccessClient';

export const metadata: Metadata = {
  title: 'Order Secured & Confirmed | 100% Discreet Packaging Guarantee',
  description:
    'Your Playtime intimate wellness order is secured and confirmed. Track your 100% plain box parcel in real-time.',
  openGraph: {
    title: 'Order Secured & Confirmed | Playtime Luxury Wellness',
    description: '100% Plain unmarked box parcel confirmed. Zero exterior branding.',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrderSuccessPage() {
  return <OrderSuccessClient />;
}
