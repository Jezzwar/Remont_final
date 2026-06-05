import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import FloatingContact from '@/components/FloatingContact'
import { NavigationLoader } from '@/components/NavigationLoader'

const locales = ['pl', 'en', 'ru']

const BASE = 'https://remont-naprawa.pl'

const localeMeta: Record<string, { lang: string; ogLocale: string; title: string; description: string }> = {
  pl: {
    lang: 'pl',
    ogLocale: 'pl_PL',
    title: 'Remont Naprawa Warszawa – Remonty mieszkań pod klucz',
    description: 'Profesjonalne remonty mieszkań i domów w Warszawie. Kompleksowe usługi remontowe: łazienki, kuchnie, podłogi, malowanie. Wycena bezpłatna. ☎ +48 729 460 423',
  },
  en: {
    lang: 'en',
    ogLocale: 'en_US',
    title: 'Renovation Services Warsaw – Professional Apartment Renovations',
    description: 'Professional apartment and house renovations in Warsaw. Full-service: bathrooms, kitchens, flooring, painting. Free quote. ☎ +48 729 460 423',
  },
  ru: {
    lang: 'ru',
    ogLocale: 'ru_RU',
    title: 'Ремонт квартир Варшава – Профессиональный ремонт под ключ',
    description: 'Профессиональный ремонт квартир и домов в Варшаве. Комплексные услуги: ванные, кухни, полы, покраска. Бесплатная смета. ☎ +48 729 460 423',
  },
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const m = localeMeta[locale] ?? localeMeta.pl
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${BASE}/${locale}`,
      languages: { pl: `${BASE}/pl`, en: `${BASE}/en`, ru: `${BASE}/ru` },
    },
    openGraph: {
      type: 'website',
      locale: m.ogLocale,
      alternateLocale: Object.values(localeMeta).map(l => l.ogLocale).filter(l => l !== m.ogLocale),
      url: `${BASE}/${locale}`,
      siteName: 'Remont Naprawa Warszawa',
      title: m.title,
      description: m.description,
      images: [{ url: '/hero_high.jpg', width: 1920, height: 1080, alt: 'Remont Naprawa Warszawa' }],
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale)) notFound()
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      <NavigationLoader />
      {children}
      <FloatingContact />
    </NextIntlClientProvider>
  )
}
