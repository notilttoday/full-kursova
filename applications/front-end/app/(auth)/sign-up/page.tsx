/* eslint-disable import/no-default-export */

'use client'

import Link from 'next/link'

import Card from 'react-bootstrap/Card'

import classes from '@boilerplate/front-end/app/(auth)/styles.module.scss'

import { SignUpForm } from '@boilerplate/front-end/components/forms/sing-up.form'

export interface AuthSignUpPageProps {}

const AuthSignUpPage: React.FC<AuthSignUpPageProps> = () => (
  <div className={classes.container}>
    <Card className={classes.card}>
      <Card.Body className={classes.cardBody}>
        <SignUpForm />
        <div>
          <p style={{ marginTop: '10px', textAlign: 'center' }}>
            Вже маєте аккаунт?&nbsp;
            <Link href="/sign-in" className={classes.link}>
              Увійти
            </Link>
          </p>
        </div>
      </Card.Body>
    </Card>
  </div>
)

export default AuthSignUpPage
