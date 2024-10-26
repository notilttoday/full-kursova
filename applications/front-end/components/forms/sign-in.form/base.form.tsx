/* eslint-disable import/no-default-export */

'use client'

import { useRouter } from 'next/navigation'

import Form, { type FormProps } from 'react-bootstrap/Form'

import { useAppDispatch } from '@boilerplate/front-end/store'

import { signInStart } from '@boilerplate/front-end/store/sagas/sign-in.saga'

interface SignInBaseFormProps extends Omit<FormProps, 'onSubmit'> {}

const SignInBaseForm: React.FC<SignInBaseFormProps> = (props) => {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const handleSignInSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    dispatch(
      signInStart({
        redirect: () => router.push('/wallet'),
      }),
    )
  }

  return <Form {...props} onSubmit={handleSignInSubmit} />
}

export default SignInBaseForm
