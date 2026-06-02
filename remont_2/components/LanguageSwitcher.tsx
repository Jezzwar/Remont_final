'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

const flags: Record<string, string> = { pl: '🇵🇱', en: '🇬🇧', ru: '🇷🇺' }
const labels: Record<string, string> = { pl: 'PL', en: 'EN', ru: 'RU' }

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <div className="flex gap-1">
      {(['pl', 'en', 'ru'] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            locale === l
              ? 'text-beige font-semibold'
              : 'text-white/60 hover:text-white'
          }`}
        >
          {flags[l]} {labels[l]}
        </button>
      ))}
    </div>
  )
}
