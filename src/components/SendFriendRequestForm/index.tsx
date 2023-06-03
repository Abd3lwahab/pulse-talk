'use client'

import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendFriendRequestValidator } from '@/lib/validations'
import axios from 'axios'
import { toast } from 'react-toastify'

interface SendFriendRequestFormProps {}

type FormData = z.infer<typeof sendFriendRequestValidator>

const SendFriendRequestForm: FC<SendFriendRequestFormProps> = ({}) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(sendFriendRequestValidator),
  })

  const sendFriendRequest = async (data: FormData) => {
    try {
      const response = await axios.post('/api/friend/request', data)
      if (response.status === 200) {
        toast.success('🎉 Friend request sent! 🎉', {
          className: 'bg-copper-800',
        })
        reset({
          email: '',
        })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError('email', {
          message: error.message,
        })
      } else if (error instanceof axios.AxiosError) {
        setError('email', {
          message: error.response?.data,
        })
      } else {
        setError('email', {
          message: 'Something went wrong',
        })
      }
    }
  }

  return (
    <>
      <form className="flex flex-row" onSubmit={handleSubmit(sendFriendRequest)}>
        <input
          {...register('email')}
          placeholder="Your Friend E-mail"
          className="py-3 px-4 bg-slate-200 rounded-lg w-72 mr-2 outline-none text-copper-600 focus:ring-1 focus:ring-copper-600 border border-slate-400 transition"
        />
        <button className="flex justify-center items-center bg-copper-500 text-white px-4 py-2 rounded-lg hover:bg-copper-400 transition">
          Send Requests
        </button>
      </form>
      <p className="text-red-600 text-sm mt-1">{errors.email?.message}</p>
    </>
  )
}

export default SendFriendRequestForm
