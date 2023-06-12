import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getChatId(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort()
  return `${sortedIds[0]}_${sortedIds[1]}`
}

export const getPusherChannelName = (key: string) => {
  return key.replace(/:/g, '-')
}
