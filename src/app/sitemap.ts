import { MetadataRoute } from 'next';
import { ALL_PRODUCTS } from '@/data/products';
import { connectToDatabase } from '@/lib/mongodb';
import ProductModel from '@/models/Product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://playtime.in';
  // Enforce HTTPS
  const baseUrl = rawBase.replace(/^http:\/\//, 'https://');
  const currentDate = new Date();

  let productsList: { id: string; updatedAt?: Date }[] = ALL_PRODUCTS.map((p) => ({
    id: p.id,
  }));

  try {
    await connectToDatabase();
    const dbProds = await ProductModel.find({}, 'id updatedAt').lean();
    if (dbProds && dbProds.length > 0) {
      productsList = dbProds.map((p: any) => ({
        id: p.id,
        updatedAt: p.updatedAt,
      }));
    }
  } catch (err) {
    console.warn('Failed to query DB for sitemap, using static products:', err);
  }

  const productRoutes: MetadataRoute.Sitemap = productsList.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/account`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  return [...staticRoutes, ...productRoutes];
}
