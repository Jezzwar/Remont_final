'use client'
import { useTranslations, useLocale } from 'next-intl'
import { Phone } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { useState } from 'react'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#uslugi', label: t('services') },
    { href: '#realizacje', label: t('portfolio') },
    { href: '#o-nas', label: t('about') },
    { href: '#opinie', label: t('reviews') },
    { href: '#faq', label: t('faq') },
    { href: '#kontakt', label: t('contact') },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-graphite/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href={`/${locale}`} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-beige rounded flex items-center justify-center text-graphite font-bold text-sm">R</div>
          <div>
            <div className="text-white font-heading font-bold text-sm leading-none">remont naprawa</div>
            <div className="text-beige text-xs tracking-widest">WARSZAWA</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="tel:+48000000000"
            className="hidden sm:flex items-center gap-2 bg-beige text-graphite text-sm font-semibold px-4 py-2 rounded-full hover:bg-beige-light transition-colors"
          >
            <Phone size={14} />
            {t('call')}
          </a>
          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <div className="space-y-1">
              <span className="block w-5 h-0.5 bg-white" />
              <span className="block w-5 h-0.5 bg-white" />
              <span className="block w-5 h-0.5 bg-white" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-graphite border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-white/80 hover:text-white" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="tel:+48000000000" className="flex items-center gap-2 text-beige font-semibold">
            <Phone size={14} /> +48 XXX XXX XXX
          </a>
        </div>
      )}
    </nav>
  )
}
