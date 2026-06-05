import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabase-server'

async function requireAdmin() {
  const supabase = createSupabaseServer()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { question_pl, answer_pl, question_en, answer_en, question_ru, answer_ru, sort_order, is_active } = body

  const supabase = createSupabaseAdmin()
  const { data, error } = await supabase
    .from('faq_items')
    .update({ question_pl, answer_pl, question_en, answer_en, question_ru, answer_ru, sort_order, is_active })
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createSupabaseAdmin()
  const { error } = await supabase.from('faq_items').delete().eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
