import { createSupabaseAdmin } from './supabase-server'

export interface FaqItemRow {
  id: string
  sort_order: number
  is_active: boolean
  question_pl: string
  answer_pl: string
  question_en: string
  answer_en: string
  question_ru: string
  answer_ru: string
}

export interface FaqEntry {
  question: string
  answer: string
}

export async function fetchFaqItems(locale: string): Promise<FaqEntry[]> {
  try {
    const supabase = createSupabaseAdmin()
    const { data } = await supabase
      .from('faq_items')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (!data || data.length === 0) return []

    const lang = ['pl', 'en', 'ru'].includes(locale) ? locale : 'pl'
    return data.map((row: FaqItemRow) => ({
      question: row[`question_${lang}` as keyof FaqItemRow] as string || row.question_pl,
      answer: row[`answer_${lang}` as keyof FaqItemRow] as string || row.answer_pl,
    }))
  } catch {
    return []
  }
}
