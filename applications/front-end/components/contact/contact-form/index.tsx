import classes from '@boilerplate/front-end/components/contact/style.module.scss'

import { useAppDispatch, useAppSelector } from '@boilerplate/front-end/store'
import { contactMessageSlice } from '@boilerplate/front-end/store/slices/create-contact-message'
import { useCallback, Suspense, lazy, useEffect } from 'react'

interface ContactMessageBaseFormProps {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  message?: string
  userId?: string
}

const ContactMessageBaseForm = lazy(() => import('@boilerplate/front-end/components/contact/contact-form/form'))

export const ContactMessageForm: React.FC<ContactMessageBaseFormProps> = ({ firstName, lastName, email, phone, message, userId }) => {
  const dispatch = useAppDispatch()

  const storedFirstName = useAppSelector(contactMessageSlice.selectors.firstName);
  const storedLastName = useAppSelector(contactMessageSlice.selectors.lastName);
  const storedEmail = useAppSelector(contactMessageSlice.selectors.email);
  const storedPhone = useAppSelector(contactMessageSlice.selectors.phone);
  const storedMessage = useAppSelector(contactMessageSlice.selectors.message);

  useEffect(() => {
    dispatch(contactMessageSlice.actions.setFirstName(firstName || ''));
    dispatch(contactMessageSlice.actions.setLastName(lastName || ''));
    dispatch(contactMessageSlice.actions.setEmail(email || ''));
    dispatch(contactMessageSlice.actions.setPhone(phone || ''));
    dispatch(contactMessageSlice.actions.setMessage(message || ''));
    dispatch(contactMessageSlice.actions.setUserId(userId || ''));
  }, [firstName, lastName, email, phone, message, userId, dispatch]);

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

  const content = (
    <>
      <div className={classes["form-row"]}>
        <div className={classes["form-column-1"]}>
          <label className={classes.label} htmlFor="first-name">Ім'я:</label>
          <input className={classes.input} value={storedFirstName} type="text" id="first-name" name="first-name" maxLength={20} placeholder="Ім'я" onChange={handleChangeFirstName} readOnly required />
        </div>
        <div className={classes["form-column-2"]}>
          <label className={classes.label} htmlFor="last-name">Прізвище:</label>
          <input className={classes.input} value={storedLastName} type="text" id="last-name" name="last-name" maxLength={20} placeholder="Прізвище" onChange={handleChangeLastName} readOnly required />
        </div>
      </div>
      <div className={classes["form-row"]}>
        <div className={classes["form-column-1"]}>
          <label className={classes.label} htmlFor="email">Адреса електронної пошти:</label>
          <input className={classes.input} value={storedEmail} type="email" id="email" name="email" maxLength={35} placeholder="example@gmail.com" onChange={handleChangeEmail} readOnly required />
        </div>
        <div className={classes["form-column-2"]}>
          <label className={classes.label} htmlFor="phone">Номер телефону:</label>
          <input className={classes.input} value={storedPhone} type="tel" id="phone" name="phone" maxLength={15} placeholder="Номер телефону" onChange={handleChangePhone} readOnly required />
        </div>
      </div>
      <label className={classes.label} htmlFor="message">Повідомлення(до 500 символів):</label>
      <textarea className={classes.textarea} name="message" value={storedMessage} rows={5} cols={40} maxLength={500} placeholder="Введіть повідомлення..." onChange={handleChangeMessage} required></textarea>

      <button className={classes.button} type="submit">Надіслати</button>
    </>
  )

  return (
    <div className={classes["send-message"]}>
      <div className={classes["send-message-box"]}>
        <h2 className={classes.h2}>Залишити повідомлення</h2>
        <Suspense fallback={(
          <form action="" className={classes["send-message-box"]}>
            {content}
          </form>
        )}>
          <ContactMessageBaseForm className={classes["send-message-box"]}>
            {content}
          </ContactMessageBaseForm>
        </Suspense>
      </div>
    </div>
  )
}



