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
        copper: {
          50: '#DCDFFF',
          100: '#B3B9FE',
          200: '#6774FE',
          300: '#1B2EFD',
          400: '#0212CA',
          500: '#010C80',
          600: '#010965',
          700: '#01074C',
          800: '#000533',
          900: '#000219',
          950: '#00010F',
        },
      },
    },
  },
  plugins: [],
}
