import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
    const session = useSelector(state=> state.auth.session)
  return (
    <>
        {session ? children : <Navigate to='/login'/>}
    </>
  )
}

export default PrivateRoute