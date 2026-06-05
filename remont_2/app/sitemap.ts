import type { MetadataRoute } from 'next'

const BASE = 'https://remont-naprawa.pl'
const locales = ['pl', 'en', 'ru']

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/privacy', '/legal', '/terms']

  return locales.flatMap(locale =>
    routes.map(route => ({
      url: `${BASE}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly' as const,
      priority: route === '' ? 1 : 0.5,
    }))
  )
}
