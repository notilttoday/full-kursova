import { Injectable } from '@nestjs/common'
import { FindOptionsWhere } from 'typeorm'

import { HttpListServerResponse, HttpServerResponse } from '@boilerplate/core/interfaces/http'

import {
  GetOrder,
  GetOrderInfo,
  GetOrdersSearch,
  PatchOrderData,
  PatchOrderResult,
  PatchOrderStatusResult,
  PatchOrderUserData,
  PatchOrderUserDataResult,
  PostOrderResult,
  StatusType,
} from '@boilerplate/types/orders/interfaces/orders'

import { OrderEntity } from '@boilerplate/back-end/modules/orders/entities/order.entity'

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

  async getOrdersListAdmin(status?: string): Promise<HttpListServerResponse<GetOrderInfo>> {
    const where: FindOptionsWhere<OrderEntity> = {}
    if (status) {
      where.paymentStatus = StatusType[status]
    }

    const [orders, total] = await this.ordersRepository.findAndCount({
      where,
      relations: {
        toProducts: {
          product: true,
        },
      },
    })

    return {
      result: orders.map((order) => this.ordersDataMapper.toOrderInfo(order)),
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

  async patchOrderStatus(orderId: string, paymentStatus: string): Promise<HttpServerResponse<PatchOrderStatusResult>> {
    const where: FindOptionsWhere<OrderEntity> = {}

    where.id = orderId
    const order = await this.ordersRepository.findOne({ where })

    order.paymentStatus = StatusType[paymentStatus]

    await this.ordersRepository.save(order)

    const result: PatchOrderStatusResult = {
      isSuccess: true,
    }

    return { result }
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

  async patchOrderUserData(
    id: string,
    data: PatchOrderUserData,
    userGid?: string | 'all',
  ): Promise<HttpServerResponse<PatchOrderUserDataResult>> {
    const { firstName, lastName, email, phone, paymentType } = data

    const order = await this.ordersRepository.findOrderOneOrFail(id, userGid)

    order.firstName = firstName || ''
    order.lastName = lastName || ''
    order.email = email || ''
    order.phone = phone || ''

    order.paymentStatus = StatusType.Processing

    await this.ordersRepository.save(order)

    const result: PatchOrderUserDataResult = {
      isSuccess: true,
    }

    return {
      result,
    }
  }
}
