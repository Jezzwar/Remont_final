import { useTranslations } from 'next-intl'
import { Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import { createSupabaseAdmin } from '@/lib/supabase-server'

async function getHeroImage() {
  const supabase = createSupabaseAdmin()
  const { data } = await supabase
    .from('site_images')
    .select('storage_path')
    .eq('category', 'hero')
    .single()
  if (!data) return null
  const { data: { publicUrl } } = supabase.storage
    .from('photos')
    .getPublicUrl(data.storage_path)
  return publicUrl
}

export default async function Hero() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('hero')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ts = useTranslations('stats')
  const heroImage = await getHeroImage()

  return (
    <section className="relative overflow-hidden px-6 pb-0 pt-24 sm:px-10 lg:px-16 bg-graphite">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center py-16">
          <div className="space-y-6">
            <span className="inline-block bg-white/10 text-beige text-sm px-4 py-1.5 rounded-full ring-1 ring-beige/20">
              {t('badge')}
            </span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              {t('title')}
            </h1>
            <p className="text-beige font-heading font-medium text-lg">
              {t('subtitle')}
            </p>
            <p className="text-white/60 leading-relaxed max-w-lg">
              {t('description')}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+48000000000"
                className="flex items-center gap-2 bg-beige text-graphite font-semibold px-6 py-3 rounded-full hover:bg-beige-light transition-colors"
              >
                <Phone size={16} /> {t('cta_call')}
              </a>
              <a
                href="#kontakt"
                className="flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full hover:border-white/60 transition-colors"
              >
                <Mail size={16} /> {t('cta_message')}
              </a>
            </div>
          </div>

          <div className="relative h-72 sm:h-96 lg:h-[520px] rounded-2xl overflow-hidden">
            {heroImage ? (
              <Image src={heroImage} alt="Remont" fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full bg-white/5 rounded-2xl flex items-center justify-center text-white/20">
                Brak zdjęcia
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/10 py-8 gap-6">
          {[
            { value: '20', label: ts('experience') },
            { value: '500+', label: ts('projects') },
            { value: '98%', label: ts('satisfaction') },
            { value: '📍', label: ts('area') },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-beige font-heading font-bold text-2xl">{s.value}</div>
              <div className="text-white/60 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
