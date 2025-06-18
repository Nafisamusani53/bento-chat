import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { DeleteIcon, ThreeDotIcon } from '../../icons'
import defaultImage from '../../../assets/images/default-image.webp';
import useClickOutside from '../../../hooks/clickOutside';
import { deleteUserChat } from '../../../service/ChatSerive';
import Modal from '../../common/Modal';
import CTAButton from '../../common/CTAButton';

function Header({setContact, contact}) {
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const chat =useSelector(state => state.chat)
    const presence = useSelector(state => state.trackUser.presence)
    const profileId = useSelector(state => state.profile.id)

    const pickerRef = useRef(null)

      useClickOutside(pickerRef, ()=>{
  if (!openModal) {
    setOpen(false)
  }
})
  return (
    <div className='w-full flex gap-5 !px-[18px] !py-2 bg-white/30 border-b-white/50 border-b rounded-t-2xl relative items-center'>
        <img src={chat.deleted || chat?.blocked ? defaultImage :chat.userAvatar} className='w-14 rounded-full aspect-square object-cover cursor-pointer' onClick={()=>setContact(true)}/>
        <div className='flex flex-col w-full'>
            <div className='text-2xl text-black'>{chat.deleted ? "Deleted User" : chat.userName}</div>
            <div className='text-xs text-grey'>{!chat.blocked && presence[chat.userId] && "Online"}</div>
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
           <CTAButton type='outlined-black' onClick={()=>setOpenModal(false)}>
            Cancel
           </CTAButton>

           <CTAButton type='warning' onClick={()=>{
            deleteUserChat(chat.chatId, profileId, setOpenModal)}
            }>
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