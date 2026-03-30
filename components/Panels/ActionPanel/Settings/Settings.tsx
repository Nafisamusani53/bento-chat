'use client'

import CTAButton from '@/components/Common/CTAButton'
import Modal from '@/components/Common/Modal'
import { DeleteIcon, LogoutIcon } from '@/components/icons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setNavigation } from '@/store/slices/navigationSlice'
import { deleteAccount, logout } from '@/store/thunks/AuthThunks'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Settings = () => {
  const profile = useAppSelector(state => state.profile)
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()
    return (
        <>
            <div className='w-full text-2xl font-bold text-black text-left'>
                Settings
            </div>

            <div className='flex flex-col items-start gap-4 h-full w-full'>
                <div className='cursor-pointer flex gap-3 items-center justify-center !py-2.5 border-b border-b-white ' onClick={(e) => {
                    e.preventDefault()
                    dispatch(setNavigation("profile"))
                }}>
                    <img src={profile.avatar} alt='profile image' className='w-20 aspect-square rounded-full border border-off-white object-cover' />

                    <div className='flex flex-col items-start '>
                        <div className='text-lg text-black font-black'>{profile.username}</div>
                        <div className='text-[14px] text-black'>{profile.about}</div>
                    </div>
                </div>

                <div className='flex flex-col gap-4 w-full'>
                    <div className=' flex gap-6 cursor-pointer items-center' onClick={async() => {
                        await dispatch(logout()).unwrap()
                        router.push("/auth/login")
                        router.refresh()
                    }}>
                        <LogoutIcon />
                        <div className='text-lg text-bright-red'> Logout </div>
                    </div>

                    <div className=' flex gap-6 cursor-pointer items-center' onClick={() => setOpen(true)}>
                        <DeleteIcon />
                        <div className='text-lg text-bright-red'> Delete Account </div>
                    </div>
                </div>

            </div>

            {open ? (

                <Modal setClose={() => setOpen(false)}>
                    {(handleClose) => (
                        <>
                            <div className='flex flex-col items-center justify-center w-full gap-5 '>
                                <div className='w-14 aspect-square rounded-full bg-bright-red/20 flex items-center justify-center'>
                                    <DeleteIcon />
                                </div>
                                <div className='text-3xl font-bold text-black'>Delete Account ?</div>
                                <div className='text-grey text-2xl'>This action can’t be undone</div>
                            </div>

                            <div className='flex gap-6 items-center justify-center w-full'>
                                <CTAButton variant='outlined-black' onClick={handleClose}>
                                    Cancel
                                </CTAButton>

                                <CTAButton variant='warning' onClick={() => { 
                                  const profileId = profile.id
                                  if(!profileId) return;
                                  dispatch(deleteAccount({userId: profileId})) 
                                  setOpen(false)

                                }}>
                                    Delete
                                </CTAButton>
                            </div>
                        </>
                    )}
                </Modal>
            ) : null}
        </>
    )
}

export default Settings