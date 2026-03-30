'use client'
import { StartChatIcon } from '@/components/icons'
import { useAppSelector } from '@/store/hooks'
import React, { useState } from 'react'
import Header from './Header'
import ChatScreen from './ChatScreen'
import UserProfile from './UserProfile'

const Chat = () => {
  const [contact, setContact] = useState<boolean>(false)
  const chatId = useAppSelector(state => state.chat.chatId)
  return (
    <>
    <div className='w-full h-full flex flex-col items-center justify-center bg-white/30 border border-white/50 rounded-2xl'>
      {chatId ? (<>
        <Header setContact={setContact} contact={contact}/>
        <ChatScreen/>
      </>) : (
        <>
        <StartChatIcon/>
        </>
      )}
      
    </div>

    {contact && 
      <UserProfile setContact={setContact}/>
    }
    </>
  )
}

export default Chat