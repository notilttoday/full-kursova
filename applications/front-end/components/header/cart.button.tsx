'use client'

import classes from '@boilerplate/front-end/components/header/style.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import cartIco from '@boilerplate/front-end/assets/icons/cart.svg'
import { useAppSelector } from '@boilerplate/front-end/store'
import { orderSlice } from '@boilerplate/front-end/store/slices/order.slice'

interface HeaderCartButtonProps { }

export const HeaderCartButton: React.FC<HeaderCartButtonProps> = () => {
  const quantity = useAppSelector(orderSlice.selectors.quantity)

  return (
    <div className={classes["cart-dropdown"]}>
      <Link href="cart" className={classes.profile}>
        <Image className={classes.img} src={cartIco} alt="cartIcon" />
        <div className={classes["cart-quantity"]}>
          {quantity}
        </div>
      </Link>
    </div>
  )
}
