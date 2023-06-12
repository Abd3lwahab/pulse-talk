'use client'

import { getPusherChannelName } from '@/lib/utils'
import { Message } from '@/lib/validations'
import { FC, useEffect, useRef, useState } from 'react'
import SingleMessage from './SingleMessage'
import { pusherClient } from '@/lib/pusher'

interface MessagesProps {
  intialMessages: Message[]
  userId: string
  chatId: string
}

const Messages: FC<MessagesProps> = ({ intialMessages, userId, chatId }) => {
  const [messages, setMessages] = useState<Message[]>(intialMessages)
  const scrollDownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    pusherClient.subscribe(getPusherChannelName(`chat:${chatId}`))
    const newMessageHandler = (message: Message) => {
      setMessages((prevMessages) => [message, ...prevMessages])
    }

    pusherClient.bind('new-message', newMessageHandler)

    return () => {
      pusherClient.unbind('new-message', newMessageHandler)
      pusherClient.unsubscribe(getPusherChannelName(`chat:${chatId}`))
    }
  }, [chatId])

  return (
    <div
      className="flex flex-col-reverse h-full overflow-y-auto pr-2 mr-[-16px] 
      scrollbar scrollbar-w-2  scrollbar-thumb-copper-500  scrollbar-track-slate-300 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg"
    >
      <div ref={scrollDownRef} />
      {messages.map((message, idx) => {
        const isMe = message.senderId === userId
        const isLastMessage = messages[idx - 1]?.senderId !== message.senderId

        return (
          <SingleMessage
            key={message.id}
            message={message}
            isLoggedUserMessage={isMe}
            isLastUserMessage={isLastMessage}
          />
        )
      })}
    </div>
  )
}

export default Messages
