'use client'

// eslint-disable-next-line no-restricted-imports
import React, { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import addToCart from '@boilerplate/front-end/assets/icons/add-to-cart.svg'
import topArrow from '@boilerplate/front-end/assets/icons/top-arrow.svg'
import errorImage from '@boilerplate/front-end/assets/images/404-error.png'

import { useAppSelector } from '@boilerplate/front-end/store'

import { usePatchOrderMutation } from '@boilerplate/front-end/store/queries/order.query'
import { orderSlice } from '@boilerplate/front-end/store/slices/order.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import classes from '@boilerplate/front-end/components/products-list/style.module.scss'

interface ProductItemProps {
  id: string
  title: string
  price: number
  imagePath?: string
}

export const ProductItem: React.FC<ProductItemProps> = ({ id, title, price, imagePath }) => {
  const orderId = useAppSelector(orderSlice.selectors.id) as string
  const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const [patchOrder] = usePatchOrderMutation()

  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = (): void => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const decreaseQuantity = (): void => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newQuantity = Math.max(1, Number(event.target.value))

    setQuantity(newQuantity)
  }

  const handleProductClick = (): void => {
    router.push(`/product-description/${id}`)
  }

  const handleAddToCartClick = (): void => {
    patchOrder({ orderId, authorized: isAuthorized, productId: id, quantity })
  }

  return (
    <div className={classes.product}>
      <div onClick={handleProductClick}>
        <div className={classes['image-container']}>
          <Image className={classes.img} src={imagePath ? imagePath : errorImage} width="200" height="200" alt="#" />
        </div>
        <h5 className={classes.h5}>{title}</h5>
        <div className={classes.availability}>
          <p className={classes.p}> Є/Немає в наявності </p>
        </div>
        <div className={classes['review-grade']}>
          <p className={classes.p}>* * * * *</p>
        </div>
      </div>
      <div className={classes['price-cart']}>
        <p className={classes.p}>{price.toFixed(2)}₴</p>
        <div className={classes['change-quantity']}>
          <input
            className={classes['input-number']}
            type="number"
            id="quan"
            value={quantity}
            min="1"
            onChange={handleInputChange}
          />
          <div className={classes['quantity-arrows']}>
            <button className={classes.button} onClick={increaseQuantity}>
              <Image className={classes.img} src={topArrow} alt="top arrow" />
            </button>
            <button className={classes.button} onClick={decreaseQuantity}>
              <Image className={classes['img-bottom-arrow']} src={topArrow} alt="bottom arrow" />
            </button>
          </div>
        </div>
        <button className={classes['add-to-cart']} onClick={handleAddToCartClick}>
          <Image src={addToCart} alt="addToCart" className={classes.img} />
        </button>
      </div>
    </div>
  )
}
