import { useTranslations } from 'next-intl'
import { Phone, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'
import { SocialTooltip, SocialItem } from '@/components/ui/social-media'

const socialLinks: SocialItem[] = [
  {
    href: 'https://instagram.com/',
    ariaLabel: 'Instagram',
    tooltip: 'Instagram',
    color: '#E1306C',
    svgUrl: 'https://svgl.app/library/instagram.svg',
  },
  {
    href: 'https://t.me/',
    ariaLabel: 'Telegram',
    tooltip: 'Telegram',
    color: '#229ED9',
    svgUrl: 'https://svgl.app/library/telegram.svg',
  },
  {
    href: 'https://maps.google.com/',
    ariaLabel: 'Google Maps',
    tooltip: 'Google Maps',
    color: '#4285F4',
    svgUrl: 'https://svgl.app/library/google_maps.svg',
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
              <a href="tel:+48000000000" className="flex items-center gap-2.5 text-white/40 hover:text-beige text-sm transition-colors duration-200">
                <Phone size={13} /> +48 XXX XXX XXX
              </a>
            </li>
            <li>
              <a href="mailto:kontakt@remontnaprawa.pl" className="flex items-center gap-2.5 text-white/40 hover:text-beige text-sm transition-colors duration-200">
                <Mail size={13} /> kontakt@remontnaprawa.pl
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
        <div className="text-white/20 text-xs">© 2024 Remont Naprawa Warszawa. {t('rights')}</div>
        <div className="flex gap-5">
          {(['privacy', 'terms', 'cookies'] as const).map((key) => (
            <a key={key} href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors duration-200">
              {t(key)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
