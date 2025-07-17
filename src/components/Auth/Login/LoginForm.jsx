import React, { useState } from 'react'
import AuthInput from '../common/AuthInput'
import AuthPassword from '../common/AuthPassword'
import CTAButton from '../../common/CTAButton'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import ThirdParty from '../ThirdPartyAuth/ThirdParty'
import { login } from '../../../service/AuthService'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const loading = useSelector(state => state.auth.status)
    const navigate = useNavigate()

    const submitHandler = () => {
        if (!email || !password) {
            return;
        }
        dispatch(login({
            email: email,
            password: password
        }, navigate))
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            console.log("here")
            submitHandler()
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
                        <Link to={'/forgot-password'} className='w-full text-ink-blue text-xs text-right cursor-pointer'>
                            Forgot Password?
                        </Link>
                    </div>
                </div>
                <CTAButton onClick={submitHandler} loading={loading === 'loading'}>
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
                    Don’t have an account? <Link to={'/signup'} className='text-ink-blue'>Sign Up</Link>
                    </div>
            </div>
        </>
    )
}

export default LoginForm