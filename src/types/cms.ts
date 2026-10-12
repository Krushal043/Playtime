export interface MarqueeItemConfig {
  id?: string;
  iconName?: 'Leaf' | 'EyeOff' | 'Lock' | 'Zap' | 'ShieldCheck' | 'Star' | 'Tag';
  text: string;
  isCoupon?: boolean;
  couponCode?: string;
}

export interface ReviewItemConfig {
  id: string;
  name: string;
  location: string;
  product: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  isVerified?: boolean;
}

export interface FaqItemConfig {
  id: string;
  q: string;
  a: string;
  category?: string;
}

export interface TimelineStepConfig {
  id: string;
  time: string;
  label: string;
  headline: string;
  badge: string;
  description: string;
  stats: string;
  highlight: string;
}

export interface StandardCardConfig {
  id: string;
  iconName: 'Zap' | 'ShieldCheck' | 'Sparkles' | 'EyeOff' | 'Stethoscope' | 'Leaf';
  title: string;
  description: string;
}

export interface BentoItemConfig {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  actionText: string;
}

export interface FooterConfig {
  email: string;
  phone: string;
  workingHours: string;
  companyName: string;
  companyAddress: string;
  discreetNotice: string;
  whatsappNumber?: string;
}

export interface StoreSettingsMap {
  promo_banner?: {
    tickerText?: string;
    couponCode?: string;
    isActive?: boolean;
    countdownHours?: number;
    countdownMinutes?: number;
  };
  marquee_items?: MarqueeItemConfig[];
  hero_section?: {
    tagText?: string;
    heading1?: string;
    headingGreen?: string;
    headingGradient?: string;
    subtitle?: string;
  };
  testimonials?: ReviewItemConfig[];
  faqs?: FaqItemConfig[];
  timeline_steps?: TimelineStepConfig[];
  standards_grid?: StandardCardConfig[];
  bento_categories?: BentoItemConfig[];
  footer_config?: FooterConfig;
}

export const DEFAULT_MARQUEE_ITEMS: MarqueeItemConfig[] = [
  {
    id: 'm-1',
    iconName: 'Leaf',
    text: '100% Ayurvedic & AYUSH Certified • Zero Side Effects',
  },
  {
    id: 'm-2',
    iconName: 'EyeOff',
    text: '100% Plain Unmarked Box • Zero Adult Mention on Parcel',
  },
  {
    id: 'm-3',
    iconName: 'Lock',
    text: 'Confidential Bank Statement Billing ("PT Logistics Services")',
  },
  {
    id: 'm-4',
    iconName: 'Zap',
    text: 'Express 24-48h Discreet Dispatch Across India',
  },
  {
    id: 'm-5',
    iconName: 'ShieldCheck',
    text: 'Transfer-Free Delay Sprays • Natural Micro-Dose Absorption',
  },
  {
    id: 'm-6',
    iconName: 'Star',
    text: 'Rated 4.9/5 by 5,00,000+ Happy Indian Couples',
  },
  {
    id: 'm-7',
    iconName: 'Tag',
    text: 'Use Code PLAY10 For 10% Extra OFF at Checkout',
    isCoupon: true,
    couponCode: 'PLAY10',
  },
];

export const DEFAULT_FAQS: FaqItemConfig[] = [
  {
    id: 'faq-1',
    q: 'Will anyone at my house or office know what is inside the package?',
    a: 'Absolutely not. All Playtime orders are shipped in 100% plain, unmarked brown cardboard boxes or thick opaque courier bags with tamper-proof security tape. There is zero mention of the word "Playtime", "adult", or any intimate product names anywhere on the exterior.',
  },
  {
    id: 'faq-2',
    q: 'What company name will appear on my bank account, UPI, or credit card statement?',
    a: 'Your bank statement or UPI transaction alert will display a generic entity name like "PT Logistics Services" or "PT Retail Enterprises". It will never disclose any adult wellness or sexual wellness references.',
  },
  {
    id: 'faq-3',
    q: 'Will the Extend Herbal Delay Spray cause numbness or irritation to either partner?',
    a: 'No. Unlike synthetic chemical sprays containing high-dose lidocaine, Playtime Extend is formulated with micro-encapsulated Ayurvedic clove extract (Lavang) and Pudina Satva. It absorbs fully in 10 minutes into sub-dermal nerve endings without deadening touch sensation or transferring to your partner during intimacy.',
  },
  {
    id: 'faq-4',
    q: 'Are the Shilajit, Ashwagandha, and herbal elixirs certified and natural?',
    a: 'Yes. All our herbal vitality formulations are manufactured in GMP-certified facilities with Ministry of AYUSH approval. Each batch of Himalayan Shilajit is third-party NABL lab tested for purity, heavy metals, and guarantees >75% active Fulvic Acid.',
  },
  {
    id: 'faq-5',
    q: 'How fast is dispatch and delivery across India?',
    a: 'Orders placed before 2:00 PM are dispatched on the same business day in plain parcels. Standard express delivery takes 2 to 3 days for metro cities, and 3 to 5 days for the rest of India with encrypted SMS tracking and delivery OTP.',
  },
  {
    id: 'faq-6',
    q: 'How should I take Pure Himalayan Shilajit Gold Resin for best results?',
    a: 'Dissolve a pea-sized amount (300-500mg) using the included Ayurvedic brass spoon in lukewarm milk or water once daily. Consistent use for 4 to 8 weeks provides sustained cellular vitality, natural stamina, and enhanced physical endurance.',
  },
];

export const DEFAULT_TESTIMONIALS: ReviewItemConfig[] = [
  {
    id: 'rev-1',
    name: 'Aditya & Simran K.',
    location: 'Bandra, Mumbai',
    product: 'The Ayurvedic Power Duo Kit',
    rating: 5,
    date: 'Verified Buyer • 2 days ago',
    comment: 'Buying the Duo Kit was the best decision. The box arrived in a completely plain brown carton without any logos or labels. Both the Extend herbal spray and the Shilajit Gold resin are genuine top-tier Ayurvedic quality!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
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
    isVerified: true,
  },
  {
    id: 'rev-3',
    name: 'Vikram & Pooja M.',
    location: 'Koramangala, Bangalore',
    product: 'Pure Himalayan Shilajit Gold Resin',
    rating: 5,
    date: 'Verified Buyer • 1 week ago',
    comment: 'The pure resin with 24K gold dust dissolved smoothly in warm milk. Within 10 days my energy, stamina, and physical vitality feel completely rejuvenated. Worth every single rupee.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
  },
];

export const DEFAULT_TIMELINE_STEPS: TimelineStepConfig[] = [
  {
    id: 'step-1',
    time: '0 - 2 Min',
    label: 'Metered Spray',
    headline: 'Targeted Micro-Dispersion',
    badge: 'Step 1: Application',
    description: 'Spray 2-3 metered bursts onto the most sensitive nerve endings of the glans and frenulum. Fast-absorbing aqueous botanical formula with zero greasy residue.',
    stats: '120+ Metered Sprays per Canister',
    highlight: 'Non-greasy, fast penetration',
  },
  {
    id: 'step-2',
    time: '5 Min',
    label: 'Nerve Soothing',
    headline: 'Gentle Botanical Desensitization',
    badge: 'Step 2: Active Activation',
    description: 'Active Syzygium aromaticum (pure clove extract) and Pudina Satva gently soothe hyperactive sensory neurons without causing complete numbness or flaccidity.',
    stats: 'Maintains 100% Natural Sensation',
    highlight: 'Zero loss of firmness',
  },
  {
    id: 'step-3',
    time: '10 Min',
    label: '100% Absorbed',
    headline: 'Completely Transfer-Free & Dry',
    badge: 'Step 3: Transfer-Free Gate',
    description: 'The formula absorbs fully into epidermal layers. Zero transfer to your partner upon contact, and 100% safe for oral intimate play. No need to wash off.',
    stats: '100% Oral & Condom Safe',
    highlight: 'Partner feels zero numbness',
  },
  {
    id: 'step-4',
    time: '15 - 45+ Min',
    label: 'Peak Timing',
    headline: 'Prolonged Control & Stamina',
    badge: 'Step 4: Mutual Harmony',
    description: 'Enjoy prolonged intimacy with complete sensory satisfaction. Enables partners to sync their climaxes and reach deeper connection without psychological performance pressure.',
    stats: 'Clinically Proven 3x Longer Endurance',
    highlight: 'Synchronized mutual climaxes',
  },
];

export const DEFAULT_STANDARDS_GRID: StandardCardConfig[] = [
  {
    id: 'std-1',
    iconName: 'Zap',
    title: 'MICRO-ABSORPTION',
    description: 'Absorbs fully in 10 mins with zero partner transfer.',
  },
  {
    id: 'std-2',
    iconName: 'ShieldCheck',
    title: 'AYUSH CERTIFIED',
    description: '100% pure herbal actives. Zero lidocaine or chemicals.',
  },
  {
    id: 'std-3',
    iconName: 'Sparkles',
    title: 'ZERO NUMBNESS',
    description: 'Preserves natural tactile sensation and firmness.',
  },
  {
    id: 'std-4',
    iconName: 'EyeOff',
    title: '100% PLAIN BOX',
    description: 'Shipped in plain brown cartons marked PT Logistics.',
  },
  {
    id: 'std-5',
    iconName: 'Stethoscope',
    title: 'DOCTOR FORMULATED',
    description: 'Developed alongside registered Ayurvedic physicians.',
  },
  {
    id: 'std-6',
    iconName: 'Leaf',
    title: 'CLEAN & VEGAN',
    description: 'Dermatologically tested and non-irritating.',
  },
];

export const DEFAULT_FOOTER_CONFIG: FooterConfig = {
  email: 'support@playtimeintimates.in',
  phone: '+91 98765 43210',
  workingHours: 'Mon – Sat: 9:00 AM – 8:00 PM IST',
  companyName: 'PT Logistics & Wellness Enterprises Pvt. Ltd.',
  companyAddress: 'Bandra-Kurla Complex (BKC), Mumbai, Maharashtra 400051',
  discreetNotice: 'All orders are packed in unmarked plain cartons with no product descriptions or brand identifiers on the external courier label.',
  whatsappNumber: '+919876543210',
};
