import type { Metadata } from 'next'
import { Syne, Manrope, Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import { PageLoaderHider } from '@/components/PageLoaderHider'

const syne = Syne({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Remont Naprawa Warszawa',
  description: 'Remonty mieszkań i domów pod klucz',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className={`${syne.variable} ${manrope.variable} ${bricolage.variable} font-body bg-graphite text-white`}>
        <div id="page-loader" style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: '#0D0D0D',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '16px',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 12px)', gap: '1px' }}>
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} style={{
                width: 12, height: 12,
                background: i % 7 === 0 || i % 11 === 0 ? '#D8C3A5' : 'rgba(255,255,255,0.04)',
                animation: `tetrisFade ${0.8 + (i % 5) * 0.15}s ease-in-out infinite alternate`,
                animationDelay: `${(i % 8) * 0.1}s`,
              }} />
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: '0.25em', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
            Ładowanie...
          </p>
        </div>
        <PageLoaderHider />
        {children}
      </body>
    </html>
  )
}
