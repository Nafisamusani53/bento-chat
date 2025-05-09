import React from 'react'
import AuthInput from '../Inputs/AuthInput'
import LoginForm from '../Login/LoginForm'

function FormTemplate({children}) {
  return (
    <div className='rounded-[20px] !p-11 flex flex-col z-10 justify-center items-center gap-3 template-bg'>
        <div className='font-[Cantora_One] text-[40px] leading-12 flex w-full items-center justify-center text-bg'>
            Bento Chat
        </div>

        {/* form */}
       {children}

        {/* divider based on routes */}

        {/* third party auth login based routes */}
    </div>
  )
}

export default FormTemplate