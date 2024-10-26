import classes from '@boilerplate/front-end/components/products-list/style.module.scss'
import Image from 'next/image'

import addToCart from '@boilerplate/front-end/assets/icons/add-to-cart.svg'
import arthasImg from '@boilerplate/front-end/assets/figures/ArthasMenethil.jpg'
import { ProductItem } from '@boilerplate/front-end/components/products-list/product-item'

export const ProductsList: React.FC = () => {
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
