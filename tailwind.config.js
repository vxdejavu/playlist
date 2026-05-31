/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#101010',
        'void-deep': '#0a0a14',
        crimson: '#860003',
        gold: '#A77D4D',
        'gold-light': '#c9a06a',
        'night-blue': '#193B67',
        parchment: '#E6E5E6',
        'parchment-dim': '#9e9d9d',
      },
      fontFamily: {
        gothic: ['UnifrakturMaguntia', 'cursive'],
        serif: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}
