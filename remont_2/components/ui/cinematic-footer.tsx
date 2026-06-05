'use client'

import { useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Phone } from 'lucide-react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SocialTooltip, SocialItem } from '@/components/ui/social-media'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const socialLinks: SocialItem[] = [
  {
    href: 'https://www.instagram.com/remonty_warszawa_nester?igsh=aGYwdXc2MWJxYnk1',
    ariaLabel: 'Instagram',
    tooltip: 'Instagram',
    color: '#E1306C',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.tiktok.com/@dmytro.nester2',
    ariaLabel: 'TikTok',
    tooltip: 'TikTok',
    color: '#010101',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
  {
    href: 'https://maps.app.goo.gl/ZsmQbDcaUz4vB7bV8',
    ariaLabel: 'Google Maps',
    tooltip: 'Google Maps',
    color: '#4285F4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C7.802 0 4 3.403 4 7.602 4 11.8 7.469 16.812 12 24c4.531-7.188 8-12.2 8-16.398C20 3.403 16.199 0 12 0zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
      </svg>
    ),
  },
]

export function CinematicFooter() {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')
  const locale = useLocale()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { href: '#uslugi',    key: 'services' },
    { href: '#realizacje',key: 'portfolio' },
    { href: '#o-nas',     key: 'about' },
    { href: '#opinie',    key: 'reviews' },
    { href: '#faq',       key: 'faq' },
  ] as const

  useEffect(() => {
    if (typeof window === 'undefined' || !wrapperRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 50%',
            end: 'center center',
            scrub: 1,
          },
        }
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ height: '100svh', clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <footer className="fixed bottom-0 left-0 w-full flex flex-col justify-between overflow-hidden bg-[#0a0a0a]" style={{ height: '100svh' }}>

        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] rounded-full bg-beige/[0.04] blur-[120px]" />


        {/* Center content */}
        <div ref={headingRef} className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="text-beige text-[10px] uppercase tracking-[0.3em] font-heading mb-5">
            + Remont Naprawa
          </p>
          <h2
            className="font-heading font-black text-white uppercase leading-[0.9] tracking-tight mb-8"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
          >
            {locale === 'ru' ? 'ГОТОВЫ\nК ПЕРЕМЕНАМ?' : locale === 'en' ? 'READY FOR\nA CHANGE?' : 'GOTOWY\nNA ZMIANĘ?'}
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => window.dispatchEvent(new Event('openContactModal'))}
              className="btn-shimmer flex items-center gap-2 bg-beige text-graphite font-heading font-bold px-8 py-4 rounded-full hover:bg-beige-light transition-colors duration-200 text-sm uppercase tracking-widest shadow-[0_4px_24px_rgba(216,195,165,0.2)]"
            >
              {locale === 'ru' ? 'Оставить запрос' : locale === 'en' ? 'Get a quote' : 'Uzyskaj wycenę'}
            </button>
            <a
              href="tel:+48729460423"
              className="flex items-center gap-2 text-white/50 hover:text-beige transition-colors text-sm font-heading"
            >
              <Phone size={14} /> +48 729 460 423
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 border-t border-white/[0.07] px-6 sm:px-10 lg:px-16 py-6">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-5 sm:flex-row sm:justify-between">

            {/* Logo */}
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image src="/logo.PNG" alt="Remont Naprawa" fill className="object-contain" />
            </div>

            {/* Nav */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5">
              {navLinks.map(({ href, key }) => (
                <a key={key} href={href} className="text-white/30 hover:text-beige text-xs transition-colors duration-200 font-heading uppercase tracking-wider">
                  {tn(key)}
                </a>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-5">
              <SocialTooltip items={socialLinks} className="justify-center sm:justify-end" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-4 flex flex-col sm:flex-row items-center sm:justify-between gap-2 text-center sm:text-left">
            <p className="text-white/15 text-[10px] tracking-widest">© 2026 CRT Agency. All rights reserved. Operated by Cortallis Sp. z o.o.</p>
            <div className="flex gap-4">
              {([['legal', '/legal'], ['privacy', '/privacy'], ['terms', '/terms']] as const).map(([k, href]) => (
                <a key={k} href={href} className="text-white/15 hover:text-white/40 text-[10px] transition-colors">{t(k)}</a>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </div>
  )
}
