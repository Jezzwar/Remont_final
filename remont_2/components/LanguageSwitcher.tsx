'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const LOCALES = ['pl', 'en'] as const

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
    setOpen(false)
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold uppercase text-white/70 hover:text-white transition-colors"
      >
        {locale.toUpperCase()}
        <ChevronDown size={11} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-16 rounded-xl border border-white/10 bg-graphite/95 backdrop-blur-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-50">
          {LOCALES.filter(l => l !== locale).map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className="w-full text-center py-2 text-[11px] font-semibold uppercase text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
