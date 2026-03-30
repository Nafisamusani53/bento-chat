import React from 'react'
import AuthButton from './AuthButton'
import { AppleIcon, GoogleIcon, RightArrow } from '../icons'

const ThirdParty = () => {
  return (
    <div className="flex flex-col gap-4 w-full items-center justify-between">
      <AuthButton AuthIcon={GoogleIcon} text={'Continue with Google'} EndIcon={RightArrow} />
    </div>
  )
}

export default ThirdParty