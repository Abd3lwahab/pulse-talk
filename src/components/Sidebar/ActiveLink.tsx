'use client'

import { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Icons from '@/components/ui/icon'

interface ActiveLinkProps {
  href: string
  icon: 'HomeIcon' | 'ChatBubbleLeftEllipsisIcon' | 'UserPlusIcon'
  text: string
  friendRequests?: number
}

const ActiveLink: FC<ActiveLinkProps> = ({ href, icon, text, friendRequests }) => {
  const pathname = usePathname()
  const isActive = pathname === href || (href === '/chats' && pathname.startsWith('/chats/'))

  const Icon = Icons[icon]
  return (
    <Link href={href} className="flex flex-row items-center mb-4 pr-8 mr-[-32px] relative">
      <Icon className={`w-6 ${isActive ? 'text-copper-400' : 'text-copper-600'}`} />
      <p
        className={`ml-2 font-bold text-base  ${isActive ? 'text-copper-400' : 'text-copper-600'}`}
      >
        {text}
      </p>
      {href === '/friend-requests' && friendRequests! > 0 && (
        <div className="text-center absolute right-4 text-xs text-white bg-copper-400 w-4 h-4 rounded-full flex items-center justify-center">
          <span>{friendRequests}</span>
        </div>
      )}
      {isActive && <div className="w-1 h-4 bg-copper-400 absolute right-0"></div>}
    </Link>
  )
}

export default ActiveLink
