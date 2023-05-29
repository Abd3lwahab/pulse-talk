'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { FC } from 'react'
import { lora } from '../fonts'

const Login: FC = ({}) => {
  async function loginWithGoogle() {
    try {
      await signIn('google')
    } catch (error) {
      throw new Error(`Error signing in with Google: ${error}`)
    }
  }

  return (
    <div className="flex flex-row p-12 flex-grow justify-center pt-64">
      <div className="flex flex-col">
        <div className="flex justify-center border-b border-slate-200 mb-12">
          <Image
            src="/logo-no-background-2.png"
            width={200}
            height={512}
            alt="logo"
            priority
            unoptimized
            className="pb-6 "
          />
        </div>
        <p
          className={`text-center text-2xl mb-6 text-copper-800  font-light leading-9 ${lora.className}`}
        >
          Connecting minds, igniting conversations. <br /> Welcome to Pulse Talk.
        </p>
        <button
          onClick={loginWithGoogle}
          className="flex flex-row justify-center items-center  mx-auto w-full active:scale-95  rounded-md text-base font-medium transition-color 
          focus:outline-none focus:ring-2 focus:ring-copper-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none
           text-copper-900 border border-slate-200 h-10 py-2 px-16 font-sans"
        >
          <svg
            className="mr-2 h-5 w-5 inline-block"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="github"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Log in with Google
        </button>
      </div>
    </div>
  )
}

export default Login
