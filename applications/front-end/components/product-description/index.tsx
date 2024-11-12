'use client';

import classes from '@boilerplate/front-end/components/product-description/style.module.scss'
import Image from 'next/image'

import React, { useState } from 'react';

import arthasImg from '@boilerplate/front-end/assets/figures/ArthasMenethil.jpg'
import addToCart from '@boilerplate/front-end/assets/icons/add-to-cart.svg'
import topArrow from '@boilerplate/front-end/assets/icons/top-arrow.svg'
import { useGetProductQuery } from '@boilerplate/front-end/store/queries/product.query';

interface ProductDescriptionProps {
    productId: string
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ productId }) => {
    const [quantity, setQuantity] = useState(1);

    const { data: product, isLoading } = useGetProductQuery(productId)

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
    return (
        <div className={classes["product-desc"]}>
            <div className={classes["about-figure"]}>
                <div className={classes["column-1"]}>
                    <Image src={arthasImg} alt="ArthasFigure" className={classes["figure-img"]} />
                </div>
                <div className={classes["column-2"]}>
                    <h3 className={classes.h3}>{product?.title}</h3>
                    <div className={classes["figure-desc"]}>
                        <p className={classes["common-text"]}>
                            {`${product?.description}`}
                        </p>
                    </div>
                    {product?.game ?
                        <div className={classes["category-list"]}>
                            <div className={classes["category-container"]}>
                                <p className={classes.p}>{product?.game}</p>
                            </div>
                        </div> : null}
                    <div className={classes["price-container"]}>
                        <h2 className={classes.price}>{product?.price}₴</h2>
                        <div className={classes["change-quantity"]}>
                            <p className={classes.p}>Обрати кількість</p>
                            <input className={classes["input-number"]} type="number" id="quan" value={quantity} min="1" onChange={handleInputChange} />
                            <div className={classes["quantity-arrows"]}>
                                <button className={classes.button}><Image className={classes.img} src={topArrow} onClick={increaseQuantity} alt="top arrow" /></button>
                                <button className={classes.button}><Image className={classes["img-bottom-arrow"]} onClick={decreaseQuantity} src={topArrow} alt="bottom arrow" /></button>
                            </div>
                        </div>
                        <button className={classes["add-to-cart"]}>
                            <p className={classes.p}>Додати у кошик</p>
                            <Image src={addToCart} alt="addToCart" className={classes.img} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
