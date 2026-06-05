import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin routes
  const adminMatch = pathname.match(/^\/(pl|en)\/admin(?!\/login)/)
  if (adminMatch) {
    const response = NextResponse.next()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value }) => response.cookies.set(name, value))
          },
        },
      }
    )
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      const locale = adminMatch[1]
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url))
    }
    return response
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
