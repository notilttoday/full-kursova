'use client'

import classes from '@boilerplate/dashboard/components/products-list/style.module.scss'

import React from 'react'


interface ContactMessageItemProps {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  userId: string
}

export const ContactMessageItem: React.FC<ContactMessageItemProps> = ({ id, firstName, lastName, email, phone, message, userId }) => {
  return (
    <div className={classes["contact-message"]}>
      <div className={classes["column-1"]}>
        <p className={classes.p}>Ім'я: {firstName}</p>
        <p className={classes.p}>Прізвище: {lastName}</p>
        <p className={classes.p}>Пошта: {email}</p>
        <p className={classes.p}>Номер телефону: {phone}</p>
        <p className={classes.p}>ID користувача: {userId}</p>
      </div>
      <div className={classes["column-2"]}>
        <h2 className={classes.h2}>Звернення</h2>
        <p className={classes.p}>{message}</p>
      </div>
    </div>
  )
}
