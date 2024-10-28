'use client'

import classes from '@boilerplate/front-end/components/contact/style.module.scss'

import { OurContacts } from '@boilerplate/front-end/components/contact/our-contacts'
import { ContactForm } from '@boilerplate/front-end/components/contact/contact-form'
import { useGetProfileQuery } from '@boilerplate/front-end/store/queries/profile.query'

interface ContactProps { }

export const Contact: React.FC<ContactProps> = () => {
    const { data } = useGetProfileQuery()
    const { firstName, lastName, email, phone, id } = data ?? {}

    return (
        <div className={classes.contact}>
            <OurContacts />
            <ContactForm firstName={firstName} lastName={lastName} email={email} phone={phone} id={id} />
        </div>
    )
}
