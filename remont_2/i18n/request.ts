import { getRequestConfig } from 'next-intl/server'

const locales = ['pl', 'en', 'ru']

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !locales.includes(locale)) {
    locale = 'pl'
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
