import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabase-server'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

// Validate magic bytes to prevent MIME type spoofing
function isValidImageBuffer(buffer: Buffer): boolean {
  if (buffer.length < 4) return false
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return true
  // WebP: RIFF....WEBP
  if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) return true
  // GIF: GIF8
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) return true
  return false
}

export async function POST(req: NextRequest) {
  const supabaseAuth = createSupabaseServer()
  const { data: { session } } = await supabaseAuth.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File
  const imageId = formData.get('imageId') as string
  const storagePath = formData.get('storagePath') as string

  if (!file || !imageId || !storagePath) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'File too large' }, { status: 400 })
  }

  // Validate MIME type header
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }

  // Sanitize storagePath to prevent path traversal
  const safePath = storagePath.replace(/\.\./g, '').replace(/^\/+/, '')
  if (!safePath || safePath !== storagePath) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Validate actual file content via magic bytes
  if (!isValidImageBuffer(buffer)) {
    return NextResponse.json({ error: 'Invalid file content' }, { status: 400 })
  }

  const supabase = createSupabaseAdmin()

  const { error: uploadError } = await supabase.storage
    .from('photos')
    .upload(safePath, buffer, {
      contentType: file.type,
      upsert: true,
    })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const { error: dbError } = await supabase
    .from('site_images')
    .update({ storage_path: safePath, updated_at: new Date().toISOString() })
    .eq('id', imageId)

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
