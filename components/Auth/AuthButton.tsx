import React from 'react'

interface AuthButtonProps {
    AuthIcon : React.ComponentType<React.SVGProps<SVGSVGElement>>;
    EndIcon : React.ComponentType<React.SVGProps<SVGSVGElement>>;
    text: string;
    authService ?: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({AuthIcon, EndIcon, text, authService = ()=>{}}) => {
  return (
    <button 
      onClick={(e)=>{
        e.preventDefault()
        console.log("clicked")
        authService()
      }}
      className='cursor-pointer flex justify-between w-full items-center !px-4 !py-3 rounded-[14px] bg-white border border-dark-grey'>
        <AuthIcon/>
        <div className='text-xl'>{text}</div>
        <EndIcon/>
    </button>
  )
}

export default AuthButton