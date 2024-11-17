'use client'

import Image from 'next/image'
import Link from 'next/link'

import deleteIco from '@boilerplate/dashboard/assets/icons/delete.svg'
import editIco from '@boilerplate/dashboard/assets/icons/edit.svg'
import errorImage from '@boilerplate/dashboard/assets/images/404-error.png'

import { useAppDispatch } from '@boilerplate/dashboard/store'

import classes from '@boilerplate/dashboard/components/product-list/style.module.scss'

interface DashProductItemProps {
  id: string
  title: string
  price: number
  description: string
  game: string
  imagePath?: string
}

export const DashProductItem: React.FC<DashProductItemProps> = ({ id, title, price, description, game, imagePath }) => {
  const dispatch = useAppDispatch()

  const handleDelete = async (): Promise<void> => {
    const { deleteProductStart } = await import('@boilerplate/dashboard/store/sagas/delete-product.saga')

    await dispatch(deleteProductStart({ productId: id }))
  }

  return (
    <div className={classes.product}>
      <div className={classes['image-container']}>
        <Image
          className={classes['figure-img']}
          src={imagePath ? `/.${imagePath}` : errorImage}
          width="75"
          height="150"
          alt="figure image"
        />
      </div>
      <div className={classes['desc-container']}>
        <h3 className={classes.h3}>{title}</h3>
        <p className={classes.description}>{description}</p>
        <div className={classes['game-price']}>
          <p className={classes.price}>Ціна: {price * 100}₴</p>
          <p className={classes.game}>Гра: {game}</p>
        </div>
      </div>
      <div className={classes['buttons-container']}>
        <Link href={`/products/update/${id}`}>
          <div className={classes['update-img']}>
            <Image className={classes.img} src={editIco} alt="update" />
          </div>
        </Link>
        <button onClick={handleDelete}>
          <div className={classes['delete-img']}>
            <Image className={classes.img} src={deleteIco} alt="delete" />
          </div>
        </button>
      </div>
    </div>
  )
}
