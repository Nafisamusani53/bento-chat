


import React, { useEffect, useRef, useState } from 'react'
import { EditIcon } from '../../../icons'
import { useDispatch } from 'react-redux'

function ProfileInput({ text, defaultVal, id, update }) {
  const [value, setValue] = useState(defaultVal)
  const [focus, setFocus] = useState(false)
  const [cursor, setCursor] = useState(null)
  const dispatch = useDispatch()

  const inputRef = useRef(null)

  // When focus becomes true, focus the input and set cursor
  useEffect(() => {
    if (focus && inputRef.current) {
      const pos = cursor ?? value.length // Default to end of input
      inputRef.current.focus()
      inputRef.current.setSelectionRange(pos, pos)
    }
  }, [focus])

  const handleClick = (e) => {
    e.preventDefault()
    setFocus(true)
  }

  const handleChange = (e) => {
    setCursor(e.target.selectionStart)
    setValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
        dispatch(update(value,id))
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
