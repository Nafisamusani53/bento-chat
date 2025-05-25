import React, { useState } from 'react'
import { Emoji, LinkIcon } from '../../icons'

function InputBox() {
    const [msg, setMsg] = useState("")
  return (
    <div className='flex justify-between items-center gap-6 !px-5 !py-3.5 rounded-b-2xl bg-white/30 border-t border-t-white/50 w-full'>
        <div className='w-fit cursor-pointer'>
        <Emoji/>
        </div>
        <input
            className='!px-4 !py-2 rounded-[10px] placeholder-grey text-black w-full bg-white/30'
            type='text'
            value={msg}
            onChange={(e)=>setMsg(e.target.value)}
            placeholder='Type a message'
        />
        <div className='w-fit cursor-pointer'>
            <LinkIcon/>
        </div>
    </div>
  )
}

export default InputBox