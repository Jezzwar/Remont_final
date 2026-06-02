import { useTranslations } from 'next-intl'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')

  return (
    <footer className="bg-graphite border-t border-white/10 px-6 sm:px-10 lg:px-16 py-12">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div>
            <div className="font-heading font-bold text-white">remont naprawa</div>
            <div className="text-beige text-xs tracking-widest">WARSZAWA</div>
          </div>
          <p className="text-white/50 text-sm leading-relaxed">{t('tagline')}</p>
        </div>

        <div>
          <div className="text-white font-semibold text-sm mb-4">{t('nav_title')}</div>
          <ul className="space-y-2">
            {(['services', 'portfolio', 'about', 'reviews', 'faq', 'contact'] as const).map((key) => (
              <li key={key}>
                <a href={`#${key}`} className="text-white/50 hover:text-white text-sm transition-colors">
                  {tn(key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-white font-semibold text-sm mb-4">{t('contact_title')}</div>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-white/50 text-sm"><Phone size={14} /> +48 XXX XXX XXX</li>
            <li className="flex items-center gap-2 text-white/50 text-sm"><Mail size={14} /> kontakt@remontnaprawa.pl</li>
            <li className="flex items-center gap-2 text-white/50 text-sm"><MapPin size={14} /> Warszawa i okolice</li>
          </ul>
        </div>

        <div>
          <div className="text-white font-semibold text-sm mb-4">{t('area_title')}</div>
          <p className="text-white/50 text-sm leading-relaxed">{t('area_text')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-10 pt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-white/30 text-xs">© 2024 Remont Naprawa Warszawa. {t('rights')}</div>
        <div className="flex gap-4">
          {(['privacy', 'terms', 'cookies'] as const).map((key) => (
            <a key={key} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              {t(key)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
