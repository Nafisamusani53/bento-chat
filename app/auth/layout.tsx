import { ReactNode } from 'react'

export default function AuthContainer({children} : {children : React.ReactNode}) {
  return (
    <div className='w-full  h-[100vh] relative flex justify-center items-center bg-light-blue'>
      <div className='w-28 rounded-4xl bg-opaque-pink top-[12%] left-1/2 absolute border-[1px] border-white rotate-45 aspect-square'></div>
      <div className='w-28 rounded-2xl bg-opaque-blue top-[25%] right-1/3 absolute border-[1px] border-white rotate-45 aspect-square'></div>
      <div className='w-28 rounded-4xl bg-opaque-green top-[48%] right-[28%] absolute border-[1px] border-white rotate-45 aspect-square'></div>
      <div className='w-28 rounded-4xl bg-opaque-purple bottom-[15%] right-[35%] absolute border-[1px] border-white rotate-45 aspect-square'></div>
      <div className='w-16 rounded-2xl bg-opaque-green bottom-[18%] right-[50%] absolute border-[1px] border-white rotate-45 aspect-square'></div>
      <div className='w-28 rounded-4xl bg-opaque-red bottom-[20%] left-[35%] absolute border-[1px] border-white rotate-45 aspect-square'></div>
      <div className='w-28 rounded-4xl bg-opaque-lime top-[48%] left-[28%] absolute border-[1px] border-white rotate-45 aspect-square'></div>
      <div className='w-28 rounded-4xl bg-opaque-orange top-[30%] left-[25%] absolute border-[1px] border-white rotate-45 aspect-square'></div>
      <div className='w-16 rounded-2xl bg-opaque-sea-blue top-[18%] left-[38%] absolute border-[1px] border-white rotate-45 aspect-square'></div>
      <div className='rounded-[20px] !p-11 flex flex-col z-10 justify-center items-center gap-3 template-bg relative w-[436px]'>
        <div className='w-28 rounded-2xl bg-white opacity-50 -z-10 top-9 right-7 absolute rotate-45 aspect-square'></div>
        <div className='w-28 rounded-2xl bg-white opacity-50 -z-10 bottom-5 left-4 absolute rotate-12 aspect-square'></div>
        {children}
      </div>
    </div>
  )
}