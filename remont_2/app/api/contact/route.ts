import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase-server'

// Simple in-memory rate limiter: max 3 submissions per IP per 10 minutes
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 3
const WINDOW_MS = 10 * 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

function sanitize(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLen)
}

const PHONE_RE = /^[+\d\s\-()]{7,20}$/

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const raw = body as Record<string, unknown>
  const name    = sanitize(raw.name, 100)
  const phone   = sanitize(raw.phone, 30)
  const email   = sanitize(raw.email, 200)
  const sqm     = sanitize(raw.sqm, 30)
  const userMsg = sanitize(raw.message, 2000)
  const message = sqm ? `Площадь: ${sqm}\n\n${userMsg}`.trim() : userMsg

  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
  }

  if (!PHONE_RE.test(phone)) {
    return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
  }

  const supabase = createSupabaseAdmin()
  const { error } = await supabase.from('leads').insert({ name, phone, email, message })

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
