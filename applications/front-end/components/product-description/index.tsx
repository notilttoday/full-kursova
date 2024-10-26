'use client';

import classes from '@boilerplate/front-end/components/product-description/style.module.scss'
import Image from 'next/image'

import React, { useState } from 'react';

import arthasImg from '@boilerplate/front-end/assets/figures/ArthasMenethil.jpg'
import addToCart from '@boilerplate/front-end/assets/icons/add-to-cart.svg'
import topArrow from '@boilerplate/front-end/assets/icons/top-arrow.svg'

export const ProductDescription: React.FC = () => {
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
  return (
    <div className={classes["product-desc"]}>
        <div className={classes["about-figure"]}>
            <div className={classes["column-1"]}>
                <Image src={arthasImg} alt="ArthasFigure" className={classes["figure-img"]} />
            </div>
            <div className={classes["column-2"]}>
                <h3 className={classes.h3}>Arthas Menethil</h3>
                <div className={classes["figure-desc"]}>
                    <p className={classes["common-text"]}>Артас Менетіл — це один із найвідоміших персонажів всесвіту Warcraft, і фігурка, що зображує його, втілює його в епічному, величному образі. Фігурка зображує Артаса в його найвідомішій формі — як Короля-ліча (Lich King). Його броня масивна, чорна і срібляста, зі складними, загрозливими деталями, вкритими крижаними візерунками, що відбивають його владу над Смертоносними землями і Нежиттю.
                    <br /><br />
                    Артас тримає свій легендарний меч — Frostmourne, що зловісно світиться, ніби готовий поглинути душі ворогів. Його шолом із шипами приховує обличчя, залишаючи лише холодне, пронизливе світло очей, що символізує його перетворення на втілення чистого зла.
                    <br /><br />
                    Фігурка розроблена з неймовірною увагою до деталей, передаючи всі відтінки трагедії та величі персонажа. Рукавички, накидка, навіть текстура плаща і броні, здається, промовляють про його холодну міць.</p>
                </div>
                <div className={classes["category-list"]}>
                    <div className={classes["category-container"]}>
                        <p className={classes.p}>WOW</p>
                    </div>
                    <div className={classes["category-container"]}>
                        <p className={classes.p}>Lich King</p>
                    </div>
                    <div className={classes["category-container"]}>
                        <p className={classes.p}>Arthas</p>
                    </div>
                </div>
                <div className={classes["price-container"]}>
                    <h2 className={classes.price}>1500₴</h2>
                    <div className={classes["change-quantity"]}>
                        <p className={classes.p}>Обрати кількість</p>
                        <input className={classes["input-number"]} type="number" id="quan" value={quantity} min="1" onChange={handleInputChange} />
                        <div className={classes["quantity-arrows"]}>
                            <button className={classes.button}><Image className={classes.img} src={topArrow} onClick={increaseQuantity} alt="top arrow"/></button>
                            <button className={classes.button}><Image className={classes["img-bottom-arrow"]} onClick={decreaseQuantity} src={topArrow} alt="bottom arrow"/></button>
                        </div>
                    </div>
                    <button className={classes["add-to-cart"]}>  
                        <p className={classes.p}>Додати у кошик</p>
                        <Image src={addToCart} alt="addToCart" className={classes.img}/>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
