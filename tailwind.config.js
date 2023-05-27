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
          50: '#FAF1EB',
          100: '#F5E2D6',
          200: '#E9C3AA',
          300: '#DFA781',
          400: '#D48A59',
          500: '#C56E33',
          600: '#9E5829',
          700: '#76411E',
          800: '#4D2B14',
          900: '#29160A',
          950: '#140B05',
        },
      },
    },
  },
  plugins: [],
}
