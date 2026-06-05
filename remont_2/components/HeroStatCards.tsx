'use client'

import { BarChart2, CalendarDays, Star, Headphones, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface Props {
  projects: string
  experience: string
  satisfaction: string
  area: string
  morphTitle: string
  morphSub: string
  consultTitle: string
  consultSub: string
}

export function HeroStatCards({
  projects, experience, satisfaction,
  morphTitle, morphSub, consultTitle, consultSub,
}: Props) {
  const t = useTranslations('hero')

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function openContact() {
    window.dispatchEvent(new Event('openContactModal'))
  }

  return (
    <div
      className="w-full h-full rounded-2xl border border-white/[0.09] overflow-hidden flex flex-col"
      style={{
        background: 'rgba(15,13,11,0.45)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
      }}
    >

      {/* Stats row */}
      <div className="px-7 pt-6 pb-6 border-b border-white/[0.07]">
        <p className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-heading mb-5">
          {t('stats_trust')}
        </p>
        <div className="grid grid-cols-3 gap-5">
          {[
            { Icon: BarChart2, value: '250+', label: projects, big: true },
            { Icon: CalendarDays, value: '30 lat', label: experience, big: false },
            { Icon: Star, value: '98%', label: satisfaction, big: true },
          ].map(({ Icon, value, label, big }) => (
            <div key={value}>
              <div className="text-white/22 mb-2.5"><Icon size={14} /></div>
              <div className={`font-body font-bold text-white leading-none ${big ? 'text-[1.9rem]' : 'text-[1.45rem]'}`}>
                {value}
              </div>
              <p className="text-white/30 text-[10px] leading-tight mt-2 whitespace-nowrap">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Last project */}
      <button
        onClick={() => scrollToSection('realizacje')}
        className="w-full flex-1 px-7 py-5 border-b border-white/[0.07] text-left group flex flex-col justify-center"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-heading">{t('stats_last_project')}</p>
          <span className="text-white/28 text-[10px] font-heading group-hover:text-beige transition-colors flex items-center gap-1">
            {t('stats_see_more')} <ArrowRight size={10} />
          </span>
        </div>
        <div className="flex gap-4 items-start">
          <div className="relative w-[110px] h-[82px] rounded-xl overflow-hidden flex-shrink-0">
            <Image src="/hero_high.jpg" alt="" fill className="object-cover grayscale brightness-70 group-hover:grayscale-0 transition-all duration-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-heading font-bold text-[13px] leading-snug">{morphTitle}</p>
            <p className="text-white/32 text-[11px] mt-1.5 leading-snug">{morphSub}</p>
            <span className="inline-block mt-3 text-[10px] font-heading text-white/45 border border-white/[0.11] rounded-full px-3 py-[5px] group-hover:border-beige/40 group-hover:text-beige/70 transition-colors">
              {t('stats_see_project')}
            </span>
          </div>
        </div>
      </button>

      {/* Consultation */}
      <button
        onClick={openContact}
        className="w-full flex-1 px-7 py-5 flex items-center gap-4 text-left group"
      >
        <div className="w-11 h-11 rounded-full border border-beige/18 flex items-center justify-center text-beige/55 flex-shrink-0 group-hover:bg-beige/10 transition-colors">
          <Headphones size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-heading font-bold text-[13px]">{consultTitle}</p>
          <p className="text-white/30 text-[11px] mt-0.5 leading-snug">{consultSub}</p>
        </div>
        <span className="text-white/28 text-[11px] font-heading flex items-center gap-1 flex-shrink-0 group-hover:text-beige transition-colors whitespace-nowrap">
          {t('stats_book_call')} <ArrowRight size={10} />
        </span>
      </button>

    </div>
  )
}
