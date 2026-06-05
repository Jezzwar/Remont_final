'use client'
import { useRouter } from 'next/navigation'

export function BackButton({ label }: { label: string }) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="text-white/40 hover:text-beige text-sm transition-colors font-heading"
    >
      {label}
    </button>
  )
}
