import { useTranslations } from 'next-intl'
import { Paintbrush, Layers, LayoutPanelTop, DoorOpen, Bath, ChefHat, Zap, Key } from 'lucide-react'

const icons = [Paintbrush, Layers, LayoutPanelTop, DoorOpen, Bath, ChefHat, Zap, Key]
const keys = ['walls', 'floors', 'ceilings', 'finishing', 'bathrooms', 'kitchens', 'installations', 'turnkey'] as const

export default function Services() {
  const t = useTranslations('services')

  return (
    <section id="uslugi" className="px-6 sm:px-10 lg:px-16 py-20 bg-graphite">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold text-3xl text-white mb-12 text-center">
          {t('title')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {keys.map((key, i) => {
            const Icon = icons[i]
            return (
              <div
                key={key}
                className="bg-white/5 rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:bg-white/10 transition-colors"
              >
                <Icon size={28} className="text-beige" />
                <div>
                  <div className="text-white font-heading font-semibold text-sm">{t(`${key}.name`)}</div>
                  <div className="text-white/50 text-xs mt-1">{t(`${key}.desc`)}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
