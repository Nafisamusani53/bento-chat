import React, { useState } from 'react'
import AuthInput from '../Inputs/AuthInput'
import AuthPassword from '../Inputs/AuthPassword'
import CTAButton from '../../common/CTAButton'
import { useDispatch, useSelector} from 'react-redux'
import { signup } from '../service'
import { checkPassword } from '../helpers'
import { useNavigate } from 'react-router-dom'

function SignUpForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [error, setError] = useState({
        password : false,
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
        if(!emailRegex.test(email)){
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
        dispatch(signup({email: email, password: password, userName: userName}, navigate))
    }


    return (
        <div className='w-[344px] flex flex-col justify-center items-center gap-4'>
            <div className='w-full flex flex-col justify-center items-center gap-1.5'>

                <AuthInput value={userName} placeholder={'User name'} onChange={(e)=>setUserName(e.target.value)} />
                <div className='flex flex-col w-full'>
                <AuthInput type={'email'} value={email} placeholder={'Email'} onChange={(e)=>setEmail(e.target.value)} />
                    <div className={`w-full !pl-1.5 text-[10px] ${!error.email ? 'hidden' : ' text-bright-red horizontal-shake'}`}>
                        Enter valid email
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <AuthPassword value={password} placeholder={"Password"} onChange={(e)=>setPassword(e.target.value)} />
                    <div className={`w-full !pl-1.5 text-[10px] ${!error.password ? ' text-dark-grey ' : ' text-bright-red horizontal-shake'}`}>
                        Use 8 characters with a mix letters, symbols and numbers.
                    </div>
                </div>
            </div>
            <CTAButton onClick={submitHandler} loading = {loading === 'loading'}>
               Sign Up
            </CTAButton>

        </div>
    )
}

export default SignUpForm