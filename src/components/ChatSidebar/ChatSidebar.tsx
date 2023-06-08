'use client'

import Image from 'next/image'
import { FC } from 'react'
import Icons from '../ui/icon'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ChatSidebarProps {
  friends: User[]
  userId: string
}

const ChatSidebar: FC<ChatSidebarProps> = ({ friends, userId }) => {
  const pathname = usePathname()
  const OpenChatIcon = Icons['ChevronRightIcon']

  return (
    <div className="flex flex-col w-[420px] border-r border-slate-200 max-h-full overflow-y-auto">
      {friends.map((friend) => (
        <Link
          href={`/chats/${friend.id}_${userId}`}
          as={`/chats/${friend.id}_${userId}`}
          key={friend.id}
          className={`flex flex-row py-4 px-4 border-b border-slate-200 justify-between cursor-pointer items-center
          ${
            pathname.includes(`/chats/${friend.id}_${userId}`)
              ? 'bg-slate-200'
              : 'hover:bg-slate-100'
          }`}
        >
          <div className="flex flex-row">
            <div className="mr-4 flex items-center">
              <Image
                src={friend.image}
                alt={friend.name}
                width={49}
                height={49}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col max-w-[289px]">
              <p className="text-lg font-bold font-lora text-copper-700 mb-[-2px]">{friend.name}</p>
              <p className="text-copper-900 truncate block tracking-tight">
                Start a new conversation!
              </p>
            </div>
          </div>
          <OpenChatIcon className="w-5 h-5 text-slate-500 font-bold" />
        </Link>
      ))}
    </div>
  )
}

export default ChatSidebar
