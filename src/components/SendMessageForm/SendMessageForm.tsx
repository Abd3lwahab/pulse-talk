'use client'

import { FC, useRef, useState } from 'react'
import Icons from '@/components/ui/icon'
import ReactTextAreaAutosize from 'react-textarea-autosize'
import axios from 'axios'
import { toast } from 'react-toastify'

interface SendMessageFormProps {
  userId: string
  chatId: string
}

const SendMessageForm: FC<SendMessageFormProps> = ({ userId, chatId }) => {
  const [messageValue, setMessageValue] = useState('')
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const SendIcon = Icons['PaperAirplaneIcon']

  async function SendMessage() {
    try {
      if (!messageValue) return
      setMessageValue('')
      messageRef.current?.focus()

      await axios.post('/api/messages', {
        chatId: chatId,
        message: messageValue,
      })
    } catch (error) {
      toast.error('An error occurred!')
    }
  }

  return (
    <div className="flex items-end pt-2">
      <ReactTextAreaAutosize
        name="message"
        placeholder="Type a message"
        className="w-full px-4 py-2 border-slate-200 bg-slate-100 border rounded-lg resize-none h-11 outline-none text-base text-copper-800"
        autoFocus
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
        ref={messageRef}
        minRows={1}
        maxRows={3}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            SendMessage()
          }
        }}
      />
      <button
        className="ml-4 bg-copper-500 text-white px-6 rounded-lg h-11 hover:bg-copper-400 transition"
        onClick={SendMessage}
      >
        <SendIcon className="w-6 h-6" />
      </button>
    </div>
  )
}

export default SendMessageForm
