'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
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

const CARD_WIDTH = 320
const GAP = 16

export function PortfolioCarousel({ images }: { images: PortfolioImage[] }) {
  const slides = images.length > 0 ? images : FALLBACK
  const [index, setIndex] = useState(0)
  const maxIndex = slides.length - 1

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1))

  const offset = -(index * (CARD_WIDTH + GAP))

  return (
    <div className="relative w-full overflow-hidden bg-graphite py-8">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-graphite to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-graphite to-transparent" />

      {/* Track */}
      <motion.div
        className="flex pl-8"
        animate={{ x: offset }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ gap: GAP }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-xl overflow-hidden border border-white/[0.08]"
            style={{ width: CARD_WIDTH, height: 420 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>

      {/* Buttons + progress */}
      <div className="flex items-center justify-between px-8 mt-6">
        {/* Counter */}
        <span className="text-white/30 text-xs font-heading tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>

        {/* Progress bar */}
        <div className="flex-1 mx-6 h-px bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-beige rounded-full origin-left"
            animate={{ scaleX: (index + 1) / slides.length }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Arrow buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={index === 0}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 hover:border-beige/40 hover:text-beige transition-all disabled:opacity-20"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            disabled={index === maxIndex}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 hover:border-beige/40 hover:text-beige transition-all disabled:opacity-20"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
