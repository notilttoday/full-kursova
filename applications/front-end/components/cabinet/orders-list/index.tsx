import Image from 'next/image'

import errorImage from '@boilerplate/dashboard/assets/images/404-error.png'

import classes from '@boilerplate/front-end/components/cabinet/style.module.scss'

interface OrdersListProps {
  orderId: string
  // status: string
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

const OrdersList: React.FC<OrdersListProps> = ({ orderId, updatedAt, items }) => {
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
      <div className={classes['order-header']}>
        <p>
          <strong>Код замовлення:</strong> {orderId}
        </p>
        <p>
          <strong>Дата:</strong> {formatDate(updatedAt)}
        </p>
        <p>
          <strong>Загальна ціна:</strong> {totalPrice}₴
        </p>
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
    </div>
  )
}

// eslint-disable-next-line import/no-default-export
export default OrdersList
