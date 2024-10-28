import classes from '@boilerplate/front-end/components/header/style.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import profileIco from '@boilerplate/front-end/assets/icons/profile.svg'
import filterico from '@boilerplate/front-end/assets/icons/filter.png'
import logo from '@boilerplate/front-end/assets/images/logo.png'
import { HeaderCartButton } from '@boilerplate/front-end/components/header/cart.button'

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => (
  <div className={classes.header}>
    <div className={classes.logo}>
      <Link href="/"><Image className={classes.img} src={logo} alt="LogoFiguresShop" /></Link>
    </div>
    <div className={classes.nav}>
      <ul>
        <li><Link href="figure-search">Магазин</Link></li>
        <li><Link href="about-us">Про нас</Link></li>
        <li><Link href="contact">Контакти</Link></li>
      </ul>
    </div>
    <div className={classes["search-and-filters"]}>
      <input type="text" className={classes["search-bar"]} placeholder="Шукати фігурки..." />
      <button className={classes["filter-button"]}><Image className={classes.img} src={filterico} alt="filter" /></button>
    </div>
    <div className={classes["icons"]}>
      <div className={classes["cart-dropdown"]}>
        <HeaderCartButton />
      </div>
      <div className={classes["profile-dropdown"]}>
        <Link href="cabinet" className={classes.profile}>
          <Image className={classes.img} src={profileIco} alt="profileIcon" />
        </Link>
      </div>
    </div>
  </div>
)
