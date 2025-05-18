import React from 'react'
import AuthContainer from '../AuthTemplate/AuthContainer'
import FormTemplate from '../AuthTemplate/FormTemplate'
import ResetPasswordForm from './ResetPasswordForm'

function ResetPassword() {
  return (
    <AuthContainer>
      <FormTemplate>
        <ResetPasswordForm  />
      </FormTemplate>
    </AuthContainer>
  )
}

export default ResetPassword