'use client'
import { useTranslations } from 'next-intl'
import { Paintbrush, Layers, LayoutPanelTop, DoorOpen, Bath, ChefHat, Zap, Key } from 'lucide-react'
import { InteractiveProductCard } from './ui/card-7'
import { SectionHeading } from './ui/section-heading'

const services = [
  { key: 'walls',          Icon: Paintbrush,    image: '/services/walls.jpg' },
  { key: 'floors',         Icon: Layers,         image: '/services/floor.jpg' },
  { key: 'ceilings',       Icon: LayoutPanelTop, image: '/services/ceiling.jpg' },
  { key: 'finishing',      Icon: DoorOpen,       image: '/services/fin_details.jpg' },
  { key: 'bathrooms',      Icon: Bath,           image: '/services/bathroom.jpg' },
  { key: 'kitchens',       Icon: ChefHat,        image: '/services/kitchen.jpg' },
  { key: 'installations',  Icon: Zap,            image: '/services/hydraulik.jpg' },
  { key: 'turnkey',        Icon: Key,            image: '/services/a_z.jpg' },
] as const

export default function Services() {
  const t = useTranslations('services')

  return (
    <section id="uslugi" className="px-6 sm:px-10 lg:px-16 py-8 sm:py-16 bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeading label="Co oferujemy" title={t('title')} />

        {/* Mobile: horizontal swipe */}
        <div className="sm:hidden -mx-6 px-6 overflow-x-auto flex gap-3 pb-4 snap-x snap-mandatory scrollbar-none">
          {services.map(({ key, Icon, image }) => (
            <div
              key={key}
              className="snap-start flex-shrink-0 w-[72vw] max-w-[280px]"
            >
              <InteractiveProductCard
                imageUrl={image}
                icon={<Icon size={18} />}
                title={t(`${key}.name`)}
                description={t(`${key}.desc`)}
              />
            </div>
          ))}
        </div>

        {/* Scroll dots indicator for mobile */}
        <div className="sm:hidden flex justify-center gap-1.5 mt-3">
          {services.map((_, i) => (
            <span key={i} className={`block rounded-full bg-white/20 ${i === 0 ? 'w-4 h-1' : 'w-1 h-1'}`} />
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 border border-white/[0.08] rounded-2xl p-4">
          {services.map(({ key, Icon, image }) => (
            <InteractiveProductCard
              key={key}
              imageUrl={image}
              icon={<Icon size={18} />}
              title={t(`${key}.name`)}
              description={t(`${key}.desc`)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
