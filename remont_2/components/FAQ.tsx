'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SectionHeading } from '@/components/ui/section-heading'

const pairs = [
  ['q1', 'a1'],
  ['q2', 'a2'],
  ['q3', 'a3'],
  ['q4', 'a4'],
  ['q5', 'a5'],
] as const

export default function FAQ() {
  const t = useTranslations('faq')
  const [active, setActive] = useState(0)

  return (
    <section id="faq" className="px-6 sm:px-10 lg:px-16 py-20 bg-surface">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

        <div className="lg:w-64 flex-shrink-0">
          <SectionHeading label="Masz pytania" title={t('title')} />
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 border border-white/[0.08] rounded-2xl p-5">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:w-64 flex-shrink-0">
            {pairs.map(([q], i) => (
              <button
                key={q}
                onClick={() => setActive(i)}
                className={`text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink border ${
                  active === i
                    ? 'bg-white/[0.08] border-beige/30 text-white font-medium'
                    : 'bg-transparent border-white/[0.06] text-white/45 hover:text-white/75 hover:bg-white/[0.04]'
                }`}
              >
                <span className={`mr-2 text-xs font-bold ${active === i ? 'text-beige' : 'text-white/25'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t(q)}
              </button>
            ))}
          </div>

          <div className="flex-1 bg-white/[0.04] border border-beige/20 rounded-2xl p-8 min-h-[180px] flex flex-col justify-center">
            <div className="text-beige text-xs font-bold tracking-widest uppercase mb-3">
              {String(active + 1).padStart(2, '0')} / {String(pairs.length).padStart(2, '0')}
            </div>
            <p className="text-white font-heading font-semibold text-lg mb-4 leading-snug">
              {t(pairs[active][0])}
            </p>
            <p className="text-white/55 text-sm leading-relaxed">
              {t(pairs[active][1])}
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
