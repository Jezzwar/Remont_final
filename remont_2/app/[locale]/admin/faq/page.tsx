import { createSupabaseAdmin } from '@/lib/supabase-server'
import AdminNav from '../AdminNav'
import FaqEditor from './FaqEditor'

async function getFaqItems() {
  const supabase = createSupabaseAdmin()
  const { data } = await supabase.from('faq_items').select('*').order('sort_order')
  return data ?? []
}

export default async function FaqPage() {
  const items = await getFaqItems()
  return (
    <div className="min-h-screen bg-graphite text-white">
      <AdminNav active="faq" />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading font-bold text-2xl">FAQ</h1>
        </div>
        <FaqEditor initialItems={items} />
      </div>
    </div>
  )
}
