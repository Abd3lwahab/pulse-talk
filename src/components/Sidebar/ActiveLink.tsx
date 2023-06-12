'use client'

import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Icons from '@/components/ui/icon'
import { pusherClient } from '@/lib/pusher'
import { getPusherChannelName } from '@/lib/utils'

interface ActiveLinkProps {
  href: string
  icon: 'HomeIcon' | 'ChatBubbleLeftEllipsisIcon' | 'UserPlusIcon'
  text: string
  intialFriendRequests?: number
  userId?: string
}

interface FriendRequestsNumberProps {
  intialFriendRequests: number
  userId: string
}

const FriendRequestsNumber: FC<FriendRequestsNumberProps> = ({ intialFriendRequests, userId }) => {
  const [friendRequestsNumber, setFriendRequestsNumber] = useState(intialFriendRequests || 0)

  useEffect(() => {
    pusherClient.subscribe(getPusherChannelName(`user:${userId}:friend_requests`))

    const newFriendRequestHandler = () => {
      setFriendRequestsNumber((prevNumber) => prevNumber + 1)
    }

    const friendRequestResolvedHandler = () => {
      setFriendRequestsNumber((prevNumber) => prevNumber - 1)
    }

    pusherClient.bind('friend_requests', newFriendRequestHandler)
    pusherClient.bind('friend_request_resolved', friendRequestResolvedHandler)

    return () => {
      pusherClient.unbind('friend_requests', newFriendRequestHandler)
      pusherClient.unbind('friend_request_resolved', friendRequestResolvedHandler)
      pusherClient.unsubscribe(getPusherChannelName(`user:${userId}:friend_requests`))
    }
  }, [])

  return (
    <>
      {!!friendRequestsNumber && (
        <div className="text-center absolute right-4 text-xs text-white bg-copper-400 w-4 h-4 rounded-full flex items-center justify-center">
          <span>{friendRequestsNumber}</span>
        </div>
      )}
    </>
  )
}

const ActiveLink: FC<ActiveLinkProps> = ({ href, icon, text, intialFriendRequests, userId }) => {
  const pathname = usePathname()
  const router = useRouter()
  const isActive = pathname === href || (href === '/chats' && pathname.startsWith('/chats/'))

  // Workaround to force next.js to refetch the latest data
  const neavigateToDynamicRoute = (e: any) => {
    e.preventDefault()
    router.replace(href)
    if (href !== '/') {
      router.refresh()
    }
  }

  const Icon = Icons[icon]
  return (
    <Link
      href={href}
      className="flex flex-row items-center mb-4 pr-8 mr-[-32px] relative"
      onClick={(e) => neavigateToDynamicRoute(e)}
    >
      <Icon className={`w-6 ${isActive ? 'text-copper-400' : 'text-copper-600'}`} />
      <p
        className={`ml-2 font-bold text-base  ${isActive ? 'text-copper-400' : 'text-copper-600'}`}
      >
        {text}
      </p>
      {href === '/friend-requests' && (
        <FriendRequestsNumber intialFriendRequests={intialFriendRequests!} userId={userId!} />
      )}
      {isActive && <div className="w-1 h-4 bg-copper-400 absolute right-0"></div>}
    </Link>
  )
}

export default ActiveLink
