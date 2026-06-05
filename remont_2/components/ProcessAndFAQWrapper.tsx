import { getLocale, getTranslations } from 'next-intl/server'
import { fetchFaqItems } from '@/lib/faq'
import ProcessAndFAQ from './ProcessAndFAQ'

export default async function ProcessAndFAQWrapper() {
  const locale = await getLocale()
  const t = await getTranslations('faq')

  const dbItems = await fetchFaqItems(locale)
  const faqItems = dbItems.length > 0
    ? dbItems
    : [
        ['q1','a1'],['q2','a2'],['q3','a3'],['q4','a4'],
        ['q5','a5'],['q6','a6'],['q7','a7'],
      ].map(([q, a]) => ({ question: t(q as Parameters<typeof t>[0]), answer: t(a as Parameters<typeof t>[0]) }))

  return <ProcessAndFAQ faqItems={faqItems} />
}
