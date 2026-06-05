'use client'
import { useState } from 'react'
import type { FaqEntry } from '@/lib/faq'

interface Props {
  items: FaqEntry[]
}

export function FAQAccordion({ items }: Props) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-6 border border-white/[0.08] rounded-2xl p-5">
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:w-64 flex-shrink-0">
        {items.map((item, i) => (
          <button
            key={i}
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
            {item.question}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-white/[0.04] border border-beige/20 rounded-2xl p-8 min-h-[180px] flex flex-col justify-center">
        <div className="text-beige text-xs font-bold tracking-widest uppercase mb-3">
          {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </div>
        <p className="text-white font-heading font-semibold text-lg mb-4 leading-snug">
          {items[active]?.question}
        </p>
        <p className="text-white/55 text-sm leading-relaxed">
          {items[active]?.answer}
        </p>
      </div>
    </div>
  )
}
