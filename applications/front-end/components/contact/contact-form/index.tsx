import classes from '@boilerplate/front-end/components/contact/style.module.scss'

import { useAppDispatch, useAppSelector } from '@boilerplate/front-end/store'
import { contactMessageSlice } from '@boilerplate/front-end/store/slices/create-contact-message'
import { useCallback } from 'react'

interface ContactFormProps {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  message?: string
  id?: string
}

export const ContactForm: React.FC<ContactFormProps> = ({ firstName, lastName, email, phone, message, id }) => {
  const dispatch = useAppDispatch()

  const handleChangeFirstName = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(contactMessageSlice.actions.setFirstName(event.target.value))
  }, [])

  const handleChangeLastName = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(contactMessageSlice.actions.setLastName(event.target.value))
  }, [])

  const handleChangeEmail = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(contactMessageSlice.actions.setEmail(event.target.value))
  }, [])

  const handleChangePhone = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(contactMessageSlice.actions.setPhone(event.target.value))
  }, [])

  const handleChangeMessage = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    dispatch(contactMessageSlice.actions.setMessage(event.target.value))
  }, [])

  return (
    <div className={classes["send-message"]}>
      <h2 className={classes.h2}>Залишити повідомлення</h2>
      <div className={classes["send-message-box"]}>
        <form action="" method="post">
          <div className={classes["form-row"]}>
            <div className={classes["form-column-1"]}>
              <label className={classes.label} htmlFor="first-name">Ім'я:</label>
              <input className={classes.input} value={firstName} type="text" id="first-name" name="first-name" maxLength={20} placeholder="Ім'я" onChange={handleChangeFirstName} required />
            </div>
            <div className={classes["form-column-2"]}>
              <label className={classes.label} htmlFor="last-name">Прізвище:</label>
              <input className={classes.input} value={lastName} type="text" id="last-name" name="last-name" maxLength={20} placeholder="Прізвище" onChange={handleChangeLastName} required />
            </div>
          </div>
          <div className={classes["form-row"]}>
            <div className={classes["form-column-1"]}>
              <label className={classes.label} htmlFor="email">Адреса електронної пошти:</label>
              <input className={classes.input} value={email} type="email" id="email" name="email" maxLength={35} placeholder="example@gmail.com" onChange={handleChangeEmail} required />
            </div>
            <div className={classes["form-column-2"]}>
              <label className={classes.label} htmlFor="phone">Номер телефону:</label>
              <input className={classes.input} value={phone} type="tel" id="phone" name="phone" maxLength={15} placeholder="Номер телефону" onChange={handleChangePhone} required />
            </div>
          </div>
          <label className={classes.label} htmlFor="message">Повідомлення(до 500 символів):</label>
          <textarea className={classes.textarea} name="message" rows={5} cols={40} maxLength={500} placeholder="Введіть повідомлення..." onChange={handleChangeMessage} required></textarea>

          <button className={classes.button} type="submit">Надіслати</button>
        </form>
      </div>
    </div>
  )
}



