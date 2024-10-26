'use client';

import classes from '@boilerplate/front-end/components/products-list/style.module.scss'
import Image from 'next/image'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import addToCart from '@boilerplate/front-end/assets/icons/add-to-cart.svg'
import arthasImg from '@boilerplate/front-end/assets/figures/ArthasMenethil.jpg'
import topArrow from '@boilerplate/front-end/assets/icons/top-arrow.svg'

export const ProductItem: React.FC = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = (): void => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  const decreaseQuantity = (): void => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newQuantity = Math.max(1, Number(event.target.value));
    setQuantity(newQuantity);
  };
  const handleProductClick = (): void => {
    router.push('/product-desc');
  };

  return (
    <div className={classes.product}>
      <div onClick={handleProductClick}>
        <div className={classes["image-container"]}>
            <Image className={classes.img} src={arthasImg} alt="#" />
        </div>
        <h5 className={classes.h5}> FIGURE NAME </h5>
        <div className={classes.availability}>
            <p className={classes.p}> Є/Немає в наявності </p>
        </div>
        <div className={classes["review-grade"]}>
            <p className={classes.p}> * * * * *</p>
        </div>
      </div>
      <div className={classes["price-cart"]}>
          <p className={classes.p}>ціна ₴</p>
          <div className={classes["change-quantity"]}>
            <input className={classes["input-number"]} type="number" id="quan" value={quantity} min="1" onChange={handleInputChange} />
            <div className={classes["quantity-arrows"]}>
              <button className={classes.button}><Image className={classes.img} src={topArrow} onClick={increaseQuantity} alt="top arrow"/></button>
              <button className={classes.button}><Image className={classes["img-bottom-arrow"]} onClick={decreaseQuantity} src={topArrow} alt="bottom arrow"/></button>
            </div>
          </div>
          <button className={classes["add-to-cart"]}>
              <Image src={addToCart} alt="addToCart" className={classes.img} />
          </button>
      </div>
    </div>
  )
}
