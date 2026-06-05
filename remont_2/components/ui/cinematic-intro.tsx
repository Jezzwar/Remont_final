'use client'

import { useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function CinematicIntro() {
  const locale = useLocale()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const heading =
    locale === 'ru' ? 'ГОТОВЫ\nК ПЕРЕМЕНАМ?' :
    locale === 'en' ? 'READY\nFOR A CHANGE?' :
                      'GOTOWY\nNA ZMIANĘ?'

  const sub =
    locale === 'ru' ? 'Профессиональный ремонт под ключ. Варшава.' :
    locale === 'en' ? 'Professional turnkey renovation. Warsaw.' :
                      'Profesjonalny remont pod klucz. Warszawa.'

  const cta =
    locale === 'ru' ? 'Оставить запрос' :
    locale === 'en' ? 'Get a quote' :
                      'Uzyskaj wycenę'

  useEffect(() => {
    if (typeof window === 'undefined' || !wrapperRef.current) return

    const ctx = gsap.context(() => {
      // Scroll CTA fades in shortly after page load
      gsap.to('#intro-scroll-cta', {
        opacity: 1,
        duration: 1,
        delay: 1.2,
        ease: 'power2.out',
      })

      // Content fades out + moves up as you scroll away
      gsap.to(contentRef.current, {
        opacity: 0,
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '40% top',
          scrub: true,
        },
      })

      // Scroll CTA fades out on scroll
      gsap.to('#intro-scroll-cta', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '20% top',
          scrub: true,
        },
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative h-screen w-full"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      {/* Fixed panel — gets clipped away as wrapper scrolls up */}
      <div className="fixed top-0 left-0 h-screen w-full bg-[#080808] overflow-hidden">

        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[50vh] rounded-full bg-beige/[0.05] blur-[100px]" />

        {/* Center content */}
        <div
          ref={contentRef}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="text-beige text-[10px] uppercase tracking-[0.35em] font-heading mb-6">
            + Remont Naprawa
          </p>

          <h1
            className="font-heading font-black text-white uppercase leading-[0.88] tracking-tight mb-8 whitespace-pre-line"
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
          >
            {heading}
          </h1>

          <p className="text-white/35 text-sm font-heading tracking-widest uppercase mb-10">
            {sub}
          </p>

          <button
            onClick={() => window.dispatchEvent(new Event('openContactModal'))}
            className="btn-shimmer flex items-center gap-2 bg-beige text-graphite font-heading font-bold px-8 py-4 rounded-full hover:bg-beige-light transition-colors duration-200 text-sm uppercase tracking-widest shadow-[0_4px_32px_rgba(216,195,165,0.25)]"
          >
            {cta}
          </button>
        </div>

        {/* Scroll CTA — fades in on scroll */}
        <div
          id="intro-scroll-cta"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 transition-opacity duration-700"
        >
          <span className="text-white/30 text-[9px] uppercase tracking-[0.3em] font-heading">scroll</span>
          <div className="flex flex-col items-center gap-1">
            <ChevronDown size={13} className="text-beige/40 animate-bounce" />
          </div>
        </div>

      </div>
    </div>
  )
}
