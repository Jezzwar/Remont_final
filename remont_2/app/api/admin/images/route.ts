import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabase-server'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE = 10 * 1024 * 1024

function isValidImageBuffer(buffer: Buffer): boolean {
  if (buffer.length < 4) return false
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return true
  if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) return true
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) return true
  return false
}

// POST: add new image to a category
export async function POST(req: NextRequest) {
  const supabaseAuth = createSupabaseServer()
  const { data: { session } } = await supabaseAuth.auth.getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File
  const category = formData.get('category') as string
  const label = (formData.get('label') as string) || ''

  if (!file || !category) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  if (!['hero', 'portfolio', 'before_after'].includes(category)) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
  }
  if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'File too large' }, { status: 400 })
  if (!ALLOWED_MIME_TYPES.includes(file.type)) return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  if (!isValidImageBuffer(buffer)) return NextResponse.json({ error: 'Invalid file content' }, { status: 400 })

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const timestamp = Date.now()
  const storagePath = `${category}/${timestamp}.${ext}`

  const supabase = createSupabaseAdmin()

  const { error: uploadError } = await supabase.storage
    .from('photos')
    .upload(storagePath, buffer, { contentType: file.type, upsert: false })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  // Get max sort_order for category
  const { data: existing } = await supabase
    .from('site_images')
    .select('sort_order')
    .eq('category', category)
    .order('sort_order', { ascending: false })
    .limit(1)

  const nextOrder = existing && existing.length > 0 ? (existing[0].sort_order + 1) : 1

  const { data, error: dbError } = await supabase
    .from('site_images')
    .insert({ category, label: label || `${category} ${nextOrder}`, storage_path: storagePath, sort_order: nextOrder })
    .select()
    .single()

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  const url = supabase.storage.from('photos').getPublicUrl(storagePath).data.publicUrl
  return NextResponse.json({ ...data, url })
}
