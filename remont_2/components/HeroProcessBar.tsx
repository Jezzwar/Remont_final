'use client'

import { MessageSquare, Calculator, Hammer, CheckCircle, ArrowRight } from 'lucide-react'

interface Props { step1: string; step2: string; step3: string; step4: string }

const icons = [MessageSquare, Calculator, Hammer, CheckCircle]
const descs = ['Rozmowa i analiza potrzeb', 'Plan i przejrzysta wycena', 'Profesjonalne wykonanie', 'Satysfakcja i spokój na lata']

export function HeroProcessBar({ step1, step2, step3, step4 }: Props) {
  const steps = [step1, step2, step3, step4]

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/[0.07] bg-black/40 backdrop-blur-sm px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto flex items-center gap-6 py-4">
        <p className="text-white/25 text-[9px] uppercase tracking-[0.28em] font-heading flex-shrink-0">
          Nasz proces
        </p>
        <div className="w-px h-4 bg-white/[0.12] flex-shrink-0" />
        <div className="flex items-center gap-3 flex-1 overflow-hidden">
          {steps.map((step, i) => {
            const Icon = icons[i]
            return (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Icon size={13} className="text-beige/40 flex-shrink-0" />
                  <div>
                    <span className="text-white/30 text-[9px] font-heading mr-1.5">0{i + 1}</span>
                    <span className="text-white/65 text-[12px] font-heading font-medium">{step}</span>
                    <p className="text-white/25 text-[10px] leading-none mt-0.5">{descs[i]}</p>
                  </div>
                </div>
                {i < 3 && <ArrowRight size={11} className="text-white/15 flex-shrink-0 ml-1" />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
