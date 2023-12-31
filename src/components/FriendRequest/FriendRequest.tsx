'use client'

import { FC } from 'react'
import Image from 'next/image'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

interface FriendRequestProps {
  friend: User
  updateCallback: (friendRequests: User) => void
}

const FriendRequest: FC<FriendRequestProps> = ({ friend, updateCallback }) => {
  const router = useRouter()

  const acceptFriendRequest = async () => {
    try {
      await axios.post('/api/friend/accept', { id: friend.id })
      toast.success('🎉 Friend request accepted! 🎉', {
        className: 'bg-copper-800',
      })
      updateCallback(friend)
      router.refresh()
    } catch (error) {
      toast.error((error as AxiosError).response?.data as string, {
        className: 'bg-copper-800',
      })
    }
  }
  const rejectFriendRequest = async () => {
    try {
      await axios.post('/api/friend/reject', { id: friend.id })
      toast.success('Friend request declined.', {
        className: 'bg-copper-800',
      })
      updateCallback(friend)
      router.refresh()
    } catch (error) {
      toast.error((error as AxiosError).response?.data as string, {
        className: 'bg-copper-800',
      })
    }
  }

  return (
    <div className="flex flex-row justify-between max-w-[470px] items-center w-[470px]">
      <div className="flex flex-row">
        <div className="mr-2 flex self-center">
          <Image
            src={friend.image || ''}
            width={45}
            height={45}
            alt="profile picture"
            className="rounded-full "
          />
        </div>
        <div className="flex flex-col max-w-[250px]">
          <p className="font-lora font-bold text-lg">{friend.name}</p>
          <p className="text-base truncate">{friend.email}</p>
        </div>
      </div>
      <div className="ml-3">
        <button
          className="p-2 bg-copper-500 text-white rounded-lg hover:bg-copper-400 transition hover:sgadow-md w-16"
          onClick={acceptFriendRequest}
        >
          <p>Accept</p>
        </button>
        <button
          className="p-2 bg-red-700 text-white rounded-lg ml-2 hover:bg-red-600  transition hover:sgadow-md w-16"
          onClick={rejectFriendRequest}
        >
          <p>Reject</p>
        </button>
      </div>
    </div>
  )
}

export default FriendRequest
