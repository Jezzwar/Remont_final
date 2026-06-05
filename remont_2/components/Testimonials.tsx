'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Star } from 'lucide-react'
import { useRef } from 'react'

const reviewsByLocale: Record<string, { text: string; name: string; area: string }[]> = {
  pl: [
    { text: 'Pełen profesjonalizm od początku do końca. Remont przebiegł sprawnie, a efekt przerósł nasze oczekiwania!', name: 'Anna i Marcin', area: 'Mokotów' },
    { text: 'Świetna komunikacja, wszystko na czas i zgodnie z ustaleniami. Polecam każdemu, kto ceni jakość i spokój.', name: 'Paweł K.', area: 'Wilanów' },
    { text: 'Kompleksowa obsługa i dbałość o detale. Nasze nowe wnętrze jest dokładnie takie, jak sobie wymarzyliśmy.', name: 'Katarzyna S.', area: 'Śródmieście' },
    { text: 'Ekipa przychodziła punktualnie, zostawiała po sobie porządek. Łazienka wyszła absolutnie rewelacyjnie.', name: 'Tomasz W.', area: 'Ursynów' },
    { text: 'Wycena była transparentna, bez żadnych niespodzianek. Właśnie tak powinien wyglądać profesjonalny remont.', name: 'Ewa i Piotr', area: 'Bemowo' },
    { text: 'Polecili mi ich znajomi i nie zawiodłem się. Kuchnia i salon wyglądają jak z czasopisma wnętrzarskiego.', name: 'Michał R.', area: 'Wola' },
    { text: 'Bardzo pomocni przy wyborze materiałów. Dzięki ich radom zaoszczędziłam, a efekt jest lepszy niż planowałam.', name: 'Joanna M.', area: 'Żoliborz' },
  ],
  en: [
    { text: 'Full professionalism from start to finish. The renovation went smoothly and the result exceeded our expectations!', name: 'Anna & Marcin', area: 'Mokotów' },
    { text: 'Great communication, everything on time and as agreed. I recommend to anyone who values quality and peace of mind.', name: 'Paul K.', area: 'Wilanów' },
    { text: 'Comprehensive service and attention to detail. Our new interior is exactly as we dreamed it would be.', name: 'Catherine S.', area: 'Śródmieście' },
    { text: 'The team arrived punctually and left everything tidy. The bathroom turned out absolutely brilliantly.', name: 'Thomas W.', area: 'Ursynów' },
    { text: 'The quote was transparent with no surprises. This is exactly what a professional renovation should look like.', name: 'Eve & Peter', area: 'Bemowo' },
    { text: 'Friends recommended them and I was not disappointed. The kitchen and living room look like they are from a magazine.', name: 'Michael R.', area: 'Wola' },
    { text: 'Very helpful with material selection. Thanks to their advice I saved money and the result is better than I planned.', name: 'Joan M.', area: 'Żoliborz' },
  ],
  ru: [
    { text: 'Полный профессионализм от начала до конца. Ремонт прошёл гладко, а результат превзошёл наши ожидания!', name: 'Анна и Марцин', area: 'Мокотув' },
    { text: 'Отличная коммуникация, всё в срок и согласно договорённостям. Рекомендую всем, кто ценит качество и спокойствие.', name: 'Павел К.', area: 'Виланув' },
    { text: 'Комплексное обслуживание и внимание к деталям. Наш новый интерьер именно такой, каким мы его представляли.', name: 'Катажина С.', area: 'Центр' },
    { text: 'Бригада приходила пунктуально, оставляла после себя порядок. Ванная получилась абсолютно великолепно.', name: 'Томаш В.', area: 'Урсынув' },
    { text: 'Смета была прозрачной, без неожиданностей. Именно так должен выглядеть профессиональный ремонт.', name: 'Ева и Пётр', area: 'Бемово' },
    { text: 'Порекомендовали знакомые — не разочаровался. Кухня и гостиная выглядят как из журнала интерьеров.', name: 'Михал Р.', area: 'Воля' },
    { text: 'Очень помогли с выбором материалов. Благодаря их советам я сэкономила, и результат лучше, чем планировала.', name: 'Жоанна М.', area: 'Жолибож' },
  ],
}

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const locale = useLocale()
  const reviews = reviewsByLocale[locale] ?? reviewsByLocale.pl
  const doubled = [...reviews, ...reviews]
  const trackRef = useRef<HTMLDivElement>(null)

  const pause = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused' }
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running' }

  return (
    <section id="opinie" className="pt-6 pb-16 bg-graphite overflow-hidden px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto mb-10">
        <p className="text-beige text-[10px] uppercase tracking-[0.25em] font-heading mb-3 flex items-center gap-2">
          <span>+</span> {t('title')}
        </p>
        <h2 className="font-heading font-black text-[clamp(1.8rem,4vw,3rem)] text-white uppercase leading-tight tracking-tight">
          {t('title')}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto">
        <div
          className="relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
        >
        <div ref={trackRef} className="flex animate-x-slider gap-6 w-max">
          {doubled.map((r, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[320px] flex flex-col border border-white/[0.08] rounded-2xl bg-white/[0.03] overflow-hidden select-none"
            >
              <div className="px-6 py-5 flex-1">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={11} className="text-beige fill-beige" />
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="border-t border-white/[0.07] px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-beige/15 flex items-center justify-center text-beige font-bold text-xs flex-shrink-0">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-white font-heading font-semibold text-sm">{r.name}</div>
                  <div className="text-white/30 text-xs">{r.area}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
