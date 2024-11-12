'use client';

import classes from '@boilerplate/front-end/components/cart/style.module.scss';
import Image from 'next/image'

import React, { useState } from 'react'

import minusIco from '@boilerplate/front-end/assets/icons/minus.svg'
import plusIco from '@boilerplate/front-end/assets/icons/plus.svg'
import crossIco from '@boilerplate/front-end/assets/icons/cross.svg'
import arthasImage from '@boilerplate/front-end/assets/figures/ArthasMenethil.jpg'
import { useAppDispatch } from '@boilerplate/front-end/store'
import { cartSlice } from '@boilerplate/front-end/store/slices/cart.slice'

interface CartItem {
    id: string,
    title: string,
    price: number,
    quantity: number,
}

interface CartProps {
    items: CartItem[]
}

export const Cart: React.FC<CartProps> = () => {
    const dispatch = useAppDispatch();
    const [isZoomed, setIsZoomed] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const pricePerItem = 1500;
    const [totalPrice, setTotalPrice] = useState(pricePerItem);

    const handleMouseDown = () => {
        setIsZoomed(true);
    };

    const handleMouseUp = () => {
        setIsZoomed(false);
    };

    const updateTotalPrice = (newQuantity: number) => {
        setTotalPrice(newQuantity * pricePerItem);
    };

    const increaseQuantity = (): void => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateTotalPrice(newQuantity);
    };

    const decreaseQuantity = (): void => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateTotalPrice(newQuantity);
        }
    };

    const handleRemoveFromCartClick = (id: string): void => {
        dispatch(cartSlice.actions.remove(id));
    };

    return (
        <div className={classes.cart}>
            <ul className={classes["cart-list"]}>
                <li className={classes["cart-item"]}>
                    <div className={classes["cart-info"]}>
                        <div className="cart-item-image">
                            <Image src={arthasImage} alt="Arthas" className={`${classes["item-img"]} ${isZoomed ? classes["zoomed"] : ""}`} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
                        </div>
                        <div className={classes["item-text-info"]}>
                            <p className={classes["item-name"]}>Arthas Menethil</p>
                            <p className={classes["item-desc"]}> sdfdzsgawegv;iasdsdaowea;ybrtgi4ytg98i34sdfdzsdssgawegv;iowea;ybrtgi4ytg98i34sdfdzsgawegv;iowea;ybrtgi4ytg98i34sdfdzsgawegv;iowea;ybrtgi4ytg98i34sdfdzsgawegv;iowea;ybrtgi4ytg98i34</p>
                        </div>
                    </div>
                    <div className={classes["item-review"]}>
                        <p className={classes.p}>* * * * *</p>
                    </div>
                    <div className={classes.quantity}>
                        <button className={classes.button} onClick={decreaseQuantity}><Image className={classes.img} src={minusIco} alt="minus" /></button>
                        <input className={classes["input-number"]} type="number" id="quan" value={quantity} min="1" />
                        <button className={classes.butotn} onClick={increaseQuantity}><Image className={classes.img} src={plusIco} alt="plus" /></button>
                    </div>
                    <div className={classes["item-price"]}>
                        <p className={classes.price}>{totalPrice} грн</p>
                        <button className={classes["remove-item"]} onClick={handleRemoveFromCartClick}><Image className={classes.img} src={crossIco} alt="cross-delete" /></button>
                    </div>
                </li>
            </ul>
        </div>
    );
};