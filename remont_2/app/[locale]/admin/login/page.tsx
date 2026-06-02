'use client'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createSupabaseBrowser } from '@/lib/supabase-browser'

export default function LoginPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createSupabaseBrowser()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Nieprawidłowy email lub hasło.')
      setLoading(false)
    } else {
      router.refresh()
      router.push(`/${locale}/admin/photos`)
    }
  }

  return (
    <div className="min-h-screen bg-graphite flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-heading font-bold text-2xl text-white text-center mb-8">
          Panel administracyjny
        </h1>
        <form onSubmit={handleLogin} className="bg-white/5 rounded-2xl p-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-beige/60 text-sm"
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-beige/60 text-sm"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-beige text-graphite font-semibold py-3 rounded-lg hover:bg-beige-light transition-colors disabled:opacity-60"
          >
            {loading ? '...' : 'Zaloguj się'}
          </button>
        </form>
      </div>
    </div>
  )
}
