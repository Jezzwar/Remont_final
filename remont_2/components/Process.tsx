import { useTranslations } from 'next-intl'
import { MessageSquare, Calculator, Hammer, CheckCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'

const icons = [MessageSquare, Calculator, Hammer, CheckCircle]
const steps = ['step1', 'step2', 'step3', 'step4'] as const

export default function Process() {
  const t = useTranslations('process')

  return (
    <section id="o-nas" className="px-6 sm:px-10 lg:px-16 py-20 bg-surface">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

        <div className="lg:w-64 flex-shrink-0">
          <SectionHeading label="Jak pracujemy" title={t('title')} />
        </div>

        <div className="flex-1 relative grid sm:grid-cols-4 gap-6 border border-white/[0.08] rounded-2xl p-6">
          <div className="hidden sm:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-beige/20 to-transparent" />
          {steps.map((step, i) => {
            const Icon = icons[i]
            return (
              <div key={step} className="flex flex-col items-center text-center gap-4 relative">
                <div className="relative w-14 h-14 rounded-full bg-graphite border border-beige/30 flex items-center justify-center shadow-[0_0_24px_rgba(216,195,165,0.08)] hover:shadow-[0_0_32px_rgba(216,195,165,0.18)] transition-shadow duration-300">
                  <Icon size={22} className="text-beige" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-beige text-graphite text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <div className="text-white font-heading font-semibold text-sm mb-1">{t(`${step}.title`)}</div>
                  <div className="text-white/45 text-xs leading-relaxed">{t(`${step}.desc`)}</div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
