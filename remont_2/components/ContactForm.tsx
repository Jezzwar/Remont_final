'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Phone } from 'lucide-react'

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
    <section id="kontakt" className="px-6 sm:px-10 lg:px-16 py-20 bg-beige/10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="font-heading font-bold text-4xl text-white">{t('title')}</h2>
          <p className="text-white/60">{t('subtitle')}</p>
          <a
            href="tel:+48000000000"
            className="inline-flex items-center gap-2 bg-beige text-graphite font-semibold px-6 py-3 rounded-full hover:bg-beige-light transition-colors"
          >
            <Phone size={16} /> {t('cta')}
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 rounded-2xl p-8">
          {status === 'success' ? (
            <p className="text-beige font-semibold text-center py-4">{t('form_success')}</p>
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
                      rows={isTextarea ? 3 : undefined}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-beige/60 text-sm resize-none"
                    />
                  </div>
                )
              })}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-beige text-graphite font-semibold py-3 rounded-lg hover:bg-beige-light transition-colors disabled:opacity-60"
              >
                {status === 'loading' ? '...' : t('form_submit')}
              </button>
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">{t('form_error')}</p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  )
}
