'use client'
import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export interface SlideTab {
  id: string
  label: string
}

interface Position {
  left: number
  width: number
  opacity: number
}

interface SlideTabsProps {
  tabs: SlideTab[]
  activeId?: string
  onSelect?: (id: string) => void
}

export function SlideTabs({ tabs, activeId, onSelect }: SlideTabsProps) {
  const [position, setPosition] = useState<Position>({ left: 0, width: 0, opacity: 0 })
  const [selected, setSelected] = useState(0)
  const tabsRef = useRef<(HTMLLIElement | null)[]>([])

  // Sync cursor to active tab on mount and when activeId changes
  useEffect(() => {
    const idx = activeId ? tabs.findIndex((t) => t.id === activeId) : 0
    const i = idx >= 0 ? idx : 0
    setSelected(i)
  }, [activeId, tabs])

  useEffect(() => {
    const el = tabsRef.current[selected]
    if (!el) return
    const { width } = el.getBoundingClientRect()
    setPosition({ left: el.offsetLeft, width, opacity: 1 })
  }, [selected])

  function handleSelect(i: number) {
    setSelected(i)
    onSelect?.(tabs[i].id)
  }

  return (
    <ul
      className="relative flex w-fit rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-sm p-1"
    >
      {tabs.map((tab, i) => (
        <TabItem
          key={tab.id}
          ref={(el) => { tabsRef.current[i] = el }}
          active={selected === i}
          onClick={() => handleSelect(i)}
        >
          {tab.label}
        </TabItem>
      ))}
      <Cursor position={position} />
    </ul>
  )
}

interface TabItemProps {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}

const TabItem = React.forwardRef<HTMLLIElement, TabItemProps>(
  ({ children, active, onClick }, ref) => (
    <li
      ref={ref}
      onClick={onClick}
      className={`relative z-10 cursor-pointer select-none px-4 py-1.5 text-sm font-medium transition-colors duration-200 mix-blend-normal rounded-full ${
        active ? 'text-graphite' : 'text-white/60 hover:text-white'
      }`}
    >
      {children}
    </li>
  )
)
TabItem.displayName = 'TabItem'

function Cursor({ position }: { position: Position }) {
  return (
    <motion.li
      animate={position}
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      className="absolute z-0 top-1 h-[calc(100%-8px)] rounded-full bg-beige pointer-events-none"
    />
  )
}
