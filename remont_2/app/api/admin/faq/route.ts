import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabase-server'

async function requireAdmin() {
  const supabase = createSupabaseServer()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createSupabaseAdmin()
  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .order('sort_order')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { question_pl, answer_pl, question_en, answer_en, question_ru, answer_ru, sort_order } = body

  const supabase = createSupabaseAdmin()
  const { data, error } = await supabase
    .from('faq_items')
    .insert({ question_pl, answer_pl, question_en, answer_en, question_ru, answer_ru, sort_order: sort_order ?? 99, is_active: true })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
