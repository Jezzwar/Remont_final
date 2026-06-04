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
    <section id="uslugi" className="px-6 sm:px-10 lg:px-16 py-20 bg-graphite">
      <div className="max-w-7xl mx-auto">
        <SectionHeading label="Co oferujemy" title={t('title')} />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border border-white/[0.08] rounded-2xl p-4">
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
