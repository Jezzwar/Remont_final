'use client'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { Upload, Check, X, Trash2 } from 'lucide-react'

interface Props {
  image: { id: string; label: string; storage_path: string; url: string }
  onDeleted: (id: string) => void
}

export default function PhotoCard({ image, onDeleted }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [preview, setPreview] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setStatus('loading')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('imageId', image.id)
    formData.append('storagePath', image.storage_path)

    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    setStatus(res.ok ? 'success' : 'error')
  }

  async function handleDelete() {
    if (!confirm(`Usunąć "${image.label}"?`)) return
    setDeleting(true)
    const res = await fetch(`/api/admin/images/${image.id}`, { method: 'DELETE' })
    if (res.ok) {
      onDeleted(image.id)
    } else {
      setDeleting(false)
    }
  }

  return (
    <div className="bg-white/5 rounded-xl overflow-hidden">
      <div className="relative aspect-[4/3] bg-white/[0.04]">
        {(preview || image.url) && (
          <Image
            src={preview ?? image.url}
            alt={image.label}
            fill
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        )}
        {!preview && !image.url && (
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
            <Upload size={28} />
          </div>
        )}
        {status === 'loading' && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-beige border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {status === 'success' && (
          <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
            <Check size={12} />
          </div>
        )}
        {status === 'error' && (
          <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1">
            <X size={12} />
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="text-xs text-white/60 mb-2 truncate">{image.label}</div>
        <div className="flex gap-2">
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={status === 'loading' || deleting}
            className="flex-1 flex items-center justify-center gap-2 bg-beige/20 hover:bg-beige/30 text-beige text-xs py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <Upload size={12} /> Zamień
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center justify-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {deleting ? <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" /> : <Trash2 size={12} />}
          </button>
        </div>
      </div>
    </div>
  )
}
