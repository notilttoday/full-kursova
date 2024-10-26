import classes from '@boilerplate/front-end/components/contact/style.module.scss'
import Image from 'next/image'

import phoneIco from '@boilerplate/front-end/assets/icons/telephone.svg'
import mailIco from '@boilerplate/front-end/assets/icons/mail.svg'

export const Contact: React.FC = () => {
  return (
    <div className={classes.contact}>
            <h1 className={classes.h1}>Наші контакти</h1>
            <div className={classes["our-contacts"]}>
                <div className={classes["contact-box"]}>
                    <Image className={classes.img} src={phoneIco} alt="phone-icon" />
                    <div className={classes["contact-info"]}>
                        <a className={classes.a} href="tel: +380681239812">+380 (68) 123-98-12</a>
                        <a className={classes.a} href="tel: +380689873421">+380 (68) 987-34-21</a>
                    </div>
                </div>
                <div className={classes["contact-box"]}>
                    <Image className={classes.img} src={mailIco} alt="mail-icon" />
                    <div className={classes["contact-info"]}>
                        <a className={classes.a} href="mailto:figures-shop@gmail.com">figures-shop@gmail.com</a>
                        <a className={classes.a} href="mailto:figures-shop@ukr.net">figures-shop@ukr.net</a>
                    </div>
                </div>
            </div>
            <div className={classes["send-message"]}>
                <h2 className={classes.h2}>Залишити повідомлення</h2>
                <div className={classes["send-message-box"]}>
                    <form action="" method="post">
                        <div className={classes["form-row"]}>
                            <div className={classes["form-column-1"]}>
                                <label className={classes.label} htmlFor="first-name">Ім'я:</label>
                                <input className={classes.input} type="text" id="first-name" name="first-name" maxLength={20} placeholder="Ім'я" required />    
                            </div>
                            <div className={classes["form-column-2"]}>
                                <label className={classes.label} htmlFor="last-name">Прізвище:</label>
                                <input className={classes.input} type="text" id="last-name" name="last-name" maxLength={20}  placeholder="Прізвище" required />
                            </div>
                        </div>
                        <div className={classes["form-row"]}>
                            <div className={classes["form-column-1"]}>
                                <label className={classes.label} htmlFor="email">Адреса електронної пошти:</label>
                                <input className={classes.input} type="email" id="email" name="email" maxLength={35} placeholder="example@gmail.com" required />
                            </div>
                            <div className={classes["form-column-2"]}>
                                <label className={classes.label} htmlFor="phone">Номер телефону:</label>
                                <input className={classes.input} type="tel" id="phone" name="phone" maxLength={15} placeholder="Номер телефону" />
                            </div>
                        </div>
                        <label className={classes.label} htmlFor="message">Повідомлення(до 500 символів):</label>
                        <textarea className={classes.textarea} name="message" rows={5} cols={40} maxLength={500} placeholder="Введіть повідомлення..." required></textarea>

                        <button  className={classes.button} type="submit">Надіслати</button>
                    </form>
                </div>
            </div>
        </div>
  )
}
