/* eslint-disable import/no-default-export */

'use client'

import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { findProductsStart } from '@boilerplate/front-end/store/sagas/find-product.saga'

import { useAppDispatch } from '@boilerplate/front-end/store'

type HTMLFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

interface FindProductsFormProps extends Omit<HTMLFormProps, 'onSubmit'> {}

const FindProductsForm: React.FC<FindProductsFormProps> = (props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault()

    dispatch(
      findProductsStart({
        redirect: () => router.push('/'),
      }),
    )
  }, [])

  return <form {...props} onSubmit={handleSubmit} />
}

export default FindProductsForm
