import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { HeroHeading } from './HeroHeading'
import { HeroButtons } from './HeroButtons'
import { HeroReviewBadge } from './HeroReviewBadge'
import { HeroStatCards } from './HeroStatCards'
import { HeroTicker } from './HeroTicker'
import { HeroMobileWidget } from './HeroMobileWidget'

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
      <div className="absolute inset-0 flex items-center px-5 sm:px-12 lg:px-16 xl:px-20 pt-[70px] pb-[56px]">
        <div className="w-full max-w-[1400px] mx-auto flex items-center gap-10 xl:gap-14">

          {/* Left column */}
          <div className="flex flex-col flex-1 min-w-0">

            <HeroHeading text={t('title')} />

            <p className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed mt-3 sm:mt-5 sm:max-w-[520px]">
              {t('description')}
            </p>

            <div className="mt-5 sm:mt-7">
              <HeroButtons ctaCall={t('cta_call')} ctaMessage={t('cta_message')} />
            </div>

            {/* Mobile widget — adapted right column */}
            <div className="sm:hidden mt-5">
              <HeroMobileWidget
                projects={ts('projects')}
                experience={ts('experience')}
                satisfaction={ts('satisfaction')}
                morphTitle={t('cards_morph_title')}
                morphSub={t('cards_morph_sub')}
                consultTitle={t('cards_consult_title')}
                consultSub={t('cards_consult_sub')}
              />
            </div>

            {/* Review badge — desktop only */}
            <div className="hidden sm:block mt-4">
              <HeroReviewBadge />
            </div>
          </div>

          {/* Right column — desktop only */}
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
