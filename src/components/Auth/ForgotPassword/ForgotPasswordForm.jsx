import React, { useState } from 'react'
import AuthInput from '../common/AuthInput'
import CTAButton from '../../common/CTAButton'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { sendResetPasswordLink } from '../../../service/AuthService'

function ForgotPasswordForm() {
    const [email, setEmail] = useState('')
    const loading = useSelector(state => state.auth.status)
    const dispatch = useDispatch()

    const submitHandler = () => {
        if(!email){
            return;
        }
        dispatch(sendResetPasswordLink(email))
    }
    return (
        <>
            <div className='font-[Cantora_One] text-[40px] leading-12 flex w-full items-center justify-center text-bg'>
                Bento Chat
            </div>
            <div className='w-full text-dark-grey text-xl text-center font-bold'>
                Enter your email address, we will send you link to your email to reset your password
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-4'>
                <AuthInput type={'email'} value={email} placeholder={'Email'} onChange={(e) => setEmail(e.target.value)} />
                <CTAButton onClick={submitHandler} loading={loading === 'loading'}>
                    Send Link
                </CTAButton>
            </div>

            <div className='w-full flex gap-2.5 justify-between items-center'>
                <div className='w-full outline outline-faint-grey'></div>
                <div className='text-light-grey text-[14px]'>or</div>
                <div className='w-full outline outline-faint-grey'></div>
            </div>

            <div className=' text-dark-grey text-[16px] text-center w-full'>
                Back to <Link to={'/login'} className='text-ink-blue'>Log in</Link>
                </div>
        </>
    )
}

export default ForgotPasswordForm