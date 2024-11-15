/* eslint-disable import/no-default-export */

'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Form, { type FormProps } from 'react-bootstrap/Form'

import { useAppDispatch } from '@boilerplate/front-end/store'

import { signInStart } from '@boilerplate/front-end/store/sagas/sign-in.saga'

interface SignInBaseFormProps extends Omit<FormProps, 'onSubmit'> {}

const SignInBaseForm: React.FC<SignInBaseFormProps> = (props) => {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const handleSignInSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (errorMessage) {
      setErrorMessage(null)
    }

    setLoading(true)

    dispatch(
      signInStart({
        redirect: () => router.push('/wallet'),
        onError: (message) => {
          setErrorMessage(message)
          setLoading(false)
        },
      }),
    )
  }

  return (
    <>
      <Form {...props} onSubmit={handleSignInSubmit} />
      {loading && <p className="mt-2 text-center">Завантаження...</p>}
      {errorMessage && <p className="text-danger mt-2 text-center">{errorMessage}</p>}
    </>
  )
}

export default SignInBaseForm
