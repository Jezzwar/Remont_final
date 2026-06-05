import { readFileSync, readdirSync } from 'fs'
import { join, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

// Load .env.local manually before anything else
const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const envFile = readFileSync(join(ROOT, '.env.local'), 'utf8')
for (const line of envFile.split('\n')) {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
}

const { createClient } = await import('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function upload(localPath, storagePath, mimeType = 'image/jpeg') {
  const buffer = readFileSync(localPath)
  const { error } = await supabase.storage
    .from('photos')
    .upload(storagePath, buffer, { contentType: mimeType, upsert: true })
  if (error) console.error(`✗ ${storagePath}:`, error.message)
  else console.log(`✓ ${storagePath}`)
}

async function run() {
  console.log('Uploading to:', process.env.NEXT_PUBLIC_SUPABASE_URL)

  // Hero
  await upload(join(ROOT, 'public/hero_high.jpg'), 'hero/hero_main.jpg')

  // Portfolio
  const portfolioDir = join(ROOT, 'public/portfolio')
  const files = readdirSync(portfolioDir)
    .filter(f => ['.jpg','.jpeg','.png','.webp'].includes(extname(f).toLowerCase()))
    .sort()

  for (const file of files) {
    await upload(join(portfolioDir, file), `portfolio/${file}`)
  }

  // Update DB rows to match real filenames
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const storagePath = `portfolio/${file}`
    const { data } = await supabase
      .from('site_images')
      .select('id')
      .eq('category', 'portfolio')
      .eq('sort_order', i + 1)
      .single()
    if (data) {
      await supabase
        .from('site_images')
        .update({ storage_path: storagePath, label: `Realizacja ${i + 1}`, updated_at: new Date().toISOString() })
        .eq('id', data.id)
      console.log(`  db updated: ${storagePath}`)
    }
  }

  // Update hero DB row
  const { data: heroRow } = await supabase
    .from('site_images')
    .select('id')
    .eq('category', 'hero')
    .single()
  if (heroRow) {
    await supabase
      .from('site_images')
      .update({ storage_path: 'hero/hero_main.jpg', updated_at: new Date().toISOString() })
      .eq('id', heroRow.id)
    console.log('  db updated: hero/hero_main.jpg')
  }

  console.log('\n✅ Done! Images are now in Supabase Storage.')
}

run().catch(console.error)
