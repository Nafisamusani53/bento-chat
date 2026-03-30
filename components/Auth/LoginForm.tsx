'use client'
import React, { useState } from 'react'
import AuthInput from '../Common/AuthInput'
import AuthPassword from '../Common/AuthPassword'
import CTAButton from '../Common/CTAButton'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import ThirdParty from './ThirdParty'
import { login } from '@/store/thunks/AuthThunks'
import toast from 'react-hot-toast'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch();
    const loading = false; //
    const router = useRouter();

   
  const handleLogin = async () => {
    try {
    await dispatch(login({ email, password })).unwrap();

    toast.success("Login successful");

    router.push("/");
    router.refresh();
  } catch (err: any) {
    toast.error(err);
  }
  };


    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            handleLogin()
        }
    }
    return (


       <>
            <div className='font-[Cantora_One] text-[40px] leading-12 flex w-full items-center justify-center text-bg'>
                Bento Chat
            </div>

            {/* form */}
            <div className='w-full flex flex-col justify-center items-center gap-4'>
                <div className='w-full flex flex-col justify-center items-center gap-1.5'>


                    <AuthInput type={'email'} value={email} placeholder={'Email'} onChange={(e) => setEmail(e.target.value)} />
                    <div className='flex flex-col w-full gap-0.5'>
                        <AuthPassword value={password} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}/>
                        <Link href={'/auth/forgot-password'} className='w-full text-ink-blue text-xs text-right cursor-pointer'>
                            Forgot Password?
                        </Link>
                    </div>
                </div>
                <CTAButton onClick={handleLogin} loading={loading}>
                    Login
                </CTAButton>
            </div>

            {/* divider based on routes */}
            <div className='w-full flex gap-2.5 justify-between items-center'>
                <div className='w-full outline outline-faint-grey'></div>
                <div className='text-light-grey text-[14px]'>or</div>
                <div className='w-full outline outline-faint-grey'></div>
            </div>

            {/* third party auth login based routes */}
            <div className='flex flex-col gap-2.5 w-full items-center justify-center'>
                <ThirdParty/>
                    <div className=' text-dark-grey text-[16px] text-center w-full'>
                    Don’t have an account? <Link href={'/auth/signup'} className='text-ink-blue'>Sign Up</Link>
                    </div>
            </div>
        </>
    )
}

export default LoginForm