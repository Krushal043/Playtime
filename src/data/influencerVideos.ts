export interface InfluencerVideo {
  id: string;
  creatorName: string;
  creatorHandle: string;
  creatorRole: string;
  avatar: string;
  videoUrl: string;
  poster: string;
  views: string;
  likes: string;
  duration: string;
  quote: string;
  rating: number;
  productId: 'pt-extend-spray' | 'pt-shilajit-gold' | 'pt-rose-stimulator';
  productName: string;
  productPrice: number;
  productOriginalPrice: number;
  productImage: string;
}

export const INFLUENCER_VIDEOS: InfluencerVideo[] = [
  {
    id: 'reel-1',
    creatorName: 'Dr. Aarav Mehta',
    creatorHandle: '@dr.aarav_wellness',
    creatorRole: 'Men’s Health & Wellness Creator',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
    views: '640K',
    likes: '48.2K',
    duration: '0:34',
    quote: 'The 10-minute micro-absorption on Extend is unmatched. Zero transfer to your partner and zero numbness.',
    rating: 5,
    productId: 'pt-extend-spray',
    productName: 'Extend Long Last Delay Spray',
    productPrice: 499,
    productOriginalPrice: 699,
    productImage: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'reel-2',
    creatorName: 'Priya & Rohan S.',
    creatorHandle: '@couples_unscripted',
    creatorRole: 'Relationship & Lifestyle Creators',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
    views: '920K',
    likes: '82.4K',
    duration: '0:42',
    quote: 'The purity of this Himalayan Shilajit is incredible. Dissolves cleanly with 24K gold dust and zero metallic bitterness.',
    rating: 5,
    productId: 'pt-shilajit-gold',
    productName: 'Pure Himalayan Shilajit Gold Resin',
    productPrice: 999,
    productOriginalPrice: 1499,
    productImage: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'reel-3',
    creatorName: 'Karan V.',
    creatorHandle: '@karanv_fit',
    creatorRole: 'Fitness & Men’s Coach',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    views: '480K',
    likes: '34.9K',
    duration: '0:28',
    quote: 'Pocket-sized aluminum canister that lasts for months. Game-changing endurance and supreme confidence.',
    rating: 5,
    productId: 'pt-extend-spray',
    productName: 'Extend Long Last Delay Spray',
    productPrice: 499,
    productOriginalPrice: 699,
    productImage: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'reel-4',
    creatorName: 'Ananya Sen',
    creatorHandle: '@ananya_unfiltered',
    creatorRole: 'Intimacy & Wellness Educator',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    views: '1.4M',
    likes: '112.5K',
    duration: '0:45',
    quote: 'Certified by Ministry of AYUSH and third-party tested. 2 weeks into taking this Shilajit and my energy is on another level.',
    rating: 5,
    productId: 'pt-shilajit-gold',
    productName: 'Pure Himalayan Shilajit Gold Resin',
    productPrice: 999,
    productOriginalPrice: 1499,
    productImage: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'reel-5',
    creatorName: 'Dev & Meera',
    creatorHandle: '@twototango_vlogs',
    creatorRole: 'Lifestyle & Travel Couple',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    poster: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
    views: '790K',
    likes: '62.3K',
    duration: '0:38',
    quote: 'Our honest review after 3 weeks of using Playtime. Completely revolutionized our bedroom timing.',
    rating: 5,
    productId: 'pt-extend-spray',
    productName: 'Extend Long Last Delay Spray',
    productPrice: 499,
    productOriginalPrice: 699,
    productImage: 'https://images.unsplash.com/photo-1608248597358-1e4e69d7634f?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'reel-6',
    creatorName: 'Rhea Kapoor',
    creatorHandle: '@rhea_glowdiaries',
    creatorRole: 'Beauty & Luxury Lifestyle',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    poster: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80',
    views: '580K',
    likes: '44.1K',
    duration: '0:31',
    quote: 'Whisper quiet with magnetic USB charging. Elevated personal luxury self-care in a gorgeous petal design.',
    rating: 5,
    productId: 'pt-rose-stimulator',
    productName: 'Rose Pleasure Stimulator',
    productPrice: 1499,
    productOriginalPrice: 2499,
    productImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&auto=format&fit=crop&q=80',
  },
];
