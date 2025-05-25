
import Login from './components/Auth/Login/Login'
import SignUp from './components/Auth/Signup/SignUp'
import { Route, Routes, useNavigate } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setToken } from './components/Auth/authSlice'
import supabase from './utils/supabase'
import ForgotPassWord from './components/Auth/ForgotPassword/ForgotPassWord'
import ResetPassword from './components/Auth/ResetPassword/ResetPassword'
import Chat from './components/ChatView/Chat'
import { setProfile } from './components/Profile/profileSlice'
function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
   useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setToken(session?.access_token))
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      if (_event == "PASSWORD_RECOVERY"){
        navigate('/reset-password')
      }
      dispatch(setToken(session?.access_token))

    })
  }, [])

  return (
    <Routes>
      <Route path='/login' element={<PublicRoute>
        <Login />
      </PublicRoute>} />
      <Route path='/signup' element={<PublicRoute>
        <SignUp />
      </PublicRoute>} />
      <Route path='/forgot-password' element={<PublicRoute>
        <ForgotPassWord />
      </PublicRoute>} />

      <Route path='/reset-password' element={<ResetPassword />} />
      {/* <Route path='/callback' element={<CallBack/>}/> */}
      <Route path='/' element={
        <PrivateRoute>
          <Chat />
        </PrivateRoute>
      } />
    </Routes>
  )
}

export default App
