import React from 'react'
import SignUpForm from './SignUpForm'
import FormTemplate from '../AuthTemplate/FormTemplate'
import AuthContainer from '../AuthTemplate/AuthContainer'

function SignUp() {
  return (
    <AuthContainer>
    <FormTemplate>
      <SignUpForm />
    </FormTemplate>
    </AuthContainer>
  )
}

export default SignUp