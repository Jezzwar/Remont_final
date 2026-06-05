'use client'

import { useEffect } from 'react'

export function PageLoaderHider() {
  useEffect(() => {
    const hide = () => {
      const el = document.getElementById('page-loader')
      if (!el) return
      el.style.transition = 'opacity 0.5s ease'
      el.style.opacity = '0'
      setTimeout(() => { el.style.display = 'none' }, 520)
    }

    const minDelay = new Promise<void>(r => setTimeout(r, 1200))
    const pageLoad = new Promise<void>(r => {
      if (document.readyState === 'complete') r()
      else window.addEventListener('load', () => r(), { once: true })
    })

    Promise.all([minDelay, pageLoad]).then(hide)
  }, [])

  return null
}
