import React from 'react'
import ActionPanel from '../Panels/ActionPanel/ActionPanel'
import NavigationPanel from '../Panels/NavigationPanel/NavigationPanel'
import ChatPanel from '../Panels/ChatPanel/ChatPanel'

function Chat() {
  
  return (

    <div className='chat-bg flex justify-center items-center !px-[170px] !py-8 w-full h-[100vh]'>
      <div className='w-full h-full flex gap-1.5 items-center justify-center'>
      <NavigationPanel/>
      <ActionPanel/>
      <ChatPanel/>
      </div>
    </div>
  )
}

export default Chat