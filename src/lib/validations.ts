import { z } from 'zod'

export const sendFriendRequestValidator = z.object({
  email: z.string().email(),
})
