import React, { useState } from 'react'
import AuthInput from '../common/AuthInput'
import AuthPassword from '../common/AuthPassword'
import CTAButton from '../../common/CTAButton'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../service'
import { checkPassword } from '../helpers'
import { Link, useNavigate } from 'react-router-dom'
import ThirdParty from '../ThirdPartyAuth/ThirdParty'

function SignUpForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [error, setError] = useState({
        password: false,
        email: false
    })
    const loading = useSelector(state => state.auth.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()


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
        dispatch(signup({ email: email, password: password, userName: userName }, navigate))
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

                    <AuthInput value={userName} placeholder={'User name'} onChange={(e) => setUserName(e.target.value)} />
                    <div className='flex flex-col w-full gap-0.5'>
                        <AuthInput type={'email'} value={email} placeholder={'Email'} onChange={(e) => setEmail(e.target.value)} />
                        <div className={`w-full !pl-1.5 text-[10px] ${!error.email ? 'hidden' : ' text-bright-red horizontal-shake'}`}>
                            Enter valid email
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <AuthPassword value={password} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} />
                        <div className={`w-full !pl-1.5 text-[10px] ${!error.password ? ' text-dark-grey ' : ' text-bright-red horizontal-shake'}`}>
                            Use 8 characters with a mix letters, symbols and numbers.
                        </div>
                    </div>
                </div>
                <CTAButton onClick={submitHandler} loading={loading === 'loading'}>
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
                        By continuing you agree to our <Link to={'#'} className='text-ink-blue'>Terms of service</Link> <br/>
                        and <Link to={'#'} className='text-ink-blue'>Privacy Policy</Link>
                    </div>

                    <div className=' text-dark-grey text-[16px] text-center w-full'>
                        Already have an account? <Link to={'/login'} className='text-ink-blue'>Log in</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpForm