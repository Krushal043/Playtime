import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import { verifyAdminRequest } from '@/lib/auth';

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

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ sortOrder: 1, createdAt: -1 });
    return NextResponse.json({ success: true, products: products.map(normalizeProduct) });
  } catch (error: any) {
    console.error('Products GET error:', error);
    const isWhitelistError =
      error.message?.includes('whitelist') ||
      error.message?.includes('SSL alert number 80') ||
      error.message?.includes('ReplicaSetNoPrimary') ||
      error.name === 'MongooseServerSelectionError';

    const friendlyMessage = isWhitelistError
      ? 'MongoDB Atlas access error: Your current IP is not whitelisted in Atlas Network Access. Add 0.0.0.0/0 or your IP in MongoDB Atlas -> Security -> Network Access.'
      : error.message;

    return NextResponse.json({ success: false, error: friendlyMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    if (!body.name || !body.basePrice) {
      return NextResponse.json({ success: false, message: 'Product name and base price are required' }, { status: 400 });
    }

    try {
      await connectToDatabase();
    } catch (connErr: any) {
      console.error('Database connection failed in POST /api/admin/products:', connErr);
      const isWhitelist =
        connErr.message?.includes('whitelist') ||
        connErr.message?.includes('SSL alert number 80') ||
        connErr.message?.includes('ReplicaSetNoPrimary') ||
        connErr.name === 'MongooseServerSelectionError';

      return NextResponse.json(
        {
          success: false,
          message: isWhitelist
            ? 'MongoDB Atlas IP Whitelist Required: Please add your current IP or 0.0.0.0/0 to MongoDB Atlas (Security -> Network Access).'
            : `Database connection error: ${connErr.message}`,
        },
        { status: 500 }
      );
    }

    // Auto generate unique slug ID if missing
    if (!body.id) {
      const baseSlug = 'pt-' + body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const existing = await Product.findOne({ id: baseSlug });
      if (existing) {
        body.id = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
      } else {
        body.id = baseSlug;
      }
    }

    // Clean up temporary frontend-only helper properties
    delete body.galleryImagesText;
    delete body.galleryText;

    // Default required fields
    if (!body.tagline) {
      body.tagline = body.name;
    }
    if (!body.description) {
      body.description = 'Ayurvedic intimacy formula crafted for natural endurance and pure satisfaction.';
    }
    if (!body.category) {
      body.category = 'extend';
    }

    // Ensure valid packs structure
    if (!body.packs || !Array.isArray(body.packs) || body.packs.length === 0) {
      const price = Number(body.basePrice);
      const origPrice = Number(body.originalPrice) || Math.round(price * 1.4);
      body.packs = [
        {
          packSize: 1,
          label: 'Single Pack (Standard)',
          price,
          originalPrice: origPrice,
          discount: 'Save 30%',
        },
      ];
    }

    // Ensure images array contains at least main cover image
    if ((!body.images || body.images.length === 0) && body.image) {
      body.images = [
        {
          url: body.image,
          label: 'Main Cover',
          caption: body.name,
        },
      ];
    }

    body.basePrice = Number(body.basePrice);
    if (body.originalPrice) {
      body.originalPrice = Number(body.originalPrice);
    }

    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to save product in database' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ success: false, message: 'Product ID required' }, { status: 400 });
    }

    delete body.galleryImagesText;
    delete body.galleryText;

    const updated = await Product.findOneAndUpdate({ id: body.id }, body, { new: true });
    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Product ID required' }, { status: 400 });
    }

    await Product.findOneAndDelete({ id });
    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
