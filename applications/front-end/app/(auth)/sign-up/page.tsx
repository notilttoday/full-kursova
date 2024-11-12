/* eslint-disable import/no-default-export */

'use client'

import Link from 'next/link'

import Card from 'react-bootstrap/Card'

import { SignUpForm } from '@boilerplate/front-end/components/forms/sing-up.form'

export interface AuthSignUpPageProps {}

const AuthSignUpPage: React.FC<AuthSignUpPageProps> = () => (
  <Card>
    <Card.Body>
      <SignUpForm />
      <div>
        <p>
          Already have account?&nbsp;
          <Link href="/sign-in">Sign In</Link>
        </p>
      </div>
    </Card.Body>
  </Card>
)

export default AuthSignUpPage
