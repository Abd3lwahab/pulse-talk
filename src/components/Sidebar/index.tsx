'use client'

import { FC } from 'react'
import IconComponent from '@/components/ui/icon'
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  UserPlusIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

const Sidebar: FC = ({}) => {
  return (
    <div className="flex flex-col min-h-full  border-r border-slate-200">
      <div className="p-4 border-b border-slate-200 mb-12">
        <Image src="/logo-no.png" width={45} height={45} alt="logo" unoptimized priority />
      </div>
      <div className="flex h-full flex-col items-center justify-between">
        <div>
          <IconComponent icon={HomeIcon} />
          <IconComponent icon={ChatBubbleLeftEllipsisIcon} />
          <IconComponent icon={UserPlusIcon} />
        </div>
        <div className="flex pt-8 border-t border-slate-200 w-full justify-center">
          <IconComponent icon={ArrowLeftOnRectangleIcon} onClick={() => signOut()} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
