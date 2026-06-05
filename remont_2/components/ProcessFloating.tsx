'use client'

import { MessageSquare, Calculator, Hammer, CheckCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

const icons = [MessageSquare, Calculator, Hammer, CheckCircle]

export function ProcessFloating() {
  const t = useTranslations('process')

  const steps = [
    { num: '01', title: t('step1.title'), desc: t('step1.desc') },
    { num: '02', title: t('step2.title'), desc: t('step2.desc') },
    { num: '03', title: t('step3.title'), desc: t('step3.desc') },
    { num: '04', title: t('step4.title'), desc: t('step4.desc') },
  ]

  return (
    <div className="flex justify-center pointer-events-none">
      <div
        className="pointer-events-auto relative w-[260px] rounded-2xl border border-white/[0.1] px-6 py-6"
        style={{
          background: 'rgba(10,10,10,0.72)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.55)',
        }}
      >
        <p className="text-white/30 text-[9px] uppercase tracking-[0.3em] font-heading mb-5">
          {t('title')}
        </p>

        <div className="relative flex flex-col gap-0">
          {/* vertical line */}
          <div className="absolute left-[17px] top-[36px] bottom-[36px] w-px bg-white/[0.08]" />

          {steps.map(({ num, title, desc }, i) => {
            const Icon = icons[i]
            return (
              <div key={num} className="flex gap-4 pb-5 last:pb-0">
                <div className="relative flex-shrink-0 w-9 h-9 rounded-xl border border-white/[0.12] bg-white/[0.05] flex items-center justify-center text-beige/60 z-10">
                  <Icon size={15} />
                </div>
                <div className="pt-1.5">
                  <p className="text-white/30 text-[9px] font-heading tracking-widest mb-0.5">{num}</p>
                  <p className="text-white font-heading font-semibold text-[13px] leading-tight">{title}</p>
                  <p className="text-white/38 text-[11px] leading-snug mt-0.5">{desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
