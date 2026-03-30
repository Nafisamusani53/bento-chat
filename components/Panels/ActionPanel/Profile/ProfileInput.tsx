'use client'
import { EditIcon } from '@/components/icons';
import { useAppDispatch } from '@/store/hooks';
import { AsyncThunk } from '@reduxjs/toolkit';
import React, { useEffect, useRef, useState } from 'react'

interface ProfileInputArgs{
    text : string;
    defaultVal: string;
    id: string ;
    update: AsyncThunk<string, any, any>
}

const ProfileInput: React.FC<ProfileInputArgs> = ({text, defaultVal, id, update}) => {
  const [value, setValue] = useState<string | "">(defaultVal)
  const [focus, setFocus] = useState<boolean>(false)
  const [cursor, setCursor] = useState<number | null>(null)
  const dispatch = useAppDispatch()

  const inputRef = useRef<HTMLInputElement>(null)

  // When focus becomes true, focus the input and set cursor
  useEffect(() => {
    if (focus && inputRef.current) {
      const pos = cursor ?? value.length // Default to end of input
      inputRef.current.focus()
      inputRef.current.setSelectionRange(pos, pos)
    }
  }, [focus])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setFocus(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCursor(e.target.selectionStart)
    setValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
    if (!id) return
        dispatch(update({value,id}))
        setFocus(false)
    }
  }
  return (
    <div className='flex w-full'>
      <div className='w-full flex flex-col'>
        <label htmlFor='name' className='text-dark-blue text-[16px] text-left'>
          {text}
        </label>
        <input
          id='name'
          name='name'
          className={`w-full text-xl text-black focus:outline-none ${focus && 'bg-white/30 rounded-[10px] !px-2 !py-1'}`}
          disabled={!focus}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      </div>

      {/* Edit icon */}
      {!focus && (
        <div onClick={handleClick} className='flex cursor-pointer'>
          <EditIcon />
        </div>
      )}
    </div>
  )
}

export default ProfileInput