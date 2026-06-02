'use client'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { Upload, Check, X } from 'lucide-react'

interface Props {
  image: { id: string; label: string; storage_path: string; url: string }
}

export default function PhotoCard({ image }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [preview, setPreview] = useState<string | null>(null)
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

  return (
    <div className="bg-white/5 rounded-xl overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image
          src={preview ?? image.url}
          alt={image.label}
          fill
          className="object-cover"
        />
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
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={status === 'loading'}
          className="w-full flex items-center justify-center gap-2 bg-beige/20 hover:bg-beige/30 text-beige text-xs py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <Upload size={12} /> Zamień zdjęcie
        </button>
      </div>
    </div>
  )
}
