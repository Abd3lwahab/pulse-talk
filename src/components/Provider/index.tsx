'use client'

import { ToastContainer } from 'react-toastify'
import { FC, PropsWithChildren } from 'react'
import { karla } from '@/app/fonts'

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ToastContainer
        position={'bottom-left'}
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme={'dark'}
        bodyClassName={karla.className}
      />
      {children}
    </>
  )
}

export default Providers
