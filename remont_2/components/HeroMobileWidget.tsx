'use client'

import { BarChart2, CalendarDays, Star, Headphones, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface Props {
  projects: string
  experience: string
  satisfaction: string
  morphTitle: string
  morphSub?: string
  consultTitle: string
  consultSub: string
}

export function HeroMobileWidget({
  projects, experience, satisfaction,
  morphTitle, consultTitle, consultSub,
}: Props) {
  const t = useTranslations('hero')

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function openContact() {
    window.dispatchEvent(new Event('openContactModal'))
  }

  return (
    <div className="flex flex-col gap-2.5 w-full">

      {/* Stats row */}
      <div
        className="w-full rounded-2xl border border-white/[0.09] px-4 py-4"
        style={{ background: 'rgba(15,13,11,0.50)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
      >
        <p className="text-white/20 text-[8px] uppercase tracking-[0.3em] font-heading mb-3">
          {t('stats_trust')}
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { Icon: BarChart2, value: '250+', label: projects },
            { Icon: CalendarDays, value: '30 lat', label: experience },
            { Icon: Star, value: '98%', label: satisfaction },
          ].map(({ Icon, value, label }) => (
            <div key={value} className="flex flex-col">
              <div className="text-white/22 mb-1.5"><Icon size={12} /></div>
              <div className="font-body font-bold text-white text-[1.4rem] leading-none">{value}</div>
              <p className="text-white/30 text-[9px] leading-tight mt-1.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Last project + consult — side by side */}
      <div className="flex gap-2.5">

        {/* Last project thumbnail */}
        <button
          onClick={() => scrollToSection('realizacje')}
          className="group relative flex-1 rounded-2xl overflow-hidden border border-white/[0.09] min-h-[80px]"
          style={{ background: 'rgba(15,13,11,0.50)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
        >
          <Image src="/hero_high.jpg" alt="" fill className="object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-500" />
          <div className="absolute inset-0 bg-graphite/40" />
          <div className="relative z-10 p-3 flex flex-col justify-between h-full">
            <p className="text-white/40 text-[8px] uppercase tracking-[0.25em] font-heading">{t('stats_last_project')}</p>
            <div>
              <p className="text-white font-heading font-bold text-[11px] leading-snug line-clamp-2">{morphTitle}</p>
              <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-heading text-white/45 group-hover:text-beige/70 transition-colors">
                {t('stats_see_more')} <ArrowRight size={8} />
              </span>
            </div>
          </div>
        </button>

        {/* Consult CTA */}
        <button
          onClick={openContact}
          className="group flex-1 rounded-2xl border border-beige/[0.15] flex flex-col items-center justify-center gap-2 px-3 py-4 hover:bg-beige/5 transition-colors"
          style={{ background: 'rgba(15,13,11,0.50)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
        >
          <div className="w-9 h-9 rounded-full border border-beige/20 flex items-center justify-center text-beige/55 group-hover:bg-beige/10 transition-colors">
            <Headphones size={15} />
          </div>
          <div className="text-center">
            <p className="text-white font-heading font-bold text-[11px] leading-snug">{consultTitle}</p>
            <p className="text-white/30 text-[9px] mt-0.5 leading-snug">{consultSub}</p>
          </div>
        </button>

      </div>
    </div>
  )
}
