import React from 'react'
import LoginForm from './LoginForm'
import FormTemplate from '../AuthTemplate/FormTemplate'
import AuthContainer from '../AuthTemplate/AuthContainer'

function Login() {
  return (
    <AuthContainer>
      <FormTemplate>
        <LoginForm />
      </FormTemplate>
    </AuthContainer>
  )
}

export default Login