import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { CalendarCheck, FileCheck, Users } from 'lucide-react'
import { HeroHeading } from './HeroHeading'
import { HeroButtons } from './HeroButtons'
import { HeroReviewBadge } from './HeroReviewBadge'
import { HeroStatCards } from './HeroStatCards'
import { HeroTicker } from './HeroTicker'

export default async function Hero() {
  const t = await getTranslations('hero')
  const ts = await getTranslations('stats')
  const tp = await getTranslations('process')

  const features = [
    { titleKey: 'feat1_title' as const, descKey: 'feat1_desc' as const, Icon: CalendarCheck },
    { titleKey: 'feat2_title' as const, descKey: 'feat2_desc' as const, Icon: FileCheck },
    { titleKey: 'feat3_title' as const, descKey: 'feat3_desc' as const, Icon: Users },
  ]

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-graphite">
      <Image src="/hero_high.png" alt="Hero" fill className="object-cover object-center" priority />
      <div className="absolute inset-0 bg-graphite/60" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-graphite to-transparent" />

      <HeroTicker
        step1={tp('step1.title')}
        step2={tp('step2.title')}
        step3={tp('step3.title')}
        step4={tp('step4.title')}
      />

      {/* Main content */}
      <div className="absolute inset-0 flex items-center px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="w-full max-w-[1400px] mx-auto flex items-center gap-10 xl:gap-14">

          {/* ── Left column ── */}
          <div className="flex flex-col flex-1 min-w-0 gap-0">

            {/* Heading — fills full column width */}
            <HeroHeading text={t('title')} />

            {/* Subtitle */}
            <p className="text-white/55 text-[15px] leading-relaxed mt-5 max-w-[520px]">
              {t('description')}
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-5">
              {features.map(({ titleKey, descKey, Icon }) => (
                <div key={titleKey} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-black/35 border border-white/[0.09] flex items-center justify-center text-beige/55 flex-shrink-0">
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-white/80 font-heading font-semibold text-[13px] leading-none">{t(titleKey)}</p>
                    <p className="text-white/35 text-[11px] leading-snug mt-0.5">{t(descKey)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-7">
              <HeroButtons ctaCall={t('cta_call')} ctaMessage={t('cta_message')} />
            </div>

            {/* Review badge */}
            <div className="mt-4">
              <HeroReviewBadge />
            </div>
          </div>

          {/* ── Right column — stats card ── */}
          <div className="hidden lg:flex flex-shrink-0 w-[440px] xl:w-[460px] self-stretch py-10">
            <HeroStatCards
              projects={ts('projects')}
              experience={ts('experience')}
              satisfaction={ts('satisfaction')}
              area={ts('area')}
              morphTitle={t('cards_morph_title')}
              morphSub={t('cards_morph_sub')}
              consultTitle={t('cards_consult_title')}
              consultSub={t('cards_consult_sub')}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
