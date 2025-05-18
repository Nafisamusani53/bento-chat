import React from 'react'
import LoginForm from './LoginForm'
import AuthContainer from '../AuthTemplate/AuthContainer'
import FormTemplate from '../AuthTemplate/FormTemplate'

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