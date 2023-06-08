import '../globals.css'
import Sidebar from '@/components/Sidebar'
import { karla, lora } from '../fonts'
import Providers from '@/components/Provider'

export const metadata = {
  title: 'Pulse Talk',
  description: 'A realtime chat app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${karla.variable}`}>
      <body className="font-karla">
        <main className="flex min-h-screen h-screen flex-row bg-slate-50 overflow-hidden">
          {/* @ts-expect-error Server Component  */}
          <Sidebar />
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  )
}
