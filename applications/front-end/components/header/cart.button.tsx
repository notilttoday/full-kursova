'use client'

import { useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import cartIco from '@boilerplate/front-end/assets/icons/cart.svg'

import classes from '@boilerplate/front-end/components/header/style.module.scss'

interface HeaderCartButtonProps {}

export const HeaderCartButton: React.FC<HeaderCartButtonProps> = () => {
  useEffect(() => {
    import('@boilerplate/front-end/store/sagas/order-id.saga')
  }, [])

  return (
    <div className={classes['cart-dropdown']}>
      <Link href="cart" className={classes.profile}>
        <Image className={classes.img} src={cartIco} alt="cartIcon" />
        <div className={classes['cart-quantity']}>0</div>
      </Link>
    </div>
  )
}
