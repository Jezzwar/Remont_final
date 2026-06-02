import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { createSupabaseAdmin } from '@/lib/supabase-server'

async function getBeforeAfterImages() {
  const supabase = createSupabaseAdmin()
  const { data } = await supabase
    .from('site_images')
    .select('*')
    .eq('category', 'before_after')
    .order('sort_order')
  if (!data) return []
  const withUrls = data.map((img) => ({
    ...img,
    url: supabase.storage.from('photos').getPublicUrl(img.storage_path).data.publicUrl,
  }))
  const pairs: Array<{ before: typeof withUrls[0]; after: typeof withUrls[0] }> = []
  for (let i = 0; i < withUrls.length - 1; i += 2) {
    pairs.push({ before: withUrls[i], after: withUrls[i + 1] })
  }
  return pairs
}

export default async function BeforeAfter() {
  const t = await getTranslations('before_after')
  const pairs = await getBeforeAfterImages()

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-20 bg-graphite">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold text-sm uppercase tracking-wide text-white mb-10">
          {t('title')}
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {pairs.map((pair, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src={pair.before.url} alt="Przed" fill className="object-cover" />
                <span className="absolute bottom-2 left-2 bg-graphite text-white text-xs px-2 py-0.5 rounded">
                  {t('before')}
                </span>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src={pair.after.url} alt="Po" fill className="object-cover" />
                <span className="absolute bottom-2 left-2 bg-beige text-graphite text-xs px-2 py-0.5 rounded font-semibold">
                  {t('after')}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-right">
          <a href="#kontakt" className="inline-flex items-center gap-2 text-beige hover:text-beige-light text-sm transition-colors">
            {t('see_more')} <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
