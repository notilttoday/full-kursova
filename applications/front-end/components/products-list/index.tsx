'use client'

import { useState } from 'react'

import Image from 'next/image'

import leftArrow from '@boilerplate/front-end/assets/icons/arrow-left.svg'
import rightArrow from '@boilerplate/front-end/assets/icons/arrow-right.svg'
import lemmeThink from '@boilerplate/front-end/assets/images/thinking.png'

import { useGetProductsQuery } from '@boilerplate/front-end/store/queries/products.query'

import { useTitle } from '@boilerplate/front-end/hooks/use-title.hook'

import { ProductItem } from '@boilerplate/front-end/components/products-list/product-item'
import classes from '@boilerplate/front-end/components/products-list/style.module.scss'

interface ProductsListProps {
  title?: string
  game?: string[]
}

export const ProductsList: React.FC<ProductsListProps> = () => {
  const [title] = useTitle()
  const { data = [] } = useGetProductsQuery({
    title: title ?? '',
    game: [],
  })

  const ITEMS_PER_PAGE = 18
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)

  const paginatedData = data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const getPaginationButtons = (): (number | string)[] => {
    const pagination: (number | string)[] = []
    const showRange = 2

    if (totalPages <= 1) {
      return pagination
    }

    if (totalPages <= showRange + 3) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(i)
      }
    } else {
      pagination.push(1)

      if (currentPage > showRange + 2) {
        pagination.push('...')
      }

      const startPage = Math.max(2, currentPage - showRange)
      const endPage = Math.min(totalPages - 1, currentPage + showRange)
      for (let i = startPage; i <= endPage; i++) {
        pagination.push(i)
      }

      if (currentPage < totalPages - (showRange + 1)) {
        pagination.push('...')
      }

      pagination.push(totalPages)
    }

    return pagination
  }

  const handlePageClick = (page: number): void => {
    setCurrentPage(page)
  }

  const handleNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePreviousPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  return (
    <div>
      {data.length === 0 ? (
        <div className={classes.noProductsMessage}>
          <p className={classes.p}>В нас немає фігурок з такою назвою (поки що)</p>
          <Image className={classes['thinking-image']} src={lemmeThink} alt="thinking" />
        </div>
      ) : (
        <>
          <div className={classes.products}>
            {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
            {paginatedData.map(({ id, title, price, imagePath }) => (
              <ProductItem key={id} id={id} title={title} price={price} imagePath={imagePath} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className={classes.pagination}>
              <button onClick={handlePreviousPage} disabled={currentPage === 1} className={classes.arrow}>
                <Image src={leftArrow} alt="Previous page" className={classes.img} />
              </button>

              {getPaginationButtons().map((page, index) =>
                typeof page === 'number' ? (
                  <button
                    key={index}
                    onClick={() => handlePageClick(page)}
                    className={`${classes.pageButton} ${page === currentPage ? classes.active : ''}`}
                  >
                    {page}
                  </button>
                ) : (
                  <span key={index} className={classes.ellipsis}>
                    ...
                  </span>
                ),
              )}

              <button onClick={handleNextPage} disabled={currentPage === totalPages} className={classes.arrow}>
                <Image src={rightArrow} alt="Next page" className={classes.img} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
