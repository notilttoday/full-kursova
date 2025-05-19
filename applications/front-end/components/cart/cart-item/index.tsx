'use client'

import { useCallback, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import crossIco from '@boilerplate/front-end/assets/icons/cross.svg'
import minusIco from '@boilerplate/front-end/assets/icons/minus.svg'
import plusIco from '@boilerplate/front-end/assets/icons/plus.svg'
import errorImage from '@boilerplate/front-end/assets/images/404-error.png'

import { useAppSelector } from '@boilerplate/front-end/store'

import { usePatchOrderMutation } from '@boilerplate/front-end/store/queries/order.query'
import { orderSlice } from '@boilerplate/front-end/store/slices/order.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import classes from '@boilerplate/front-end/components/cart/style.module.scss'

interface CartItemProps {
  id: string
  title: string
  price: number
  imageSrc?: string
  quantity: number
}

export const CartItem: React.FC<CartItemProps> = ({ id, title, price, quantity, imageSrc }) => {
  const orderId = useAppSelector(orderSlice.selectors.id) as string
  const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const [patchOrder] = usePatchOrderMutation()

  const [isZoomed, setIsZoomed] = useState(false)

  const handleMouseDown = useCallback<React.MouseEventHandler<HTMLImageElement>>(() => {
    setIsZoomed(true)
  }, [])

  const handleMouseUp = useCallback<React.MouseEventHandler<HTMLImageElement>>(() => {
    setIsZoomed(false)
  }, [])

  const increaseQuantity = useCallback<React.MouseEventHandler<HTMLButtonElement>>((): void => {
    patchOrder({ orderId, productId: id, authorized: isAuthorized, quantity: quantity + 1 })
  }, [quantity])

  const decreaseQuantity = useCallback<React.MouseEventHandler<HTMLButtonElement>>((): void => {
    if (quantity > 1) {
      patchOrder({ orderId, productId: id, authorized: isAuthorized, quantity: quantity - 1 })
    }
  }, [quantity])

  const handleRemoveFromCartClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    patchOrder({ orderId, productId: id, authorized: isAuthorized, quantity: 0 })
  }, [])

  return (
    <li className={classes['cart-item']}>
      <div className={classes['cart-info']}>
        <div className="cart-item-image">
          <Image
            src={imageSrc ? imageSrc : errorImage.src}
            alt="Arthas"
            className={`${classes['item-img']} ${isZoomed ? classes.zoomed : ''}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            width={60}
            height={60}
          />
        </div>
        <div className={classes['item-text-info']}>
          <Link href={`/product-description/${id}`} className={classes['item-name']}>
            {title}
          </Link>
        </div>
      </div>
      <div className={classes['item-review']}>
        <p className={classes.p}>* * * * *</p>
      </div>
      <div className={classes.quantity}>
        <button className={classes.button} onClick={decreaseQuantity}>
          <Image className={classes.img} src={minusIco} alt="minus" />
        </button>
        <input className={classes['input-number']} type="number" id="quan" value={quantity} min="1" readOnly />
        <button className={classes.button} onClick={increaseQuantity}>
          <Image className={classes.img} src={plusIco} alt="plus" />
        </button>
      </div>
      <div className={classes['item-price']}>
        <p className={classes.price}>{price * quantity} грн</p>
        <button className={classes['remove-item']} onClick={handleRemoveFromCartClick}>
          <Image className={classes.img} src={crossIco} alt="cross-delete" />
        </button>
      </div>
    </li>
  )
}
