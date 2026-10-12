import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import Order from '@/models/Order';
import Coupon from '@/models/Coupon';
import Setting from '@/models/Setting';
import VideoReel from '@/models/VideoReel';
import { ALL_PRODUCTS } from '@/data/products';
import { INFLUENCER_VIDEOS } from '@/data/influencerVideos';
import { verifyAdminRequest } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // 1. Seed Products (upsert)
    for (const prod of ALL_PRODUCTS) {
      await Product.findOneAndUpdate(
        { id: prod.id },
        {
          id: prod.id,
          name: prod.name,
          tagline: prod.tagline,
          category: prod.category,
          basePrice: prod.basePrice,
          originalPrice: prod.packs[0]?.originalPrice || prod.basePrice * 1.3,
          rating: prod.rating,
          reviewsCount: prod.reviewsCount,
          badge: prod.badge,
          badgeType: prod.badgeType,
          image: prod.image,
          description: prod.description,
          features: prod.features,
          specs: prod.specs,
          packs: prod.packs,
          inStock: prod.inStock,
          discreetPackagingGuaranteed: prod.discreetPackagingGuaranteed,
          howToUse: prod.howToUse,
          isFeatured: true,
          sortOrder: prod.id === 'pt-extend-spray' ? 1 : prod.id === 'pt-shilajit-gold' ? 2 : 3,
        },
        { upsert: true, new: true }
      );
    }

    // 2. Seed Coupons
    const initialCoupons = [
      {
        code: 'PLAY10',
        discountType: 'percentage',
        discountValue: 10,
        minSpend: 0,
        timesUsed: 142,
        isActive: true,
      },
      {
        code: 'MATCH10',
        discountType: 'percentage',
        discountValue: 10,
        minSpend: 499,
        timesUsed: 68,
        isActive: true,
      },
      {
        code: 'VIP20',
        discountType: 'percentage',
        discountValue: 20,
        minSpend: 999,
        timesUsed: 29,
        isActive: true,
      },
    ];

    for (const coup of initialCoupons) {
      await Coupon.findOneAndUpdate({ code: coup.code }, coup, { upsert: true });
    }

    // 2.5. Seed Video Reels into MongoDB
    for (const reel of INFLUENCER_VIDEOS) {
      await VideoReel.findOneAndUpdate(
        { id: reel.id },
        {
          id: reel.id,
          creatorName: reel.creatorName,
          creatorHandle: reel.creatorHandle,
          avatar: reel.avatar,
          videoUrl: reel.videoUrl,
          poster: reel.poster,
          rating: reel.rating,
          views: reel.views,
          likes: reel.likes,
          quote: reel.quote,
          productName: reel.productName,
          productId: reel.productId,
          productPrice: reel.productPrice,
          productOriginalPrice: reel.productOriginalPrice,
          productImage: reel.productImage,
          isPublished: true,
          sortOrder: 1,
        },
        { upsert: true }
      );
    }

    // 3. Seed Default Storefront Settings
    const defaultSettings = [
      {
        key: 'promo_banner',
        value: {
          tickerText: '100% Plain Box: Discreet Box • Zero outer logos',
          couponCode: 'PLAY10',
          countdownHours: 4,
          countdownMinutes: 28,
          isActive: true,
        },
      },
      {
        key: 'hero_section',
        value: {
          tagText: 'Ayurvedic Science • Modern Intimacy',
          heading1: 'Peak Intimate Endurance.',
          headingGreen: '100% Herbal.',
          headingGradient: 'Zero Numbness.',
          subtitle:
            'Formulated with pure botanical clove, jaiphal and pure Himalayan Shilajit. Clinically tested to prolong endurance without dulling sensations or transferring to your partner.',
        },
      },
      {
        key: 'marquee_items',
        value: [
          { id: 'm-1', iconName: 'Leaf', text: '100% Ayurvedic & AYUSH Certified • Zero Side Effects' },
          { id: 'm-2', iconName: 'EyeOff', text: '100% Plain Unmarked Box • Zero Adult Mention on Parcel' },
          { id: 'm-3', iconName: 'Lock', text: 'Confidential Bank Statement Billing ("PT Logistics Services")' },
          { id: 'm-4', iconName: 'Zap', text: 'Express 24-48h Discreet Dispatch Across India' },
          { id: 'm-5', iconName: 'ShieldCheck', text: 'Transfer-Free Delay Sprays • Natural Micro-Dose Absorption' },
          { id: 'm-6', iconName: 'Star', text: 'Rated 4.9/5 by 5,00,000+ Happy Indian Couples' },
          { id: 'm-7', iconName: 'Tag', text: 'Use Code PLAY10 For 10% Extra OFF at Checkout', isCoupon: true, couponCode: 'PLAY10' },
        ],
      },
      {
        key: 'faqs',
        value: [
          {
            id: 'faq-1',
            q: 'Will anyone at my house or office know what is inside the package?',
            a: 'Absolutely not. All Playtime orders are shipped in 100% plain, unmarked brown cardboard boxes with tamper-proof security tape. Zero mention of Playtime or adult wellness on the exterior label.',
          },
          {
            id: 'faq-2',
            q: 'What company name will appear on my bank account or UPI statement?',
            a: 'Your bank statement or UPI transaction alert will display a generic entity name like "PT Logistics Services". It will never disclose any adult wellness references.',
          },
          {
            id: 'faq-3',
            q: 'Will Extend Herbal Delay Spray cause numbness to my partner?',
            a: 'No. Playtime Extend absorbs completely in 10 minutes into sub-dermal nerve endings without chemical numbness or partner transfer.',
          },
          {
            id: 'faq-4',
            q: 'Are the Shilajit and herbal formulas AYUSH certified?',
            a: 'Yes. Manufactured in GMP-certified facilities with Ministry of AYUSH approval and third-party NABL lab testing.',
          },
        ],
      },
      {
        key: 'testimonials',
        value: [
          {
            id: 'rev-1',
            name: 'Aditya & Simran K.',
            location: 'Bandra, Mumbai',
            product: 'The Ayurvedic Power Duo Kit',
            rating: 5,
            date: 'Verified Buyer • 2 days ago',
            comment: 'Buying the Duo Kit was the best decision. The box arrived in a completely plain brown carton without any logos or labels. Both the Extend herbal spray and the Shilajit Gold resin are genuine top-tier Ayurvedic quality!',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          },
          {
            id: 'rev-2',
            name: 'Rajesh V.',
            location: 'Vastrapur, Ahmedabad',
            product: 'Extend Long Last Delay Spray',
            rating: 5,
            date: 'Verified Buyer • 5 days ago',
            comment: 'The Extend spray gave me an extra 18-20 minutes with zero numbness or burning feeling! Absorbs quickly and doesn’t transfer. Bank SMS showed PT Logistics.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          },
        ],
      },
      {
        key: 'timeline_steps',
        value: [
          {
            id: 'step-1',
            time: '0 - 2 Min',
            label: 'Metered Spray',
            headline: 'Targeted Micro-Dispersion',
            badge: 'Step 1: Application',
            description: 'Spray 2-3 metered bursts onto the most sensitive nerve endings. Fast-absorbing aqueous botanical formula.',
            stats: '120+ Metered Sprays per Canister',
            highlight: 'Non-greasy, fast penetration',
          },
          {
            id: 'step-2',
            time: '5 Min',
            label: 'Nerve Soothing',
            headline: 'Gentle Botanical Desensitization',
            badge: 'Step 2: Active Activation',
            description: 'Active Clove extract and Pudina Satva soothe hyperactive sensory neurons without flaccidity.',
            stats: 'Maintains 100% Natural Sensation',
            highlight: 'Zero loss of firmness',
          },
          {
            id: 'step-3',
            time: '10 Min',
            label: '100% Absorbed',
            headline: 'Completely Transfer-Free & Dry',
            badge: 'Step 3: Transfer-Free Gate',
            description: 'The formula absorbs fully into epidermal layers. Zero transfer to your partner upon contact.',
            stats: '100% Oral & Condom Safe',
            highlight: 'Partner feels zero numbness',
          },
          {
            id: 'step-4',
            time: '15 - 45+ Min',
            label: 'Peak Timing',
            headline: 'Prolonged Control & Stamina',
            badge: 'Step 4: Mutual Harmony',
            description: 'Enjoy prolonged intimacy with complete sensory satisfaction and synchronized mutual climaxes.',
            stats: 'Clinically Proven 3x Longer Endurance',
            highlight: 'Synchronized mutual climaxes',
          },
        ],
      },
      {
        key: 'standards_grid',
        value: [
          { id: 'std-1', iconName: 'Zap', title: 'MICRO-ABSORPTION', description: 'Absorbs fully in 10 mins with zero partner transfer.' },
          { id: 'std-2', iconName: 'ShieldCheck', title: 'AYUSH CERTIFIED', description: '100% pure herbal actives. Zero lidocaine or chemicals.' },
          { id: 'std-3', iconName: 'Sparkles', title: 'ZERO NUMBNESS', description: 'Preserves natural tactile sensation and firmness.' },
          { id: 'std-4', iconName: 'EyeOff', title: '100% PLAIN BOX', description: 'Shipped in plain brown cartons marked PT Logistics.' },
          { id: 'std-5', iconName: 'Stethoscope', title: 'DOCTOR FORMULATED', description: 'Developed alongside registered Ayurvedic physicians.' },
          { id: 'std-6', iconName: 'Leaf', title: 'CLEAN & VEGAN', description: 'Dermatologically tested and non-irritating.' },
        ],
      },
      {
        key: 'footer_config',
        value: {
          email: 'care@playtime.in',
          phone: '+91 800-PLAYTIME',
          workingHours: 'Daily 9:00 AM - 9:00 PM',
          companyName: 'Playtime Botanical Labs',
          companyAddress: 'Mumbai, MH, India',
          discreetNotice: 'All orders are packed in unmarked plain cartons with no product descriptions or brand identifiers.',
          whatsappNumber: '+919876543210',
        },
      },
    ];

    for (const setting of defaultSettings) {
      await Setting.findOneAndUpdate({ key: setting.key }, setting, { upsert: true });
    }

    // 4. Seed Initial Sample Orders (if none exist)
    const existingOrdersCount = await Order.countDocuments();
    if (existingOrdersCount === 0) {
      const sampleOrders = [
        {
          orderId: 'ORD-94821',
          customer: {
            name: 'Vikram Sharma',
            phone: '+91 98765 43210',
            email: 'vikram.s@gmail.com',
            address: 'Flat 402, Sea Green Apts, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400050',
          },
          items: [
            {
              productId: 'pt-extend-spray',
              productName: 'Extend Long Last Delay Spray (50g)',
              packLabel: 'Single Canister (50g)',
              packSize: 1,
              quantity: 1,
              price: 499,
              image: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=800&auto=format&fit=crop&q=80',
            },
          ],
          pricing: {
            subtotal: 499,
            discount: 50,
            shippingFee: 0,
            totalAmount: 449,
            promoCode: 'PLAY10',
          },
          paymentMethod: 'UPI',
          paymentStatus: 'paid',
          fulfillmentStatus: 'dispatched',
          tracking: {
            courierPartner: 'BlueDart Air',
            trackingNumber: 'BLUEDART-88291039',
            dispatchedAt: new Date(Date.now() - 86400000),
          },
        },
        {
          orderId: 'ORD-94822',
          customer: {
            name: 'Karan Mehra',
            phone: '+91 98201 12345',
            email: 'karan.m@gmail.com',
            address: '12, 100ft Road, Indiranagar',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560038',
          },
          items: [
            {
              productId: 'pt-power-duo-bundle',
              productName: 'The Ayurvedic Power Duo Kit',
              packLabel: '1 Kit (Spray + 20g Shilajit Gold)',
              packSize: 1,
              quantity: 1,
              price: 1399,
              image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
            },
          ],
          pricing: {
            subtotal: 1399,
            discount: 140,
            shippingFee: 0,
            totalAmount: 1259,
            promoCode: 'PLAY10',
          },
          paymentMethod: 'COD',
          paymentStatus: 'pending',
          fulfillmentStatus: 'confirmed',
        },
      ];

      await Order.insertMany(sampleOrders);
    }

    return NextResponse.json({
      success: true,
      message: 'MongoDB database initialized with Playtime products, coupons, settings, and sample orders!',
    });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
