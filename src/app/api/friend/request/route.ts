import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { pusherServer } from '@/lib/pusher'
import { fetchRedis } from '@/lib/redis'
import { getPusherChannelName } from '@/lib/utils'
import { sendFriendRequestValidator } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email: friendEmail } = sendFriendRequestValidator.parse(body)

    // getting the details of logged in user
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', {
        status: 401,
      })
    }

    // getting friend id from email
    // const friendId = await fetchRedis('get', `user:email:${friendEmail}`)
    const friendId = (await db.get(`user:email:${friendEmail}`)) as string | null
    if (!friendId) {
      return new NextResponse("This user does't exist yet!", {
        status: 400,
      })
    }

    // check if user send request to himself
    const userId = session.user.id
    if (userId === friendId) {
      return new NextResponse("Oops! Friend request denied. Try making friends who aren't you.🙃", {
        status: 400,
      })
    }

    // check if user is already sent a request to this email
    // const isAlreadyRequested = await fetchRedis('sismember', `user:${friendId}:friend_requests`, userId)
    const isAlreadyRequested = await db.sismember(`user:${friendId}:friend_requests`, userId)
    if (isAlreadyRequested) {
      return new NextResponse('Already sent a request. Be patient and explore more friendships!', {
        status: 400,
      })
    }

    // check if they are already friends
    // const isAlreadyFriends = await fetchRedis('sismember', `user:${userId}:friends`, friendId)
    const isAlreadyFriends = await db.sismember(`user:${userId}:friends`, friendId)
    if (isAlreadyFriends) {
      return new NextResponse('Already friends! Enjoy the connection! 🎉', {
        status: 400,
      })
    }

    // check if user already have a request from that friend
    const isAlreadyHaveARequest = await db.sismember(`user:${userId}:friend_requests`, friendId)
    if (isAlreadyHaveARequest) {
      return new NextResponse('Mutual friend request detected! Accept it from above list 🤝😄', {
        status: 400,
      })
    }

    await Promise.all([
      pusherServer.trigger(
        getPusherChannelName(`user:${friendId}:friend_requests`),
        'friend_requests',
        {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        }
      ),

      db.sadd(`user:${friendId}:friend_requests`, userId),
    ])

    return new NextResponse('OK', {
      status: 200,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('invalid email', {
        status: 400,
      })
    }
    return new NextResponse('Oops! Something went wrong', {
      status: 400,
    })
  }
}
