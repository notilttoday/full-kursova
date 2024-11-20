/* eslint-disable import/no-default-export */

'use client'

import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useAppDispatch } from '@boilerplate/front-end/store'

import { updateUserDataStart } from '@boilerplate/front-end/store/sagas/send-order.saga'

type HTMLFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

interface BaseSendOrderFormProps extends Omit<HTMLFormProps, 'onSubmit'> {}

const BaseSendOrderForm: React.FC<BaseSendOrderFormProps> = (props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault()
    dispatch(
      updateUserDataStart({
        redirect: () => router.push('/'),
      }),
    )
  }, [])

  return <form {...props} onSubmit={handleSubmit} />
}

export default BaseSendOrderForm
