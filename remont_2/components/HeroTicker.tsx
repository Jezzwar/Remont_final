'use client'

import { MessageSquare, Calculator, Hammer, CheckCircle, type LucideIcon } from 'lucide-react'

interface TickerItem { label: string; Icon: LucideIcon }
interface Props { step1: string; step2: string; step3: string; step4: string }

function Sep() {
  return (
    <span className="flex-shrink-0 flex items-center gap-1 opacity-25">
      <span className="w-1 h-1 rounded-full bg-beige" />
      <span className="w-1 h-1 rounded-full bg-beige" />
      <span className="w-1 h-1 rounded-full bg-beige" />
    </span>
  )
}

export function HeroTicker({ step1, step2, step3, step4 }: Props) {
  const items: TickerItem[] = [
    { label: step1, Icon: MessageSquare },
    { label: step2, Icon: Calculator },
    { label: step3, Icon: Hammer },
    { label: step4, Icon: CheckCircle },
  ]

  // 4 copies → animate to -25% (one full copy) = seamless
  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-t border-white/[0.07] bg-black/35 backdrop-blur-sm">
      <div
        className="flex w-max items-center"
        style={{ animation: 'ticker 28s linear infinite' }}
      >
        {repeated.map((item, i) => {
          const Icon = item.Icon
          return (
            <div key={i} className="flex items-center gap-6 pl-10 pr-4 py-6">
              <span className="flex items-center gap-3 text-[14px] font-heading text-white/50 whitespace-nowrap tracking-wide">
                <Icon size={16} className="text-beige/45 flex-shrink-0" />
                {item.label}
              </span>
              <Sep />
            </div>
          )
        })}
      </div>
    </div>
  )
}
