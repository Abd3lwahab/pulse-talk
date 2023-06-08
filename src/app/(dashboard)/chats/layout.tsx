import ChatSidebar from '@/components/ChatSidebar/ChatSidebar'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) notFound()

  const friendsIds = (await db.smembers(`user:${session.user.id}:friends`)) as string[]
  const friends = (await Promise.all(
    friendsIds.map((friendId) => db.get(`user:${friendId}`))
  )) as User[]

  return (
    <div className="flex p-8 flex-grow flex-col">
      <h2 className="font-lora text-3xl font-bold border-b border-slate-200 pb-4 text-copper-600">
        Chats
      </h2>
      <div className="flex flex-row overflow-auto flex-grow">
        <ChatSidebar friends={friends} userId={session.user.id} />
        {children}
      </div>
    </div>
  )
}
