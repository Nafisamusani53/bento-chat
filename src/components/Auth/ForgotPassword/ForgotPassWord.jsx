import React from 'react'
import AuthContainer from '../AuthTemplate/AuthContainer'
import FormTemplate from '../AuthTemplate/FormTemplate'
import ForgotPasswordForm from './ForgotPasswordForm'

function ForgotPassWord() {
  return (
   <AuthContainer>
      <FormTemplate>
        <ForgotPasswordForm />
      </FormTemplate>
    </AuthContainer>
  )
}

export default ForgotPassWord