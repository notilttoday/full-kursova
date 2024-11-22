/* eslint-disable import/no-default-export */

'use client'

import Link from 'next/link'

import classes from '@boilerplate/front-end/app/(auth)/styles.module.scss'

import { SignInForm } from '@boilerplate/front-end/components/forms/sign-in.form'

export interface AuthSignInPageProps {}

const AuthSignInPage: React.FC<AuthSignInPageProps> = () => (
  <div className={classes.container}>
    <SignInForm />
    <div>
      <p style={{ marginTop: '10px' }}>
        Не маєте аккаунта?&nbsp;
        <Link href="/sign-up" className={classes.link}>
          Зареєструватись
        </Link>
      </p>
    </div>
  </div>
)

export default AuthSignInPage
