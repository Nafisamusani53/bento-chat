
function AuthButton({AuthIcon, EndIcon, text, authService = ()=>{}}) {
  return (
    <button 
      onClick={(e)=>{
        e.preventDefault()
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