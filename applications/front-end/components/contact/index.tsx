'use client'

import { useGetProfileQuery } from '@boilerplate/front-end/store/queries/profile.query'

import { ContactMessageForm } from '@boilerplate/front-end/components/contact/contact-form'
import { OurContacts } from '@boilerplate/front-end/components/contact/our-contacts'
import classes from '@boilerplate/front-end/components/contact/style.module.scss'

interface ContactProps {}

export const Contact: React.FC<ContactProps> = () => {
  const { data } = useGetProfileQuery()
  const { firstName, lastName, email, phone, id } = data ?? {}

  return (
    <div className={classes.contact}>
      <OurContacts />
      <ContactMessageForm firstName={firstName} lastName={lastName} email={email} phone={phone} userId={id} />
    </div>
  )
}
