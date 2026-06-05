'use client'

import { useRef, useState, useEffect } from 'react'
import { useMotionValue, motion, animate } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PortfolioImage {
  src: string
  alt: string
  label?: string
}

const FALLBACK: PortfolioImage[] = Array.from({ length: 27 }, (_, i) => ({
  src: `/portfolio/work_${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Realizacja ${i + 1}`,
}))

const GAP = 12
const VISIBLE = 4
const SPEED = 0.25 // px per frame at 60fps

export function PortfolioCarousel({ images }: { images: PortfolioImage[] }) {
  const slides = images.length > 0 ? images : FALLBACK
  const doubled = [...slides, ...slides]
  const [cardWidth, setCardWidth] = useState(280)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const mode = useRef<'auto' | 'manual'>('auto')
  const rafRef = useRef<number>()
  const strideRef = useRef(0)

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      setCardWidth(Math.floor((w - GAP * (VISIBLE - 1)) / VISIBLE))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    strideRef.current = slides.length * (cardWidth + GAP)
  }, [slides.length, cardWidth])

  useEffect(() => {
    const tick = () => {
      if (mode.current === 'auto') {
        const stride = strideRef.current
        if (stride > 0) {
          const cur = x.get()
          const next = cur - SPEED
          x.set(next <= -stride ? next + stride : next)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [x])

  const step = (dir: 1 | -1) => {
    mode.current = 'manual'
    const stride = strideRef.current
    const cur = x.get()
    let target = cur - dir * (cardWidth + GAP)
    if (target > 0) target -= stride
    if (target <= -stride) target += stride
    animate(x, target, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      onComplete: () => {
        setTimeout(() => { mode.current = 'auto' }, 2500)
      },
    })
  }

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-2xl bg-graphite">
      <motion.div className="flex" style={{ x, gap: GAP }}>
        {doubled.map((slide, i) => (
          <div key={i} className="flex-shrink-0" style={{ width: cardWidth, height: 420 }}>
            <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </motion.div>

      <button
        onClick={() => step(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-graphite/80 border border-white/10 text-white/60 hover:border-beige/40 hover:text-beige transition-all backdrop-blur-sm"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={() => step(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-graphite/80 border border-white/10 text-white/60 hover:border-beige/40 hover:text-beige transition-all backdrop-blur-sm"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
