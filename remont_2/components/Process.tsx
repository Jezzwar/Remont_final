import { useTranslations } from 'next-intl'
import { MessageSquare, Calculator, Hammer, CheckCircle } from 'lucide-react'

const icons = [MessageSquare, Calculator, Hammer, CheckCircle]
const steps = ['step1', 'step2', 'step3', 'step4'] as const

export default function Process() {
  const t = useTranslations('process')

  return (
    <section id="o-nas" className="px-6 sm:px-10 lg:px-16 py-20 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold text-3xl text-white mb-12 text-center">
          {t('title')}
        </h2>
        <div className="grid sm:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = icons[i]
            return (
              <div key={step} className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-beige/40 flex items-center justify-center">
                  <Icon size={24} className="text-beige" />
                </div>
                <div>
                  <div className="text-beige font-heading font-semibold mb-1">
                    {i + 1}. {t(`${step}.title`)}
                  </div>
                  <div className="text-white/60 text-sm leading-relaxed">{t(`${step}.desc`)}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
