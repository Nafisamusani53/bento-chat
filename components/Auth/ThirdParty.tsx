import React from 'react'
import AuthButton from './AuthButton'
import { GoogleIcon, RightArrow } from '../icons'
import { googleAuth } from '@/store/thunks/AuthThunks'

const ThirdParty = () => {
  return (
    <div className="flex flex-col gap-4 w-full items-center justify-between">
      <AuthButton AuthIcon={GoogleIcon} text={'Continue with Google'} EndIcon={RightArrow} authService={googleAuth}/>
    </div>
  )
}

export default ThirdParty