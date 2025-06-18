import React, { useState } from 'react'
import AuthPassword from '../common/AuthPassword'
import { useDispatch, useSelector } from 'react-redux'
import CTAButton from '../../common/CTAButton'
import { useNavigate } from 'react-router-dom'
import { checkPassword } from '../../../utils/helpers'
import { resetPassword } from '../../../service/AuthService'

function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [error, setError] = useState({
          password: false,
          confirmPass: false
      })
    const loading = useSelector(state => state.auth.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = async () => {
            if (!confirmPass || !password) {
                return;
            }
    
            setError({
                confirmPass: false,
                password: false
            })
            if (password !== confirmPass) {
                setError(prev => ({
                    ...prev,
                    confirmPass: true
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
            dispatch(resetPassword(password, navigate))
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
                <CTAButton onClick={submitHandler} loading={loading === 'loading'}>
                    Reset Password
                </CTAButton>
            </div>
        </>
    )
}

export default ResetPasswordForm