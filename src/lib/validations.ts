import { z } from 'zod'

export const sendFriendRequestValidator = z.object({
  email: z.string().email(),
})

export const messageValidator = z.object({
  id: z.string(),
  senderId: z.string(),
  content: z.string(),
  date: z.number(),
})

export type Message = z.infer<typeof messageValidator>

export const messagesValidator = z.array(messageValidator)
