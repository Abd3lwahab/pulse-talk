'use client'

import { FC, useEffect, useState } from 'react'
import FriendRequest from '../FriendRequest/FriendRequest'
import { pusherClient } from '@/lib/pusher'
import { getPusherChannelName } from '@/lib/utils'

interface FriendRequestListProps {
  intialFriendRequests: User[]
  userId: string
}

const FriendRequestList: FC<FriendRequestListProps> = ({ intialFriendRequests, userId }) => {
  const [friendRequests, setFriendRequests] = useState<User[]>(intialFriendRequests)

  const updateCallback = (friend: User) => {
    setFriendRequests((prevFriendRequests) =>
      prevFriendRequests.filter((friendRequest) => friendRequest.id !== friend.id)
    )
  }

  useEffect(() => {
    const handleFriendRequest = (friendRequest: User) => {
      setFriendRequests((prevFriendRequests) => [...prevFriendRequests, friendRequest])
    }

    pusherClient.bind('friend_requests', handleFriendRequest)

    return () => {
      pusherClient.unbind('friend_requests', handleFriendRequest)
    }
  })

  return friendRequests.length === 0 ? (
    <p className="text-copper-600 text-xl  ">
      You have no friend requests. <br />
    </p>
  ) : (
    <>
      {friendRequests.map((friendRequest) => (
        <FriendRequest
          key={friendRequest.id}
          friend={friendRequest}
          updateCallback={(friend) => updateCallback(friend)}
        />
      ))}
    </>
  )
}

export default FriendRequestList
