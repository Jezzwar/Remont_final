'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { HelpCircle, Plus, Minus, ArrowRight } from 'lucide-react'

const pairs = [['q1', 'a1'], ['q2', 'a2'], ['q3', 'a3'], ['q4', 'a4'], ['q5', 'a5'], ['q6', 'a6'], ['q7', 'a7']] as const

export default function ProcessAndFAQ() {
  const tp = useTranslations('process')
  const tf = useTranslations('faq')
  const [active, setActive] = useState(0)

  return (
    <section id="o-nas" className="px-6 sm:px-10 lg:px-16 py-16 bg-surface">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-10">
          <div className="flex-1">
            <p className="text-beige text-[10px] uppercase tracking-[0.25em] font-heading mb-4 flex items-center gap-2">
              <span>+</span> {tp('title')}
            </p>
            <h2 className="font-heading font-black text-[clamp(2rem,5vw,3.5rem)] text-white uppercase leading-[0.95] tracking-tight whitespace-pre-line">
              {tp('headline')}
            </h2>
          </div>
          <p className="lg:max-w-xs text-white/40 text-sm leading-relaxed lg:mb-1">
            {tp('subtitle')}
          </p>
        </div>

        {/* FAQ — full width */}
        <div id="faq" className="border border-white/[0.08] rounded-2xl p-7">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle size={13} className="text-beige" />
            <span className="text-beige text-[10px] uppercase tracking-[0.2em] font-heading">{tp('faq_label')}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
            {pairs.map(([q, a], i) => (
              <div key={q} className="border-b border-white/[0.06] last:border-0">
                <button
                  onClick={() => setActive(active === i ? -1 : i)}
                  className="w-full flex items-center gap-4 py-4 text-left group"
                >
                  <span className="text-beige/40 text-[10px] font-bold font-heading tabular-nums flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`flex-1 text-sm font-heading font-medium transition-colors ${active === i ? 'text-white' : 'text-white/55 group-hover:text-white/80'}`}>
                    {tf(q)}
                  </span>
                  <span className="flex-shrink-0 text-beige/50">
                    {active === i ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                {active === i && (
                  <p className="text-white/45 text-sm leading-relaxed pb-4 pl-8">
                    {tf(a)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => window.dispatchEvent(new Event('openContactModal'))}
            className="flex items-center gap-3 bg-beige text-graphite font-heading font-bold text-sm uppercase tracking-[0.15em] px-8 py-4 rounded-full hover:bg-beige-light transition-colors duration-200 shadow-[0_4px_24px_rgba(216,195,165,0.2)]"
          >
            {tp('cta')} <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  )
}
