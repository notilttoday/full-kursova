'use client'

import { Suspense, lazy } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useAppDispatch, useAppSelector } from '@boilerplate/front-end/store'

import { authSlice } from '@boilerplate/front-end/store/slices/auth.slice'

const SignUpBaseForm = lazy(() => import('@boilerplate/front-end/components/forms/sing-up.form/base.form'))

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch()

  const firstName = useAppSelector(authSlice.selectors.firstName)
  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setFirstName(event.target.value))
  }

  const lastName = useAppSelector(authSlice.selectors.lastName)
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setLastName(event.target.value))
  }

  const email = useAppSelector(authSlice.selectors.email)
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setEmail(event.target.value))
  }

  const password = useAppSelector(authSlice.selectors.password)
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setPassword(event.target.value))
  }

  const repeatPassword = useAppSelector(authSlice.selectors.repeatPassword)
  const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setRepeatPassword(event.target.value))
  }

  const promoCode = useAppSelector(authSlice.selectors.promoCode)
  const handlePromoCodeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setPromoCode(event.target.value))
  }

  const phone = useAppSelector(authSlice.selectors.phone)
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setPhone(event.target.value))
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
      <Suspense>
        <SignUpBaseForm>
          <div style={{ width: '320px' }}>
            <div style={{ textAlign: 'center', fontSize: '20px' }}>Реєстрація</div>
            <Form.Group controlId="exampleFormControlInput1">
              <Form.Label style={{ marginTop: '25px' }}>Ім'я</Form.Label>
              <Form.Control
                value={firstName}
                onChange={handleFirstNameChange}
                type="first-name"
                placeholder="Введіть ім'я"
                style={{ height: '40px' }}
              />
            </Form.Group>
            <Form.Group controlId="exampleFormControlInput2">
              <Form.Label style={{ marginTop: '25px' }}>Прізвище</Form.Label>
              <Form.Control
                value={lastName}
                onChange={handleLastNameChange}
                type="last-name"
                placeholder="Введіть прізвище"
                style={{ height: '40px' }}
              />
            </Form.Group>
            <Form.Group controlId="exampleFormControlInput3">
              <Form.Label style={{ marginTop: '25px' }}>Пошта</Form.Label>
              <Form.Control
                value={email}
                onChange={handleEmailChange}
                type="email"
                placeholder="Введіть пошту"
                style={{ height: '40px' }}
              />
            </Form.Group>
            <Form.Group controlId="exampleFormControlInput4">
              <Form.Label style={{ marginTop: '25px' }}>Пароль</Form.Label>
              <Form.Control
                value={password}
                onChange={handlePasswordChange}
                type="password"
                placeholder="Введіть пароль"
                style={{ height: '40px' }}
              />
            </Form.Group>
            <Form.Group controlId="exampleFormControlInput5">
              <Form.Label style={{ marginTop: '25px' }}>Повторіть пароль</Form.Label>
              <Form.Control
                style={{ height: '40px' }}
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
                type="password"
                placeholder="Повторіть пароль"
              />
            </Form.Group>
            <Form.Group controlId="exampleFormControlInput7">
              <Form.Label style={{ marginTop: '25px' }}>Номер телефону</Form.Label>
              <Form.Control
                style={{ height: '40px' }}
                value={phone}
                onChange={handlePhoneChange}
                type="phone"
                placeholder="Введіть номер телефону"
              />
            </Form.Group>
            <div style={{ textAlign: 'center' }}>
              <Button
                style={{ marginTop: '25px', backgroundColor: '#008000', border: '0' }}
                type="submit"
                variant="primary"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#006400')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#008000')}
              >
                Зареєструватись
              </Button>
            </div>
          </div>
        </SignUpBaseForm>
      </Suspense>
    </div>
  )
}
