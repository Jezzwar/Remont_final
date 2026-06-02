'use client'
import { Download } from 'lucide-react'

interface Lead {
  id: string
  name: string
  phone: string
  email: string | null
  message: string | null
  created_at: string
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  function exportCSV() {
    const headers = ['Imię', 'Telefon', 'Email', 'Wiadomość', 'Data']
    const rows = leads.map((l) => [
      l.name,
      l.phone,
      l.email ?? '',
      l.message ?? '',
      new Date(l.created_at).toLocaleString('pl-PL'),
    ])
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `zapytania-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-beige/20 hover:bg-beige/30 text-beige text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Download size={14} /> Eksportuj CSV
        </button>
      </div>
      {leads.length === 0 ? (
        <div className="text-white/40 text-center py-12">Brak zapytań</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/50 text-left border-b border-white/10">
                <th className="pb-3 pr-4">Imię</th>
                <th className="pb-3 pr-4">Telefon</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Wiadomość</th>
                <th className="pb-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-white/5">
                  <td className="py-3 pr-4 text-white">{l.name}</td>
                  <td className="py-3 pr-4 text-white/80">{l.phone}</td>
                  <td className="py-3 pr-4 text-white/60">{l.email ?? '—'}</td>
                  <td className="py-3 pr-4 text-white/60 max-w-xs truncate">{l.message ?? '—'}</td>
                  <td className="py-3 text-white/40 whitespace-nowrap">
                    {new Date(l.created_at).toLocaleString('pl-PL')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
