import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, phone, email, message } = body

  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
  }

  const supabase = createSupabaseAdmin()
  const { error } = await supabase.from('leads').insert({ name, phone, email, message })

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
