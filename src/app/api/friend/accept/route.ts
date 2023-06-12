import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { pusherServer } from '@/lib/pusher'
import { getPusherChannelName } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', {
        status: 401,
      })
    }

    const { id: friendId } = await req.json()
    const userId = session.user.id

    // check if they already friends
    const isAlreadyFriends = await db.sismember(`user:${userId}:friends`, friendId)
    if (isAlreadyFriends) {
      return new NextResponse('Already friends', {
        status: 400,
      })
    }

    // check if user has actually a friend request
    const hasFriendRequest = await db.sismember(`user:${userId}:friend_requests`, friendId)
    if (!hasFriendRequest) {
      return new NextResponse("Can't do this, Wait for their friend request!", {
        status: 400,
      })
    }

    await Promise.all([
      pusherServer.trigger(
        getPusherChannelName(`user:${userId}:friend_requests`),
        'friend_request_resolved',
        null
      ),

      db
        .multi()
        .sadd(`user:${userId}:friends`, friendId)
        .sadd(`user:${friendId}:friends`, userId)
        .srem(`user:${userId}:friend_requests`, friendId)
        .exec(),
    ])

    return new NextResponse('OK', {
      status: 200,
    })
  } catch (error) {
    return new NextResponse('Oops! Something went wrong', {
      status: 400,
    })
  }
}
