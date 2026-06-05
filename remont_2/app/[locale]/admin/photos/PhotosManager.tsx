'use client'
import { useState, useRef } from 'react'
import { Plus, Upload } from 'lucide-react'
import PhotoCard from './PhotoCard'

interface ImageItem {
  id: string
  label: string
  storage_path: string
  url: string
  category: string
}

const CATEGORY_LABELS: Record<string, string> = {
  hero: 'Hero',
  portfolio: 'Portfolio',
  before_after: 'Przed / Po',
}

interface Props {
  initialImages: ImageItem[]
}

export default function PhotosManager({ initialImages }: Props) {
  const [images, setImages] = useState<ImageItem[]>(initialImages)
  const [uploading, setUploading] = useState<Record<string, boolean>>({})
  const addInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  function handleDeleted(id: string) {
    setImages(prev => prev.filter(i => i.id !== id))
  }

  async function handleAddFile(category: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(p => ({ ...p, [category]: true }))

    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', category)

    const res = await fetch('/api/admin/images', { method: 'POST', body: formData })
    setUploading(p => ({ ...p, [category]: false }))

    if (res.ok) {
      const newImg = await res.json()
      setImages(prev => [...prev, { ...newImg, category }])
    }

    // Reset input
    if (addInputRefs.current[category]) {
      addInputRefs.current[category]!.value = ''
    }
  }

  const categories = ['hero', 'portfolio', 'before_after']

  return (
    <div>
      {categories.map(cat => {
        const catImages = images.filter(i => i.category === cat)
        return (
          <div key={cat} className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-beige font-semibold">{CATEGORY_LABELS[cat]}</h2>
              <div>
                <input
                  ref={el => { addInputRefs.current[cat] = el }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => handleAddFile(cat, e)}
                />
                <button
                  onClick={() => addInputRefs.current[cat]?.click()}
                  disabled={uploading[cat]}
                  className="flex items-center gap-2 bg-beige/15 hover:bg-beige/25 text-beige text-xs px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
                >
                  {uploading[cat]
                    ? <div className="w-3 h-3 border border-beige border-t-transparent rounded-full animate-spin" />
                    : <Plus size={13} />
                  }
                  Dodaj zdjęcie
                </button>
              </div>
            </div>
            {catImages.length === 0 ? (
              <div
                className="border border-dashed border-white/15 rounded-xl flex flex-col items-center justify-center gap-3 py-10 text-white/25 cursor-pointer hover:border-beige/30 hover:text-beige/50 transition-colors"
                onClick={() => addInputRefs.current[cat]?.click()}
              >
                <Upload size={24} />
                <span className="text-xs">Brak zdjęć — kliknij, aby dodać</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {catImages.map(img => (
                  <PhotoCard key={img.id} image={img} onDeleted={handleDeleted} />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
