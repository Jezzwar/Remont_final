# Setup Instructions

## 1. Supabase Project

1. Go to supabase.com → New Project → name: `remont-naprawa`
2. Save your Project URL and anon key

## 2. Database Schema

Run this SQL in Supabase SQL Editor:

```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  message text,
  created_at timestamptz default now()
);

create table site_images (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('hero', 'portfolio', 'before_after')),
  label text not null,
  storage_path text not null,
  sort_order int default 0,
  updated_at timestamptz default now()
);

alter table leads disable row level security;
alter table site_images disable row level security;

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

## 3. Storage Bucket

Supabase Dashboard → Storage → New bucket → name: `photos` → Public: ON

## 4. Admin User

Supabase Dashboard → Authentication → Users → Add user → enter client's email + password

## 5. Environment Variables

Fill in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Get these from: Supabase Dashboard → Settings → API

## 6. Vercel Deployment

1. Push to GitHub: `git push -u origin main`
2. vercel.com → New Project → Import from GitHub → select `remont_2`
3. Add the same 3 environment variables in Vercel Dashboard → Project → Settings → Environment Variables
4. Redeploy

## 7. First Images Upload

After deployment, log in to `/pl/admin/login` and upload the actual photos to replace placeholders.
