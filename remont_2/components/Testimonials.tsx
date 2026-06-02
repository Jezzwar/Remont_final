import { useTranslations } from 'next-intl'
import { Quote } from 'lucide-react'

const reviews = [
  { text: 'Pełen profesjonalizm od początku do końca. Remont przebiegł sprawnie, a efekt przerósł nasze oczekiwania!', name: 'Anna i Marcin', area: 'Mokotów' },
  { text: 'Świetna komunikacja, wszystko na czas i zgodnie z ustaleniami. Polecam każdemu, kto ceni jakość i spokój.', name: 'Paweł K.', area: 'Wilanów' },
  { text: 'Kompleksowa obsługa i dbałość o detale. Nasze nowe wnętrze jest dokładnie takie, jak sobie wymarzyliśmy.', name: 'Katarzyna S.', area: 'Śródmieście' },
]

export default function Testimonials() {
  const t = useTranslations('testimonials')

  return (
    <section id="opinie" className="px-6 sm:px-10 lg:px-16 py-20 bg-graphite">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold text-3xl text-white mb-10">
          {t('title')}
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white/5 rounded-xl p-6 space-y-4">
              <Quote size={20} className="text-beige" />
              <p className="text-white/70 text-sm leading-relaxed">{r.text}</p>
              <div>
                <div className="text-white font-semibold text-sm">{r.name}</div>
                <div className="text-white/40 text-xs">{r.area}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
