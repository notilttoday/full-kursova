'use client'

import { useState } from 'react'

import { useGetOrdersListQuery } from '@boilerplate/dashboard/store/queries/orders.query'

import { OrderItem } from '@boilerplate/dashboard/components/order-list/order-item'
import Pagination from '@boilerplate/dashboard/components/order-list/pagination'
import classes from '@boilerplate/dashboard/components/order-list/style.module.scss'

interface OrderListProps {}

export const OrderList: React.FC<OrderListProps> = () => {
  const { data = [] } = useGetOrdersListQuery()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  const handleToggleOrder = (orderId: string): void => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId))
  }

  const filteredOrders = data.filter(
    (order) =>
      order.items &&
      order.items.length > 0 &&
      order.items.every((item) => item.product !== null) &&
      order.firstName &&
      order.lastName &&
      order.email &&
      order.phone,
  )

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
  }

  return (
    <div className={classes['orders-list']}>
      <h3 className={classes['h3-order-list']}>Список замовлень</h3>
      {currentOrders.map((order, index) => (
        <OrderItem
          orderId={order.id || ''}
          status={order.status || ''}
          key={index}
          user={{
            firstName: order.firstName || null,
            lastName: order.lastName || null,
            email: order.email || null,
            phone: order.phone || null,
          }}
          items={order.items}
          isExpanded={expandedOrderId === order.id}
          onToggle={() => handleToggleOrder(order.id || '')}
        />
      ))}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}
