import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { pusherServer } from '@/lib/pusher'
import { getPusherChannelName } from '@/lib/utils'
import { Message, messageValidator } from '@/lib/validations'
import { nanoid } from 'nanoid'
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

    const body = await req.json()
    const { chatId, message: messageContent } = body as { chatId: string; message: string }

    const [userId1, userId2] = chatId.split('_')

    // Check if logged in user is one of this two users
    const isLoggedUserChat = session.user.id === userId1 || session.user.id === userId2
    if (!isLoggedUserChat) {
      return new NextResponse('Unauthorized', {
        status: 401,
      })
    }

    // Check if user1 and user2 are friends
    const isFriends = await db.sismember(`user:${userId1}:friends`, userId2)
    if (!isFriends) {
      return new NextResponse('You are not a friend with that user', {
        status: 400,
      })
    }

    const date = Date.now()
    const messageData: Message = {
      id: nanoid(),
      content: messageContent,
      date: date,
      senderId: session.user.id,
    }

    const message = messageValidator.parse(messageData)

    await Promise.all([
      pusherServer.trigger(getPusherChannelName(`chat:${chatId}`), 'new-message', messageData),

      db.zadd(`chat:${chatId}`, {
        score: date,
        member: JSON.stringify(message),
      }),
    ])

    return new NextResponse('OK', {
      status: 200,
    })
  } catch {
    return new NextResponse('Oops! Something went wrong', {
      status: 400,
    })
  }
}
