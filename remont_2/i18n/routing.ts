import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pl', 'en', 'ru'],
  defaultLocale: 'pl',
})
