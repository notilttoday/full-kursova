'use client'

import classes from '@boilerplate/front-end/components/products-list/style.module.scss'

import { ProductItem } from '@boilerplate/front-end/components/products-list/product-item'

import { useGetProductsQuery } from '@boilerplate/front-end/store/queries/products.query'

interface ProductsListProps { }

export const ProductsList: React.FC<ProductsListProps> = () => {
  const { data = [] } = useGetProductsQuery()

  return (
    <div className={classes.products}>
      {data.map(({ id, title, price }) => (
        <ProductItem key={id} id={id} title={title} price={price} />
      ))}
    </div>
  )
}
