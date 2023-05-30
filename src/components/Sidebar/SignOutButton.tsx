'use client'

import { signOut } from 'next-auth/react'
import Icons from '../ui/icon'

const SignOutButton = ({}) => {
  const LogoutIcon = Icons['ArrowRightOnRectangleIcon']
  return (
    <div className="border-t border-slate-200 py-3">
      <div
        className="flex flex-row items-center cursor-pointer max-w-fit m-auto"
        onClick={() => signOut()}
      >
        <LogoutIcon className="w-6 text-copper-600" />
        <p className="ml-2 font-bold text-base text-copper-600">Log Out</p>
      </div>
    </div>
  )
}

export default SignOutButton
