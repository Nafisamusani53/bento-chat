'use client'
import React, { useState } from 'react'
import AuthInput from '../Common/AuthInput'
import CTAButton from '../Common/CTAButton'
import Link from 'next/link'
import { useAppDispatch } from '@/store/hooks'
import { sendResetPasswordLink } from '@/store/thunks/AuthThunks'
import toast from 'react-hot-toast'
import { checkEmail } from '@/utils/helper'

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [error, setError] = useState<boolean>(false)

  const checkError = () => {
    const emailError = !email || checkEmail(email)

    setError(emailError)
    return emailError;
  }

  const submitHandler = async () => {
    if (checkError()) return;

    try {
      setLoading(true);
      await dispatch(sendResetPasswordLink({ email })).unwrap();

      toast.success("Link has been sent to your mail. Check your email.");
    } catch (err) {
      toast.error("Try again after some time.");
    }finally{
      setLoading(false);
    }
  };
  return (
    <>
      <div className='font-[Cantora_One] text-[40px] leading-12 flex w-full items-center justify-center text-bg'>
        Bento Chat
      </div>
      <div className='w-full text-dark-grey text-xl text-center font-bold'>
        Enter your email address, we will send you link to your email to reset your password
      </div>
      <div className='w-full flex flex-col justify-center items-center gap-4'>
        <div className='flex flex-col w-full'>
          <AuthInput type={'email'} value={email} placeholder={'Email'} onChange={(e) => setEmail(e.target.value)} />
          <div className={`w-full !pl-1.5 text-[10px] ${!error ? ' hidden ' : ' text-bright-red horizontal-shake visible'}`}>
            Please enter your valid email
          </div>
        </div>
        <CTAButton onClick={submitHandler} loading={loading}>
          Send Link
        </CTAButton>
      </div>

      <div className='w-full flex gap-2.5 justify-between items-center'>
        <div className='w-full outline outline-faint-grey'></div>
        <div className='text-light-grey text-[14px]'>or</div>
        <div className='w-full outline outline-faint-grey'></div>
      </div>

      <div className=' text-dark-grey text-[16px] text-center w-full'>
        Back to <Link href={'/login'} className='text-ink-blue'>Log in</Link>
      </div>
    </>
  )
}

export default ForgotPasswordForm