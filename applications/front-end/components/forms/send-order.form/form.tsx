/* eslint-disable import/no-default-export */

'use client'

import { useCallback, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useAppDispatch } from '@boilerplate/front-end/store'

import { updateUserDataStart } from '@boilerplate/front-end/store/sagas/send-order.saga'

import classes from '@boilerplate/front-end/components/cart/style.module.scss'
import { PayPalPaymentForm } from '@boilerplate/front-end/components/forms/send-order.form/paypal.form'

type HTMLFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

interface BaseSendOrderFormProps extends Omit<HTMLFormProps, 'onSubmit'> {
  totalPrice: number
  children: React.ReactNode
}

const BaseSendOrderForm: React.FC<BaseSendOrderFormProps> = ({ totalPrice, children, ...props }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [paypalToggle, setPaypalToggle] = useState(false)

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault()
    setPaypalToggle(true)
  }, [])

  const handlePaymentSuccess = (): void => {
    setPaypalToggle(false)
    dispatch(
      updateUserDataStart({
        redirect: () => router.push('/'),
      }),
    )
  }

  return (
    <form {...props} onSubmit={handleSubmit}>
      {children}

      {paypalToggle && (
        <div className={classes['paypal-modal']}>
          <button className={classes['paypal-overlay']} onClick={() => setPaypalToggle(false)} />
          <div className={classes['paypal-content']}>
            <p>Choose payment option</p>
            <PayPalPaymentForm total={totalPrice} onSuccess={handlePaymentSuccess} />
          </div>
        </div>
      )}
    </form>
  )
}

export default BaseSendOrderForm
