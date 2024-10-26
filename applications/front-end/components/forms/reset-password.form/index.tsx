'use client'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useAppDispatch, useAppSelector } from '@boilerplate/front-end/store'

import { authSlice } from '@boilerplate/front-end/store/slices/auth.slice'

export const ResetPasswordForm: React.FC = () => {
  const dispatch = useAppDispatch()

  const password = useAppSelector(authSlice.selectors.password)
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setPassword(event.target.value))
  }

  const repeatPassword = useAppSelector(authSlice.selectors.repeatPassword)
  const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authSlice.actions.setRepeatPassword(event.target.value))
  }

  return (
    <Form>
      <Form.Group controlId="exampleFormControlInput1">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          onChange={handlePasswordChange}
          type="password"
          placeholder="Enter your password"
        />
      </Form.Group>
      <Form.Group controlId="exampleFormControlInput2">
        <Form.Label>Repeat password</Form.Label>
        <Form.Control
          value={repeatPassword}
          onChange={handleRepeatPasswordChange}
          type="repeat-password"
          placeholder="Enter your password again"
        />
      </Form.Group>
      <Button variant="primary">Ok</Button>
    </Form>
  )
}
