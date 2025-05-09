import React, { useState } from 'react'
import AuthInput from '../Inputs/AuthInput'
import AuthPassword from '../Inputs/AuthPassword'
import CTAButton from '../../common/CTAButton'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../service'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const loading = useSelector(state => state.auth.status)
    const navigate = useNavigate()

    const submitHandler = () => {
        if(!email || !password){
            return;
        }
        dispatch(login({
            email: email,
            password: password
        }, navigate))
    }
  return (
    <div className='w-[344px] flex flex-col justify-center items-center gap-4'>
        <div className='w-full flex flex-col justify-center items-center gap-1.5'>

        
        <AuthInput type={'email'} value={email} placeholder={'Email'} onChange={(e)=>setEmail(e.target.value)}/>
        <div className='flex flex-col gap-2 w-full'>
        <AuthPassword value={password} placeholder={"Password"} onChange={(e)=>setPassword(e.target.value)}/>
        <div className='w-full text-ink-blue text-xs text-right cursor-pointer'>
            Forgot Password?
        </div>
        </div>
        </div>
        <CTAButton onClick={submitHandler} loading = {loading === 'loading'}>
            Login
        </CTAButton>
    </div>
  )
}

export default LoginForm