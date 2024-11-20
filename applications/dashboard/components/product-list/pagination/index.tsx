/* eslint-disable import/no-default-export */
import React from 'react'

import classes from '@boilerplate/dashboard/components/product-list/style.module.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const generatePages = (): (string | number)[] => {
    const pages: (number | string)[] = []
    const delta = 2

    const left = Math.max(2, currentPage - delta)
    const right = Math.min(totalPages - 1, currentPage + delta)

    pages.push(1)

    if (left > 2) {
      pages.push('- - -')
    }

    for (let i = left; i <= right; i++) {
      pages.push(i)
    }

    if (right < totalPages - 1) {
      pages.push('- - -')
    }

    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className={classes.pagination}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {generatePages().map((page, index) =>
        typeof page === 'number' ? (
          <button key={index} onClick={() => onPageChange(page)} className={currentPage === page ? classes.active : ''}>
            {page}
          </button>
        ) : (
          <span key={index} className={classes.ellipsis}>
            {page}
          </span>
        ),
      )}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  )
}

export default Pagination
