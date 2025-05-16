import { type HttpSearch } from '@boilerplate/core/interfaces/http'

import { type GetProductShort } from '@boilerplate/types/products/interfaces/products'

export interface OrderItem {
  product: GetProductShort
  quantity: number
}

export interface GetOrder {
  items: OrderItem[]
}

export interface GetOrderInfo extends GetOrder {
  id?: string
  userId?: string
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  status?: string
  updatedAt?: string
}

export interface GetOrdersSearch extends HttpSearch {
  page?: string
  pageSize?: string
}

export interface GetUserOrders {
  orders?: GetOrderInfo[]
}

export interface PatchOrderData {
  productId: string
  quantity?: number
}

export interface PatchOrderResult {
  isSuccess: boolean
}

export interface PatchOrderUserData {
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  paymentType?: string
}

export interface PatchOrderUserDataResult {
  isSuccess: boolean
}

export interface PostOrderResult {
  orderId: string
  isSuccess: boolean
}

export enum StatusType {
  Pending = 'pending',
  Processing = 'processing',
  Paid = 'paid',
  Completed = 'completed',
  Failed = 'failed',
  Expired = 'expired',
  Refunded = 'refunded',
  OnHold = 'on_hold',
}

export interface GetOrdersListParams {
  status?: string
}

export interface PatchOrderStatus {
  paymentStatus: string
}

export interface PatchOrderStatusResult {
  isSuccess: boolean
}

export interface PostOrderData {
  force: boolean
}
