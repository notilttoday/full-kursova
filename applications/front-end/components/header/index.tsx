'use client'

import classes from '@boilerplate/front-end/components/header/style.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import filterico from '@boilerplate/front-end/assets/icons/filter.png'
import logo from '@boilerplate/front-end/assets/images/logo.png'

import { useGetProfileQuery } from '@boilerplate/front-end/store/queries/profile.query'
import { ProfileHeader } from '@boilerplate/front-end/components/header/user-content'
import { HeaderCartButton } from '@boilerplate/front-end/components/header/cart.button'
import { useCallback } from 'react'
import { useTitle } from '@boilerplate/front-end/hooks/use-title.hook'

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {
  const { data } = useGetProfileQuery();

  const [title, setTitle] = useTitle();

  const handleTitleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setTitle(e.currentTarget.value)
  }, [])

  return (
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
        <input
          type="text"
          className={classes["search-bar"]}
          placeholder="Шукати фігурки..."
          value={title ?? ''}
          onChange={handleTitleChange} />
        <button className={classes["filter-button"]}><Image className={classes.img} src={filterico} alt="filter" /></button>
      </div>
      <div className={classes["icons"]}>
        <div className={classes["cart-dropdown"]}>
          <HeaderCartButton />
        </div>
        <ProfileHeader />
      </div>
    </div>
  )
}