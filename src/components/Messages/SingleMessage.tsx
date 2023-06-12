import useFormattedDate from '@/hooks/useFormattedDate'
import { cn } from '@/lib/utils'
import { Message } from '@/lib/validations'
import { FC } from 'react'

interface messageProps {
  message: Message
  isLoggedUserMessage: boolean
  isLastUserMessage: boolean
}

const SingleMessage: FC<messageProps> = ({ message, isLoggedUserMessage, isLastUserMessage }) => {
  const date = useFormattedDate(message.date)

  return (
    <div
      key={message.id}
      className={cn('flex items-end', {
        'justify-end': isLoggedUserMessage,
        'justify-start': !isLoggedUserMessage,
        'mb-1': !isLastUserMessage,
        'mb-3': isLastUserMessage,
      })}
    >
      <div
        className={cn(
          'flex flex-row items-center space-y-2 text-base max-w-s rounded-lg px-4 py-2',
          {
            'bg-copper-500 text-white': isLoggedUserMessage,
            'bg-slate-200 text-copper-500': !isLoggedUserMessage,
            'rounded-br-none': isLastUserMessage && isLoggedUserMessage,
            'rounded-bl-none': isLastUserMessage && !isLoggedUserMessage,
          }
        )}
      >
        <span>{message.content}</span>
        <span
          className={cn(`text-sm ml-2 min-w-[41px] min-h-[20px] uppercase`, {
            'text-slate-400': isLoggedUserMessage,
            'text-slate-500': !isLoggedUserMessage,
          })}
        >
          {date}
        </span>
      </div>
    </div>
  )
}

export default SingleMessage
