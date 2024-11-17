'use client'

import { useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import cartIco from '@boilerplate/front-end/assets/icons/cart.svg'

import { useAppSelector } from '@boilerplate/front-end/store'

import { useGetOrderQuery } from '@boilerplate/front-end/store/queries/order.query'
import { orderSlice } from '@boilerplate/front-end/store/slices/order.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import classes from '@boilerplate/front-end/components/header/style.module.scss'

interface HeaderCartButtonProps {}

export const HeaderCartButton: React.FC<HeaderCartButtonProps> = () => {
  const orderId = useAppSelector(orderSlice.selectors.id) as string
  const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const { data } = useGetOrderQuery({ orderId, authorized: isAuthorized })
  const items = data?.items || []

  useEffect(() => {
    import('@boilerplate/front-end/store/sagas/order-id.saga')
  }, [])

  return (
    <div className={classes['cart-dropdown']}>
      <Link href="cart" className={classes.profile}>
        <Image className={classes.img} src={cartIco} alt="cartIcon" />
        <div className={classes['cart-quantity']}>{items.reduce((acc, item) => acc + item.quantity, 0)}</div>
      </Link>
    </div>
  )
}
