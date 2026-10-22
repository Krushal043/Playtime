import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A0A0A",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://playtime.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Playtime | Luxury Ayurvedic Adult Wellness & Intimate Essentials",
    template: "%s | Playtime Luxury Wellness",
  },
  description:
    "India's premier luxury adult wellness boutique. 100% Ayurvedic delay sprays, pure Himalayan Shilajit Gold, and bedroom intimacy essentials delivered in 100% plain, unmarked discreet packaging.",
  keywords: [
    "Playtime",
    "Ayurvedic delay spray",
    "herbal delay spray India",
    "pure Himalayan Shilajit",
    "Shilajit Gold resin",
    "climax control spray",
    "discreet adult wellness India",
    "intimate wellness for couples",
    "transfer free delay spray",
    "plain box shipping",
  ],
  authors: [{ name: "Playtime Wellness Labs", url: siteUrl }],
  creator: "Playtime",
  publisher: "Playtime",
  applicationName: "Playtime Store",
  category: "Health & Wellness",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Playtime",
    title: "Playtime | Luxury Adult Wellness & Intimate Essentials",
    description:
      "India's premier luxury adult wellness boutique. Sculpted for prolonged pleasure, powered by pure Ayurvedic vitality, with 100% discreet packaging guarantee.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 360,
        alt: "Playtime Luxury Adult Wellness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Playtime | Luxury Adult Wellness",
    description:
      "India's premier luxury adult wellness boutique. 100% Ayurvedic vitality, transfer-free endurance, and blind unmarked packaging.",
    images: ["/logo.png"],
    creator: "@playtime",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

// Schema.org Structured Data
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Playtime",
  alternateName: "Playtime Wellness",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "India's premier luxury adult wellness boutique specializing in Ayurvedic endurance, Himalayan Shilajit vitality, and discreet confidential delivery.",
  sameAs: [
    "https://instagram.com/playtime",
    "https://wa.me/919876543210",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9876543210",
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Playtime",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Will anyone at my house or office know what is inside the package?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely not. All Playtime orders are shipped in 100% plain, unmarked brown cardboard boxes or thick opaque courier bags with tamper-proof security tape. Zero mention of Playtime or intimate products anywhere on the exterior.",
      },
    },
    {
      "@type": "Question",
      name: "What company name will appear on my bank account, UPI, or credit card statement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your bank statement or UPI transaction alert will display a generic entity name like 'PT Logistics Services'. It will never disclose any adult or sexual wellness references.",
      },
    },
    {
      "@type": "Question",
      name: "Will the Extend Herbal Delay Spray cause numbness or irritation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Unlike synthetic chemical sprays containing lidocaine, Playtime Extend is formulated with micro-encapsulated Ayurvedic clove extract (Lavang) and Pudina Satva. It absorbs fully in 10 minutes without deadening touch sensation or transferring to your partner.",
      },
    },
    {
      "@type": "Question",
      name: "Are the Shilajit, Ashwagandha, and herbal elixirs certified and natural?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All our herbal vitality formulations are manufactured in GMP-certified facilities with Ministry of AYUSH approval. Each batch of Himalayan Shilajit is third-party NABL lab tested for purity and guarantees >75% active Fulvic Acid.",
      },
    },
  ],
};

const jsonLdAggregateRating = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Playtime Luxury Ayurvedic Wellness Collection",
  image: `${siteUrl}/logo.png`,
  description:
    "India's premier luxury adult wellness boutique specializing in Ayurvedic endurance, Himalayan Shilajit vitality, and discreet packaging.",
  brand: {
    "@type": "Brand",
    name: "Playtime",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "18400",
    reviewCount: "18400",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-PLAYTIME2026";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAggregateRating) }}
        />
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
