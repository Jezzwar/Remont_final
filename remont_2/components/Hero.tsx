import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { HeroHeading } from './HeroHeading'
import { HeroButtons } from './HeroButtons'
import { HeroReviewBadge } from './HeroReviewBadge'
import { HeroStatCards } from './HeroStatCards'
import { HeroTicker } from './HeroTicker'

export default async function Hero() {
  const t = await getTranslations('hero')
  const ts = await getTranslations('stats')
  const tp = await getTranslations('process')

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-graphite">
      <Image src="/hero_high.jpg" alt="Hero" fill className="object-cover object-center" priority />
      <div className="absolute inset-0 bg-graphite/55" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-graphite to-transparent" />

      <HeroTicker
        step1={tp('step1.title')}
        step2={tp('step2.title')}
        step3={tp('step3.title')}
        step4={tp('step4.title')}
      />

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col justify-between px-5 sm:px-12 lg:px-16 xl:px-20 pt-[78px] pb-[68px] sm:justify-center sm:pt-0 sm:pb-0">
        <div className="w-full max-w-[1400px] mx-auto flex items-start sm:items-center gap-10 xl:gap-14 h-full sm:h-auto">

          {/* ── Left column ── */}
          <div className="flex flex-col flex-1 min-w-0 h-full sm:h-auto justify-between sm:justify-start sm:gap-0">

            {/* Heading */}
            <div>
              <HeroHeading text={t('title')} />

              {/* Subtitle */}
              <p className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed mt-3 sm:mt-5 sm:max-w-[520px]">
                {t('description')}
              </p>

              {/* Buttons */}
              <div className="mt-5 sm:mt-7">
                <HeroButtons ctaCall={t('cta_call')} ctaMessage={t('cta_message')} />
              </div>

              {/* Review badge — desktop only */}
              <div className="hidden sm:block mt-4">
                <HeroReviewBadge />
              </div>
            </div>

            {/* Mobile stats row — pushes to bottom */}
            <div className="sm:hidden grid grid-cols-3 gap-3 border-t border-white/[0.1] pt-4 mt-auto">
              {[
                { value: '250+', label: ts('projects') },
                { value: '98%',  label: ts('satisfaction') },
                { value: '30',   label: ts('experience') },
              ].map(({ value, label }) => (
                <div key={value} className="text-center">
                  <div className="font-body font-bold text-white text-[1.4rem] leading-none">{value}</div>
                  <p className="text-white/40 text-[10px] leading-tight mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — stats card (desktop only) ── */}
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
