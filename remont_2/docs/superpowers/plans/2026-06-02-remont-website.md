# Remont Naprawa — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-themed renovation company landing site (PL/EN/RU) with a simple admin panel for photo management and lead viewing, hosted on Vercel with Supabase as backend.

**Architecture:** Next.js 14 App Router with locale-prefixed routing (`/pl`, `/en`, `/ru`). Supabase handles PostgreSQL (leads table), Storage (photos bucket), and Auth (admin login). Admin panel lives at `/[locale]/admin/*` protected by middleware session check.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, next-intl, Supabase (@supabase/ssr), Vercel

---

## File Map

```
remont_2/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # locale layout, fonts
│   │   ├── page.tsx            # landing page (assembles all sections)
│   │   └── admin/
│   │       ├── login/page.tsx  # login form
│   │       ├── photos/page.tsx # photo management
│   │       └── leads/page.tsx  # leads viewer + CSV export
│   └── api/
│       ├── contact/route.ts    # POST: save lead
│       └── upload/route.ts     # POST: upload photo
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Portfolio.tsx
│   ├── BeforeAfter.tsx
│   ├── Process.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   └── LanguageSwitcher.tsx
├── lib/
│   ├── supabase-server.ts      # server-side client
│   └── supabase-browser.ts     # browser-side client
├── messages/
│   ├── pl.json
│   ├── en.json
│   └── ru.json
├── middleware.ts
├── i18n.ts
├── next.config.ts
└── tailwind.config.ts
```

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: project root via CLI

- [ ] **Step 1: Create Next.js 14 app**

```bash
cd c:/Users/retro/Desktop/web/remont_2
npx create-next-app@14 . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted: accept defaults. This populates `package.json`, `next.config.ts`, `tailwind.config.ts`, `app/` etc.

- [ ] **Step 2: Install dependencies**

```bash
npm install next-intl @supabase/ssr @supabase/supabase-js lucide-react
```

- [ ] **Step 3: Remove boilerplate**

Delete `app/page.tsx` content (we'll replace it), delete `app/globals.css` content except the Tailwind directives.

`app/globals.css` should contain only:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 project"
```

---

## Task 2: Brand Tailwind config + fonts

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx` (root)

- [ ] **Step 1: Update `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        graphite: '#1F1F1F',
        beige: '#D8C3A5',
        'beige-light': '#E8D9C0',
        'gray-light': '#F3F3F3',
      },
      fontFamily: {
        heading: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: Update root `app/layout.tsx` with Google Fonts**

```typescript
import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Remont Naprawa Warszawa',
  description: 'Remonty mieszkań i domów pod klucz',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className={`${montserrat.variable} ${inter.variable} font-body bg-graphite text-white`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add brand colors and fonts"
```

---

## Task 3: next-intl setup (i18n)

**Files:**
- Create: `i18n.ts`
- Create: `middleware.ts`
- Create: `messages/pl.json`
- Create: `messages/en.json`
- Create: `messages/ru.json`
- Create: `app/[locale]/layout.tsx`

- [ ] **Step 1: Create `i18n.ts`**

```typescript
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}))
```

- [ ] **Step 2: Create `middleware.ts`**

```typescript
import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const intlMiddleware = createMiddleware({
  locales: ['pl', 'en', 'ru'],
  defaultLocale: 'pl',
})

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin routes
  const adminMatch = pathname.match(/^\/(pl|en|ru)\/admin(?!\/login)/)
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
```

- [ ] **Step 3: Update `next.config.ts`**

```typescript
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
```

- [ ] **Step 4: Create `messages/pl.json`**

```json
{
  "nav": {
    "services": "Usługi",
    "portfolio": "Realizacje",
    "about": "O nas",
    "reviews": "Opinie",
    "faq": "FAQ",
    "contact": "Kontakt",
    "call": "Zadzwoń"
  },
  "hero": {
    "badge": "Profesjonalne remonty wnętrz",
    "title": "Remont pod klucz bez stresu",
    "subtitle": "Remonty mieszkań i domów | Warszawa",
    "description": "Bierzemy na siebie cały proces remontu: organizację, wykonawców i materiały. Ty zyskujesz piękne wnętrze bez chaosu i bez stresu.",
    "cta_call": "Zadzwoń: +48 XXX XXX XXX",
    "cta_message": "Wyślij wiadomość"
  },
  "stats": {
    "experience": "lat doświadczenia",
    "projects": "zrealizowanych projektów",
    "satisfaction": "zadowolonych klientów",
    "area": "Warszawa i okolice"
  },
  "services": {
    "title": "Nasze Usługi",
    "walls": { "name": "Ściany", "desc": "Malowanie, gładzie, ściany działowe" },
    "floors": { "name": "Podłogi", "desc": "Panele, deski, płytki, listwy" },
    "ceilings": { "name": "Sufity", "desc": "Sufity podwieszane, zabudowy, oświetlenie" },
    "finishing": { "name": "Wykończenia", "desc": "Listwy, drzwi, detale wykończeniowe" },
    "bathrooms": { "name": "Łazienki", "desc": "Kompleksowe remonty łazienek" },
    "kitchens": { "name": "Kuchnie", "desc": "Zabudowy i aranżacje kuchenne" },
    "installations": { "name": "Instalacje", "desc": "Elektryka, hydraulika, wentylacja" },
    "turnkey": { "name": "Remont pod klucz", "desc": "Kompleksowa realizacja od A do Z" }
  },
  "portfolio": {
    "title": "Realizacje",
    "see_more": "Zobacz więcej realizacji"
  },
  "before_after": {
    "title": "Przed / Po",
    "before": "PRZED",
    "after": "PO",
    "see_more": "Zobacz więcej metamorfoz"
  },
  "process": {
    "title": "Jak pracujemy",
    "step1": { "title": "Konsultacja", "desc": "Poznajemy Twoje potrzeby i omawiamy wizję projektu." },
    "step2": { "title": "Wycena", "desc": "Przedstawiamy przejrzystą wycenę bez ukrytych kosztów." },
    "step3": { "title": "Realizacja", "desc": "Realizujemy prace zgodnie z ustalonym harmonogramem." },
    "step4": { "title": "Odbiór", "desc": "Dokładnie odbieramy prace i przekazujemy gotowe wnętrze." }
  },
  "testimonials": {
    "title": "Opinie klientów",
    "see_more": "Zobacz więcej opinii"
  },
  "faq": {
    "title": "FAQ – Najczęściej zadawane pytania",
    "q1": "Ile trwa remont mieszkania?",
    "a1": "Czas zależy od zakresu prac. Standardowy remont 50m² trwa 4–6 tygodni.",
    "q2": "Czy pomogliście w doborze materiałów?",
    "a2": "Tak, oferujemy doradztwo w wyborze materiałów wykończeniowych.",
    "q3": "Czy wykonujecie projekty wnętrz?",
    "a3": "Współpracujemy z projektantami wnętrz i możemy zorganizować projekt.",
    "q4": "Jak wygląda płatność?",
    "a4": "Płatność etapami zgodnie z harmonogramem prac.",
    "q5": "Czy oferujecie gwarancję na prace?",
    "a5": "Tak, udzielamy 12 miesięcy gwarancji na wszystkie wykonane prace."
  },
  "contact": {
    "title": "Gotowy na zmianę?",
    "subtitle": "Zadzwoń i umów bezpłatną konsultację.",
    "cta": "Zadzwoń: +48 XXX XXX XXX",
    "form_name": "Imię i nazwisko",
    "form_phone": "Telefon",
    "form_email": "Email (opcjonalnie)",
    "form_message": "Wiadomość (opcjonalnie)",
    "form_submit": "Wyślij zapytanie",
    "form_success": "Dziękujemy! Odezwiemy się wkrótce.",
    "form_error": "Coś poszło nie tak. Spróbuj ponownie."
  },
  "footer": {
    "tagline": "Remonty mieszkań i domów pod klucz. Profesjonalnie, terminowo i bez stresu.",
    "nav_title": "Nawigacja",
    "contact_title": "Kontakt",
    "area_title": "Obszar działania",
    "area_text": "Warszawa i okolice: Mokotów, Wilanów, Ursynów, Wola, Bemowo i inne dzielnice.",
    "rights": "Wszelkie prawa zastrzeżone.",
    "privacy": "Polityka prywatności",
    "terms": "Regulamin",
    "cookies": "Cookies"
  },
  "admin": {
    "photos_title": "Zarządzanie zdjęciami",
    "leads_title": "Zapytania",
    "replace": "Zamień zdjęcie",
    "upload_success": "Zdjęcie zaktualizowane",
    "upload_error": "Błąd przesyłania",
    "export_csv": "Eksportuj CSV",
    "logout": "Wyloguj",
    "name": "Imię",
    "phone": "Telefon",
    "email": "Email",
    "date": "Data",
    "message": "Wiadomość",
    "category_hero": "Hero",
    "category_portfolio": "Portfolio",
    "category_before_after": "Przed / Po"
  }
}
```

- [ ] **Step 5: Create `messages/en.json`**

```json
{
  "nav": {
    "services": "Services",
    "portfolio": "Portfolio",
    "about": "About",
    "reviews": "Reviews",
    "faq": "FAQ",
    "contact": "Contact",
    "call": "Call us"
  },
  "hero": {
    "badge": "Professional interior renovations",
    "title": "Turnkey renovation without stress",
    "subtitle": "Apartment & house renovations | Warsaw",
    "description": "We take care of the entire renovation process: coordination, contractors and materials. You get a beautiful interior without chaos or stress.",
    "cta_call": "Call: +48 XXX XXX XXX",
    "cta_message": "Send a message"
  },
  "stats": {
    "experience": "years of experience",
    "projects": "completed projects",
    "satisfaction": "satisfied clients",
    "area": "Warsaw & area"
  },
  "services": {
    "title": "Our Services",
    "walls": { "name": "Walls", "desc": "Painting, plastering, partition walls" },
    "floors": { "name": "Floors", "desc": "Panels, boards, tiles, skirting" },
    "ceilings": { "name": "Ceilings", "desc": "Suspended ceilings, built-ins, lighting" },
    "finishing": { "name": "Finishing", "desc": "Trims, doors, finishing details" },
    "bathrooms": { "name": "Bathrooms", "desc": "Full bathroom renovations" },
    "kitchens": { "name": "Kitchens", "desc": "Kitchen built-ins and arrangements" },
    "installations": { "name": "Installations", "desc": "Electrical, plumbing, ventilation" },
    "turnkey": { "name": "Turnkey renovation", "desc": "Full project management A to Z" }
  },
  "portfolio": { "title": "Portfolio", "see_more": "See more projects" },
  "before_after": { "title": "Before / After", "before": "BEFORE", "after": "AFTER", "see_more": "See more transformations" },
  "process": {
    "title": "How we work",
    "step1": { "title": "Consultation", "desc": "We learn your needs and discuss the project vision." },
    "step2": { "title": "Quote", "desc": "We provide a transparent quote with no hidden costs." },
    "step3": { "title": "Execution", "desc": "We carry out work according to the agreed schedule." },
    "step4": { "title": "Handover", "desc": "We carefully inspect and hand over the finished interior." }
  },
  "testimonials": { "title": "Client reviews", "see_more": "See more reviews" },
  "faq": {
    "title": "FAQ – Frequently asked questions",
    "q1": "How long does an apartment renovation take?",
    "a1": "It depends on the scope. A standard 50m² renovation takes 4–6 weeks.",
    "q2": "Do you help with material selection?",
    "a2": "Yes, we offer advice on finishing materials.",
    "q3": "Do you handle interior design?",
    "a3": "We work with interior designers and can arrange a project.",
    "q4": "How does payment work?",
    "a4": "Payment in stages according to the work schedule.",
    "q5": "Do you offer a warranty?",
    "a5": "Yes, we provide a 12-month warranty on all completed work."
  },
  "contact": {
    "title": "Ready for a change?",
    "subtitle": "Call and schedule a free consultation.",
    "cta": "Call: +48 XXX XXX XXX",
    "form_name": "Full name",
    "form_phone": "Phone",
    "form_email": "Email (optional)",
    "form_message": "Message (optional)",
    "form_submit": "Send inquiry",
    "form_success": "Thank you! We'll be in touch soon.",
    "form_error": "Something went wrong. Please try again."
  },
  "footer": {
    "tagline": "Turnkey apartment and house renovations. Professional, on time, stress-free.",
    "nav_title": "Navigation",
    "contact_title": "Contact",
    "area_title": "Service area",
    "area_text": "Warsaw and surrounding areas: Mokotów, Wilanów, Ursynów, Wola, Bemowo and more.",
    "rights": "All rights reserved.",
    "privacy": "Privacy policy",
    "terms": "Terms",
    "cookies": "Cookies"
  },
  "admin": {
    "photos_title": "Photo management",
    "leads_title": "Inquiries",
    "replace": "Replace photo",
    "upload_success": "Photo updated",
    "upload_error": "Upload error",
    "export_csv": "Export CSV",
    "logout": "Log out",
    "name": "Name",
    "phone": "Phone",
    "email": "Email",
    "date": "Date",
    "message": "Message",
    "category_hero": "Hero",
    "category_portfolio": "Portfolio",
    "category_before_after": "Before / After"
  }
}
```

- [ ] **Step 6: Create `messages/ru.json`**

```json
{
  "nav": {
    "services": "Услуги",
    "portfolio": "Реализации",
    "about": "О нас",
    "reviews": "Отзывы",
    "faq": "FAQ",
    "contact": "Контакт",
    "call": "Позвонить"
  },
  "hero": {
    "badge": "Профессиональный ремонт интерьеров",
    "title": "Ремонт под ключ без стресса",
    "subtitle": "Ремонт квартир и домов | Варшава",
    "description": "Мы берём на себя весь процесс ремонта: организацию, подрядчиков и материалы. Вы получаете красивый интерьер без хаоса и стресса.",
    "cta_call": "Позвонить: +48 XXX XXX XXX",
    "cta_message": "Написать сообщение"
  },
  "stats": {
    "experience": "лет опыта",
    "projects": "реализованных проектов",
    "satisfaction": "довольных клиентов",
    "area": "Варшава и окрестности"
  },
  "services": {
    "title": "Наши услуги",
    "walls": { "name": "Стены", "desc": "Покраска, штукатурка, перегородки" },
    "floors": { "name": "Полы", "desc": "Панели, доска, плитка, плинтус" },
    "ceilings": { "name": "Потолки", "desc": "Подвесные потолки, встроенное освещение" },
    "finishing": { "name": "Отделка", "desc": "Плинтусы, двери, финишные детали" },
    "bathrooms": { "name": "Ванные", "desc": "Комплексный ремонт ванных комнат" },
    "kitchens": { "name": "Кухни", "desc": "Встроенная мебель и оформление кухонь" },
    "installations": { "name": "Инсталляции", "desc": "Электрика, сантехника, вентиляция" },
    "turnkey": { "name": "Ремонт под ключ", "desc": "Комплексная реализация от А до Я" }
  },
  "portfolio": { "title": "Реализации", "see_more": "Смотреть все проекты" },
  "before_after": { "title": "До / После", "before": "ДО", "after": "ПОСЛЕ", "see_more": "Смотреть все метаморфозы" },
  "process": {
    "title": "Как мы работаем",
    "step1": { "title": "Консультация", "desc": "Знакомимся с вашими потребностями и обсуждаем проект." },
    "step2": { "title": "Смета", "desc": "Прозрачная смета без скрытых расходов." },
    "step3": { "title": "Реализация", "desc": "Выполняем работы по согласованному графику." },
    "step4": { "title": "Сдача", "desc": "Принимаем работы и сдаём готовый интерьер." }
  },
  "testimonials": { "title": "Отзывы клиентов", "see_more": "Смотреть все отзывы" },
  "faq": {
    "title": "FAQ – Часто задаваемые вопросы",
    "q1": "Сколько длится ремонт квартиры?",
    "a1": "Зависит от объёма работ. Стандартный ремонт 50 м² занимает 4–6 недель.",
    "q2": "Помогаете ли вы с выбором материалов?",
    "a2": "Да, мы консультируем по выбору отделочных материалов.",
    "q3": "Делаете ли вы дизайн-проекты?",
    "a3": "Мы сотрудничаем с дизайнерами интерьеров и можем организовать проект.",
    "q4": "Как происходит оплата?",
    "a4": "Оплата поэтапно согласно графику работ.",
    "q5": "Даёте ли вы гарантию?",
    "a5": "Да, мы предоставляем гарантию 12 месяцев на все выполненные работы."
  },
  "contact": {
    "title": "Готовы к переменам?",
    "subtitle": "Позвоните и запишитесь на бесплатную консультацию.",
    "cta": "Позвонить: +48 XXX XXX XXX",
    "form_name": "Имя и фамилия",
    "form_phone": "Телефон",
    "form_email": "Email (необязательно)",
    "form_message": "Сообщение (необязательно)",
    "form_submit": "Отправить запрос",
    "form_success": "Спасибо! Мы свяжемся с вами в ближайшее время.",
    "form_error": "Что-то пошло не так. Попробуйте снова."
  },
  "footer": {
    "tagline": "Ремонт квартир и домов под ключ. Профессионально, в срок, без стресса.",
    "nav_title": "Навигация",
    "contact_title": "Контакт",
    "area_title": "Зона обслуживания",
    "area_text": "Варшава и окрестности: Мокотув, Виланув, Урсынув, Воля, Бемово и другие районы.",
    "rights": "Все права защищены.",
    "privacy": "Политика конфиденциальности",
    "terms": "Условия",
    "cookies": "Cookies"
  },
  "admin": {
    "photos_title": "Управление фото",
    "leads_title": "Запросы",
    "replace": "Заменить фото",
    "upload_success": "Фото обновлено",
    "upload_error": "Ошибка загрузки",
    "export_csv": "Экспорт CSV",
    "logout": "Выйти",
    "name": "Имя",
    "phone": "Телефон",
    "email": "Email",
    "date": "Дата",
    "message": "Сообщение",
    "category_hero": "Hero",
    "category_portfolio": "Портфолио",
    "category_before_after": "До / После"
  }
}
```

- [ ] **Step 7: Create `app/[locale]/layout.tsx`**

```typescript
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'

const locales = ['pl', 'en', 'ru']

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale)) notFound()
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add next-intl with PL/EN/RU messages"
```

---

## Task 4: Supabase setup

**Files:**
- Create: `.env.local`
- Create: `lib/supabase-server.ts`
- Create: `lib/supabase-browser.ts`
- SQL to run in Supabase dashboard

- [ ] **Step 1: Create Supabase project**

Go to supabase.com → New project → name: `remont-naprawa` → save the URL and anon key.

- [ ] **Step 2: Run SQL in Supabase SQL Editor**

```sql
-- Leads table
create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  message text,
  created_at timestamptz default now()
);

-- Site images table
create table site_images (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('hero', 'portfolio', 'before_after')),
  label text not null,
  storage_path text not null,
  sort_order int default 0,
  updated_at timestamptz default now()
);

-- Disable RLS for leads (admin reads via service role via API route)
alter table leads disable row level security;
alter table site_images disable row level security;
```

- [ ] **Step 3: Create Storage bucket**

In Supabase Dashboard → Storage → New bucket → name: `photos` → Public: ON.

- [ ] **Step 4: Seed initial image rows**

Run in SQL Editor (placeholders — real paths added when first images uploaded):
```sql
insert into site_images (category, label, storage_path, sort_order) values
  ('hero', 'Zdjęcie główne', 'hero/main.jpg', 0),
  ('portfolio', 'Apartament Mokotów', 'portfolio/1.jpg', 1),
  ('portfolio', 'Dom Wilanów', 'portfolio/2.jpg', 2),
  ('portfolio', 'Łazienka Premium', 'portfolio/3.jpg', 3),
  ('portfolio', 'Apartament Śródmieście', 'portfolio/4.jpg', 4),
  ('portfolio', 'Dom pod Warszawą', 'portfolio/5.jpg', 5),
  ('before_after', 'Metamorfoza 1 — przed', 'before_after/1_before.jpg', 1),
  ('before_after', 'Metamorfoza 1 — po', 'before_after/1_after.jpg', 2),
  ('before_after', 'Metamorfoza 2 — przed', 'before_after/2_before.jpg', 3),
  ('before_after', 'Metamorfoza 2 — po', 'before_after/2_after.jpg', 4),
  ('before_after', 'Metamorfoza 3 — przed', 'before_after/3_before.jpg', 5),
  ('before_after', 'Metamorfoza 3 — po', 'before_after/3_after.jpg', 6);
```

- [ ] **Step 5: Create `.env.local`**

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Replace values with real credentials from Supabase Dashboard → Settings → API.

- [ ] **Step 6: Create `lib/supabase-server.ts`**

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createSupabaseServer() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}

export function createSupabaseAdmin() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

- [ ] **Step 7: Create `lib/supabase-browser.ts`**

```typescript
'use client'
import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add Supabase client setup"
```

---

## Task 5: Navbar + LanguageSwitcher

**Files:**
- Create: `components/Navbar.tsx`
- Create: `components/LanguageSwitcher.tsx`

- [ ] **Step 1: Create `components/LanguageSwitcher.tsx`**

```typescript
'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

const flags: Record<string, string> = { pl: '🇵🇱', en: '🇬🇧', ru: '🇷🇺' }
const labels: Record<string, string> = { pl: 'PL', en: 'EN', ru: 'RU' }

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <div className="flex gap-1">
      {(['pl', 'en', 'ru'] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            locale === l
              ? 'text-beige font-semibold'
              : 'text-white/60 hover:text-white'
          }`}
        >
          {flags[l]} {labels[l]}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create `components/Navbar.tsx`**

```typescript
'use client'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { Phone } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { useState } from 'react'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#uslugi', label: t('services') },
    { href: '#realizacje', label: t('portfolio') },
    { href: '#o-nas', label: t('about') },
    { href: '#opinie', label: t('reviews') },
    { href: '#faq', label: t('faq') },
    { href: '#kontakt', label: t('contact') },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-graphite/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href={`/${locale}`} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-beige rounded flex items-center justify-center text-graphite font-bold text-sm">R</div>
          <div>
            <div className="text-white font-heading font-bold text-sm leading-none">remont naprawa</div>
            <div className="text-beige text-xs tracking-widest">WARSZAWA</div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="tel:+48000000000"
            className="hidden sm:flex items-center gap-2 bg-beige text-graphite text-sm font-semibold px-4 py-2 rounded-full hover:bg-beige-light transition-colors"
          >
            <Phone size={14} />
            {t('call')}
          </a>
          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <div className="space-y-1">
              <span className="block w-5 h-0.5 bg-white" />
              <span className="block w-5 h-0.5 bg-white" />
              <span className="block w-5 h-0.5 bg-white" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-graphite border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-white/80 hover:text-white" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="tel:+48000000000" className="flex items-center gap-2 text-beige font-semibold">
            <Phone size={14} /> +48 XXX XXX XXX
          </a>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Navbar with LanguageSwitcher"
```

---

## Task 6: Hero section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create `components/Hero.tsx`**

```typescript
import { useTranslations } from 'next-intl'
import { Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import { createSupabaseAdmin } from '@/lib/supabase-server'

async function getHeroImage() {
  const supabase = createSupabaseAdmin()
  const { data } = await supabase
    .from('site_images')
    .select('storage_path')
    .eq('category', 'hero')
    .single()
  if (!data) return null
  const { data: { publicUrl } } = supabase.storage
    .from('photos')
    .getPublicUrl(data.storage_path)
  return publicUrl
}

export default async function Hero() {
  const t = useTranslations('hero')
  const ts = useTranslations('stats')
  const heroImage = await getHeroImage()

  return (
    <section className="relative overflow-hidden px-6 pb-0 pt-24 sm:px-10 lg:px-16 bg-graphite">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center py-16">
          {/* Text */}
          <div className="space-y-6">
            <span className="inline-block bg-white/10 text-beige text-sm px-4 py-1.5 rounded-full ring-1 ring-beige/20">
              {t('badge')}
            </span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              {t('title')}
            </h1>
            <p className="text-beige font-heading font-medium text-lg">
              {t('subtitle')}
            </p>
            <p className="text-white/60 leading-relaxed max-w-lg">
              {t('description')}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+48000000000"
                className="flex items-center gap-2 bg-beige text-graphite font-semibold px-6 py-3 rounded-full hover:bg-beige-light transition-colors"
              >
                <Phone size={16} /> {t('cta_call')}
              </a>
              <a
                href="#kontakt"
                className="flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full hover:border-white/60 transition-colors"
              >
                <Mail size={16} /> {t('cta_message')}
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-72 sm:h-96 lg:h-[520px] rounded-2xl overflow-hidden">
            {heroImage ? (
              <Image src={heroImage} alt="Remont" fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full bg-white/5 rounded-2xl flex items-center justify-center text-white/20">
                Brak zdjęcia
              </div>
            )}
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/10 py-8 gap-6">
          {[
            { value: '20', label: ts('experience') },
            { value: '500+', label: ts('projects') },
            { value: '98%', label: ts('satisfaction') },
            { value: '📍', label: ts('area') },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-beige font-heading font-bold text-2xl">{s.value}</div>
              <div className="text-white/60 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero section"
```

---

## Task 7: Services section

**Files:**
- Create: `components/Services.tsx`

- [ ] **Step 1: Create `components/Services.tsx`**

```typescript
import { useTranslations } from 'next-intl'
import { Paintbrush, Layers, LayoutPanelTop, DoorOpen, Bath, ChefHat, Zap, Key } from 'lucide-react'

const icons = [Paintbrush, Layers, LayoutPanelTop, DoorOpen, Bath, ChefHat, Zap, Key]
const keys = ['walls', 'floors', 'ceilings', 'finishing', 'bathrooms', 'kitchens', 'installations', 'turnkey'] as const

export default function Services() {
  const t = useTranslations('services')

  return (
    <section id="uslugi" className="px-6 sm:px-10 lg:px-16 py-20 bg-graphite">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold text-3xl text-white mb-12 text-center">
          {t('title')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {keys.map((key, i) => {
            const Icon = icons[i]
            return (
              <div
                key={key}
                className="bg-white/5 rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:bg-white/10 transition-colors"
              >
                <Icon size={28} className="text-beige" />
                <div>
                  <div className="text-white font-heading font-semibold text-sm">{t(`${key}.name`)}</div>
                  <div className="text-white/50 text-xs mt-1">{t(`${key}.desc`)}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Services.tsx
git commit -m "feat: add Services section"
```

---

## Task 8: Portfolio section

**Files:**
- Create: `components/Portfolio.tsx`

- [ ] **Step 1: Create `components/Portfolio.tsx`**

```typescript
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { createSupabaseAdmin } from '@/lib/supabase-server'
import { ArrowRight } from 'lucide-react'

async function getPortfolioImages() {
  const supabase = createSupabaseAdmin()
  const { data } = await supabase
    .from('site_images')
    .select('*')
    .eq('category', 'portfolio')
    .order('sort_order')
  if (!data) return []
  return data.map((img) => ({
    ...img,
    url: supabase.storage.from('photos').getPublicUrl(img.storage_path).data.publicUrl,
  }))
}

export default async function Portfolio() {
  const t = useTranslations('portfolio')
  const images = await getPortfolioImages()

  return (
    <section id="realizacje" className="px-6 sm:px-10 lg:px-16 py-20 bg-graphite">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold text-3xl text-white mb-10 uppercase tracking-wide text-sm">
          {t('title')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
              <Image
                src={img.url}
                alt={img.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <div className="text-white font-semibold text-sm">{img.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#kontakt" className="inline-flex items-center gap-2 text-beige hover:text-beige-light transition-colors text-sm">
            {t('see_more')} <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Portfolio.tsx
git commit -m "feat: add Portfolio section"
```

---

## Task 9: BeforeAfter section

**Files:**
- Create: `components/BeforeAfter.tsx`

- [ ] **Step 1: Create `components/BeforeAfter.tsx`**

```typescript
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { createSupabaseAdmin } from '@/lib/supabase-server'

async function getBeforeAfterImages() {
  const supabase = createSupabaseAdmin()
  const { data } = await supabase
    .from('site_images')
    .select('*')
    .eq('category', 'before_after')
    .order('sort_order')
  if (!data) return []
  const pairs: Array<{ before: { url: string; label: string }; after: { url: string; label: string } }> = []
  const withUrls = data.map((img) => ({
    ...img,
    url: supabase.storage.from('photos').getPublicUrl(img.storage_path).data.publicUrl,
  }))
  for (let i = 0; i < withUrls.length - 1; i += 2) {
    pairs.push({ before: withUrls[i], after: withUrls[i + 1] })
  }
  return pairs
}

export default async function BeforeAfter() {
  const t = useTranslations('before_after')
  const pairs = await getBeforeAfterImages()

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-20 bg-graphite">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold text-sm uppercase tracking-wide text-white mb-10">
          {t('title')}
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {pairs.map((pair, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src={pair.before.url} alt="Przed" fill className="object-cover" />
                <span className="absolute bottom-2 left-2 bg-graphite text-white text-xs px-2 py-0.5 rounded">
                  {t('before')}
                </span>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src={pair.after.url} alt="Po" fill className="object-cover" />
                <span className="absolute bottom-2 left-2 bg-beige text-graphite text-xs px-2 py-0.5 rounded font-semibold">
                  {t('after')}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-right">
          <a href="#kontakt" className="inline-flex items-center gap-2 text-beige hover:text-beige-light text-sm transition-colors">
            {t('see_more')} <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/BeforeAfter.tsx
git commit -m "feat: add BeforeAfter section"
```

---

## Task 10: Process + Testimonials + FAQ sections

**Files:**
- Create: `components/Process.tsx`
- Create: `components/Testimonials.tsx`
- Create: `components/FAQ.tsx`

- [ ] **Step 1: Create `components/Process.tsx`**

```typescript
import { useTranslations } from 'next-intl'
import { MessageSquare, Calculator, Hammer, CheckCircle } from 'lucide-react'

const icons = [MessageSquare, Calculator, Hammer, CheckCircle]
const steps = ['step1', 'step2', 'step3', 'step4'] as const

export default function Process() {
  const t = useTranslations('process')

  return (
    <section id="o-nas" className="px-6 sm:px-10 lg:px-16 py-20 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold text-3xl text-white mb-12 text-center">
          {t('title')}
        </h2>
        <div className="grid sm:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = icons[i]
            return (
              <div key={step} className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-beige/40 flex items-center justify-center">
                  <Icon size={24} className="text-beige" />
                </div>
                <div>
                  <div className="text-beige font-heading font-semibold mb-1">
                    {i + 1}. {t(`${step}.title`)}
                  </div>
                  <div className="text-white/60 text-sm leading-relaxed">{t(`${step}.desc`)}</div>
                </div>
                {i < 3 && (
                  <div className="hidden sm:block absolute translate-x-full text-white/20 text-2xl">→</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/Testimonials.tsx`**

```typescript
import { useTranslations } from 'next-intl'
import { Quote } from 'lucide-react'

const reviews = [
  { text: 'Pełen profesjonalizm od początku do końca. Remont przebiegł sprawnie, a efekt przerósł nasze oczekiwania!', name: 'Anna i Marcin', area: 'Mokotów' },
  { text: 'Świetna komunikacja, wszystko na czas i zgodnie z ustaleniami. Polecam każdemu, kto ceni jakość i spokój.', name: 'Paweł K.', area: 'Wilanów' },
  { text: 'Kompleksowa obsługa i dbałość o detale. Nasze nowe wnętrze jest dokładnie takie, jak sobie wymarzyliśmy.', name: 'Katarzyna S.', area: 'Śródmieście' },
]

export default function Testimonials() {
  const t = useTranslations('testimonials')

  return (
    <section id="opinie" className="px-6 sm:px-10 lg:px-16 py-20 bg-graphite">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold text-3xl text-white mb-10">
          {t('title')}
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white/5 rounded-xl p-6 space-y-4">
              <Quote size={20} className="text-beige" />
              <p className="text-white/70 text-sm leading-relaxed">{r.text}</p>
              <div>
                <div className="text-white font-semibold text-sm">{r.name}</div>
                <div className="text-white/40 text-xs">{r.area}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `components/FAQ.tsx`**

```typescript
'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const pairs = [
  ['q1', 'a1'],
  ['q2', 'a2'],
  ['q3', 'a3'],
  ['q4', 'a4'],
  ['q5', 'a5'],
] as const

export default function FAQ() {
  const t = useTranslations('faq')
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="px-6 sm:px-10 lg:px-16 py-20 bg-white/5">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading font-bold text-3xl text-white mb-10">
          {t('title')}
        </h2>
        <div className="space-y-2">
          {pairs.map(([q, a], i) => (
            <div key={q} className="border border-white/10 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left text-white hover:bg-white/5 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium pr-4">{t(q)}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-beige transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed">
                  {t(a)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/Process.tsx components/Testimonials.tsx components/FAQ.tsx
git commit -m "feat: add Process, Testimonials, FAQ sections"
```

---

## Task 11: ContactForm + API route

**Files:**
- Create: `components/ContactForm.tsx`
- Create: `app/api/contact/route.ts`

- [ ] **Step 1: Create `app/api/contact/route.ts`**

```typescript
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
```

- [ ] **Step 2: Test the API route manually**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phone":"123456789","email":"test@test.com","message":"Test"}'
```

Expected: `{"ok":true}`

Check Supabase → Table Editor → leads — row should appear.

- [ ] **Step 3: Create `components/ContactForm.tsx`**

```typescript
'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Phone } from 'lucide-react'

export default function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  return (
    <section id="kontakt" className="px-6 sm:px-10 lg:px-16 py-20 bg-beige/10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* CTA side */}
        <div className="space-y-4">
          <h2 className="font-heading font-bold text-4xl text-white">{t('title')}</h2>
          <p className="text-white/60">{t('subtitle')}</p>
          <a
            href="tel:+48000000000"
            className="inline-flex items-center gap-2 bg-beige text-graphite font-semibold px-6 py-3 rounded-full hover:bg-beige-light transition-colors"
          >
            <Phone size={16} /> {t('cta')}
          </a>
        </div>

        {/* Form side */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 rounded-2xl p-8">
          {status === 'success' ? (
            <p className="text-beige font-semibold text-center py-4">{t('form_success')}</p>
          ) : (
            <>
              {(['name', 'phone', 'email', 'message'] as const).map((field) => {
                const isTextarea = field === 'message'
                const Tag = isTextarea ? 'textarea' : 'input'
                return (
                  <div key={field}>
                    <Tag
                      placeholder={t(`form_${field}`)}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      required={field === 'name' || field === 'phone'}
                      rows={isTextarea ? 3 : undefined}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-beige/60 text-sm resize-none"
                    />
                  </div>
                )
              })}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-beige text-graphite font-semibold py-3 rounded-lg hover:bg-beige-light transition-colors disabled:opacity-60"
              >
                {status === 'loading' ? '...' : t('form_submit')}
              </button>
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">{t('form_error')}</p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/ContactForm.tsx app/api/contact/
git commit -m "feat: add ContactForm and API route"
```

---

## Task 12: Footer + assemble landing page

**Files:**
- Create: `components/Footer.tsx`
- Create: `app/[locale]/page.tsx`

- [ ] **Step 1: Create `components/Footer.tsx`**

```typescript
import { useTranslations } from 'next-intl'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')

  return (
    <footer className="bg-graphite border-t border-white/10 px-6 sm:px-10 lg:px-16 py-12">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-3">
          <div>
            <div className="font-heading font-bold text-white">remont naprawa</div>
            <div className="text-beige text-xs tracking-widest">WARSZAWA</div>
          </div>
          <p className="text-white/50 text-sm leading-relaxed">{t('tagline')}</p>
        </div>

        {/* Nav */}
        <div>
          <div className="text-white font-semibold text-sm mb-4">{t('nav_title')}</div>
          <ul className="space-y-2">
            {['services', 'portfolio', 'about', 'reviews', 'faq', 'contact'].map((key) => (
              <li key={key}>
                <a href={`#${key}`} className="text-white/50 hover:text-white text-sm transition-colors">
                  {tn(key as any)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-white font-semibold text-sm mb-4">{t('contact_title')}</div>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-white/50 text-sm"><Phone size={14} /> +48 XXX XXX XXX</li>
            <li className="flex items-center gap-2 text-white/50 text-sm"><Mail size={14} /> kontakt@remontnaprawa.pl</li>
            <li className="flex items-center gap-2 text-white/50 text-sm"><MapPin size={14} /> Warszawa i okolice</li>
          </ul>
        </div>

        {/* Area */}
        <div>
          <div className="text-white font-semibold text-sm mb-4">{t('area_title')}</div>
          <p className="text-white/50 text-sm leading-relaxed">{t('area_text')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-10 pt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-white/30 text-xs">© 2024 Remont Naprawa Warszawa. {t('rights')}</div>
        <div className="flex gap-4">
          {['privacy', 'terms', 'cookies'].map((key) => (
            <a key={key} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              {t(key as any)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Create `app/[locale]/page.tsx`**

```typescript
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import BeforeAfter from '@/components/BeforeAfter'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <BeforeAfter />
      <Process />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Start dev server and verify page loads**

```bash
npm run dev
```

Open http://localhost:3000 — should redirect to http://localhost:3000/pl and show the landing page.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: assemble full landing page"
```

---

## Task 13: Admin — login page

**Files:**
- Create: `app/[locale]/admin/login/page.tsx`

- [ ] **Step 1: Create `app/[locale]/admin/login/page.tsx`**

```typescript
'use client'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createSupabaseBrowser } from '@/lib/supabase-browser'

export default function LoginPage() {
  const router = useRouter()
  const { locale } = useParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createSupabaseBrowser()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Nieprawidłowy email lub hasło.')
      setLoading(false)
    } else {
      router.push(`/${locale}/admin/photos`)
    }
  }

  return (
    <div className="min-h-screen bg-graphite flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-heading font-bold text-2xl text-white text-center mb-8">
          Panel administracyjny
        </h1>
        <form onSubmit={handleLogin} className="bg-white/5 rounded-2xl p-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-beige/60 text-sm"
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-beige/60 text-sm"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-beige text-graphite font-semibold py-3 rounded-lg hover:bg-beige-light transition-colors disabled:opacity-60"
          >
            {loading ? '...' : 'Zaloguj się'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create admin user in Supabase**

Supabase Dashboard → Authentication → Users → Add user → enter the client's email + password.

- [ ] **Step 3: Test login flow**

Visit http://localhost:3000/pl/admin — should redirect to `/pl/admin/login`.
Log in with the credentials → should redirect to `/pl/admin/photos` (404 for now, that's ok).

- [ ] **Step 4: Commit**

```bash
git add app/
git commit -m "feat: add admin login page"
```

---

## Task 14: Admin — photo management page

**Files:**
- Create: `app/[locale]/admin/photos/page.tsx`
- Create: `app/api/upload/route.ts`

- [ ] **Step 1: Create `app/api/upload/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  const imageId = formData.get('imageId') as string
  const storagePath = formData.get('storagePath') as string

  if (!file || !imageId || !storagePath) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const supabase = createSupabaseAdmin()
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { error: uploadError } = await supabase.storage
    .from('photos')
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: true,
    })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const { error: dbError } = await supabase
    .from('site_images')
    .update({ storage_path: storagePath, updated_at: new Date().toISOString() })
    .eq('id', imageId)

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 2: Create `app/[locale]/admin/photos/page.tsx`**

```typescript
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
```

- [ ] **Step 3: Create `app/[locale]/admin/photos/PhotoCard.tsx`**

```typescript
'use client'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { Upload, Check, X } from 'lucide-react'

interface Props {
  image: { id: string; label: string; storage_path: string; url: string }
}

export default function PhotoCard({ image }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setStatus('loading')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('imageId', image.id)
    formData.append('storagePath', image.storage_path)

    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    setStatus(res.ok ? 'success' : 'error')
  }

  return (
    <div className="bg-white/5 rounded-xl overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image
          src={preview ?? image.url}
          alt={image.label}
          fill
          className="object-cover"
        />
        {status === 'loading' && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-beige border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {status === 'success' && (
          <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
            <Check size={12} />
          </div>
        )}
        {status === 'error' && (
          <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1">
            <X size={12} />
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="text-xs text-white/60 mb-2 truncate">{image.label}</div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={status === 'loading'}
          className="w-full flex items-center justify-center gap-2 bg-beige/20 hover:bg-beige/30 text-beige text-xs py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <Upload size={12} /> Zamień zdjęcie
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create `app/[locale]/admin/AdminNav.tsx`**

```typescript
'use client'
import { createSupabaseBrowser } from '@/lib/supabase-browser'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function AdminNav({ active }: { active: 'photos' | 'leads' }) {
  const router = useRouter()
  const { locale } = useParams()

  async function handleLogout() {
    const supabase = createSupabaseBrowser()
    await supabase.auth.signOut()
    router.push(`/${locale}/admin/login`)
  }

  return (
    <nav className="bg-graphite border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex gap-4">
        <Link
          href={`/${locale}/admin/photos`}
          className={`text-sm px-4 py-2 rounded-lg transition-colors ${active === 'photos' ? 'bg-beige/20 text-beige' : 'text-white/60 hover:text-white'}`}
        >
          Zdjęcia
        </Link>
        <Link
          href={`/${locale}/admin/leads`}
          className={`text-sm px-4 py-2 rounded-lg transition-colors ${active === 'leads' ? 'bg-beige/20 text-beige' : 'text-white/60 hover:text-white'}`}
        >
          Zapytania
        </Link>
      </div>
      <button onClick={handleLogout} className="text-white/50 hover:text-white text-sm transition-colors">
        Wyloguj
      </button>
    </nav>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add admin photos page with upload"
```

---

## Task 15: Admin — leads page

**Files:**
- Create: `app/[locale]/admin/leads/page.tsx`

- [ ] **Step 1: Create `app/[locale]/admin/leads/page.tsx`**

```typescript
import { createSupabaseAdmin } from '@/lib/supabase-server'
import AdminNav from '../AdminNav'
import LeadsTable from './LeadsTable'

async function getLeads() {
  const supabase = createSupabaseAdmin()
  const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
  return data ?? []
}

export default async function LeadsPage() {
  const leads = await getLeads()
  return (
    <div className="min-h-screen bg-graphite text-white">
      <AdminNav active="leads" />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-heading font-bold text-2xl mb-8">Zapytania ({leads.length})</h1>
        <LeadsTable leads={leads} />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `app/[locale]/admin/leads/LeadsTable.tsx`**

```typescript
'use client'
import { Download } from 'lucide-react'

interface Lead {
  id: string
  name: string
  phone: string
  email: string | null
  message: string | null
  created_at: string
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  function exportCSV() {
    const headers = ['Imię', 'Telefon', 'Email', 'Wiadomość', 'Data']
    const rows = leads.map((l) => [
      l.name,
      l.phone,
      l.email ?? '',
      l.message ?? '',
      new Date(l.created_at).toLocaleString('pl-PL'),
    ])
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `zapytania-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-beige/20 hover:bg-beige/30 text-beige text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Download size={14} /> Eksportuj CSV
        </button>
      </div>
      {leads.length === 0 ? (
        <div className="text-white/40 text-center py-12">Brak zapytań</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/50 text-left border-b border-white/10">
                <th className="pb-3 pr-4">Imię</th>
                <th className="pb-3 pr-4">Telefon</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Wiadomość</th>
                <th className="pb-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-white/5">
                  <td className="py-3 pr-4 text-white">{l.name}</td>
                  <td className="py-3 pr-4 text-white/80">{l.phone}</td>
                  <td className="py-3 pr-4 text-white/60">{l.email ?? '—'}</td>
                  <td className="py-3 pr-4 text-white/60 max-w-xs truncate">{l.message ?? '—'}</td>
                  <td className="py-3 text-white/40 whitespace-nowrap">
                    {new Date(l.created_at).toLocaleString('pl-PL')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add admin leads page with CSV export"
```

---

## Task 16: Vercel deployment

**Files:**
- Create: `vercel.json` (optional, Vercel auto-detects Next.js)

- [ ] **Step 1: Push to GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/remont_2.git
git push -u origin main
```

- [ ] **Step 2: Import project in Vercel**

vercel.com → New Project → Import from GitHub → select `remont_2` → Framework: Next.js → Deploy.

- [ ] **Step 3: Add environment variables in Vercel**

Vercel Dashboard → Project → Settings → Environment Variables. Add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

- [ ] **Step 4: Redeploy and verify**

Trigger redeploy after adding env vars. Verify:
- Landing page loads at root domain
- Language switcher works
- Contact form submits successfully (check Supabase leads table)
- Admin login works at `/pl/admin/login`
- Photo upload works in admin

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: ready for Vercel deployment"
git push
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Next.js 14 + Tailwind + next-intl (Task 1-3)
- ✅ Supabase schema + Storage + Auth (Task 4)
- ✅ All 9 landing sections (Tasks 5-12)
- ✅ PL/EN/RU messages (Task 3)
- ✅ Contact form → leads table (Task 11)
- ✅ Admin login with Supabase Auth (Task 13)
- ✅ Photo management with upload (Task 14)
- ✅ Leads viewer with CSV export (Task 15)
- ✅ Vercel deployment (Task 16)

**No placeholders found.**

**Type consistency:** `createSupabaseAdmin()` used consistently in server components and API routes. `createSupabaseBrowser()` used in client components. `site_images` table shape consistent across all tasks.
