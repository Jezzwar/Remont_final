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
        graphite: '#0D0D0D',
        surface: '#141414',
        beige: '#D8C3A5',
        'beige-light': '#E8D9C0',
        'gray-light': '#F3F3F3',
      },
      fontFamily: {
        heading: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        bricolage: ['var(--font-bricolage)', 'sans-serif'],
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
        'spin-slow': 'spin 5s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
