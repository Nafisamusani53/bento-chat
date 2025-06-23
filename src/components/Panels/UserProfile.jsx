import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BlockIcon, CloseIcon, DeleteIcon } from '../icons'
import Modal from '../common/Modal'
import CTAButton from '../common/CTAButton'
import { blockUser, deleteUserChat } from '../../service/ChatSerive'
import defaultImage from '../../assets/images/default-image.webp';

function UserProfile({ setContact }) {
  const chat = useSelector(state => state.chat)
  const profileId = useSelector(state => state.profile.id)
  const [open, setOpen] = useState(false)
  const [blockModal, setblockModal] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col justify-center bg-white/50 h-full w-[500px] border border-white rounded-2xl !py-1.5'>
      <div className='flex gap-3 !pl-5 !pt-1.5 w-full'>
        <div onClick={() => setContact(false)} className='cursor-pointer'>
          <CloseIcon />
        </div>
        <div className='text-[16px] '>Contact Info</div>
      </div>

      <div className='flex w-full h-full flex-col gap-2.5 !px-5 !py-2.5'>

        <div className='flex flex-col items-center gap-2.5 !py-4 w-full'>
          <img src={chat?.blocked ? defaultImage : chat.userAvatar} className='w-[242px] aspect-square rounded-full border border-white object-cover' />
          <div className='flex flex-col w-full justify-center items-center'>
            <div className='text-2xl font-bold'>
              {chat?.deleted ? "Deleted User" : chat?.userName}
            </div>
            <div className='text-[16px] text-grey'>
              {chat?.deleted ? "-" : chat?.userEmail}
            </div>
          </div>
        </div>

        {!chat?.blocked && <div className='w-full flex flex-col gap-1.5 !p-2.5 rounded-[10px] bg-white/30'>
          <div className='text-[14px] text-grey'>About</div>
          <div className='!px-2.5 text-[16px]'>{chat?.deleted ? "-" : chat?.userAbout}</div>
        </div>}

        {!chat.newChat && <div className='flex flex-col gap-2 !p-2.5 rounded-[10px] bg-white/30'>
          <div className='flex gap-4 text-bright-red text-[16px] cursor-pointer' onClick={() => setblockModal(true)}>
            <BlockIcon />
            <div>{chat.blocked ? "Unblock User" : "Block User"}</div>
          </div>
          <div className='flex gap-4 text-bright-red text-[16px] cursor-pointer' onClick={() => setOpen(true)}>
            <DeleteIcon />
            <div>Delete Chat</div>
          </div>
        </div>}

      </div>
      {open &&
        <Modal setClose={() => setOpen(false)}>
          {(handleClose) => (
            <>
              <div className='flex flex-col items-center justify-center w-full gap-5 text-center '>
                <div className='w-14 aspect-square rounded-full bg-bright-red/20 flex items-center justify-center'>
                  <DeleteIcon />
                </div>
                <div className='text-3xl font-bold text-black'>Are you sure you want to delete this chat?</div>
                <div className='text-grey text-2xl'>This will remove the chat and its messages only for you. The other user will still be able to see the conversation.</div>
              </div>

              <div className='flex gap-6 items-center justify-center w-full'>
                <CTAButton type='outlined-black' onClick={handleClose}>
                  Cancel
                </CTAButton>

                <CTAButton type='warning' onClick={() => {
                  deleteUserChat(chat.chatId, profileId, handleClose)
                }
                }>
                  Delete Chat
                </CTAButton>
              </div>
            </>
          )}
        </Modal>
      }

      {blockModal &&
        <Modal setClose={() => setblockModal(false)}>
          {(handleClose) => (
            <>
              <div className='flex flex-col items-center justify-center w-full gap-5 text-center '>
                <div className='w-14 aspect-square rounded-full bg-bright-red/20 flex items-center justify-center'>
                  <DeleteIcon />
                </div>
                <div className='text-3xl font-bold text-black'>{chat.blocked ? `Unblock ${chat.userName}` : `Block ${chat.userName}`} ?</div>
                <div className='text-grey text-2xl'>{chat.blocked ? "You will be able to send and receive messages from this user again. They won’t be notified that you unblocked them." : "You won't be able to send or receive messages from each other. They won't be notified that you've blocked them."}</div>
              </div>

              <div className='flex gap-6 items-center justify-center w-full'>
                <CTAButton type='outlined-black' onClick={handleClose}>
                  Cancel
                </CTAButton>

                <CTAButton type='warning' onClick={() => dispatch(blockUser(chat.chatId, chat.userId, handleClose, !chat.blocked))}>
                  {chat.blocked ? "Unblock" : "Block"}
                </CTAButton>
              </div>
            </>
          )}
        </Modal>

      }

    </div>
  )
}

export default UserProfile