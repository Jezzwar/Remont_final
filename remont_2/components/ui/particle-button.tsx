'use client'

import * as React from 'react'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Particle {
  id: number
  x: number
  y: number
  angle: number
  distance: number
  color: string
}

interface ParticleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  particleCount?: number
}

export function ParticleButton({
  children,
  onClick,
  variant = 'primary',
  particleCount = 10,
  className,
  ...props
}: ParticleButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [pressed, setPressed] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const counterRef = useRef(0)

  const colors = variant === 'primary'
    ? ['#D8C3A5', '#c9ae8c', '#ffffff', '#e8d5bc']
    : ['#D8C3A5', '#ffffff', '#c9ae8c', '#a89070']

  const spawnParticles = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return

    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top

    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: counterRef.current++,
      x: cx,
      y: cy,
      angle: (360 / particleCount) * i + Math.random() * 20 - 10,
      distance: 40 + Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setParticles(prev => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(n => n.id === p.id)))
    }, 700)
  }, [particleCount, colors])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPressed(true)
    setTimeout(() => setPressed(false), 120)
    spawnParticles(e)
    onClick?.(e)
  }

  const base = 'relative overflow-visible flex items-center gap-2 font-semibold text-sm rounded-full transition-colors duration-200 select-none'
  const variants = {
    primary: 'btn-shimmer bg-beige text-graphite px-6 py-3 hover:bg-beige-light',
    outline: 'border border-white/25 text-white/70 px-6 py-3 hover:border-beige/40 hover:text-white',
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={cn(base, variants[variant], className)}
      style={{ transform: pressed ? 'scale(0.95)' : 'scale(1)', transition: 'transform 0.1s ease, background-color 0.2s' }}
      {...props}
    >
      {children}

      <AnimatePresence>
        {particles.map(p => {
          const rad = (p.angle * Math.PI) / 180
          const tx = Math.cos(rad) * p.distance
          const ty = Math.sin(rad) * p.distance
          return (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, scale: 1, x: p.x, y: p.y, left: 0, top: 0 }}
              animate={{ opacity: 0, scale: 0, x: p.x + tx, y: p.y + ty }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                borderRadius: '50%',
                backgroundColor: p.color,
                pointerEvents: 'none',
                translateX: '-50%',
                translateY: '-50%',
              }}
            />
          )
        })}
      </AnimatePresence>
    </button>
  )
}
