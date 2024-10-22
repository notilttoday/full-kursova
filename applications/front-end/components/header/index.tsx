import classes from '@boilerplate/front-end/components/header/style.module.scss'
import Image from 'next/image'

import profileIco from '@boilerplate/front-end/assets/icons/profile.svg'
import filterico from '@boilerplate/front-end/assets/icons/filter.png'
import cartIco from '@boilerplate/front-end/assets/icons/cart.svg'
import logo from '@boilerplate/front-end/assets/images/logo.png'


export const Header: React.FC = () => {
  return (
    <div className={classes.header}>
        <div className={classes.logo}>
            <a href="/"><Image className={classes.img} src={logo} alt="LogoFiguresShop" /></a>
        </div>
        <div className={classes.nav}>
            <ul>
                <li><a href="figure-search">Магазин</a></li>
                <li><a href="about-us">Про нас</a></li>
                <li><a href="contact">Контакти</a></li>
            </ul>
        </div>
        <div className={classes["search-and-filters"]}>
            <input type="text" className={classes["search-bar"]} placeholder="Шукати фігурки..." />
            <button className={classes["filter-button"]}><Image className={classes.img} src={filterico} alt="filter" /></button>
        </div>
        <div className={classes["icons"]}>
            <div className={classes["cart-dropdown"]}>
                <a href="cart" className={classes["CartID"]}>
                    <Image className={classes.img} src={cartIco} alt="cartIcon"/>
                    <div className={classes["cart-quantity"]}>
                        0
                    </div>
                </a>
            </div>
            <div className={classes["profile-dropdown"]}>
                <a href="my-profile" className={classes.profile}>
                    <Image className={classes.img} src={profileIco}  alt="profileIcon" />
                </a>
            </div>
        </div>
    </div>
  )
}
