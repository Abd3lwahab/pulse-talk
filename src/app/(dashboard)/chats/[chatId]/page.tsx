import Messages from '@/components/Messages/Messages'
import SendMessageForm from '@/components/SendMessageForm/SendMessageForm'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { messagesValidator } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

interface pageProps {
  params: {
    chatId: string
  }
}

const getMessages = async (chatId: string) => {
  try {
    const messages = (await db.zrange(`chat:${chatId}`, 0, -1)) as string[]

    const messagesValidated = messagesValidator.parse(messages)

    return messagesValidated.reverse()
  } catch (error) {
    notFound()
  }
}

export default async function Page({ params }: pageProps) {
  const chatId = params.chatId
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  const { user } = session
  const [userId1, userId2] = chatId.split('_')

  if (userId1 !== user.id && userId2 !== user.id) {
    notFound()
  }

  const intialMessages = await getMessages(chatId)

  return (
    <div className="flex flex-col flex-grow px-4 pt-2 justify-between">
      <Messages intialMessages={intialMessages} userId={session.user.id} chatId={chatId} />
      <SendMessageForm userId={session.user.id} chatId={chatId} />
    </div>
  )
}
