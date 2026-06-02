import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { createSupabaseAdmin } from '@/lib/supabase-server'
import { ArrowRight } from 'lucide-react'

async function getPortfolioImages() {
  const supabase = createSupabaseAdmin()
  const { data } = await supabase
    .from('site_images')
    .select('*')
    .eq('category', 'portfolio')
    .order('sort_order')
  if (!data) return []
  return data.map((img) => ({
    ...img,
    url: supabase.storage.from('photos').getPublicUrl(img.storage_path).data.publicUrl,
  }))
}

export default async function Portfolio() {
  const t = await getTranslations('portfolio')
  const images = await getPortfolioImages()

  return (
    <section id="realizacje" className="px-6 sm:px-10 lg:px-16 py-20 bg-graphite">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold text-3xl text-white mb-10 uppercase tracking-wide">
          {t('title')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
              <Image
                src={img.url}
                alt={img.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <div className="text-white font-semibold text-sm">{img.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#kontakt" className="inline-flex items-center gap-2 text-beige hover:text-beige-light transition-colors text-sm">
            {t('see_more')} <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
