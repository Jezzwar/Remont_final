'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const pairs = [
  ['q1', 'a1'],
  ['q2', 'a2'],
  ['q3', 'a3'],
  ['q4', 'a4'],
  ['q5', 'a5'],
] as const

export default function FAQ() {
  const t = useTranslations('faq')
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="px-6 sm:px-10 lg:px-16 py-20 bg-white/5">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading font-bold text-3xl text-white mb-10">
          {t('title')}
        </h2>
        <div className="space-y-2">
          {pairs.map(([q, a], i) => (
            <div key={q} className="border border-white/10 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left text-white hover:bg-white/5 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium pr-4">{t(q)}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-beige transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed">
                  {t(a)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
