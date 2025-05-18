import Chat from './components/Chat'
import Login from './components/Auth/Login/Login'
import SignUp from './components/Auth/Signup/SignUp'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import CallBack from './components/Auth/CallBack'
function App() {
  // const dispatch = useDispatch()
  // useEffect(()=>{
    
  // },[])
  return (
    <Routes>
      <Route path='/login' element={<PublicRoute>
        <Login />
      </PublicRoute>} />
      <Route path='/signup' element={<PublicRoute>
        <SignUp />
      </PublicRoute>} />
      <Route path='/callback' element={<CallBack/>}/>
      <Route path='/' element={
        <PrivateRoute>
          <Chat />
        </PrivateRoute>
      } />
    </Routes>
  )
}

export default App
