import React from 'react'
import { useSelector } from 'react-redux'
import CTAButton from './common/CTAButton'
import supabase from '../utils/supabase'

function Chat() {
  const loading = useSelector(state => state.auth.status)

  const logout = async() => {
    const { error } = await supabase.auth.signOut()
  }
  
    
  return (
    <CTAButton onClick={(e)=>{
      e.preventDefault()
      logout()
    }} loading={loading === 'loading'}>
                    logout
                </CTAButton>
  )
}

export default Chat