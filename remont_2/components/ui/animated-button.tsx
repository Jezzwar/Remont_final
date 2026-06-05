'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  href?: string
}

const shineBase = [
  'relative overflow-hidden',
  'before:absolute before:inset-0 before:rounded-[inherit]',
  'before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.55)_50%,transparent_75%,transparent_100%)]',
  'before:bg-[length:250%_250%,100%_100%]',
  'before:bg-[position:200%_0,0_0]',
  'before:bg-no-repeat',
  'before:transition-[background-position]',
  'before:duration-700',
  'hover:before:bg-[position:-100%_0,0_0]',
].join(' ')

export function AnimatedButton({
  className,
  children,
  variant = 'primary',
  href,
  onClick,
  ...props
}: AnimatedButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5',
    'font-heading font-semibold text-sm cursor-pointer',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige/50',
    'disabled:pointer-events-none disabled:opacity-50',
    shineBase,
    variant === 'primary'
      ? 'bg-beige text-graphite hover:bg-beige-light'
      : 'bg-white/[0.08] text-white/80 border border-white/15 hover:bg-white/[0.13]',
    className,
  )

  if (href) return <a href={href} className={base}>{children}</a>

  return (
    <button className={base} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
