'use client'
import { useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronUp, Save, Check, X, GripVertical } from 'lucide-react'

type Lang = 'pl' | 'en' | 'ru'

interface FaqItem {
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

interface Props {
  initialItems: FaqItem[]
}

const LANG_LABELS: Record<Lang, string> = { pl: 'PL', en: 'EN', ru: 'RU' }

const emptyItem = (): Omit<FaqItem, 'id'> => ({
  sort_order: 99,
  is_active: true,
  question_pl: '', answer_pl: '',
  question_en: '', answer_en: '',
  question_ru: '', answer_ru: '',
})

export default function FaqEditor({ initialItems }: Props) {
  const [items, setItems] = useState<FaqItem[]>(initialItems)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [activeLang, setActiveLang] = useState<Record<string, Lang>>({})
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [newItem, setNewItem] = useState(emptyItem())
  const [newLang, setNewLang] = useState<Lang>('pl')
  const [adding, setAdding] = useState(false)

  function getLang(id: string): Lang {
    return activeLang[id] ?? 'pl'
  }

  function updateField(id: string, field: keyof FaqItem, value: string | boolean | number) {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  async function saveItem(item: FaqItem) {
    setSaving(p => ({ ...p, [item.id]: true }))
    setErrors(p => ({ ...p, [item.id]: '' }))
    const res = await fetch(`/api/admin/faq/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
    setSaving(p => ({ ...p, [item.id]: false }))
    if (res.ok) {
      setSaved(p => ({ ...p, [item.id]: true }))
      setTimeout(() => setSaved(p => ({ ...p, [item.id]: false })), 2000)
    } else {
      const { error } = await res.json()
      setErrors(p => ({ ...p, [item.id]: error || 'Błąd zapisu' }))
    }
  }

  async function deleteItem(id: string) {
    if (!confirm('Usunąć ten wpis FAQ?')) return
    const res = await fetch(`/api/admin/faq/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setItems(prev => prev.filter(i => i.id !== id))
      if (expanded === id) setExpanded(null)
    }
  }

  async function addItem() {
    setAdding(true)
    const res = await fetch('/api/admin/faq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newItem, sort_order: items.length + 1 }),
    })
    setAdding(false)
    if (res.ok) {
      const created = await res.json()
      setItems(prev => [...prev, created])
      setNewItem(emptyItem())
      setIsAdding(false)
      setExpanded(created.id)
    }
  }

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const lang = getLang(item.id)
        const isOpen = expanded === item.id
        const q = item[`question_${lang}` as keyof FaqItem] as string
        const a = item[`answer_${lang}` as keyof FaqItem] as string

        return (
          <div key={item.id} className={`rounded-xl border transition-colors ${isOpen ? 'border-beige/30 bg-white/[0.06]' : 'border-white/[0.08] bg-white/[0.03]'}`}>
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4">
              <GripVertical size={14} className="text-white/20 flex-shrink-0" />
              <span className="text-beige text-xs font-bold w-6 flex-shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <button
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className="flex-1 text-left text-sm text-white/80 hover:text-white transition-colors truncate"
              >
                {item.question_pl || <span className="italic text-white/30">Brak pytania</span>}
              </button>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => updateField(item.id, 'is_active', !item.is_active)}
                  className={`text-xs px-2 py-1 rounded-full transition-colors ${item.is_active ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/30'}`}
                >
                  {item.is_active ? 'aktywny' : 'ukryty'}
                </button>
                <button onClick={() => deleteItem(item.id)} className="text-white/20 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
                <button onClick={() => setExpanded(isOpen ? null : item.id)} className="text-white/30 hover:text-white transition-colors">
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>

            {/* Editor */}
            {isOpen && (
              <div className="px-5 pb-5 border-t border-white/[0.06]">
                {/* Lang tabs */}
                <div className="flex gap-1 mt-4 mb-4">
                  {(['pl', 'en', 'ru'] as Lang[]).map(l => (
                    <button
                      key={l}
                      onClick={() => setActiveLang(p => ({ ...p, [item.id]: l }))}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${lang === l ? 'bg-beige text-graphite' : 'bg-white/[0.08] text-white/50 hover:text-white'}`}
                    >
                      {LANG_LABELS[l]}
                    </button>
                  ))}
                </div>

                {/* Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="text-white/40 text-xs mb-1 block">Pytanie ({lang.toUpperCase()})</label>
                    <input
                      value={q}
                      onChange={e => updateField(item.id, `question_${lang}`, e.target.value)}
                      className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-beige/40"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs mb-1 block">Odpowiedź ({lang.toUpperCase()})</label>
                    <textarea
                      value={a}
                      onChange={e => updateField(item.id, `answer_${lang}`, e.target.value)}
                      rows={4}
                      className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-beige/40 resize-y"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs mb-1 block">Kolejność</label>
                    <input
                      type="number"
                      value={item.sort_order}
                      onChange={e => updateField(item.id, 'sort_order', parseInt(e.target.value) || 1)}
                      className="w-20 bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-beige/40"
                    />
                  </div>
                </div>

                {errors[item.id] && <p className="text-red-400 text-xs mt-3">{errors[item.id]}</p>}

                <button
                  onClick={() => saveItem(item)}
                  disabled={saving[item.id]}
                  className="mt-4 flex items-center gap-2 bg-beige text-graphite font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-beige/90 transition-colors disabled:opacity-60"
                >
                  {saved[item.id] ? <><Check size={14} /> Zapisano</> : saving[item.id] ? 'Zapisuję...' : <><Save size={14} /> Zapisz</>}
                </button>
              </div>
            )}
          </div>
        )
      })}

      {/* Add new */}
      {isAdding ? (
        <div className="rounded-xl border border-beige/20 bg-white/[0.04] p-5">
          <p className="text-beige text-sm font-semibold mb-4">Nowy wpis FAQ</p>

          {/* Lang tabs */}
          <div className="flex gap-1 mb-4">
            {(['pl', 'en', 'ru'] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => setNewLang(l)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${newLang === l ? 'bg-beige text-graphite' : 'bg-white/[0.08] text-white/50 hover:text-white'}`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-white/40 text-xs mb-1 block">Pytanie ({newLang.toUpperCase()})</label>
              <input
                value={newItem[`question_${newLang}` as keyof typeof newItem] as string}
                onChange={e => setNewItem(p => ({ ...p, [`question_${newLang}`]: e.target.value }))}
                className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-beige/40"
                placeholder="Wpisz pytanie..."
              />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1 block">Odpowiedź ({newLang.toUpperCase()})</label>
              <textarea
                value={newItem[`answer_${newLang}` as keyof typeof newItem] as string}
                onChange={e => setNewItem(p => ({ ...p, [`answer_${newLang}`]: e.target.value }))}
                rows={3}
                className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-beige/40 resize-y"
                placeholder="Wpisz odpowiedź..."
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={addItem}
              disabled={adding || !newItem.question_pl}
              className="flex items-center gap-2 bg-beige text-graphite font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-beige/90 transition-colors disabled:opacity-60"
            >
              {adding ? 'Dodaję...' : <><Plus size={14} /> Dodaj</>}
            </button>
            <button
              onClick={() => { setIsAdding(false); setNewItem(emptyItem()) }}
              className="flex items-center gap-2 text-white/50 hover:text-white text-sm px-4 py-2.5 rounded-lg transition-colors"
            >
              <X size={14} /> Anuluj
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full flex items-center justify-center gap-2 border border-dashed border-white/20 hover:border-beige/40 text-white/40 hover:text-beige text-sm py-4 rounded-xl transition-colors"
        >
          <Plus size={16} /> Dodaj nowe pytanie
        </button>
      )}
    </div>
  )
}
