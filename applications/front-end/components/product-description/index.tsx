'use client'

// eslint-disable-next-line no-restricted-imports
import React, { useState } from 'react'

import Image from 'next/image'

import addToCart from '@boilerplate/front-end/assets/icons/add-to-cart.svg'
import topArrow from '@boilerplate/front-end/assets/icons/top-arrow.svg'
import errorImage from '@boilerplate/front-end/assets/images/404-error.png'

import { GameType } from '@boilerplate/types/products/interfaces/products'

import { useAppSelector } from '@boilerplate/front-end/store'

import { usePatchOrderMutation } from '@boilerplate/front-end/store/queries/order.query'
import { useGetProductQuery } from '@boilerplate/front-end/store/queries/product.query'
import { orderSlice } from '@boilerplate/front-end/store/slices/order.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import classes from '@boilerplate/front-end/components/product-description/style.module.scss'

const gameMap: Record<GameType, string> = {
  [GameType.Dota]: 'Dota 2',
  [GameType.TheWitcher]: 'The Witcher',
  [GameType.WorldOfWarcraft]: 'World of Warcraft',
  [GameType.Diablo]: 'Diablo',
  [GameType.AssassinsCreed]: 'Assassins Creed',
}

interface ProductDescriptionProps {
  productId: string
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ productId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: product, isLoading } = useGetProductQuery(productId)

  const orderId = useAppSelector(orderSlice.selectors.id) as string
  const isAuthorized = useAppSelector(profileSlice.selectors.isAuthorized)

  const [patchOrder] = usePatchOrderMutation()
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

  const handleAddToCartClick = (): void => {
    patchOrder({ orderId, authorized: isAuthorized, productId, quantity })
  }

  return (
    <div className={classes['product-desc']}>
      <div className={classes['about-figure']}>
        <div className={classes['column-1']}>
          <Image
            src={product?.imagePath ? product?.imagePath : errorImage}
            alt="ArthasFigure"
            className={classes['figure-img']}
            width={100}
            height={100}
          />
        </div>
        <div className={classes['column-2']}>
          <h3 className={classes.h3}>{product?.title}</h3>
          <div className={classes['figure-desc']}>
            <p className={classes['common-text']}>{`${product?.description}`}</p>
          </div>
          {product?.game ? (
            <div className={classes['category-list']}>
              <div className={classes['category-container']}>
                <p className={classes.p}>{gameMap[product?.game]}</p>
              </div>
            </div>
          ) : null}
          <div className={classes['price-container']}>
            {product ? <h2 className={classes.price}>{(product?.price * quantity).toFixed(2)}₴</h2> : null}
            <div className={classes['change-quantity']}>
              <p className={classes.p}>Обрати кількість</p>
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
              <p className={classes.p}>Додати у кошик</p>
              <Image src={addToCart} alt="addToCart" className={classes.img} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
