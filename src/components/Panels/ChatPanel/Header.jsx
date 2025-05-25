import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ThreeDotIcon } from '../../icons'

function Header() {
    const profile = useSelector((state)=>state.profile)
    const [open, setOpen] = useState(false)
    const selected = true
    const data ={
        name:"Senku Ishigami",
        avatar :  `https://api.dicebear.com/5.x/initials/svg?seed=Senku Ishigami`,
        lastMsg: "Hello",
        msgTime: "Now",
        id: 5,
    }
  return (
    <div className='w-full flex gap-5 !px-[18px] !py-2 bg-white/30 border-b-white/50 border-b rounded-t-2xl relative items-center'>
        <img src={data.avatar} className='w-14 rounded-full aspect-square'/>
        <div className='flex flex-col w-full'>
            <div className='text-2xl text-black'>{data.name}</div>
            <div className='text-xs text-grey'>Online</div>
        </div>

        <div onClick={()=>setOpen(prev => !prev)} className='cursor-pointer'>
            <ThreeDotIcon/>
        </div>
          {open && (
              <div className='absolute top-16 right-2 flex flex-col w-40 gap-2.5 !px-2.5 !py-4 bg-white rounded-2xl text-center text-xl text-grey'>
                <div className={`w-full !px-3 !py-3 ${selected && 'bg-dark-blue/10 rounded-[10px]'}`}>Contact Info</div>
                <div className={`w-full !px-3 !py-3`}>Delete Chat</div>
              </div>
          )}
    </div>
  )
}

export default Header