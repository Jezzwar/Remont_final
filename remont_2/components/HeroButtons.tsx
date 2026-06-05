'use client'

import { Phone } from 'lucide-react'
import { AnimatedButton } from './ui/animated-button'

interface HeroButtonsProps {
  ctaCall: string
  ctaMessage?: string
}

export function HeroButtons({ ctaCall }: HeroButtonsProps) {
  return (
    <div className="flex gap-3">
      <AnimatedButton
        variant="primary"
        href="tel:+48729460423"
      >
        <Phone size={14} />
        {ctaCall}
      </AnimatedButton>
    </div>
  )
}
