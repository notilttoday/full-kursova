import { type HttpSearch } from '@boilerplate/core/interfaces/http'

import { type GetProductShort } from '@boilerplate/types/products/interfaces/products'

export interface OrderItem {
  product: GetProductShort
  quantity: number
}

export interface GetOrder {
  items: OrderItem[]
}

export interface GetOrdersSearch extends HttpSearch {
  page?: string
  pageSize?: string
}

export interface PatchOrderData {
  productId: string
  quantity?: number
}

export interface PatchOrderResult {
  isSuccess: boolean
}

export interface PostOrderResult {
  orderId: string
  isSuccess: boolean
}
