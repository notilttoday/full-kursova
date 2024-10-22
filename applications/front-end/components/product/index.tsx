import classes from '@boilerplate/front-end/components/product/style.module.scss'
import Image from 'next/image'

import addToCart from '@boilerplate/front-end/assets/icons/add-to-cart.svg'
import arthasImg from '@boilerplate/front-end/assets/figures/ArthasMenethil.jpg'
import { ProductItem } from '@boilerplate/front-end/components/product/product-item'
// import boxImage from '@boilerplate/front-end/assets/images/box.png'
// import creditCardsImage from '@boilerplate/front-end/assets/images/credit-cards.png'
// import safetyImage from '@boilerplate/front-end/assets/images/safety.png'


export const Product: React.FC = () => {
  return (
    <div className={classes.products}>
      <ProductItem></ProductItem>
      <ProductItem></ProductItem>
      <ProductItem></ProductItem>
      <ProductItem></ProductItem>
      <ProductItem></ProductItem>
      <ProductItem></ProductItem>
    </div>
  )
}
