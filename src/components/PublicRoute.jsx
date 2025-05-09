import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PublicRoute({children}) {
    const session = useSelector(state => state.auth.session)
  return (
    <>{
        !session ? children : <Navigate to='/'/>
    }</>
  )
}

export default PublicRoute