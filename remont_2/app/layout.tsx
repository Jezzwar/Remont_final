import type { Metadata, Viewport } from 'next'
import { Syne, Manrope, Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import { PageLoaderHider } from '@/components/PageLoaderHider'

const syne = Syne({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Remont Naprawa Warszawa – Remonty mieszkań pod klucz',
    template: '%s | Remont Naprawa Warszawa',
  },
  description: 'Profesjonalne remonty mieszkań i domów w Warszawie. Kompleksowe usługi remontowe: łazienki, kuchnie, podłogi, malowanie, instalacje. Wycena bezpłatna. ☎ +48 729 460 423',
  keywords: [
    'remont warszawa', 'remonty mieszkań warszawa', 'remont łazienki warszawa',
    'remont kuchni warszawa', 'malowanie mieszkania warszawa', 'remonty pod klucz',
    'ekipa remontowa warszawa', 'wykończenie mieszkania warszawa', 'remont cena warszawa',
    'hydraulik warszawa', 'elektryk warszawa', 'kafelkowanie warszawa',
  ],
  authors: [{ name: 'Dmytro Nester', url: 'https://remont-naprawa.pl' }],
  creator: 'Dmytro Nester',
  publisher: 'Remont Naprawa Warszawa',
  metadataBase: new URL('https://remont-naprawa.pl'),
  alternates: {
    canonical: '/',
    languages: {
      'pl': '/pl',
      'en': '/en',
      'ru': '/ru',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    alternateLocale: ['en_US', 'ru_RU'],
    url: 'https://remont-naprawa.pl',
    siteName: 'Remont Naprawa Warszawa',
    title: 'Remont Naprawa Warszawa – Remonty mieszkań pod klucz',
    description: 'Profesjonalne remonty mieszkań i domów w Warszawie. Kompleksowe usługi remontowe. Wycena bezpłatna. ☎ +48 729 460 423',
    images: [{ url: '/hero_high.jpg', width: 1920, height: 1080, alt: 'Remont Naprawa Warszawa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remont Naprawa Warszawa – Remonty mieszkań pod klucz',
    description: 'Profesjonalne remonty mieszkań i domów w Warszawie. Wycena bezpłatna.',
    images: ['/hero_high.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: 'add-your-google-search-console-token-here',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Remont Naprawa Warszawa',
    description: 'Profesjonalne remonty mieszkań i domów w Warszawie. Kompleksowe usługi remontowe pod klucz.',
    url: 'https://remont-naprawa.pl',
    telephone: '+48729460423',
    email: 'dima.nester@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Warszawa',
      addressRegion: 'mazowieckie',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.2297,
      longitude: 21.0122,
    },
    areaServed: {
      '@type': 'City',
      name: 'Warszawa',
    },
    priceRange: '$$',
    openingHours: 'Mo-Fr 08:00-18:00',
    image: 'https://remont-naprawa.pl/hero_high.jpg',
    sameAs: [
      'https://www.instagram.com/remonty_warszawa_nester',
      'https://www.tiktok.com/@dmytro.nester2',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '250',
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Usługi remontowe',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remont łazienki Warszawa' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remont kuchni Warszawa' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Malowanie mieszkania Warszawa' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Układanie podłóg Warszawa' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remont pod klucz Warszawa' } },
      ],
    },
  }

  return (
    <html lang="pl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
              .replace(/</g, '\\u003c')
              .replace(/>/g, '\\u003e')
              .replace(/&/g, '\\u0026'),
          }}
        />
      </head>
      <body className={`${syne.variable} ${manrope.variable} ${bricolage.variable} font-body bg-graphite text-white`}>
        <div id="page-loader" style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: '#0D0D0D',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '16px',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 12px)', gap: '1px' }}>
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} style={{
                width: 12, height: 12,
                background: i % 7 === 0 || i % 11 === 0 ? '#D8C3A5' : 'rgba(255,255,255,0.04)',
                animation: `tetrisFade ${0.8 + (i % 5) * 0.15}s ease-in-out infinite alternate`,
                animationDelay: `${(i % 8) * 0.1}s`,
              }} />
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: '0.25em', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
            Ładowanie...
          </p>
        </div>
        <PageLoaderHider />
        {children}
      </body>
    </html>
  )
}
