import React from 'react'
import SignUpForm from './SignUpForm'
import AuthContainer from '../AuthTemplate/AuthContainer'
import FormTemplate from '../AuthTemplate/FormTemplate'

function SignUp() {
  return (
    <AuthContainer>
      <FormTemplate>
    <SignUpForm/>
      </FormTemplate>
    </AuthContainer>
  )
}

export default SignUp