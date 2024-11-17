import { Injectable } from '@nestjs/common'

import { HttpListServerResponse, HttpServerResponse } from '@boilerplate/core/interfaces/http'

import {
  GetOrder,
  GetOrdersSearch,
  PatchOrderData,
  PatchOrderResult,
  PostOrderResult,
} from '@boilerplate/types/orders/interfaces/orders'

import { OrdersRepository } from '@boilerplate/back-end/modules/orders/repositories/orders.repository'

import { OrdersDataMapper } from '@boilerplate/back-end/modules/orders/data-mappers/orders.data-mapper'

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,

    private readonly ordersDataMapper: OrdersDataMapper,
  ) {}

  async getOrdersList(queries: GetOrdersSearch): Promise<HttpListServerResponse<GetOrder>> {
    const page = parseInt(`${queries.page ?? 0}`, 10)
    const pageSize = parseInt(`${queries.pageSize ?? 10}`, 10)

    const [orders, total] = await this.ordersRepository.findOrdersAndCount({
      page,
      pageSize,
    })

    return {
      result: orders.map((order) => this.ordersDataMapper.toOrder(order)),
      total,
    }
  }

  async postOrder(userGid?: string): Promise<HttpServerResponse<PostOrderResult>> {
    const order = await this.ordersRepository.save({ userGid })

    const result: PostOrderResult = {
      orderId: order.id,
      isSuccess: true,
    }

    return { result }
  }

  async getOrder(id?: string, userGid?: string | 'all'): Promise<HttpServerResponse<GetOrder>> {
    const order = await this.ordersRepository.findOrderOneOrFail(id, userGid)

    return {
      result: this.ordersDataMapper.toOrder(order),
    }
  }

  async patchOrder(
    id: string,
    data: PatchOrderData,
    userGid?: string | 'all',
  ): Promise<HttpServerResponse<PatchOrderResult>> {
    const { productId, quantity } = data

    await this.ordersRepository.findOrderOneOrFail(id, userGid)

    await this.ordersRepository.setProduct(id, productId, quantity)

    const result: PatchOrderResult = {
      isSuccess: true,
    }

    return { result }
  }
}
