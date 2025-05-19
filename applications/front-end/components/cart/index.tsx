'use client'

import { useAppSelector } from '@boilerplate/front-end/store'

import { useGetOrderQuery } from '@boilerplate/front-end/store/queries/order.query'
import { orderSlice } from '@boilerplate/front-end/store/slices/order.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import { CartItem } from '@boilerplate/front-end/components/cart/cart-item'
import classes from '@boilerplate/front-end/components/cart/style.module.scss'
import { SendOrderUserData } from '@boilerplate/front-end/components/forms/send-order.form'

interface CartProps {}

export const Cart: React.FC<CartProps> = () => {
  const orderId = useAppSelector(orderSlice.selectors.id) as string
  const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const { data } = useGetOrderQuery({ orderId, authorized: isAuthorized })
  const cartItems = data?.items || []

  const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.product.price), 0)

  return (
    <div className={classes.cart}>
      {cartItems.length === 0 ? (
        <ul className={classes['cart-list']}>
          <p className={classes['cart-list-empty']}>Ваш кошик порожній</p>
        </ul>
      ) : (
        <>
          <ul className={classes['cart-list']}>
            {cartItems.map(({ product, quantity }) => (
              <CartItem
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                imageSrc={product.imagePath}
                quantity={quantity}
              />
            ))}
          </ul>
          <SendOrderUserData totalPrice={totalPrice} />
        </>
      )}
    </div>
  )
}
