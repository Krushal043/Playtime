import { Product, ProductPack } from '@/types';

export interface PipelineProduct {
  id: string;
  name: string;
  tagline: string;
  category: string;
  expectedLaunch: string;
  image: string;
  badge: string;
}

export const LAUNCH_PRODUCTS: Product[] = [
  // FLAGSHIP 1: EXTEND DELAY SPRAY (FOR HIM / TIMING & CONFIDENCE)
  {
    id: 'pt-extend-spray',
    name: 'Extend Long Last Delay Spray (50g)',
    tagline: 'Clinically tested transfer-free formula engineered for prolonged endurance',
    category: 'extend',
    basePrice: 499,
    rating: 4.9,
    reviewsCount: 3840,
    badge: 'Flagship #1 • For Him 🔥',
    badgeType: 'blue',
    image: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=800&auto=format&fit=crop&q=80',
    description: 'Playtime Extend is formulated with micro-absorption Ayurvedic botanical clove extract (Lavang), Pudina Satva, and Jaiphal to gently soothe hyper-sensitive nerve endings. Absorbs completely in 10 minutes with zero chemical numbness, zero transfer to your partner, and zero loss of natural firmness or sensation.',
    features: [
      'Transfer-free formulation (partner feels no numbness)',
      'Fast 10-minute micro-absorption rate',
      'Non-greasy, pocket-friendly aluminium discreet canister',
      '100% safe for oral intimate play after absorption'
    ],
    specs: {
      volume: '50g (~120 metered sprays)',
      ingredients: 'Syzygium aromaticum (Clove Extract), Mentha Arvensis, Tocopherol (Vitamin E)',
      safeForSkin: 'Dermatologically Tested, AYUSH Approved, Non-Toxic'
    },
    packs: [
      { packSize: 1, label: 'Single Canister (50g)', price: 499, originalPrice: 699, discount: '28% OFF' },
      { packSize: 2, label: 'Pack of 2 (100g Total)', price: 899, originalPrice: 1398, discount: '36% OFF' },
      { packSize: 3, label: 'Pack of 3 (Ultimate Stock)', price: 1249, originalPrice: 2097, discount: '40% OFF' },
    ],
    inStock: true,
    discreetPackagingGuaranteed: true,
    howToUse: [
      'Shake the aluminium canister well for 5 seconds.',
      'Hold 5 cm away and apply 2-3 sprays directly to the targeted sensitive area.',
      'Allow 10-15 minutes for complete micro-absorption before intimacy.',
      'Optionally wipe gently with a soft damp cloth before contact if preferred.'
    ],
    faq: [
      { q: 'Will this numb my partner?', a: 'No. The micro-absorption technology ensures the botanical extracts absorb fully within 10 minutes without transferring.' },
      { q: 'How long do the effects last?', a: 'Typically provides an extended duration of 20 to 45 minutes of sustained endurance depending on sensitivity.' },
      { q: 'Is the delivery package discreet?', a: 'Yes! Delivered in a plain brown corrugated box with zero brand logos. Sender is marked "PT Logistics".' }
    ]
  },

  // FLAGSHIP 2: PURE HIMALAYAN SHILAJIT GOLD RESIN (20G)
  {
    id: 'pt-shilajit-gold',
    name: 'Pure Himalayan Shilajit Gold Resin (20g)',
    tagline: 'Harvested from 18,000+ ft with 24K Gold (Swarna Bhasma) & >75% Fulvic Acid',
    category: 'supplements',
    basePrice: 999,
    rating: 5.0,
    reviewsCount: 3420,
    badge: 'Flagship #2 • Pure Ayurvedic Gold 🌿',
    badgeType: 'green',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80',
    description: '100% Shuddh Himalayan Shilajit resin purified through classical Ayurvedic Agnitapi Shodhana. Enriched with 24K Gold Bhasma, Ashwagandha, and Gokshura. Increases natural stamina, cellular energy, core vitality, and physical endurance without synthetic chemicals.',
    features: [
      'High Potency: >75% active Fulvic Acid content',
      'Infused with 24K Ayurvedic Swarna Bhasma (Gold Dust)',
      'NABL 3rd-party lab tested: 100% free of heavy metals & synthetic steroids',
      'Includes complimentary handcrafted brass dosing spoon'
    ],
    specs: {
      volume: '20g Pure Resin (~60 daily doses)',
      ingredients: 'Shuddh Himalayan Shilajit (85%), Swarna Bhasma (Gold Dust), Ashwagandha, Safed Musli, Gokshura',
      safeForSkin: '100% Ayurvedic, Non-Habit Forming, GMP Certified, AYUSH Approved'
    },
    packs: [
      { packSize: 1, label: 'Single Luxury Jar (20g) + Brass Spoon', price: 999, originalPrice: 1499, discount: '33% OFF' },
      { packSize: 2, label: 'Pack of 2 Jars (40g Stock)', price: 1799, originalPrice: 2998, discount: '40% OFF' },
    ],
    inStock: true,
    discreetPackagingGuaranteed: true,
    howToUse: [
      'Take a pea-sized amount (300-500mg) using the included brass spoon.',
      'Dissolve thoroughly in lukewarm water, warm milk, or green tea.',
      'Consume once daily in the morning or 30 minutes before bedtime.',
      'Use consistently for 4 to 8 weeks for maximum peak vitality and stamina.'
    ],
    faq: [
      { q: 'Is this 100% pure Himalayan Shilajit?', a: 'Yes! Harvested from 18,000+ ft elevations in the Himalayas and purified using traditional Ayurvedic methods without heat degradation.' },
      { q: 'How long until I experience results?', a: 'Most individuals experience enhanced physical energy and stamina within 7 to 10 days of consistent daily use.' },
      { q: 'Is it tested for heavy metals?', a: 'Yes, every batch is certified by independent NABL-accredited laboratories to be 100% free from lead, arsenic, and mercury.' }
    ]
  }
];

// THE POWER DUO COMBO AS A FULL PRODUCT
export const DUO_BUNDLE_PRODUCT: Product = {
  id: 'pt-power-duo-bundle',
  name: 'The Playtime Ayurvedic Power Duo Kit',
  tagline: 'Extend Herbal Delay Spray (50g) + Pure Himalayan Shilajit Gold Resin (20g)',
  category: 'couples',
  basePrice: 1399,
  rating: 5.0,
  reviewsCount: 1420,
  badge: 'Best Value Ayurvedic Kit 🌿',
  badgeType: 'red',
  image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
  description: 'The ultimate 100% Ayurvedic synergy kit for couples and peak intimacy. Combines Internal Vitality (Pure Himalayan Shilajit Gold Resin) with External Climax Endurance (Extend Herbal Delay Spray). 100% natural, AYUSH approved, zero chemical numbness, and delivered in plain discreet packaging.',
  features: [
    'Complete Ayurvedic synergy: Internal Core Energy + External Lasting Power',
    'Extend Herbal Delay Spray (50g, 120+ metered sprays with pure Clove & Mint)',
    'Pure Himalayan Shilajit Gold Resin (20g jar with 24K Swarna Bhasma)',
    'Handcrafted Ayurvedic Brass Measuring Spoon included',
    'Save over ₹799 compared to purchasing individually'
  ],
  specs: {
    material: 'Amber Glass Jar + Aluminium Metered Canister + Brass Spoon',
    waterproof: '100% Ayurvedic & Botanical',
    power: 'Natural Herb Extracts',
    safeForSkin: '100% Chemical-free, AYUSH approved, GMP Certified'
  },
  packs: [
    { packSize: 1, label: 'Complete Duo Box Set', price: 1399, originalPrice: 2198, discount: '36% OFF' },
    { packSize: 2, label: 'Twin Duo Sets (Gift Pack)', price: 2599, originalPrice: 4396, discount: '40% OFF' }
  ],
  inStock: true,
  discreetPackagingGuaranteed: true,
  howToUse: [
    'Daily Morning/Night: Take pea-sized Shilajit Gold Resin dissolved in warm milk/water for daily cellular stamina.',
    'Before Intimacy: Apply 2-3 sprays of Extend Herbal Delay Spray 10-15 minutes prior for prolonged duration without partner transfer.',
    'Enjoy synced, natural intimacy powered 100% by Ayurvedic botanicals.'
  ],
  faq: [
    { q: 'Does this come in separate boxes?', a: 'Both arrive nestled together inside a tamper-evident presentation gift box, wrapped in a plain brown shipping carton marked "PT Logistics".' },
    { q: 'Can both products be used together?', a: 'Yes! They are designed as a dual-action system: Shilajit works internally for energy and stamina, while Extend Spray works externally for local sensitivity control.' }
  ]
};

export const DUO_BUNDLE = {
  id: 'pt-power-duo-bundle',
  name: 'The Playtime Ayurvedic Power Duo Kit',
  tagline: 'Extend Herbal Delay Spray (50g) + Pure Himalayan Shilajit Gold Resin (20g) in luxury gift box',
  price: 1399,
  originalPrice: 2198,
  discount: '36% OFF • SAVE ₹799',
  image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
  badge: 'Best Value Ayurvedic Kit 🌿',
  includes: [
    'Extend Herbal Delay Spray (50g)',
    'Pure Himalayan Shilajit Gold Resin (20g Jar)',
    'Ayurvedic Brass Measuring Spoon',
    'Discreet Satin Keepsake Pouch',
    '100% Plain Unmarked Outer Box Packaging'
  ]
};

export const ALL_PRODUCTS: Product[] = [...LAUNCH_PRODUCTS, DUO_BUNDLE_PRODUCT];

export function getProductById(id: string): Product | undefined {
  if (id === 'pt-rose-stimulator') return ALL_PRODUCTS.find((p) => p.id === 'pt-shilajit-gold');
  return ALL_PRODUCTS.find((p) => p.id === id);
}

// FUTURE EXPANSION PIPELINE (SHOWCASING UPCOMING INNOVATIONS)
export const PIPELINE_PRODUCTS: PipelineProduct[] = [
  {
    id: 'pipe-01',
    name: '404 Nano Thin Condoms (50 Microns)',
    tagline: 'Barely-there sensitivity with electronically tested leakproof strength.',
    category: 'Protection',
    expectedLaunch: 'Next Month',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    badge: 'Coming Soon'
  },
  {
    id: 'pipe-02',
    name: 'Himalayan Pure Gold Shilajit Resin',
    tagline: '>75% active Fulvic Acid harvested from 18,000+ ft elevations.',
    category: 'Ayurvedic Vitality',
    expectedLaunch: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=500&auto=format&fit=crop&q=80',
    badge: 'In Lab Testing 🌿'
  },
  {
    id: 'pipe-03',
    name: 'Silk Touch Organic Aloe Lubricant',
    tagline: '100% water-soluble, pH balanced and gynecologist approved moisture.',
    category: 'Sensual Care',
    expectedLaunch: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80',
    badge: 'Under Formulation 💧'
  },
  {
    id: 'pipe-04',
    name: 'Midnight Spark Intimacy Conversation Deck',
    tagline: '150 thought-provoking, playful and adventurous prompt cards for couples.',
    category: 'Date Night Game',
    expectedLaunch: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&auto=format&fit=crop&q=80',
    badge: 'In Production 🎲'
  }
];

export const PRODUCTS = LAUNCH_PRODUCTS;

export const TESTIMONIALS = [
  {
    name: 'Aditya & Simran K.',
    location: 'Bandra, Mumbai',
    product: 'The Ayurvedic Power Duo Kit',
    rating: 5,
    date: 'Verified Buyer • 2 days ago',
    comment: 'Buying the Duo Kit was the best decision. The box arrived in a completely plain brown carton without any logos or labels. Both the Extend herbal spray and the Shilajit Gold resin are genuine top-tier Ayurvedic quality!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Rajesh V.',
    location: 'Vastrapur, Ahmedabad',
    product: 'Extend Long Last Delay Spray',
    rating: 5,
    date: 'Verified Buyer • 5 days ago',
    comment: 'The Extend spray gave me an extra 18-20 minutes with zero numbness or burning feeling! Absorbs quickly and doesn’t transfer. Bank SMS showed PT Logistics.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Vikram & Pooja M.',
    location: 'Koramangala, Bangalore',
    product: 'Pure Himalayan Shilajit Gold Resin',
    rating: 5,
    date: 'Verified Buyer • 1 week ago',
    comment: 'The pure resin with 24K gold dust dissolved smoothly in warm milk. Within 10 days my energy, stamina, and physical vitality feel completely rejuvenated. Worth every single rupee.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  }
];
