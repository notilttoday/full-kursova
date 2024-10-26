/* eslint-disable import/no-default-export */

'use client'

import { useRouter } from 'next/navigation'

import Form, { type FormProps } from 'react-bootstrap/Form'

import { useAppDispatch } from '@boilerplate/front-end/store'

import { signUpStart } from '@boilerplate/front-end/store/sagas/sign-up.saga'

interface SignUpBaseFormProps extends Omit<FormProps, 'onSubmit'> {}

const SignUpBaseForm: React.FC<SignUpBaseFormProps> = (props) => {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    dispatch(
      signUpStart({
        redirect: () => router.push('/sign-in'),
      }),
    )
  }

  return <Form {...props} onSubmit={handleSignUpSubmit} />
}

export default SignUpBaseForm
