'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'

type Step = 'menu' | 'quick' | 'full' | 'email'
type Status = 'idle' | 'loading' | 'success' | 'error'

export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('menu')
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', rooms: '', budget: '' })

  function close() {
    setOpen(false)
    setTimeout(() => { setStep('menu'); setStatus('idle') }, 300)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  const field = (key: keyof typeof form, placeholder: string, type = 'text') => (
    <input
      type={type}
      placeholder={placeholder}
      value={form[key]}
      onChange={e => setForm({ ...form, [key]: e.target.value })}
      className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-beige/50 text-sm transition-all"
    />
  )

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.15 } }}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#2a2218] shadow-[0_8px_32px_rgba(0,0,0,0.7)] overflow-hidden border border-beige/20"
        aria-label="Rozpocznij projekt"
      >
        <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[80vh] overflow-y-auto rounded-2xl bg-graphite border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-heading mb-1">Nowe zapytanie</p>
                  <h2 className="font-heading font-bold text-2xl text-white leading-tight">
                    ROZPOCZNIJ<br />PROJEKT<span className="text-beige">.</span>
                  </h2>
                </div>
                <button onClick={close} className="text-white/40 hover:text-white transition-colors mt-1">
                  <X size={20} />
                </button>
              </div>

              <div className="px-6 pb-6">
                <AnimatePresence mode="wait">

                  {/* MENU step */}
                  {step === 'menu' && (
                    <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="border-t border-white/8 pt-4 mb-4">
                        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-heading mb-3">Wypełnij brief</p>
                        <button
                          onClick={() => setStep('quick')}
                          className="w-full flex items-center justify-between py-4 border-b border-white/8 group"
                        >
                          <div className="text-left">
                            <p className="text-white font-heading font-semibold text-sm">Szybki brief</p>
                            <p className="text-white/40 text-xs mt-0.5">Nie wiesz jeszcze czego potrzebujesz?</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-beige text-xs font-heading">1–2 min</span>
                            <ArrowRight size={14} className="text-beige/60 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </button>
                        <button
                          onClick={() => setStep('full')}
                          className="w-full flex items-center justify-between py-4 group"
                        >
                          <div className="text-left">
                            <p className="text-white font-heading font-semibold text-sm">Brief projektu</p>
                            <p className="text-white/40 text-xs mt-0.5">Masz jasną wizję? Uzyskaj wycenę.</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-beige text-xs font-heading">3–5 min</span>
                            <ArrowRight size={14} className="text-beige/60 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </button>
                      </div>

                      <div className="border-t border-white/8 pt-4">
                        <p className="text-beige text-[10px] uppercase tracking-[0.2em] font-heading mb-1">Lub zostaw swój email</p>
                        <p className="text-white/40 text-xs mb-4">Skontaktujemy się, by omówić Twój projekt.</p>
                        <button
                          onClick={() => setStep('email')}
                          className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-beige/30 transition-all group"
                        >
                          <span className="text-white/60 text-sm">Imię i email →</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* QUICK brief */}
                  {step === 'quick' && (
                    <motion.div key="quick" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      {status === 'success' ? (
                        <SuccessBlock />
                      ) : (
                        <form onSubmit={submit} className="space-y-3">
                          <button type="button" onClick={() => setStep('menu')} className="text-white/40 text-xs hover:text-white mb-2 flex items-center gap-1">
                            ← Wróć
                          </button>
                          {field('name', 'Imię *')}
                          {field('phone', 'Telefon *', 'tel')}
                          <select
                            value={form.rooms}
                            onChange={e => setForm({ ...form, rooms: e.target.value })}
                            className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-beige/50 text-sm transition-all"
                          >
                            <option value="" className="bg-graphite">Ile pokoi?</option>
                            <option value="1" className="bg-graphite">1 pokój</option>
                            <option value="2" className="bg-graphite">2 pokoje</option>
                            <option value="3" className="bg-graphite">3 pokoje</option>
                            <option value="4+" className="bg-graphite">4+ pokoi</option>
                            <option value="dom" className="bg-graphite">Dom</option>
                          </select>
                          <SubmitButton status={status} label="Wyślij brief" />
                          {status === 'error' && <ErrorBlock />}
                        </form>
                      )}
                    </motion.div>
                  )}

                  {/* FULL brief */}
                  {step === 'full' && (
                    <motion.div key="full" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      {status === 'success' ? (
                        <SuccessBlock />
                      ) : (
                        <form onSubmit={submit} className="space-y-3">
                          <button type="button" onClick={() => setStep('menu')} className="text-white/40 text-xs hover:text-white mb-2 flex items-center gap-1">
                            ← Wróć
                          </button>
                          {field('name', 'Imię *')}
                          {field('phone', 'Telefon *', 'tel')}
                          {field('email', 'Email', 'email')}
                          <select
                            value={form.budget}
                            onChange={e => setForm({ ...form, budget: e.target.value })}
                            className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-beige/50 text-sm transition-all"
                          >
                            <option value="" className="bg-graphite">Budżet (orientacyjnie)</option>
                            <option value="do 30k" className="bg-graphite">do 30 000 zł</option>
                            <option value="30-60k" className="bg-graphite">30 000 – 60 000 zł</option>
                            <option value="60-100k" className="bg-graphite">60 000 – 100 000 zł</option>
                            <option value="100k+" className="bg-graphite">powyżej 100 000 zł</option>
                          </select>
                          <textarea
                            rows={3}
                            placeholder="Opisz projekt..."
                            value={form.message}
                            onChange={e => setForm({ ...form, message: e.target.value })}
                            className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-beige/50 text-sm resize-none transition-all"
                          />
                          <SubmitButton status={status} label="Wyślij brief" />
                          {status === 'error' && <ErrorBlock />}
                        </form>
                      )}
                    </motion.div>
                  )}

                  {/* EMAIL only */}
                  {step === 'email' && (
                    <motion.div key="email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      {status === 'success' ? (
                        <SuccessBlock />
                      ) : (
                        <form onSubmit={submit} className="space-y-3">
                          <button type="button" onClick={() => setStep('menu')} className="text-white/40 text-xs hover:text-white mb-2 flex items-center gap-1">
                            ← Wróć
                          </button>
                          {field('name', 'Imię *')}
                          {field('email', 'Email *', 'email')}
                          <SubmitButton status={status} label="Wyślij →" />
                          {status === 'error' && <ErrorBlock />}
                        </form>
                      )}
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function SubmitButton({ status, label }: { status: Status; label: string }) {
  return (
    <button
      type="submit"
      disabled={status === 'loading'}
      className="w-full flex items-center justify-center gap-2 bg-beige text-graphite font-heading font-semibold py-3 rounded-xl hover:bg-beige-light transition-colors duration-200 disabled:opacity-60 text-sm"
    >
      {status === 'loading' ? (
        <span className="inline-block w-4 h-4 border-2 border-graphite/40 border-t-graphite rounded-full animate-spin" />
      ) : (
        <><Send size={14} /> {label}</>
      )}
    </button>
  )
}

function SuccessBlock() {
  return (
    <div className="py-8 flex flex-col items-center gap-3 text-center">
      <div className="w-14 h-14 rounded-full bg-beige/10 flex items-center justify-center">
        <CheckCircle size={28} className="text-beige" />
      </div>
      <p className="text-white font-heading font-semibold">Dziękujemy!</p>
      <p className="text-white/40 text-sm">Skontaktujemy się wkrótce.</p>
    </div>
  )
}

function ErrorBlock() {
  return (
    <div className="flex items-center gap-2 text-red-400 text-xs justify-center">
      <AlertCircle size={14} /> Błąd wysyłania. Spróbuj ponownie.
    </div>
  )
}
