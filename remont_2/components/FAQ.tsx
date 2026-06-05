import { getTranslations, getLocale } from 'next-intl/server'
import { fetchFaqItems } from '@/lib/faq'
import { SectionHeading } from '@/components/ui/section-heading'
import { FAQAccordion } from './FAQAccordion'

async function getFallbackItems(t: Awaited<ReturnType<typeof getTranslations>>) {
  const pairs = [['q1','a1'],['q2','a2'],['q3','a3'],['q4','a4'],['q5','a5'],['q6','a6'],['q7','a7']] as const
  return pairs.map(([q, a]) => ({ question: t(q), answer: t(a) }))
}

export default async function FAQ() {
  const t = await getTranslations('faq')
  const locale = await getLocale()

  const dbItems = await fetchFaqItems(locale)
  const items = dbItems.length > 0 ? dbItems : await getFallbackItems(t)

  return (
    <section id="faq" className="px-6 sm:px-10 lg:px-16 py-10 sm:py-20 bg-surface">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        <div className="lg:w-64 flex-shrink-0">
          <SectionHeading label={t('label')} title={t('title')} />
        </div>
        <FAQAccordion items={items} />
      </div>
    </section>
  )
}
