'use client'
import { createSupabaseBrowser } from '@/lib/supabase-browser'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function AdminNav({ active }: { active: 'photos' | 'leads' | 'faq' }) {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string

  async function handleLogout() {
    const supabase = createSupabaseBrowser()
    await supabase.auth.signOut()
    router.push(`/${locale}/admin/login`)
  }

  return (
    <nav className="bg-graphite border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex gap-4">
        <Link
          href={`/${locale}/admin/photos`}
          className={`text-sm px-4 py-2 rounded-lg transition-colors ${active === 'photos' ? 'bg-beige/20 text-beige' : 'text-white/60 hover:text-white'}`}
        >
          Zdjęcia
        </Link>
        <Link
          href={`/${locale}/admin/leads`}
          className={`text-sm px-4 py-2 rounded-lg transition-colors ${active === 'leads' ? 'bg-beige/20 text-beige' : 'text-white/60 hover:text-white'}`}
        >
          Zapytania
        </Link>
        <Link
          href={`/${locale}/admin/faq`}
          className={`text-sm px-4 py-2 rounded-lg transition-colors ${active === 'faq' ? 'bg-beige/20 text-beige' : 'text-white/60 hover:text-white'}`}
        >
          FAQ
        </Link>
      </div>
      <button onClick={handleLogout} className="text-white/50 hover:text-white text-sm transition-colors">
        Wyloguj
      </button>
    </nav>
  )
}
