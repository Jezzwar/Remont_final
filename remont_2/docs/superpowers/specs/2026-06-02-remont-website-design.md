# Remont Naprawa — Website Design Spec
Date: 2026-06-02

## Overview
One-page landing site for a Warsaw renovation company with a simple admin panel.
Hosted on Vercel. Non-technical client manages photos and views form submissions.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 App Router |
| Styling | Tailwind CSS |
| i18n | next-intl |
| Backend / DB | Supabase (PostgreSQL) |
| File storage | Supabase Storage |
| Auth | Supabase Auth |
| Hosting | Vercel |

---

## Brand

- **Colors:** Graphite `#1F1F1F`, Warm Beige `#D8C3A5`, White `#FFFFFF`, Light Gray `#F3F3F3`
- **Headings:** Montserrat (Bold / SemiBold / Medium)
- **Body:** Inter (Regular / Medium)
- **Theme:** Dark premium

---

## Project Structure

```
remont_2/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx           # main landing page
│   │   ├── layout.tsx
│   │   └── admin/
│   │       ├── page.tsx       # admin dashboard
│   │       ├── photos/        # photo management
│   │       └── leads/         # form submissions
│   └── api/
│       ├── contact/route.ts   # POST — save lead to Supabase
│       └── upload/route.ts    # POST — upload photo to Supabase Storage
├── components/
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
├── messages/
│   ├── pl.json                # primary language
│   ├── en.json
│   └── ru.json
├── lib/
│   └── supabase.ts
└── middleware.ts              # locale redirect
```

---

## Landing Page Sections

| Section | Component | Editable photos |
|---|---|---|
| Hero | `Hero.tsx` | hero background |
| Services | `Services.tsx` | none (icons) |
| Portfolio / Realizacje | `Portfolio.tsx` | gallery images |
| Before / After | `BeforeAfter.tsx` | before+after pairs |
| How we work | `Process.tsx` | none |
| Testimonials | `Testimonials.tsx` | none |
| FAQ | `FAQ.tsx` | none |
| Contact form | `ContactForm.tsx` | none |
| Footer | `Footer.tsx` | none |

All texts come from `messages/pl.json` (and EN/RU equivalents). Language switcher in navbar.
All photos are fetched from Supabase Storage — no hardcoded image paths in code.

---

## i18n

- Default locale: `pl`
- Supported: `pl`, `en`, `ru`
- `middleware.ts` redirects `/` → `/pl`
- Language switcher: flag icons in navbar, updates URL locale prefix
- All UI strings in `messages/{locale}.json`

---

## Supabase Schema

### Table: `leads`
| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| name | text | |
| phone | text | |
| email | text | nullable |
| message | text | nullable |
| created_at | timestamptz | default now() |

### Table: `site_images`
| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| category | text | `hero`, `portfolio`, `before_after` |
| label | text | display name for admin UI |
| storage_path | text | path in Supabase Storage bucket |
| sort_order | int | for portfolio ordering |
| updated_at | timestamptz | default now() |

### Storage: bucket `photos`
- Public bucket, direct URL access
- Organized by category: `hero/`, `portfolio/`, `before_after/`

### Auth
- Single admin user created manually in Supabase dashboard
- Login via email + password
- `/admin/*` routes protected by session check (redirect to `/admin/login` if unauthenticated)

---

## Admin Panel

URL: `/admin` (Polish UI only)

### Pages
1. **Login** — email + password form, Supabase Auth
2. **Photos** (`/admin/photos`) — grid of all images grouped by category, "Zamień zdjęcie" button opens file picker, uploads to Storage, updates `site_images` record
3. **Leads** (`/admin/leads`) — table: name / phone / email / date, export to CSV button

### Access control
- Middleware checks Supabase session cookie for `/admin/*`
- Unauthenticated → redirect to `/admin/login`

---

## Contact Form

Fields: Name, Phone, Email (optional), Message (optional)
On submit → POST `/api/contact` → insert row into `leads` table → show success message
No email sending required (client views leads in admin panel).

---

## Constraints & Decisions

- No text editing in admin — texts are hardcoded in `messages/*.json` and changed by developer
- No CMS — Sanity/Contentful are overkill for photos-only admin
- Supabase free tier is sufficient for this scale
- CSV export covers the client's reporting needs without a complex dashboard
