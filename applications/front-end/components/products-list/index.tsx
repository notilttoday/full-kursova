'use client'

import classes from '@boilerplate/front-end/components/products-list/style.module.scss'

import Image from 'next/image'

import { ProductItem } from '@boilerplate/front-end/components/products-list/product-item'

import { useGetProductsQuery } from '@boilerplate/front-end/store/queries/products.query'
import { useState } from 'react';

import leftArrow from '@boilerplate/front-end/assets/icons/arrow-left.svg'
import rightArrow from '@boilerplate/front-end/assets/icons/arrow-right.svg'
import { useTitle } from '@boilerplate/front-end/hooks/use-title.hook'

interface ProductsListProps {
  title?: string;
  game?: string[];
}

export const ProductsList: React.FC<ProductsListProps> = () => {
  const [title] = useTitle()
  const { data = [] } = useGetProductsQuery({
    title: title ?? '',
    game: []
  })

  // const productsToRender = products ?? data

  // const itemsPerPage = 18
  // const [currentPage, setCurrentPage] = useState(1)
  // const totalPages = Math.ceil(productsToRender.length / itemsPerPage)

  // const startIndex = (currentPage - 1) * itemsPerPage
  // const currentProducts = productsToRender.slice(startIndex, startIndex + itemsPerPage)

  // const handlePageChange = (page: number) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page)
  //   }
  // }

  // const getPaginationButtons = () => {
  //   const buttons = []

  //   if (currentPage > 4) {
  //     buttons.push(
  //       <button key={1} onClick={() => handlePageChange(1)}>1</button>
  //     )
  //     if (currentPage > 5) {
  //       buttons.push(<span key="start-ellipsis">...</span>)
  //     }
  //   }

  //   const startPage = Math.max(1, currentPage - 2)
  //   const endPage = Math.min(totalPages, currentPage + 2)

  //   for (let i = startPage; i <= endPage; i++) {
  //     buttons.push(
  //       <button
  //         key={i}
  //         onClick={() => handlePageChange(i)}
  //         className={i === currentPage ? classes.active : ''}
  //       >
  //         {i}
  //       </button>
  //     )
  //   }

  //   if (currentPage < totalPages - 3) {
  //     if (currentPage < totalPages - 4) {
  //       buttons.push(<span key="end-ellipsis">...</span>)
  //     }
  //     buttons.push(
  //       <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
  //         {totalPages}
  //       </button>
  //     )
  //   }

  //   return buttons
  // }

  return (
    <div>
      <div className={classes.products}>
        {data.map(({ id, title, price, imagePath }) => (
          <ProductItem key={id} id={id} title={title} price={price} imagePath={imagePath} />
        ))}
      </div>
      {/* <div className={classes.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={classes["arrow"]} >
          <Image src={leftArrow} alt="Previous page" className={classes.img} />
        </button>
        {getPaginationButtons()}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={classes["arrow"]} >
          <Image src={rightArrow} alt="Next page" className={classes.img} />
        </button>
      </div> */}
    </div>
  )
}