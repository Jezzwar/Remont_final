import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabase-server'

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const supabaseAuth = createSupabaseServer()
  const { data: { session } } = await supabaseAuth.auth.getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createSupabaseAdmin()

  // Get the image to find storage path
  const { data: img } = await supabase
    .from('site_images')
    .select('storage_path')
    .eq('id', params.id)
    .single()

  if (!img) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Delete from storage
  await supabase.storage.from('photos').remove([img.storage_path])

  // Delete from DB
  const { error } = await supabase.from('site_images').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
