'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface InteractiveProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string
  icon?: React.ReactNode
  title: string
  description: string
  tag?: string
}

export function InteractiveProductCard({
  className,
  imageUrl,
  icon,
  title,
  description,
  tag,
  ...props
}: InteractiveProductCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [style, setStyle] = React.useState<React.CSSProperties>({})

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    const rotateX = ((y - height / 2) / (height / 2)) * -7
    const rotateY = ((x - width / 2) / (width / 2)) * 7
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`,
      transition: 'transform 0.1s ease-out',
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s ease-in-out',
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={cn(
        'relative w-full aspect-[4/3] rounded-2xl shadow-xl overflow-hidden cursor-default',
        className
      )}
      {...props}
    >
      {/* Background image */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: 'translateZ(-20px) scale(1.12)' }}
      />

      {/* Gradient overlay — dark bottom, brand tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-graphite/20" />

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end" style={{ transform: 'translateZ(40px)' }}>

        {/* Icon top-right */}
        {icon && (
          <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-beige backdrop-blur-sm">
            {icon}
          </div>
        )}

        {/* Text block — bottom */}
        <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
          <h3 className="text-sm font-bold text-white leading-tight mb-1">{title}</h3>
          <p className="text-xs text-white/55 leading-relaxed">{description}</p>
        </div>

      </div>
    </div>
  )
}
