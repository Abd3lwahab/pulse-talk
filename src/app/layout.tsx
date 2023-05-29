import './globals.css'
import Sidebar from '@/components/Sidebar'
import { karla } from './fonts'

export const metadata = {
  title: 'Pulse Talk',
  description: 'A realtime chat app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <main className="flex min-h-screen flex-row bg-slate-50">
          {/* @ts-expect-error Server Component */}
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  )
}
