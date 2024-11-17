'use client'

import { Suspense, lazy } from 'react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import { useAppDispatch, useAppSelector } from '@boilerplate/front-end/store'

import { authSlice } from '@boilerplate/front-end/store/slices/auth.slice'

interface SignInFormProps {}

const SignInBaseForm = lazy(() => import('@boilerplate/front-end/components/forms/sign-in.form/base.form'))

export const SignInForm: React.FC<SignInFormProps> = () => {
  const dispatch = useAppDispatch()

  const email = useAppSelector(authSlice.selectors.email)
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setEmail(event.target.value))
  }

  const password = useAppSelector(authSlice.selectors.password)
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setPassword(event.target.value))
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Card style={{ width: '380px', padding: '20px', height: '280px', backgroundColor: '#ededed', border: '0' }}>
        <Card.Body>
          <Suspense>
            <SignInBaseForm>
              <Form.Group controlId="exampleFormControlInput1">
                <Form.Label>Пошта</Form.Label>
                <Form.Control
                  style={{ height: '40px' }}
                  value={email}
                  onChange={handleEmailChange}
                  type="text"
                  placeholder="Введіть свою пошту"
                />
              </Form.Group>
              <Form.Group controlId="exampleFormControlInput2">
                <Form.Label style={{ marginTop: '20px' }}>Пароль</Form.Label>
                <Form.Control
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Введіть пароль"
                />
              </Form.Group>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ backgroundColor: '#008000', border: '0', transition: 'background-color 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#006400')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#008000')}
                >
                  Log In
                </Button>
              </div>
            </SignInBaseForm>
          </Suspense>
        </Card.Body>
      </Card>
    </div>
  )
}
