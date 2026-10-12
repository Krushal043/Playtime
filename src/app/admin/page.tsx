import type { Metadata } from 'next';
import AdminClient from './AdminClient';

export const metadata: Metadata = {
  title: 'Staff Portal & Store Management | Playtime Luxury Wellness',
  description: 'Encrypted Administrative Portal for Playtime Operations.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
