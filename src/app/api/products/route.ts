import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import { ALL_PRODUCTS } from '@/data/products';

function normalizeProduct(prod: any) {
  const p = typeof prod.toObject === 'function' ? prod.toObject() : { ...prod };
  if (!p.packs || !Array.isArray(p.packs) || p.packs.length === 0) {
    const price = Number(p.basePrice) || 499;
    const origPrice = Number(p.originalPrice) || Math.round(price * 1.4);
    p.packs = [
      {
        packSize: 1,
        label: 'Single Pack (Standard)',
        price,
        originalPrice: origPrice,
        discount: 'Special Deal',
      },
    ];
  }
  return p;
}

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const product = await Product.findOne({ id });
      if (product) {
        return NextResponse.json({ success: true, product: normalizeProduct(product) });
      }
      const staticProd = ALL_PRODUCTS.find((p) => p.id === id);
      return NextResponse.json({ success: true, product: staticProd ? normalizeProduct(staticProd) : null });
    }

    const dbProducts = await Product.find({}).sort({ sortOrder: 1, createdAt: -1 });

    // Fallback if collection was empty
    if (!dbProducts || dbProducts.length === 0) {
      return NextResponse.json({ success: true, products: ALL_PRODUCTS.map(normalizeProduct) });
    }

    return NextResponse.json({ success: true, products: dbProducts.map(normalizeProduct) });
  } catch (error: any) {
    console.error('Products fetch error, falling back to static data:', error);
    return NextResponse.json({ success: true, products: ALL_PRODUCTS.map(normalizeProduct) });
  }
}
