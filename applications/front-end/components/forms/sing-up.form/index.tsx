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
    <Suspense>
      <SignUpBaseForm>
        <div>
          <div>Register</div>
          <Form.Group controlId="exampleFormControlInput1">
            <Form.Label value={firstName} onChange={handleFirstNameChange}>
              First Name
            </Form.Label>
            <Form.Control type="first-name" placeholder="Enter your first name" />
          </Form.Group>
          <Form.Group controlId="exampleFormControlInput2">
            <Form.Label value={lastName} onChange={handleLastNameChange}>
              Last Name
            </Form.Label>
            <Form.Control type="last-name" placeholder="Enter your last name" />
          </Form.Group>
          <Form.Group controlId="exampleFormControlInput3">
            <Form.Label>Email</Form.Label>
            <Form.Control value={email} onChange={handleEmailChange} type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="exampleFormControlInput4">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} onChange={handlePasswordChange} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="exampleFormControlInput5">
            <Form.Label>Repeat password</Form.Label>
            <Form.Control
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
              type="password-repeat"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group controlId="exampleFormControlInput6">
            <Form.Label>Promo code</Form.Label>
            <Form.Control value={promoCode} onChange={handlePromoCodeChange} type="promo-code" />
          </Form.Group>
          <Form.Group controlId="exampleFormControlInput7">
            <Form.Label>Phone</Form.Label>
            <Form.Control value={phone} onChange={handlePhoneChange} type="phone" />
          </Form.Group>
          <Button type="submit" variant="primary">
            Sign Up
          </Button>
        </div>
      </SignUpBaseForm>
    </Suspense>
  )
}
