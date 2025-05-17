import Image from 'next/image'

import errorImage from '@boilerplate/dashboard/assets/images/404-error.png'
import { QRCodeSVG } from 'qrcode.react'

import { StatusType } from '@boilerplate/types/orders/interfaces/orders'

import classes from '@boilerplate/front-end/components/cabinet/style.module.scss'

interface OrdersListProps {
  orderId: string
  status: string
  items: {
    product: {
      id: string
      title: string
      price: number
      imagePath?: string
    }
    quantity: number
  }[]
  updatedAt: string
}

const OrdersList: React.FC<OrdersListProps> = ({ orderId, updatedAt, items, status }) => {
  const statusMap: Record<StatusType, string> = {
    [StatusType.Pending]: 'Очікування',
    [StatusType.Processing]: 'Обробка',
    [StatusType.Completed]: 'Готово до видачі',
    [StatusType.OnHold]: 'На утриманні',
    [StatusType.Expired]: 'Просрочено',
    // [StatusType.Paid]: 'Сплачено',
    [StatusType.Refunded]: 'Повернено',
    [StatusType.Failed]: 'Скасовано',
  }

  const calculateTotalPrice = (orderItems: typeof items): number =>
    orderItems.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)

  const totalPrice = calculateTotalPrice(items)

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate)

    return `${date.toLocaleDateString('uk-UA')} ${date.toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit',
    })}`
  }

  return (
    <div className={classes['order-wrapper']}>
      <div className={`${classes['order-col']} ${classes['ai-c']}`}>
        <p>
          <b className={classes.b}>Код замовлення</b>
        </p>
        <QRCodeSVG className={classes.qrCodeContainer} value={orderId} />
        <p>{formatDate(updatedAt)}</p>
      </div>

      <div className={classes['order-items']}>
        {items.map((item, index) => (
          <div key={index} className={classes['order-item']}>
            <div className={classes['order-image']}>
              <Image
                src={item.product?.imagePath ? `/.${item.product.imagePath}` : errorImage}
                width={75}
                height={100}
                alt={item.product?.title || 'Товар'}
              />
            </div>
            <div className={classes['order-details']}>
              <h4>{item.product?.title}</h4>
              <p>Ціна: {item.product?.price}₴</p>
              <p>Кількість: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={`${classes['order-col']} ${classes['ai-e']}`}>
        <div className={`${classes['order-status']} ${classes[status]}`}>
          <p>{statusMap[status as StatusType]}</p>
        </div>

        {status === StatusType.Completed && (
          <div className={classes.pickupNote}>
            Заберіть за адресою: <b>м. Київ, вул. Прикладна, 12</b>
          </div>
        )}
        <div className={classes.price}>{totalPrice}₴</div>
      </div>
    </div>
  )
}

// eslint-disable-next-line import/no-default-export
export default OrdersList
