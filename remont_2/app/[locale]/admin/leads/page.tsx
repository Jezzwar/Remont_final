import { createSupabaseAdmin } from '@/lib/supabase-server'
import AdminNav from '../AdminNav'
import LeadsTable from './LeadsTable'

async function getLeads() {
  const supabase = createSupabaseAdmin()
  const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
  return data ?? []
}

export default async function LeadsPage() {
  const leads = await getLeads()
  return (
    <div className="min-h-screen bg-graphite text-white">
      <AdminNav active="leads" />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-heading font-bold text-2xl mb-8">Zapytania ({leads.length})</h1>
        <LeadsTable leads={leads} />
      </div>
    </div>
  )
}
