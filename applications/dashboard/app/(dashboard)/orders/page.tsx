/* eslint-disable import/no-default-export */

import { type Metadata } from 'next'

import { WithProfile } from '@boilerplate/dashboard/store/with-profile'

import { OrderList } from '@boilerplate/dashboard/components/order-list'

interface OrderListPageProps {}

export const metadata: Metadata = {
  title: 'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Dashboard for TailAdmin Dashboard Template',
}

export const OrderListPage: React.FC<OrderListPageProps> = () => (
  <WithProfile>
    <OrderList />
  </WithProfile>
)

export default OrderListPage
