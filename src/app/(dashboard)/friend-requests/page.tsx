import { lora } from '../../fonts'
import SendFriendRequestForm from '@/components/SendFriendRequestForm'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { notFound } from 'next/navigation'
import FriendRequest from '@/components/FriendRequest/FriendRequest'

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session) return notFound()

  const friendRequestsIds = (await db.smembers(
    `user:${session.user.id}:friend_requests`
  )) as string[]
  const friendRequestsNumbers = friendRequestsIds.length

  const friendRequests = (await Promise.all(
    friendRequestsIds.map((requestId) => db.get(`user:${requestId}`))
  )) as User[]

  return (
    <div className="flex p-8 flex-grow flex-col">
      <h2
        className={`${lora.className} text-3xl font-bold border-b border-slate-200 pb-4 mb-8 text-copper-600`}
      >
        Friend Requests
      </h2>
      {friendRequestsNumbers === 0 && (
        <p className="text-copper-600 text-xl  ">
          You have no friend requests. <br />
        </p>
      )}
      {friendRequests.map((friendRequest) => (
        <FriendRequest key={friendRequest.id} friend={friendRequest} />
      ))}
      <div className="flex flex-col p-4 rounded-lg  border border-slate-200 max-w-fit mt-14">
        <h4 className={`${lora.className} text-2xl font-bold mb-6 text-copper-600`}>
          Find one to share your thoughts with
        </h4>
        <SendFriendRequestForm />
      </div>
    </div>
  )
}
