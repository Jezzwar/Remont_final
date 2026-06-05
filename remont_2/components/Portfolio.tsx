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
    <section id="realizacje" className="bg-graphite pt-16 pb-6 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <SectionHeading label="Wybrane projekty" title={t('title')} />
        <PortfolioCarousel images={images} />
      </div>
    </section>
  )
}
