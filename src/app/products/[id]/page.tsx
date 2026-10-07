import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById, ALL_PRODUCTS } from '@/data/products';
import { connectToDatabase } from '@/lib/mongodb';
import ProductModel from '@/models/Product';
import { Product } from '@/types';
import ProductDetailsClient from './ProductDetailsClient';

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamicParams = true;

async function getLiveOrStaticProduct(id: string): Promise<Product | null> {
  try {
    await connectToDatabase();
    const doc = await ProductModel.findOne({ id });
    if (doc) {
      const p = doc.toObject();
      if (!p.packs || p.packs.length === 0) {
        p.packs = [
          {
            packSize: 1,
            label: 'Single Pack (Standard)',
            price: p.basePrice,
            originalPrice: p.originalPrice || Math.round(p.basePrice * 1.4),
            discount: 'Special Deal',
          },
        ];
      }
      return p as Product;
    }
  } catch (err) {
    console.warn('DB lookup failed in product page, using static data fallback:', err);
  }

  const staticProd = getProductById(id);
  return staticProd || null;
}

export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const dbProds = await ProductModel.find({}, 'id');
    if (dbProds && dbProds.length > 0) {
      return dbProds.map((p) => ({ id: p.id }));
    }
  } catch {
    // fallback to static
  }
  return ALL_PRODUCTS.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getLiveOrStaticProduct(id);

  if (!product) {
    return {
      title: 'Product Not Found | Playtime Luxury Wellness',
      description: 'The requested product could not be found.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://playtime.in';
  const productUrl = `${siteUrl}/products/${product.id}`;

  return {
    title: `${product.name} - 100% Discreet Shipping | Playtime`,
    description: `${product.tagline}. ${(product.description || '').slice(0, 150)}... 100% Ayurvedic, NABL tested, zero chemical numbness.`,
    keywords: [
      product.name,
      'Playtime wellness',
      product.category === 'extend' ? 'herbal delay spray' : 'Himalayan Shilajit resin',
      'discreet packaging India',
      'Ayurvedic stamina',
    ],
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      type: 'website',
      url: productUrl,
      title: `${product.name} | Playtime Luxury Wellness`,
      description: `${product.tagline} — 100% plain unmarked packaging.`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Playtime`,
      description: product.tagline,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getLiveOrStaticProduct(id);

  if (!product) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://playtime.in';
  const productUrl = `${siteUrl}/products/${product.id}`;

  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.image],
    description: product.description,
    sku: product.id,
    mpn: product.id.toUpperCase(),
    brand: {
      '@type': 'Brand',
      name: 'Playtime',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: product.basePrice,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Playtime',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <ProductDetailsClient initialData={product} />
    </>
  );
}
