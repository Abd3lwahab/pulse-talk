import SendFriendRequestForm from '@/components/SendFriendRequestForm'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { notFound } from 'next/navigation'
import FriendRequestList from '@/components/FriendRequestList/FriendRequestList'

const getFriendRequests = async (userId: string) => {
  const friendRequestsIds = (await db.smembers(`user:${userId}:friend_requests`)) as string[]

  const friendRequests = (await Promise.all(
    friendRequestsIds.map((requestId) => db.get(`user:${requestId}`))
  )) as User[]

  return friendRequests
}

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session) return notFound()

  const friendRequests = await getFriendRequests(session.user.id)

  return (
    <div className="flex p-8 flex-grow flex-col">
      <h2 className="font-lora text-3xl font-bold border-b border-slate-200 pb-4 mb-8 text-copper-600">
        Friend Requests
      </h2>
      <FriendRequestList intialFriendRequests={friendRequests} userId={session.user.id} />
      <div className="flex flex-col p-4 rounded-lg  border border-slate-200 max-w-fit mt-14">
        <h4 className="font-lora text-2xl font-bold mb-6 text-copper-600`">
          Find one to share your thoughts with
        </h4>
        <SendFriendRequestForm />
      </div>
    </div>
  )
}
