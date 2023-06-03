import { Lora, Karla } from 'next/font/google'

export const lora = Lora({
  subsets: ['cyrillic'],
  variable: '--font-lora',
  preload: false,
})

export const karla = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
  preload: false,
})
