import React, { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '../../icons'

function AuthPassword({value, placeholder, onChange, onKeyDown}) {
    const [open, setOpen] = useState(false)
  return (
    <div className='bg-white border-[1px] w-full border-extra-light-grey rounded-[10px] !px-5 !py-3 flex flex-row items-center justify-between'>

        <input
            type={open ? 'text' : 'password'}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className=' placeholder:text-light-grey placeholder:text-lg focus:outline-none bg-none'
        />
        <div onClick={()=>setOpen(prev=>!prev)} className='cursor-pointer'>
        {open ? (<EyeSlashIcon/>) : null}
        {!open ? (<EyeIcon/>): null}
        </div>
    </div>
  )
}

export default AuthPassword