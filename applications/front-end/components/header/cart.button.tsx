'use client'

import classes from '@boilerplate/front-end/components/header/style.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import cartIco from '@boilerplate/front-end/assets/icons/cart.svg'
import { useAppSelector } from '@boilerplate/front-end/store'
import { cartSlice } from '@boilerplate/front-end/store/slices/cart.slice'

interface HeaderCartButtonProps { }

export const HeaderCartButton: React.FC<HeaderCartButtonProps> = () => {
  const quantity = useAppSelector(cartSlice.selectors.quantity)

  return (
    <div className={classes["cart-dropdown"]}>
      <Link href="cart" className={classes["CartID"]}>
        <Image className={classes.img} src={cartIco} alt="cartIcon" />
        <div className={classes["cart-quantity"]}>
          {quantity}
        </div>
      </Link>
    </div>
  )
}
