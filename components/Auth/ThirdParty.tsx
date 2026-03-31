import React from 'react'
import AuthButton from './AuthButton'
import { GoogleIcon, RightArrow } from '../icons'
import { googleAuth } from '@/store/thunks/AuthThunks'
import { useAppDispatch } from '@/store/hooks'

const ThirdParty = () => {

  const dispatch = useAppDispatch();

  // ✅ Wrap thunk inside a function
  const handleGoogleLogin = () => {
    dispatch(googleAuth());
  };
  return (
    <div className="flex flex-col gap-4 w-full items-center justify-between">
      <AuthButton AuthIcon={GoogleIcon} text={'Continue with Google'} EndIcon={RightArrow} authService={handleGoogleLogin}/>
    </div>
  )
}

export default ThirdParty