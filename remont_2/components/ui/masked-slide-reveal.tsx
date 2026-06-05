'use client'

import { motion } from 'framer-motion'

interface MaskedSlideRevealProps {
  text: string
  className?: string
  staggerDelay?: number
  duration?: number
  delay?: number
}

export function MaskedSlideReveal({
  text,
  className,
  staggerDelay = 0.08,
  duration = 0.75,
  delay = 0.1,
}: MaskedSlideRevealProps) {
  const words = text.split(' ')

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', flexWrap: 'nowrap', gap: '0 0.22em', whiteSpace: 'nowrap' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{
            duration,
            delay: delay + i * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
