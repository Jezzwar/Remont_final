import { createSupabaseAdmin } from '@/lib/supabase-server'
import PhotoCard from './PhotoCard'
import AdminNav from '../AdminNav'

async function getImages() {
  const supabase = createSupabaseAdmin()
  const { data } = await supabase.from('site_images').select('*').order('sort_order')
  if (!data) return []
  return data.map((img) => ({
    ...img,
    url: supabase.storage.from('photos').getPublicUrl(img.storage_path).data.publicUrl,
  }))
}

export default async function PhotosPage() {
  const images = await getImages()
  const grouped = {
    hero: images.filter((i) => i.category === 'hero'),
    portfolio: images.filter((i) => i.category === 'portfolio'),
    before_after: images.filter((i) => i.category === 'before_after'),
  }
  const categoryLabels: Record<string, string> = {
    hero: 'Hero',
    portfolio: 'Portfolio',
    before_after: 'Przed / Po',
  }

  return (
    <div className="min-h-screen bg-graphite text-white">
      <AdminNav active="photos" />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-heading font-bold text-2xl mb-8">Zarządzanie zdjęciami</h1>
        {Object.entries(grouped).map(([cat, imgs]) => (
          <div key={cat} className="mb-12">
            <h2 className="text-beige font-semibold mb-4">{categoryLabels[cat]}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {imgs.map((img) => (
                <PhotoCard key={img.id} image={img} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
