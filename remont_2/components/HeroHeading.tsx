'use client'

import { useEffect, useRef } from 'react'
import { MaskedSlideReveal } from './ui/masked-slide-reveal'

export function HeroHeading({ text, accentLast }: { text: string; accentLast?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lines = text.split('\n')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const fit = () => {
      const width = container.offsetWidth
      const spans = container.querySelectorAll<HTMLSpanElement>('[data-line]')

      spans.forEach(span => {
        span.style.fontSize = ''
        // measure the inner flex element, not the full-width block container
        const inner = span.firstElementChild as HTMLElement
        if (!inner) return

        let size = parseFloat(window.getComputedStyle(span).fontSize)

        while (inner.scrollWidth > width && size > 10) {
          size -= 0.5
          span.style.fontSize = `${size}px`
        }
        while (inner.scrollWidth < width - 2 && size < 400) {
          size += 0.5
          span.style.fontSize = `${size}px`
          if (inner.scrollWidth > width) {
            size -= 0.5
            span.style.fontSize = `${size}px`
            break
          }
        }
      })
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(container)
    return () => ro.disconnect()
  }, [text])

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <h1
        className="font-heading font-black text-white uppercase tracking-tight"
        style={{ lineHeight: 0.88 }}
      >
        {lines.map((line, i) => {
          const isLast = i === lines.length - 1
          return (
            <span
              key={i}
              data-line=""
              className={`text-[clamp(3rem,7vw,9rem)] ${accentLast && isLast ? 'text-beige' : ''}`}
              style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.15em', marginBottom: '-0.15em' }}
            >
              <MaskedSlideReveal
                text={line}
                delay={0.15 + i * 0.18}
                staggerDelay={0.07}
                duration={0.8}
              />
            </span>
          )
        })}
      </h1>
    </div>
  )
}
