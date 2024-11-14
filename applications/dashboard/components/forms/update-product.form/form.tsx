/* eslint-disable import/no-default-export */

'use client'

import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useAppDispatch } from '@boilerplate/dashboard/store'

import { updateProductStart } from '@boilerplate/dashboard/store/sagas/update-product.saga'

type HTMLFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

interface UpdateProductBaseFormProps extends Omit<HTMLFormProps, 'onSubmit'> {}

const UpdateProductBaseForm: React.FC<UpdateProductBaseFormProps> = (props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault()

    dispatch(
      updateProductStart({
        redirect: () => router.push('/products'),
      }),
    )
  }, [])

  return <form {...props} onSubmit={handleSubmit} />
}

export default UpdateProductBaseForm
