/* eslint-disable import/no-default-export */

'use client'

import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useAppDispatch } from '@boilerplate/dashboard/store'

import { createContactMessageStart } from '@boilerplate/front-end/store/sagas/contact-message.saga'

type HTMLFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

interface ContactMessageBaseFormProps extends Omit<HTMLFormProps, 'onSubmit'> { }

const ContactMessageBaseForm: React.FC<ContactMessageBaseFormProps> = (props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault()

    dispatch(
      createContactMessageStart({
        redirect: () => router.push('/'),
      }),
    )
  }, [])

  return <form {...props} onSubmit={handleSubmit} />
}

export default ContactMessageBaseForm