'use client'

import { useState } from 'react'

import Image from 'next/image'

import errorImage from '@boilerplate/dashboard/assets/images/404-error.png'

import { StatusType } from '@boilerplate/types/orders/interfaces/orders'

import { useAppDispatch } from '@boilerplate/dashboard/store'

import classes from '@boilerplate/dashboard/components/order-list/style.module.scss'

const statusMap: Record<StatusType, string> = {
  [StatusType.Pending]: 'Очікування',
  [StatusType.Processing]: 'Обробка',
  [StatusType.Completed]: 'Завершено',
  [StatusType.OnHold]: 'На утриманні',
  [StatusType.Expired]: 'Просрочено',
  [StatusType.Paid]: 'Сплачено',
  [StatusType.Refunded]: 'Повернено',
  [StatusType.Failed]: 'Скасовано',
}

interface OrderItemProps {
  orderId: string
  status: string
  isExpanded: boolean
  onToggle: () => void
  user: {
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
  }
  items: {
    product: {
      id: string
      title: string
      price: number
      imagePath?: string
    }
    quantity: number
  }[]
}

export const OrderItem: React.FC<OrderItemProps> = ({ orderId, status, user, items, isExpanded, onToggle }) => {
  const [selectedStatus, setSelectedStatus] = useState(status)

  const hasUserData = user.firstName && user.lastName && user.email && user.phone

  if (!hasUserData) {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calculateTotalPrice = (orderItems: any[]): number =>
    orderItems.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)

  const totalPrice = calculateTotalPrice(items)

  const dispatch = useAppDispatch()

  const handleChangeStatus = async (): Promise<void> => {
    const { patchOrderStatusStart } = await import('@boilerplate/dashboard/store/sagas/edit-order-status.saga')

    await dispatch(patchOrderStatusStart({ orderId, paymentStatus: selectedStatus as StatusType }))
  }

  const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedStatus(e.target.value as StatusType)
  }

  return (
    <div className={classes['order-item']}>
      <div className={classes['order-summary']} onClick={onToggle}>
        <p className={classes['order-id']}>
          <strong>ID:</strong> {orderId}
        </p>
        <p className={classes['order-status']}>
          <strong>Статус:</strong> {status}
        </p>
        <p className={classes['order-total-price']}>
          <strong>Загальна ціна:</strong> {totalPrice}₴
        </p>
      </div>

      {isExpanded && (
        <div className={classes['order-details']}>
          <div className={classes['user-info']}>
            <p className={classes.p}>
              <strong>Ім'я:</strong> {user.firstName || 'Не вказано'}
            </p>
            <p className={classes.p}>
              <strong>Прізвище:</strong> {user.lastName || 'Не вказано'}
            </p>
            <p className={classes.p}>
              <strong>Email:</strong> {user.email || 'Не вказано'}
            </p>
            <p className={classes.p}>
              <strong>Телефон:</strong> {user.phone || 'Не вказано'}
            </p>
          </div>

          <div className={classes['order-items']}>
            {items.map((item, index) => (
              <div key={index} className={classes['order-item-container']}>
                <div className={classes['order-image-container']}>
                  <Image
                    className={classes['order-figure-img']}
                    src={item.product?.imagePath ? `/.${item.product.imagePath}` : errorImage}
                    width="75"
                    height="150"
                    alt="Назва товару"
                  />
                </div>
                <div className={classes['order-info']}>
                  <h4>{item.product?.title}</h4>
                  <p>Ціна: {item.product?.price}₴</p>
                  <p>Кількість: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={classes['status-change']}>
            <label className="category-name small-1" htmlFor="pma">
              Новий статус
            </label>
            <div className="123">
              <select
                value={selectedStatus}
                onChange={changeStatus}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-black px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                {Object.entries(statusMap).map(([statusType, statusTitle]) => (
                  <option key={statusType} value={statusType}>
                    {statusTitle}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.submit}>
              <button className={classes['change-button']} onClick={handleChangeStatus}>
                Змінити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
