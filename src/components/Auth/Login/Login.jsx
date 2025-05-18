import React from 'react'
import LoginForm from './LoginForm'
import AuthContainer from '../AuthTemplate/AuthContainer'

function Login() {
  return (
    <AuthContainer>
        <LoginForm />
    </AuthContainer>
  )
}

export default Login