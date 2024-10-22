'use client';

import classes from '@boilerplate/front-end/components/cart/style.module.scss';
import Image from 'next/image';

import React, { useState } from 'react';

import minusIco from '@boilerplate/front-end/assets/icons/minus.svg'
import plusIco from '@boilerplate/front-end/assets/icons/plus.svg'
import crossIco from '@boilerplate/front-end/assets/icons/cross.svg'
import arthasImage from '@boilerplate/front-end/assets/figures/ArthasMenethil.jpg'

export const Cart: React.FC = () => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleMouseDown = () => {
        setIsZoomed(true);
    };

    const handleMouseUp = () => {
        setIsZoomed(false);
    };

    const increaseQuantity = (): void => {
        setQuantity(quantity + 1);
    // updateTotalPrice();
    };
    const decreaseQuantity = (): void => {
        if(quantity > 1) {
            setQuantity(quantity -1);
        }
        // updateTotalPrice();
    };
    return (
        <div className={classes.cart}>
            <ul className={classes["cart-list"]}>
                <li className={classes["cart-item"]}>
                    <div className={classes["cart-info"]}>
                        <Image src={arthasImage} alt="Arthas" className={`${classes["item-img"]} ${isZoomed ? classes["zoomed"] : ""}`} onMouseDown={handleMouseDown}  onMouseUp={handleMouseUp} />
                        <div className={classes["item-text-info"]}>
                            <p className={classes["item-name"]}>Arthas Manethil</p>
                            <p className={classes["item-desc"]}> sdfdzsgawegv;iasdsdaowea;ybrtgi4ytg98i34sdfdzsdssgawegv;iowea;ybrtgi4ytg98i34sdfdzsgawegv;iowea;ybrtgi4ytg98i34sdfdzsgawegv;iowea;ybrtgi4ytg98i34sdfdzsgawegv;iowea;ybrtgi4ytg98i34</p>
                        </div>
                    </div>
                    <div className={classes["item-review"]}>
                        <p className={classes.p}>* * * * *</p>
                    </div>
                    <div className={classes.quantity}>
                        <button className={classes.button} onClick={decreaseQuantity}><Image className={classes.img} src={minusIco} alt="minus" /></button>
                        <input className={classes["input-number"]} type="number" id="quan" value={quantity} min="1" readOnly />
                        <button className={classes.butotn} onClick={increaseQuantity}><Image className={classes.img} src={plusIco} alt="plus" /></button>
                    </div>
                    <div className={classes["item-price"]}>
                        <p className={classes.price}>1500</p>
                        <button className={classes["remove-item"]}><Image className={classes.img} src={crossIco} alt="cross-delete" /></button>
                    </div>
                </li>
            </ul>
        </div>
    );  
};