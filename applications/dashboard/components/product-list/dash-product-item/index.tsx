'use client'

import classes from '@boilerplate/dashboard/components/product-list/style.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import React, { useState } from 'react'

import editIco from '@boilerplate/dashboard/assets/icons/edit.svg'
import deleteIco from '@boilerplate/dashboard/assets/icons/delete.svg'
import errorImage from '@boilerplate/dashboard/assets/images/404-error.png'

import { useDeleteMutation } from '@boilerplate/dashboard/store/queries/products.query'

interface DashProductItemProps {
  id: string
  title: string
  price: number
  description: string
  game: string
  imagePath?: string
  onDelete: (id: string) => void
}

export const DashProductItem: React.FC<DashProductItemProps> = ({ id, title, price, description, game, imagePath, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const [deleteProduct] = useDeleteMutation()

  const handleDelete = async () => {
    try {
      setIsDeleting(true)

      await deleteProduct({ productId: id }).unwrap()

      onDelete(id)
    } catch (error) {
      console.log('Error deleting product:', error)
      alert('Помилка при видаленні продукту')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className={classes.product}>
      <div className={classes["image-container"]}>
        <Image className={classes["figure-img"]} src={imagePath ? `/.${imagePath}` : errorImage} width="75" height="150" alt="figure image" />
      </div>
      <div className={classes["desc-container"]}>
        <h3 className={classes.h3}>{title}</h3>
        <p className={classes["description"]}>{description}</p>
        <div className={classes["game-price"]}>
          <p className={classes["price"]}>Ціна: {price}₴</p>
          <p className={classes["game"]}>Гра: {game}</p>
        </div>
      </div>
      <div className={classes["buttons-container"]}>
        <Link href="products/update">
          <div className={classes["update-img"]}>
            <Image className={classes.img} src={editIco} alt="update" />
          </div>
        </Link>
        <button onClick={handleDelete} disabled={isDeleting}>
          <div className={classes["delete-img"]}>
            <Image className={classes.img} src={deleteIco} alt="delete" />
          </div>
        </button>
      </div>
    </div>
  )
}
