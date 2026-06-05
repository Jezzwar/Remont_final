'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Marta K.',
    avatar: 'MK',
    rating: 5,
    text: 'Remont łazienki zrobiony idealnie. Terminowo, czysto, bez zbędnych pytań.',
  },
  {
    name: 'Андрей С.',
    avatar: 'АС',
    rating: 5,
    text: 'Отличная работа, всё как договорились. Рекомендую.',
  },
  {
    name: 'Piotr W.',
    avatar: 'PW',
    rating: 5,
    text: 'Kompleksowy remont mieszkania — efekt lepszy niż oczekiwałem.',
  },
]

const COLORS = ['#D8C3A5', '#a89070', '#c9ae8c']

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="flex gap-[2px]">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={11} className="fill-beige text-beige" />
      ))}
    </span>
  )
}

export function HeroReviewBadge() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative inline-block w-fit">
      {/* Pulse ring — stops when open */}
      {!open && (
        <motion.span
          className="absolute inset-0 rounded-full border border-beige/20 pointer-events-none"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Collapsed pill */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        animate={{ opacity: open ? 1 : [1, 0.75, 1] }}
        transition={open ? {} : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md border border-white/[0.12] rounded-full px-3.5 py-2 hover:border-beige/30 transition-colors duration-200"
      >
        {/* Avatar stack */}
        <div className="flex -space-x-2">
          {REVIEWS.map((r, i) => (
            <span
              key={i}
              className="w-6 h-6 rounded-full border border-graphite flex items-center justify-center text-[9px] font-bold text-graphite flex-shrink-0"
              style={{ backgroundColor: COLORS[i], zIndex: REVIEWS.length - i }}
            >
              {r.avatar[0]}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <Stars />
          <span className="text-white font-heading font-bold text-sm leading-none">4.8</span>
          <span className="text-white/40 text-[11px]">/5</span>
        </div>

        {/* Count */}
        <span className="text-white/40 text-[11px] border-l border-white/10 pl-2.5">
          250+ opinii
        </span>

        {/* Chevron */}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className="text-white/40"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.button>

      {/* Expanded panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 mt-2 w-[300px] bg-black/70 backdrop-blur-xl border border-white/[0.1] rounded-2xl p-3 flex flex-col gap-2 z-50"
          >
            {REVIEWS.map((r, i) => (
              <div key={i} className="flex gap-2.5 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-graphite flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: COLORS[i] }}
                >
                  {r.avatar}
                </span>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/80 text-[12px] font-semibold font-heading">{r.name}</span>
                    <Stars count={r.rating} />
                  </div>
                  <p className="text-white/50 text-[11px] leading-relaxed">{r.text}</p>
                </div>
              </div>
            ))}

            <div className="border-t border-white/[0.07] pt-2 mt-1 flex items-center justify-between px-1">
              <span className="text-white/30 text-[10px]">Google Reviews</span>
              <span className="text-beige text-[11px] font-heading font-semibold">4.8 ★ · 250+ ocen</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
