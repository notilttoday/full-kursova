/* eslint-disable import/no-default-export */

'use client'

import Card from 'react-bootstrap/Card'

import { ResetPasswordForm } from '@boilerplate/front-end/components/forms/reset-password.form'

export interface AuthResetPasswordPageProps {}

const AuthResetPasswordPage: React.FC<AuthResetPasswordPageProps> = () => (
  <Card>
    <Card.Body>
      <ResetPasswordForm />
    </Card.Body>
  </Card>
)

export default AuthResetPasswordPage
