import classes from '@boilerplate/front-end/components/product/style.module.scss'
import Image from 'next/image'

import addToCart from '@boilerplate/front-end/assets/icons/add-to-cart.svg'
import arthasImg from '@boilerplate/front-end/assets/figures/ArthasMenethil.jpg'
// import boxImage from '@boilerplate/front-end/assets/images/box.png'
// import creditCardsImage from '@boilerplate/front-end/assets/images/credit-cards.png'
// import safetyImage from '@boilerplate/front-end/assets/images/safety.png'


export const ProductItem: React.FC = () => {
  return (
    <div className={classes.product}>
      <div className={classes["image-container"]}>
          <Image className={classes.img} src={arthasImg} alt="#" />
      </div>
      <h5 className={classes.h5}> FIGURE NAME </h5>
      <div className={classes.availability}>
          <p className={classes.p}> Є/Немає в наявності </p>
      </div>
      <div className={classes["price-cart"]}>
          <p className={classes.p}>ціна ₴</p>
          <button className={classes["add-to-cart"]}>
              <Image src={addToCart} alt="addToCart" />
          </button>
      </div>
    </div>
  )
}
