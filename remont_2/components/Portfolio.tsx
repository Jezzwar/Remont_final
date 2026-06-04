import { getTranslations } from 'next-intl/server'
import { createSupabaseAdmin } from '@/lib/supabase-server'
import { SectionHeading } from '@/components/ui/section-heading'
import { PortfolioCarousel } from '@/components/PortfolioCarousel'

async function getPortfolioImages() {
  const supabase = createSupabaseAdmin()
  const { data } = await supabase
    .from('site_images')
    .select('*')
    .eq('category', 'portfolio')
    .order('sort_order')
  if (!data || data.length === 0) return []
  return data.map((img) => ({
    src: supabase.storage.from('photos').getPublicUrl(img.storage_path).data.publicUrl,
    alt: img.label ?? 'Realizacja',
    label: img.label,
  }))
}

export default async function Portfolio() {
  const t = await getTranslations('portfolio')
  const images = await getPortfolioImages()

  return (
    <section id="realizacje" className="bg-graphite py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-6">
        <SectionHeading label="Wybrane projekty" title={t('title')} linkText={t('see_more')} linkHref="#kontakt" />
      </div>
      <div className="border border-white/[0.08] rounded-2xl mx-6 sm:mx-10 lg:mx-16 overflow-hidden" id="portfolio-wrap">
        <PortfolioCarousel images={images} />
      </div>
    </section>
  )
}
