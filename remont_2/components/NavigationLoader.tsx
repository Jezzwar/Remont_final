'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import TetrisLoading from './ui/tetris-loader'

export function NavigationLoader() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)

  // Show on initial mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1400)
    return () => clearTimeout(t)
  }, [])

  // Show on every route change
  useEffect(() => {
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 1200)
    return () => clearTimeout(t)
  }, [pathname])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-graphite transition-opacity duration-300">
      <TetrisLoading size="sm" speed="fast" />
    </div>
  )
}
