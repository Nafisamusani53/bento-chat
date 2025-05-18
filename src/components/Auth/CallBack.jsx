import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import supabase from '../../utils/supabase'
import { useDispatch } from 'react-redux'
import { setProfile } from '../Profile/profileSlice'

function CallBack() {

    const [params]  =  useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        const setAuthToken = async() => {
          console.log(1)
            const token = params.get('token')
            const refreshToken = params.get('refresh_token')
            console.log(2)
            // console.log(params.get(token))
          const result = await supabase.auth.setSession(
            {
              access_token: token,
              refresh_token: refreshToken,
            }
          )
           console.log(result) 
           console.log(3)

            // for socket
            // supabase.realtime.setAuth(token) 
            
            // set token in localStorage
            localStorage.setItem('token', JSON.parse(token))
            console.log(4)
            dispatch(setToken(token))
            console.log(5)

          const user = {
            id: params.get('id'),
            userName: params.get('userName'),
            email: params.get('email'),
            avatar: params.get('avatar'),
            about: params.get('about')
          }
          console.log(6)

          // dispatch to action to create profile
          dispatch(setProfile(user))
          console.log(7)
          navigate('/')
        }
        setAuthToken()
    },[])
  return (
    <div className='h-[100vh] w-full bg-black'>
        loading
    </div>
  )
}

export default CallBack