import classes from '@boilerplate/front-end/components/contact/style.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import phoneIco from '@boilerplate/front-end/assets/icons/telephone.svg'
import mailIco from '@boilerplate/front-end/assets/icons/mail.svg'

interface OurContactsProps { }

export const OurContacts: React.FC<OurContactsProps> = () => {
  return (
    <div>
      <h1 className={classes.h1}>Наші контакти</h1>
      <div className={classes["our-contacts"]}>
        <div className={classes["contact-box"]}>
          <Image className={classes.img} src={phoneIco} alt="phone-icon" />
          <div className={classes["contact-info"]}>
            <Link className={classes.a} href="tel: +380681239812">+380 (68) 123-98-12</Link>
            <Link className={classes.a} href="tel: +380689873421">+380 (68) 987-34-21</Link>
          </div>
        </div>
        <div className={classes["contact-box"]}>
          <Image className={classes.img} src={mailIco} alt="mail-icon" />
          <div className={classes["contact-info"]}>
            <Link className={classes.a} href="mailto:figures-shop@gmail.com">figures-shop@gmail.com</Link>
            <Link className={classes.a} href="mailto:figures-shop@ukr.net">figures-shop@ukr.net</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
