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

    await Promise.all([
      pusherServer.trigger(
        getPusherChannelName(`user:${userId}:friend_requests`),
        'friend_request_resolved',
        null
      ),

      db.srem(`user:${userId}:friend_requests`, friendId),
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
