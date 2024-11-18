'use client'

import { Suspense, lazy, useCallback, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@boilerplate/front-end/store'

import { orderSlice } from '@boilerplate/front-end/store/slices/order.slice'

import classes from '@boilerplate/front-end/components/cart/style.module.scss'

interface SendOrderUserDataProps {
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  // paymentType?: string
}

const BaseSendOrderFormProps = lazy(() => import('@boilerplate/front-end/components/forms/send-order.form/form'))

export const SendOrderUserData: React.FC<SendOrderUserDataProps> = ({ firstName, lastName, phone, email }) => {
  // const orderId = useAppSelector(orderSlice.selectors.id) as string
  // const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const dispatch = useAppDispatch()

  const storedFirstName = useAppSelector(orderSlice.selectors.firstName)
  const storedLastName = useAppSelector(orderSlice.selectors.lastName)
  const storedEmail = useAppSelector(orderSlice.selectors.email)
  const storedPhone = useAppSelector(orderSlice.selectors.phone)

  useEffect(() => {
    dispatch(orderSlice.actions.setFirstName(firstName || ''))
    dispatch(orderSlice.actions.setLastName(lastName || ''))
    dispatch(orderSlice.actions.setEmail(email || ''))
    dispatch(orderSlice.actions.setPhone(phone || ''))
  }, [firstName, lastName, email, phone, dispatch])

  const handleChangeFirstName = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(orderSlice.actions.setFirstName(event.target.value))
  }, [])

  const handleChangeLastName = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(orderSlice.actions.setLastName(event.target.value))
  }, [])

  const handleChangeEmail = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(orderSlice.actions.setEmail(event.target.value))
  }, [])

  const handleChangePhone = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(orderSlice.actions.setPhone(event.target.value))
  }, [])

  // const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(async (event) => {
  //   event.preventDefault()

  //   const { updateUserDataStart } = await import('@boilerplate/front-end/store/sagas/order-id.saga')

  //   dispatch(updateUserDataStart({}))
  // }, [])

  const content = (
    <div className={classes['order-data']}>
      <div className={classes['row-data']}>
        <label>Ім'я</label>
        <input
          type="text"
          name="firstName"
          placeholder="Введіть ім'я"
          className={classes['input-data']}
          value={storedFirstName ? storedFirstName : ''}
          onChange={handleChangeFirstName}
        />

        <label>Прізвище</label>
        <input
          type="text"
          name="lastName"
          placeholder="Введіть прізвище"
          className={classes['input-data']}
          value={storedLastName ? storedLastName : ''}
          onChange={handleChangeLastName}
        />
      </div>
      <div className={classes['row-data']}>
        <label>Пошта</label>
        <input
          type="email"
          name="email"
          placeholder="Введіть пошту"
          className={classes['input-data']}
          value={storedEmail ? storedEmail : ''}
          onChange={handleChangeEmail}
        />

        <label>Телефон</label>
        <input
          type="phone"
          name="phone"
          placeholder="Введіть номер телефону"
          className={classes['input-data']}
          value={storedPhone ? storedPhone : ''}
          onChange={handleChangePhone}
        />

        <div className={classes['row-select']}>
          <div className={classes['select-container']}>
            <label>Спосіб оплати</label>
            <select name="payment" className={classes['input-data-select']}>
              <option value="cash" className={classes['option-select']}>
                Готівкою
              </option>
            </select>
          </div>
          <button className={classes['confirm-button']} type="submit">
            Підтвердити
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <Suspense fallback={<form>{content}</form>}>
      <BaseSendOrderFormProps>{content}</BaseSendOrderFormProps>
    </Suspense>
  )
}
