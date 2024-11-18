import Image from 'next/image'
import Link from 'next/link'

import facebookIco from '@boilerplate/front-end/assets/icons/facebook.png'
import instagramIco from '@boilerplate/front-end/assets/icons/instagram.webp'
import telegramIco from '@boilerplate/front-end/assets/icons/telegram.png'
import twitterXIco from '@boilerplate/front-end/assets/icons/twitter-x.png'

import classes from '@boilerplate/front-end/components/footer/style.module.scss'

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => (
  <div className={classes.footer}>
    <div className={classes['top-footer']}>
      <div className={classes['delivery-graphic']}>
        <p className={classes.p}>Графік доставки</p>
        <div className={classes.graphic}>
          <p className={classes.p}>Будні: 09:00 - 19:00</p>
          <p className={classes.p}>Вихідні: 10:00 - 13:00</p>
        </div>
      </div>
      <div className={classes['social-media']}>
        <p className={classes.p}>Наші соціальні мережі</p>
        <div>
          <Link href="#" className={classes.instagram}>
            <Image className={classes.img} src={instagramIco} alt="instagram-icon" />
            <p>Наш instagram</p>
          </Link>
          <Link href="#" className={classes.telegram}>
            <Image className={classes.img} src={telegramIco} alt="telegram-icon" />
            <p>Наш telegram</p>
          </Link>
          <Link href="#" className={classes['twitter-x']}>
            <Image className={classes.img} src={twitterXIco} alt="twitter-x-icon" />
            <p>Наш X</p>
          </Link>
          <Link href="#" className={classes.facebook}>
            <Image className={classes.img} src={facebookIco} alt="facebook" />
            <p>Наш facebook</p>
          </Link>
        </div>
      </div>
      <div className={classes['more-info']}>
        <p className={classes.p}>Більше інформації</p>
        <div className={classes['footer-info']}>
          <Link className={classes.a} href="/cabinet">
            Мій профіль
          </Link>
          <Link className={classes.a} href="/contact">
            Контакти
          </Link>
          <Link className={classes.a} href="/about-us">
            Про нас
          </Link>
        </div>
      </div>
    </div>
    <div className={classes['bottom-footer']}>© Figures Shop 2024</div>
  </div>
)
