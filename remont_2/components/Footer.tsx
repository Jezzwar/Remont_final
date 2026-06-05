import { useTranslations } from 'next-intl'
import { Phone, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'
import { SocialTooltip, SocialItem } from '@/components/ui/social-media'

const socialLinks: SocialItem[] = [
  {
    href: 'https://www.instagram.com/remonty_warszawa_nester?igsh=aGYwdXc2MWJxYnk1',
    ariaLabel: 'Instagram',
    tooltip: 'Instagram',
    color: '#E1306C',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.tiktok.com/@dmytro.nester2',
    ariaLabel: 'TikTok',
    tooltip: 'TikTok',
    color: '#010101',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
  {
    href: 'https://maps.app.goo.gl/ZsmQbDcaUz4vB7bV8',
    ariaLabel: 'Google Maps',
    tooltip: 'Google Maps',
    color: '#4285F4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C7.802 0 4 3.403 4 7.602 4 11.8 7.469 16.812 12 24c4.531-7.188 8-12.2 8-16.398C20 3.403 16.199 0 12 0zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')

  const navLinks = [
    { href: '#uslugi', key: 'services' },
    { href: '#realizacje', key: 'portfolio' },
    { href: '#o-nas', key: 'about' },
    { href: '#opinie', key: 'reviews' },
    { href: '#faq', key: 'faq' },
    { href: '#kontakt', key: 'contact' },
  ] as const

  return (
    <footer className="bg-graphite border-t border-white/[0.07] px-6 sm:px-10 lg:px-16 pt-14 pb-8">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        {/* Brand */}
        <div className="space-y-5">
          <div className="flex items-center">
            <div className="relative h-14 w-14 flex-shrink-0">
              <Image src="/logo.png" alt="Remont Naprawa" fill className="object-contain" />
            </div>
          </div>
          <p className="text-white/40 text-sm leading-relaxed">{t('tagline')}</p>
          <SocialTooltip items={socialLinks} className="justify-start" />
        </div>

        {/* Nav links */}
        <div>
          <div className="text-white/70 font-heading font-semibold text-xs uppercase tracking-widest mb-5">{t('nav_title')}</div>
          <ul className="space-y-2.5">
            {navLinks.map(({ href, key }) => (
              <li key={key}>
                <a href={href} className="text-white/40 hover:text-beige text-sm transition-colors duration-200">
                  {tn(key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-white/70 font-heading font-semibold text-xs uppercase tracking-widest mb-5">{t('contact_title')}</div>
          <ul className="space-y-3">
            <li>
              <a href="tel:+48729460423" className="flex items-center gap-2.5 text-white/40 hover:text-beige text-sm transition-colors duration-200">
                <Phone size={13} /> +48 729 460 423
              </a>
            </li>
            <li>
              <a href="mailto:dima.nester@gmail.com" className="flex items-center gap-2.5 text-white/40 hover:text-beige text-sm transition-colors duration-200">
                <Mail size={13} /> dima.nester@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-white/40 text-sm">
              <MapPin size={13} className="text-beige/50" /> Warszawa i okolice
            </li>
          </ul>
        </div>

        {/* Area */}
        <div>
          <div className="text-white/70 font-heading font-semibold text-xs uppercase tracking-widest mb-5">{t('area_title')}</div>
          <p className="text-white/40 text-sm leading-relaxed">{t('area_text')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/[0.07] pt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-white/20 text-xs">© 2026 CRT Agency. All rights reserved. Operated by Cortallis Sp. z o.o.</div>
        <div className="flex gap-5">
          {([['legal', '/legal'], ['privacy', '/privacy'], ['terms', '/terms']] as const).map(([key, href]) => (
            <a key={key} href={href} className="text-white/20 hover:text-white/50 text-xs transition-colors duration-200">
              {t(key)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
