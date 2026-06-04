import { getTranslations } from 'next-intl/server'
import { Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import { HeroFloatingIcons } from './HeroServices'

export default async function Hero() {
  const t = await getTranslations('hero')
  const ts = await getTranslations('stats')

  const stats = [
    {
      value: '10+',
      label: ts('experience'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-beige">
          <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      ),
    },
    {
      value: '250+',
      label: ts('projects'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-beige">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      ),
    },
    {
      value: '100%',
      label: ts('satisfaction'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-beige">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
    },
    {
      value: ts('area'),
      label: '',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-beige">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
      ),
    },
  ]

  return (
    <section className="relative w-full h-screen overflow-hidden bg-graphite">
      <Image src="/hero_high.png" alt="Hero" fill className="object-cover object-center" priority />
      <div className="absolute inset-0 bg-graphite/55" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-graphite to-transparent" />

      <HeroFloatingIcons />

      {/* Content — centered horizontally */}
      <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-10 lg:px-16">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-10">

          {/* Left */}
          <div className="flex flex-col justify-between flex-1 min-w-0 gap-8">
            <h1 className="font-heading font-black text-[clamp(4.5rem,9vw,10rem)] text-white uppercase leading-[0.85] tracking-[-0.02em]">
              {t('title')}
            </h1>
            <div className="flex flex-col gap-5">
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                {t('description')}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+48000000000" className="btn-shimmer flex items-center gap-2 bg-beige text-graphite font-semibold px-6 py-3 rounded-full hover:bg-beige-light transition-colors duration-200 text-sm">
                  <Phone size={14} /> {t('cta_call')}
                </a>
                <a href="#kontakt" className="flex items-center gap-2 border border-white/25 text-white/70 px-6 py-3 rounded-full hover:border-beige/40 hover:text-white transition-all duration-200 text-sm">
                  <Mail size={14} /> {t('cta_message')}
                </a>
              </div>
            </div>
          </div>

          {/* Right — stat cards */}
          <div className="hidden lg:flex flex-col gap-4 flex-shrink-0 w-[420px]">
            <div className="w-full bg-beige/[0.12] backdrop-blur-md border border-beige/20 rounded-2xl px-7 py-7">
              <p className="text-beige/60 text-[11px] uppercase tracking-[0.2em] font-heading mb-3">Projekty</p>
              <div className="font-heading font-black text-[5.5rem] text-white leading-none">{stats[1].value}</div>
              <div className="flex items-end justify-between mt-3">
                <p className="text-white/70 font-heading font-semibold text-sm">{stats[1].label}</p>
                <p className="text-beige text-[11px] font-heading">Warszawa</p>
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="bg-black/40 backdrop-blur-md border border-white/[0.1] rounded-2xl px-6 py-6">
                <p className="text-white/40 text-[11px] uppercase tracking-[0.15em] font-heading mb-2">Lata</p>
                <div className="font-heading font-black text-[3.5rem] text-white leading-none">{stats[0].value}</div>
                <p className="text-white/40 text-[11px] font-body mt-2 leading-tight">{stats[0].label}</p>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/[0.1] rounded-2xl px-6 py-6">
                <p className="text-white/40 text-[11px] uppercase tracking-[0.15em] font-heading mb-2">Jakość</p>
                <div className="font-heading font-black text-[3.5rem] text-white leading-none">{stats[2].value}</div>
                <p className="text-white/40 text-[11px] font-body mt-2 leading-tight">{stats[2].label}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
