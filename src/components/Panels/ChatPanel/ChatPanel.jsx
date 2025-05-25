import React from 'react'
import Header from './Header'
import ChatScreen from './ChatScreen'
import InputBox from './InputBox'

function ChatPanel() {
  return (
    <div className='w-full h-full flex flex-col items-center bg-white/30 border border-white/50 rounded-2xl'> 
      <Header/>
      <ChatScreen/>
      <InputBox/>
    </div>
  )
}

export default ChatPanel