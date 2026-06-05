import { createSupabaseAdmin } from '@/lib/supabase-server'
import AdminNav from '../AdminNav'
import PhotosManager from './PhotosManager'

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

  return (
    <div className="min-h-screen bg-graphite text-white">
      <AdminNav active="photos" />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-heading font-bold text-2xl mb-8">Zdjęcia</h1>
        <PhotosManager initialImages={images} />
      </div>
    </div>
  )
}
