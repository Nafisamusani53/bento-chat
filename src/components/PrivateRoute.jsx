import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import supabase from '../utils/supabase'
import { setLoading, setUser } from './Auth/authSlice'
import { createProfile } from './Profile/service'

function PrivateRoute({children}) {
    const session = useSelector(state=> state.auth.session)
    const dispatch = useDispatch()
    useEffect(() => {
      if(!session){
        supabase.auth.getSession().then(({ data: { session } }) => {
          console.log(session)
          console.log(1)
          dispatch(setUser({ user: session?.user, session }));
        })
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          console.log(_event)
          dispatch(setUser({ user: session?.user, session }));
        })
         return () => {
          subscription?.unsubscribe();
        };
      }
      // else{
      //   dispatch(setLoading("loading"))

      //   dispatch(createProfile(session?.user))

      //   dispatch(setLoading('idle'))
      // }
  }, [])
  return (
    <>
        {session ? children : <Navigate to='/login'/>}
    </>
  )
}

export default PrivateRoute