import { useTranslations } from 'next-intl'
import { Quote, Star } from 'lucide-react'

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
        <h2 className="font-heading font-bold text-3xl text-white mb-12 text-center">
          {t('title')}
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="card-glow relative bg-white/[0.04] rounded-2xl p-6 space-y-4 border border-white/[0.06] hover:border-beige/20 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="w-10 h-10 rounded-xl bg-beige/10 flex items-center justify-center ring-1 ring-beige/15">
                <Quote size={18} className="text-beige" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="text-beige fill-beige" />
                ))}
              </div>

              <p className="text-white/65 text-sm leading-relaxed">{r.text}</p>

              <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-beige/15 flex items-center justify-center text-beige font-bold text-xs">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{r.name}</div>
                  <div className="text-white/35 text-xs">{r.area}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
