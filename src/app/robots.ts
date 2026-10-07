import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const rawBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://playtime.in';
  const baseUrl = rawBase.replace(/^http:\/\//, 'https://');

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/products/', '/privacy-policy'],
        disallow: ['/admin', '/api/', '/checkout', '/order-success/'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/products/', '/privacy-policy'],
        disallow: ['/admin', '/api/', '/checkout', '/order-success/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
