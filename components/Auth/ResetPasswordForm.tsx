'use client'
import { useAppDispatch} from '@/store/hooks';
import { checkPassword } from '@/utils/helper';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import AuthPassword from '../Common/AuthPassword';
import CTAButton from '../Common/CTAButton';
import { resetPassword } from '@/store/thunks/AuthThunks';
import toast from 'react-hot-toast';
import { BlobOptions } from 'buffer';
import { RePassError } from '@/type';


const ResetPasswordForm = () => {
  const [password, setPassword] = useState<string>('')
  const [confirmPass, setConfirmPass] = useState<string>('')
  const [error, setError] = useState<RePassError>({
          password: false,
          confirmPass: false
      })
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const checkPasswordErrors = () => {
        const newErrors = {
            password: !password || !checkPassword(password),
            confirmPass: !confirmPass || password !== confirmPass
        };

        setError(newErrors);

        return newErrors.password && newErrors.confirmPass;
    };

    const submitHandler = async () => {
            if(checkPasswordErrors())
                return;
            try{
                setLoading(true)
                await dispatch(resetPassword({password})).unwrap();
                router.push("/")
            }
            catch(err){
                toast.error("Please try again after some time")
            }finally{
                setLoading(false)
            }
            
        }
    return (
        <>
            <div className='font-[Cantora_One] text-[40px] leading-12 flex w-full items-center justify-center text-bg'>
                Bento Chat
            </div>
            <div className='w-full text-dark-grey text-xl text-center font-bold'>
                Reset your password
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-4'>
                <div className='w-full flex flex-col justify-center items-center gap-1.5'>
                    <div className='flex flex-col w-full'>
                        <AuthPassword value={password} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} />
                        <div className={`w-full !pl-1.5 text-[10px] ${!error.password ? ' text-dark-grey ' : ' text-bright-red horizontal-shake'}`}>
                            Use 8 characters with a mix letters, symbols and numbers.
                        </div>
                    </div>

                    <div className='flex flex-col w-full'>
                        <AuthPassword value={confirmPass} placeholder={"Confirm Password"} onChange={(e) => setConfirmPass(e.target.value)} />
                        <div className={`w-full !pl-1.5 text-[10px] ${!error.confirmPass ? ' hidden ' : ' text-bright-red horizontal-shake visible'}`}>
                            Password and Confirm Password does not match
                        </div>
                    </div>
                </div>
                <CTAButton onClick={submitHandler} loading={loading}>
                    Reset Password
                </CTAButton>
            </div>
        </>
    )
}

export default ResetPasswordForm