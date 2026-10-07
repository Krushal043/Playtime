import type { Metadata } from 'next';
import AccountClient from './AccountClient';

export const metadata: Metadata = {
  title: 'My Account & Confidential Orders | Playtime Luxury Wellness',
  description:
    'Manage your confidential delivery addresses, view discreet order history, and update privacy preferences with Playtime.',
  openGraph: {
    title: 'My Account & Confidential Orders | Playtime',
    description: 'Manage confidential orders, addresses, and delivery preferences.',
    url: 'https://playtime.in/account',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://playtime.in/account',
  },
};

export default function AccountPage() {
  return <AccountClient />;
}
