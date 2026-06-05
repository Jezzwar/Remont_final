'use client'
import { useTranslations, useLocale } from 'next-intl'
import { Phone } from 'lucide-react'
import Image from 'next/image'
import LanguageSwitcher from './LanguageSwitcher'
import { SlideTabs } from './ui/slide-tabs'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('')

  const links = [
    { id: 'uslugi',     label: t('services') },
    { id: 'realizacje', label: t('portfolio') },
    { id: 'o-nas',      label: t('about') },
    { id: 'faq',        label: t('faq') },
    { id: 'kontakt',    label: t('contact') },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sectionIds = links.map((l) => l.id)
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveId(sectionIds[i])
          return
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id: string) {
    if (id === 'kontakt') {
      window.dispatchEvent(new Event('openContactModal'))
      setOpen(false)
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
    setOpen(false)
  }

  const hasBg = scrolled || open

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${hasBg ? 'bg-graphite border-white/10' : 'bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 h-[70px] sm:h-[90px] flex items-center justify-between relative">

        {/* Logo */}
        <a href={`/${locale}`} className="flex items-center group flex-shrink-0">
          <div className="relative h-[60px] sm:h-[80px] w-[195px] sm:w-[280px]">
            <Image
              src="/final.png"
              alt="Remont Naprawa Warszawa"
              fill
              className="object-contain object-left transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </a>

        {/* Desktop nav — absolutely centered */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <SlideTabs
            tabs={links}
            activeId={activeId}
            onSelect={scrollTo}
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <LanguageSwitcher />
          <a
            href="tel:+48729460423"
            className="btn-shimmer hidden sm:flex items-center gap-2 bg-beige text-graphite text-sm font-semibold px-4 py-2 rounded-full hover:bg-beige-light transition-colors duration-200"
          >
            <Phone size={13} />
            {t('call')}
          </a>
          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 -mr-1"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-[400px]' : 'max-h-0'}`}>
        <div className="bg-graphite border-t border-white/10 px-6 py-5 flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`text-left py-3 px-2 rounded-xl transition-colors text-[15px] font-heading ${
                activeId === l.id
                  ? 'text-beige font-semibold bg-white/[0.04]'
                  : 'text-white/70 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              {l.label}
            </button>
          ))}
          <a
            href="tel:+48729460423"
            className="flex items-center gap-2.5 text-beige font-semibold mt-3 pt-4 border-t border-white/10 px-2 text-[15px]"
          >
            <Phone size={15} /> +48 729 460 423
          </a>
        </div>
      </div>
    </nav>
  )
}
