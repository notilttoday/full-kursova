/* eslint-disable import/no-default-export */

'use client'

import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useAppDispatch } from '@boilerplate/dashboard/store'

import { signInStart } from '@boilerplate/dashboard/store/sagas/sign-in.saga'

type HTMLFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

interface SignInFormProps extends Omit<HTMLFormProps, 'onSubmit'> {}

const SignInForm: React.FC<SignInFormProps> = (props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault()

    dispatch(
      signInStart({
        redirect: () => router.push('/'),
      }),
    )
  }, [])

  return <form {...props} onSubmit={handleSubmit} />
}

export default SignInForm
