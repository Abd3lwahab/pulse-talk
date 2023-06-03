import Image from 'next/image'
import { getServerSession } from 'next-auth'

import ActiveLink from './ActiveLink'
import SignOutButton from './SignOutButton'
import { authOptions } from '@/lib/auth'
import { lora } from '@/app/fonts'
import { db } from '@/lib/db'

const Sidebar = async ({}) => {
  const session = await getServerSession(authOptions)

  const friendRequests = (
    (await db.smembers(`user:${session!.user.id}:friend_requests`)) as string[]
  ).length

  return (
    <div className="flex flex-col min-h-full  border-r border-slate-200 min-w-[230px] w-[230px]">
      <div className="mx-8 py-8 border-b border-slate-200 mb-12">
        <Image
          src="/assets/logo-no-background-2.png"
          width={145}
          height={45}
          alt="logo"
          unoptimized
          priority
          className="m-auto w-auto h-auto"
        />
      </div>

      <div className="flex h-full flex-col items-center justify-between ">
        <div className="w-full px-8">
          <ActiveLink href="/" icon={'HomeIcon'} text="Home" />
          <ActiveLink href="/chats" icon={'ChatBubbleLeftEllipsisIcon'} text="Chats" />
          <ActiveLink
            href="/friend-requests"
            icon={'UserPlusIcon'}
            text="Friend Requests"
            friendRequests={friendRequests}
          />
        </div>

        <div className="w-full flex flex-col justify-between">
          <div className="flex flex-col flex-grow flex-1 justify-center items-center pb-2">
            <div className="mr-2">
              <Image
                src={session!.user.image || ''}
                width={50}
                height={50}
                alt="profile picture"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col text-center w-full px-2">
              <p className={`text-copper-600 font-bold text-base ${lora.className}`}>
                {session!.user.name}
              </p>
              <p className="text-copper-600 text-sm  truncate block ">{session!.user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
