"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface StackImage {
  src: string
  alt: string
  label?: string
}

interface VerticalImageStackProps {
  images: StackImage[]
}

const FALLBACK_IMAGES: StackImage[] = Array.from({ length: 27 }, (_, i) => ({
  src: `/portfolio/work_${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Realizacja ${i + 1}`,
}))

export function VerticalImageStack({ images }: VerticalImageStackProps) {
  const items = images.length > 0 ? images : FALLBACK_IMAGES
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400

  const navigate = useCallback(
    (direction: number) => {
      const now = Date.now()
      if (now - lastNavigationTime.current < navigationCooldown) return
      lastNavigationTime.current = now
      setCurrentIndex((prev) => {
        if (direction > 0) return prev === items.length - 1 ? 0 : prev + 1
        return prev === 0 ? items.length - 1 : prev - 1
      })
    },
    [items.length],
  )

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50) navigate(1)
    else if (info.offset.x > 50) navigate(-1)
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(delta) > 30) navigate(delta > 0 ? 1 : -1)
    },
    [navigate],
  )

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [handleWheel])

  const getCardStyle = (index: number) => {
    const total = items.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0)  return { x: 0,    scale: 1,    opacity: 1,    zIndex: 5, rotateY: 0   }
    if (diff === -1) return { x: -200, scale: 0.82, opacity: 0.55, zIndex: 4, rotateY: 12  }
    if (diff === -2) return { x: -340, scale: 0.68, opacity: 0.22, zIndex: 3, rotateY: 20  }
    if (diff === 1)  return { x:  200, scale: 0.82, opacity: 0.55, zIndex: 4, rotateY: -12 }
    if (diff === 2)  return { x:  340, scale: 0.68, opacity: 0.22, zIndex: 3, rotateY: -20 }
    return { x: diff > 0 ? 500 : -500, scale: 0.6, opacity: 0, zIndex: 0, rotateY: diff > 0 ? -30 : 30 }
  }

  const isVisible = (index: number) => {
    const total = items.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  return (
    <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden bg-graphite">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-beige/[0.03] blur-3xl" />
      </div>

      {/* Card stack */}
      <div
        className="relative flex h-[320px] w-[320px] items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {items.map((image, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={index}
              className="absolute cursor-grab active:cursor-grabbing"
              animate={{
                x: style.x,
                scale: style.scale,
                opacity: style.opacity,
                rotateY: style.rotateY,
                zIndex: style.zIndex,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
              drag={isCurrent ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{ transformStyle: "preserve-3d", zIndex: style.zIndex }}
            >
              <div
                className="relative h-[420px] w-[300px] overflow-hidden rounded-2xl"
                style={{
                  boxShadow: isCurrent
                    ? "0 30px 60px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(216,195,165,0.12)"
                    : "0 10px 30px -10px rgba(0,0,0,0.5)",
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 via-transparent to-transparent z-10" />

                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover w-full h-full"
                  draggable={false}
                  priority={isCurrent}
                />

                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent z-10" />

                {image.label && (
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-beige font-heading text-xs uppercase tracking-widest">{image.label}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Prev button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition-all hover:border-beige/40 hover:bg-white/10 hover:text-beige"
        aria-label="Poprzednie"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next button */}
      <button
        onClick={() => navigate(1)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition-all hover:border-beige/40 hover:bg-white/10 hover:text-beige"
        aria-label="Następne"
      >
        <ChevronRight size={20} />
      </button>

      {/* Counter + dots at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        {/* Dots — show max 9 around current */}
        <div className="flex items-center gap-1.5">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-5 h-1.5 bg-beige"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Zdjęcie ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="flex items-center gap-3 select-none">
          <span className="text-2xl font-heading font-bold text-white tabular-nums leading-none">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div className="w-8 h-px bg-beige/30" />
          <span className="text-sm text-white/30 font-heading tabular-nums">
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  )
}
