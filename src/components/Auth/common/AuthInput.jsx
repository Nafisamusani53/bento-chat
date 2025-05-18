import React from 'react'


function AuthInput({type='text', placeholder, value, onChange}) {
  return (
    <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className='bg-white border-[1px] w-full border-extra-light-grey rounded-[10px] placeholder:text-light-grey placeholder:text-lg !px-5 !py-3 focus:outline-none'
    />
  )
}

export default AuthInput