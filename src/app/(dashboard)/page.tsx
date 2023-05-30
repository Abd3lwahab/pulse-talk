import IconComponent from '@/components/ui/icon'
import { authOptions } from '@/lib/auth'
import { UserIcon } from '@heroicons/react/24/outline'
import { getServerSession } from 'next-auth/next'
import Image from 'next/image'
import { lora } from '../fonts'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-row p-12 flex-grow items-center justify-center">
      <div className="flex flex-col items-center">
        {session ? (
          <Image
            src={session.user.image!}
            width={100}
            height={100}
            alt="user_image"
            unoptimized
            className=" rounded-[50px] mb-4"
          />
        ) : (
          <div className="border-4 border-copper-600 rounded-full p-4 mb-4">
            {/* <IconComponent icon={UserIcon} className="w-20 h-20 mb-0" /> */}
          </div>
        )}
        <p
          className={`text-center text-2xl mb-4 text-copper-700  font-thin border-b border-slate-200 pb-6 ${lora.className}`}
        >
          Welcome back, <span className="font-semibold">{session?.user?.name}</span>!
        </p>
        <p
          className={`text-center text-2xl mb-6 text-copper-700 font-sans font-light leading-9 ${lora.className}`}
        >
          Let&apos;s pick up where you left off and make a new memories.
        </p>
        <button className="bg-copper-600  text-white border-copper-500 border py-2 px-10 rounded-lg font-light font-mono">
          Start a conversation
        </button>
      </div>
    </div>
  )
}
