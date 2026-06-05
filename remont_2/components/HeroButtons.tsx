'use client'

import { Phone, Mail } from 'lucide-react'
import { AnimatedButton } from './ui/animated-button'

interface HeroButtonsProps {
  ctaCall: string
  ctaMessage: string
}

export function HeroButtons({ ctaCall, ctaMessage }: HeroButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <AnimatedButton
        variant="primary"
        href="tel:+48729460423"
      >
        <Phone size={14} />
        {ctaCall}
      </AnimatedButton>

      <AnimatedButton
        variant="outline"
        onClick={() => window.dispatchEvent(new Event('openContactModal'))}
      >
        <Mail size={14} />
        {ctaMessage}
      </AnimatedButton>
    </div>
  )
}
