'use client'
import { useAppDispatch } from '@/store/hooks';
import { signup } from '@/store/thunks/AuthThunks';
import { checkPassword } from '@/utils/helper';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import CTAButton from '../Common/CTAButton';
import AuthInput from '../Common/AuthInput';
import AuthPassword from '../Common/AuthPassword';
import ThirdParty from './ThirdParty';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface ErrorType {
    password: boolean;
    email: boolean;
}

const SignupForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [error, setError] = useState<ErrorType>({
        password: false,
        email: false
    })
    const loading = false //
    const dispatch = useAppDispatch()
    const router = useRouter()


    const submitHandler = async () => {
        if (!userName || !email || !password) {
            return;
        }
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        setError({
            email: false,
            password: false
        })
        if (!emailRegex.test(email)) {
            setError(prev => ({
                ...prev,
                email: true
            }))
            return
        }
        const pass = checkPassword(password)
        if (!pass) {
            setError(prev => ({
                ...prev,
                password: true
            }))
            return;
        }
        try {
            await dispatch(signup({ email, password, userName })).unwrap();

            router.push("/");
            router.refresh();
        } catch (err: any) {
            toast.error(err || "Signup failed");
        }
    }

    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            submitHandler()
        }
    }


    return (
        <>
            <div className='flex flex-col justify-center items-center gap-0 w-full'>
                <div className='font-[Cantora_One] text-[40px] leading-12 flex w-full items-center justify-center text-bg'>
                    Bento Chat
                </div>
                <div className='w-full text-dark-grey text-[16px] text-center'>
                    Create an account to connect with your friends
                </div>
            </div>

            {/* form */}
            <div className='w-full flex flex-col justify-center items-center gap-4'>
                <div className='w-full flex flex-col justify-center items-center gap-1.5'>

                    <AuthInput type={'text'} value={userName} placeholder={'User name'} onChange={(e) => setUserName(e.target.value)} />
                    <div className='flex flex-col w-full gap-0.5'>
                        <AuthInput type={'email'} value={email} placeholder={'Email'} onChange={(e) => setEmail(e.target.value)} />
                        <div className={`w-full !pl-1.5 text-[10px] ${!error.email ? 'hidden' : ' text-bright-red horizontal-shake'}`}>
                            Enter valid email
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <AuthPassword value={password} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
                        <div className={`w-full !pl-1.5 text-[10px] ${!error.password ? ' text-dark-grey ' : ' text-bright-red horizontal-shake'}`}>
                            Use 8 characters with a mix letters, symbols and numbers.
                        </div>
                    </div>
                </div>
                <CTAButton onClick={submitHandler} loading={loading}>
                    Sign Up
                </CTAButton>
            </div>

            {/* divider based on routes */}
            <div className='w-full flex gap-2.5 justify-between items-center'>
                <div className='w-full border-[1px] border-faint-grey'></div>
                <div className='text-light-grey text-[14px]'>or</div>
                <div className='w-full border-[1px] border-faint-grey'></div>
            </div>

            {/* third party auth login based routes */}
            <div className='flex flex-col gap-2.5 w-full items-center justify-center'>
                <ThirdParty />
                <div className='flex flex-col items-center justify-center gap-6 w-full'>
                    <div className=' text-dark-grey text-[16px] text-center w-full'>
                        By continuing you agree to our <Link href={'#'} className='text-ink-blue'>Terms of service</Link> <br/>
                        and <Link href={'#'} className='text-ink-blue'>Privacy Policy</Link>
                    </div>

                    <div className=' text-dark-grey text-[16px] text-center w-full'>
                        Already have an account? <Link href={'/login'} className='text-ink-blue'>Log in</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupForm