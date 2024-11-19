'use client'

import { useState } from 'react'

import { useGetOrdersListQuery } from '@boilerplate/dashboard/store/queries/orders.query'

import { DashProductItem } from '@boilerplate/dashboard/components/product-list/dash-product-item'
import Pagination from '@boilerplate/dashboard/components/product-list/pagination'
import classes from '@boilerplate/dashboard/components/product-list/style.module.scss'

interface OrderListProps {}

export const OrderList: React.FC<OrderListProps> = () => {
  const { data = [] } = useGetOrdersListQuery()

  console.log('hello, ', data)
  // const [currentPage, setCurrentPage] = useState(1)
  // const itemsPerPage = 3

  // const totalPages = Math.ceil(data.length / itemsPerPage)
  // const startIndex = (currentPage - 1) * itemsPerPage
  // const currentProducts = data.slice(startIndex, startIndex + itemsPerPage)

  // const handlePageChange = (page: number): void => {
  //   setCurrentPage(page)
  // }

  return (
    <div className={classes.products}>
      {/* {currentProducts.map(({ id, title, price, description, game, imagePath }) => (
        <OrderItem
          key={id}
          id={id}
          title={title}
          price={price}
          description={description}
          game={game}
          imagePath={imagePath}
        />
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
    </div>
  )
}
