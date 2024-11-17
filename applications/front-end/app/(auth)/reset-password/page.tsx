/* eslint-disable import/no-default-export */

'use client'

import Card from 'react-bootstrap/Card'

import classes from '@boilerplate/front-end/app/(auth)/styles.module.scss'

import { ResetPasswordForm } from '@boilerplate/front-end/components/forms/reset-password.form'

export interface AuthResetPasswordPageProps {}

const AuthResetPasswordPage: React.FC<AuthResetPasswordPageProps> = () => (
  <div className={classes.container}>
    <Card>
      <Card.Body>
        <ResetPasswordForm />
      </Card.Body>
    </Card>
  </div>
)

export default AuthResetPasswordPage
