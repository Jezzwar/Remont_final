'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Phone, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'

export default function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  return (
    <section id="kontakt" className="relative px-6 sm:px-10 lg:px-16 py-20 bg-graphite overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[300px] translate-y-1/2 rounded-full bg-beige/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto relative grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <SectionHeading label="Bezpłatna wycena" title={t('title')} />
          <p className="text-white/55 leading-relaxed">{t('subtitle')}</p>
          <a
            href="tel:+48000000000"
            className="btn-shimmer inline-flex items-center gap-2 bg-beige text-graphite font-semibold px-6 py-3 rounded-full hover:bg-beige-light transition-colors duration-200 shadow-[0_4px_24px_rgba(216,195,165,0.2)]"
          >
            <Phone size={16} /> {t('cta')}
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.3)]"
        >
          {status === 'success' ? (
            <div className="py-8 flex flex-col items-center gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-beige/10 flex items-center justify-center">
                <CheckCircle size={28} className="text-beige" />
              </div>
              <p className="text-white font-semibold">{t('form_success')}</p>
            </div>
          ) : (
            <>
              {(['name', 'phone', 'email', 'message'] as const).map((field) => {
                const isTextarea = field === 'message'
                const Tag = isTextarea ? 'textarea' : 'input'
                return (
                  <div key={field}>
                    <Tag
                      placeholder={t(`form_${field}`)}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      required={field === 'name' || field === 'phone'}
                      rows={isTextarea ? 4 : undefined}
                      className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-beige/50 focus:bg-white/[0.08] text-sm resize-none transition-all duration-200"
                    />
                  </div>
                )
              })}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-shimmer w-full flex items-center justify-center gap-2 bg-beige text-graphite font-semibold py-3 rounded-xl hover:bg-beige-light transition-colors duration-200 disabled:opacity-60 shadow-[0_4px_20px_rgba(216,195,165,0.15)]"
              >
                {status === 'loading' ? (
                  <span className="inline-block w-4 h-4 border-2 border-graphite/40 border-t-graphite rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={15} />
                    {t('form_submit')}
                  </>
                )}
              </button>
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm justify-center">
                  <AlertCircle size={15} />
                  {t('form_error')}
                </div>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  )
}
