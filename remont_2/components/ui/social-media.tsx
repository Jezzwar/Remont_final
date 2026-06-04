'use client'
import React from 'react'
import { cn } from '@/lib/utils'

export interface SocialItem {
  href: string
  ariaLabel: string
  tooltip: string
  svgUrl: string
  color: string
}

export interface SocialTooltipProps extends React.HTMLAttributes<HTMLUListElement> {
  items: SocialItem[]
}

const SocialTooltip = React.forwardRef<HTMLUListElement, SocialTooltipProps>(
  ({ className, items, ...props }, ref) => {
    const baseIconStyles =
      'relative flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.07] border border-white/10 overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:border-transparent'
    const baseSvgStyles =
      'relative z-10 w-6 h-6 transition-all duration-300 ease-in-out group-hover:brightness-0 group-hover:invert'
    const baseFilledStyles =
      'absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full'
    const baseTooltipStyles =
      'absolute bottom-[-40px] left-1/2 -translate-x-1/2 px-2.5 py-1 text-xs text-white whitespace-nowrap rounded-md opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:bottom-[-44px] font-medium'

    return (
      <ul
        ref={ref}
        className={cn('flex items-center gap-3', className)}
        {...props}
      >
        {items.map((item, index) => (
          <li key={index} className="relative group">
            <a
              href={item.href || '#'}
              aria-label={item.ariaLabel}
              className={cn(baseIconStyles)}
              target={item.href && item.href !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={item.href === '#' ? (e) => e.preventDefault() : undefined}
            >
              <div
                className={cn(baseFilledStyles)}
                style={{ backgroundColor: item.color }}
              />
              <img
                src={item.svgUrl}
                alt={item.ariaLabel}
                className={cn(baseSvgStyles)}
              />
            </a>
            <div
              className={cn(baseTooltipStyles)}
              style={{ backgroundColor: item.color }}
            >
              {item.tooltip}
            </div>
          </li>
        ))}
      </ul>
    )
  }
)

SocialTooltip.displayName = 'SocialTooltip'

export { SocialTooltip }
