import React from 'react'
import AuthButton from './AuthButton'
import { AppleIcon, GoogleIcon, RightArrow } from '../../icons'
import { appleAuth, googleAuth } from '../service'

function ThirdParty() {
  return (
    <div className="flex flex-col gap-4 w-full items-center justify-between">
      <AuthButton AuthIcon={GoogleIcon} text={'Continue with Google'} EndIcon={RightArrow} authService={googleAuth}/>
      <AuthButton AuthIcon={AppleIcon} text={'Continue with Apple'} EndIcon={RightArrow} authService={appleAuth}/>
    </div>
  )
}

export default ThirdParty