import React from 'react'
import { useSelector } from 'react-redux'

function Chat() {
  const profileData = useSelector(state => state.profile)
  return (
    <div>Chat</div>
  )
}

export default Chat