'use client'

import useClickOutside from '@/hooks/clickOutside';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useRef, useState } from 'react'
import defaultImage from '../../../assests/images/default-image.webp';
import { DeleteIcon, ThreeDotIcon } from '@/components/icons';
import CTAButton from '@/components/Common/CTAButton';
import Modal from '@/components/Common/Modal';
import Image from 'next/image';
import { deleteUserChat } from '@/store/thunks/ChatThunks';
interface HeaderProps {
  setContact: React.Dispatch<React.SetStateAction<boolean>>;
  contact : boolean;
}


const Header : React.FC<HeaderProps> = ({setContact, contact}) => {
  const [open, setOpen] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const chat =useAppSelector(state => state.chat)
    const presence = useAppSelector(state => state.trackUser.presence)
    const profileId = useAppSelector(state => state.profile.id)
    const dispatch = useAppDispatch()

    const pickerRef = useRef<HTMLDivElement>(null)

      useClickOutside(pickerRef, ()=>{
  if (!openModal) {
    setOpen(false)
  }
})

const isOnline =
  !chat.blocked &&
  chat.userId &&
  presence[chat.userId]?.length > 0;

  const avatarSrc =
  chat.deleted || chat.blocked
    ? defaultImage
    : chat.userAvatar ?? 'https://api.dicebear.com/5.x/initials/svg?seed=User'
  return (
    <div className='w-full flex gap-5 !px-[18px] !py-2 bg-white/30 border-b-white/50 border-b rounded-t-2xl relative items-center'>
        {/* <img src={avatarSrc} className='w-14 rounded-full aspect-square object-cover cursor-pointer' onClick={()=>setContact(true)}/> */}
        <Image
  src={avatarSrc}
  alt="avatar"
  width={56}
  height={56}
  className="w-14 rounded-full aspect-square object-cover cursor-pointer"
  unoptimized
  onClick={() => setContact(true)}
/>
        <div className='flex flex-col w-full'>
            <div className='text-2xl text-black'>{chat.deleted ? "Deleted User" : chat.userName}</div>
        <div className="text-xs text-grey">
          {isOnline && "Online"}
        </div>

        </div>

        <div onClick={()=>setOpen(prev => !prev)} className='cursor-pointer'>
            <ThreeDotIcon/>
        </div>
          {open && (
              <div ref={pickerRef} className='absolute top-16 right-2 flex flex-col w-40 gap-2.5 !px-2.5 !py-4 bg-white rounded-2xl text-center text-xl text-grey'>
                <div className={`w-full !px-3 !py-3 hover:bg-dark-blue/10 rounded-[10px] cursor-pointer` } onClick={(e)=>{
                  e.preventDefault();
                  setContact(true)
                  setOpen(false)
                }}>Contact Info</div>
                <div className={`w-full !px-3 !py-3 hover:bg-dark-blue/10 rounded-[10px] cursor-pointer`}
                  onClick={(e)=>{
                    e.preventDefault()
                    e.stopPropagation();
                    setOpenModal(true)}}
                >Delete Chat</div>
              </div>
          )}

          {openModal && 
              <Modal setClose = {()=>setOpenModal(false)}>
   <>
    <div className='flex flex-col items-center justify-center w-full gap-5 text-center '>
        <div className='w-14 aspect-square rounded-full bg-bright-red/20 flex items-center justify-center'>
            <DeleteIcon/>
        </div>
        <div className='text-3xl font-bold text-black'>Are you sure you want to delete this chat?</div>
        <div className='text-grey text-2xl'>This will remove the chat and its messages only for you. The other user will still be able to see the conversation.</div>
    </div>

    <div className='flex gap-6 items-center justify-center w-full'>
           <CTAButton variant='outlined-black' onClick={()=>setOpenModal(false)}>
            Cancel
           </CTAButton>

           <CTAButton
  variant="warning"
  onClick={() => {
    if (!chat.chatId || !profileId) return

    dispatch(deleteUserChat({
      chatId: chat.chatId,
      userId: profileId,
    }))

    setOpenModal(false)
  }}
>
  Delete Chat
</CTAButton>
    </div>
   </>
  </Modal>
            }
    </div>
  )
}

export default Header