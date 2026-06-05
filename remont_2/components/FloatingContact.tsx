'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { X, Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { ComboBox, Input as ComboInput, ListBox } from './ui/heroui-combo-box'
import Alert from './ui/alert'

type Step = 'menu' | 'quick' | 'full' | 'email'
type Status = 'idle' | 'loading' | 'success' | 'error'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^[\d\s\+\-\(\)]{7,}$/

function validateForm(form: Record<string, string>): string | null {
  if (form.phone && !phoneRe.test(form.phone)) return 'phone'
  if (form.email && !emailRe.test(form.email)) return 'email'
  return null
}

export default function FloatingContact() {
  const t = useTranslations('modal')
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('menu')
  const spinControls = useAnimation()

  function startSpin() {
    spinControls.start({ rotate: 360, transition: { duration: 1.4, repeat: Infinity, ease: 'linear', repeatType: 'loop' } })
  }
  function stopSpin() {
    spinControls.stop()
    spinControls.set({ rotate: 0 })
  }
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', rooms: '', budget: '' })
  const [fieldError, setFieldError] = useState<string | null>(null)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('openContactModal', handler)
    return () => window.removeEventListener('openContactModal', handler)
  }, [])

  function close() {
    setOpen(false)
    setTimeout(() => { setStep('menu'); setStatus('idle'); setFieldError(null) }, 300)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const err = validateForm(form)
    if (err) { setFieldError(err); return }
    setFieldError(null)
    setStatus('loading')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  const field = (key: keyof typeof form, placeholder: string, type = 'text') => (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={e => { setForm({ ...form, [key]: e.target.value }); setFieldError(null) }}
        className={`w-full bg-white/[0.06] border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none text-sm transition-all ${
          fieldError === key ? 'border-red-500/60 focus:border-red-400' : 'border-white/15 focus:border-beige/50'
        }`}
      />
    </div>
  )

  const roomsOptions = [
    { id: '1', label: t('rooms_1') },
    { id: '2', label: t('rooms_2') },
    { id: '3', label: t('rooms_3') },
    { id: '4+', label: t('rooms_4') },
  ]

  const budgetOptions = [
    { id: 'do 30k', label: t('budget_1') },
    { id: '30-60k', label: t('budget_2') },
    { id: '60-100k', label: t('budget_3') },
    { id: '100k+', label: t('budget_4') },
  ]

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        onHoverStart={startSpin}
        onHoverEnd={stopSpin}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }, scale: { duration: 0.15 } }}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#2a2218] shadow-[0_8px_32px_rgba(0,0,0,0.7)] overflow-hidden border border-beige/20"
        aria-label="Rozpocznij projekt"
      >
        <motion.div animate={spinControls}>
          <Image src="/logo_icon.png" alt="Logo" width={40} height={40} className="object-contain" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />

            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="w-[min(540px,92vw)] rounded-2xl bg-graphite border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.7)] pointer-events-auto"
              >
                <div className="flex items-start justify-between p-8 pb-5">
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-heading mb-2">{t('label')}</p>
                    <h2 className="font-heading font-bold text-3xl text-white leading-tight whitespace-pre-line">
                      {t('title')}<span className="text-beige">.</span>
                    </h2>
                  </div>
                  <button onClick={close} className="text-white/40 hover:text-white transition-colors mt-1"><X size={20} /></button>
                </div>

                <div className="px-8 pb-8">
                  <AnimatePresence mode="wait">

                    {step === 'menu' && (
                      <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="border-t border-white/8 pt-4 mb-4">
                          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-heading mb-3">{t('fill_brief')}</p>
                          <button onClick={() => setStep('quick')} className="w-full flex items-center justify-between py-4 border-b border-white/8 group">
                            <div className="text-left">
                              <p className="text-white font-heading font-semibold text-sm">{t('quick_title')}</p>
                              <p className="text-white/40 text-xs mt-0.5">{t('quick_desc')}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-beige text-xs font-heading">{t('min_1_2')}</span>
                              <ArrowRight size={14} className="text-beige/60 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </button>
                          <button onClick={() => setStep('full')} className="w-full flex items-center justify-between py-4 group">
                            <div className="text-left">
                              <p className="text-white font-heading font-semibold text-sm">{t('full_title')}</p>
                              <p className="text-white/40 text-xs mt-0.5">{t('full_desc')}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-beige text-xs font-heading">{t('min_3_5')}</span>
                              <ArrowRight size={14} className="text-beige/60 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </button>
                        </div>
                        <div className="border-t border-white/8 pt-4">
                          <p className="text-beige text-[10px] uppercase tracking-[0.2em] font-heading mb-1">{t('email_label')}</p>
                          <p className="text-white/40 text-xs mb-4">{t('email_desc')}</p>
                          <button onClick={() => setStep('email')} className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-beige/30 transition-all group">
                            <span className="text-white/60 text-sm">{t('email_cta')}</span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 'quick' && (
                      <motion.div key="quick" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        {status === 'success' ? <SuccessBlock title={t('success_title')} desc={t('success_desc')} /> : (
                          <form onSubmit={submit} noValidate className="space-y-3">
                            <button type="button" onClick={() => setStep('menu')} className="text-white/40 text-xs hover:text-white mb-2 flex items-center gap-1">{t('back')}</button>
                            {field('name', t('name'))}
                            {field('phone', t('phone'), 'tel')}
                            <ComboBox fullWidth onSelectionChange={key => setForm(f => ({ ...f, rooms: String(key ?? '') }))}>
                              <ComboBox.InputGroup>
                                <ComboInput fullWidth placeholder={t('rooms_placeholder')} />
                                <ComboBox.Trigger />
                              </ComboBox.InputGroup>
                              <ComboBox.Popover>
                                <ListBox>
                                  {roomsOptions.map(o => (
                                    <ListBox.Item key={o.id} id={o.id} textValue={o.label}>
                                      {o.label}<ListBox.ItemIndicator />
                                    </ListBox.Item>
                                  ))}
                                </ListBox>
                              </ComboBox.Popover>
                            </ComboBox>
                            {fieldError === 'phone' && <Alert type="error" message={t('error_phone')} />}
                            <SubmitButton status={status} label={t('submit')} />
                            {status === 'error' && <ErrorBlock msg={t('error')} />}
                          </form>
                        )}
                      </motion.div>
                    )}

                    {step === 'full' && (
                      <motion.div key="full" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        {status === 'success' ? <SuccessBlock title={t('success_title')} desc={t('success_desc')} /> : (
                          <form onSubmit={submit} noValidate className="space-y-3">
                            <button type="button" onClick={() => setStep('menu')} className="text-white/40 text-xs hover:text-white mb-2 flex items-center gap-1">{t('back')}</button>
                            {field('name', t('name'))}
                            {field('phone', t('phone'), 'tel')}
                            {field('email', t('email'), 'email')}
                            <ComboBox fullWidth onSelectionChange={key => setForm(f => ({ ...f, budget: String(key ?? '') }))}>
                              <ComboBox.InputGroup>
                                <ComboInput fullWidth placeholder={t('budget_placeholder')} />
                                <ComboBox.Trigger />
                              </ComboBox.InputGroup>
                              <ComboBox.Popover>
                                <ListBox>
                                  {budgetOptions.map(o => (
                                    <ListBox.Item key={o.id} id={o.id} textValue={o.label}>
                                      {o.label}<ListBox.ItemIndicator />
                                    </ListBox.Item>
                                  ))}
                                </ListBox>
                              </ComboBox.Popover>
                            </ComboBox>
                            <textarea rows={3} placeholder={t('message')} value={form.message}
                              onChange={e => setForm({ ...form, message: e.target.value })}
                              className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-beige/50 text-sm resize-none transition-all" />
                            {fieldError === 'phone' && <Alert type="error" message={t('error_phone')} />}
                            {fieldError === 'email' && <Alert type="error" message={t('error_email')} />}
                            <SubmitButton status={status} label={t('submit')} />
                            {status === 'error' && <ErrorBlock msg={t('error')} />}
                          </form>
                        )}
                      </motion.div>
                    )}

                    {step === 'email' && (
                      <motion.div key="email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        {status === 'success' ? <SuccessBlock title={t('success_title')} desc={t('success_desc')} /> : (
                          <form onSubmit={submit} noValidate className="space-y-3">
                            <button type="button" onClick={() => setStep('menu')} className="text-white/40 text-xs hover:text-white mb-2 flex items-center gap-1">{t('back')}</button>
                            {field('name', t('name'))}
                            {field('email', `${t('email')} *`, 'email')}
                            {fieldError === 'email' && <Alert type="error" message={t('error_email')} />}
                            <SubmitButton status={status} label={t('submit_email')} />
                            {status === 'error' && <ErrorBlock msg={t('error')} />}
                          </form>
                        )}
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function SubmitButton({ status, label }: { status: Status; label: string }) {
  return (
    <button type="submit" disabled={status === 'loading'}
      className="w-full flex items-center justify-center gap-2 bg-beige text-graphite font-heading font-semibold py-3 rounded-xl hover:bg-beige-light transition-colors duration-200 disabled:opacity-60 text-sm">
      {status === 'loading'
        ? <span className="inline-block w-4 h-4 border-2 border-graphite/40 border-t-graphite rounded-full animate-spin" />
        : <><Send size={14} /> {label}</>}
    </button>
  )
}

function SuccessBlock({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="py-8 flex flex-col items-center gap-3 text-center">
      <div className="w-14 h-14 rounded-full bg-beige/10 flex items-center justify-center">
        <CheckCircle size={28} className="text-beige" />
      </div>
      <p className="text-white font-heading font-semibold">{title}</p>
      <p className="text-white/40 text-sm">{desc}</p>
    </div>
  )
}

function ErrorBlock({ msg }: { msg: string }) {
  return (
    <div className="flex items-center gap-2 text-red-400 text-xs justify-center">
      <AlertCircle size={14} /> {msg}
    </div>
  )
}
