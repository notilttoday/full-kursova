/* eslint-disable import/no-default-export */

'use client'

import Link from 'next/link'

import { SignInForm } from '@boilerplate/front-end/components/forms/sign-in.form'

export interface AuthSignInPageProps {}

const AuthSignInPage: React.FC<AuthSignInPageProps> = () => (
  <>
    <SignInForm />
    <div>
      <p>
        Don't have an account?&nbsp;
        <Link href="/sign-up">Sign Up</Link>
      </p>
      <br />
      <p>
        <Link href="/lost-password">Password reset</Link>
      </p>
    </div>
  </>
)

export default AuthSignInPage
