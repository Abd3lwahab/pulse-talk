import '../globals.css'
import { karla } from '@/app/fonts'

export const metadata = {
  title: 'Pulse Talk | Login',
  description: 'A realtime chat app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <main className="flex min-h-screen flex-row bg-slate-50">{children}</main>
      </body>
    </html>
  )
}
