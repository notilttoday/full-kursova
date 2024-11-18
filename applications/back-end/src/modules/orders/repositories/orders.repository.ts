import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, FindManyOptions, FindOptionsWhere, IsNull, Repository } from 'typeorm'

import { FindOrdersAndCountOptions } from '@boilerplate/back-end/modules/orders/interfaces/repositories/orders'

import { OrderToProductEntity } from '@boilerplate/back-end/modules/orders/entities/order-to-product.entity'
import { OrderEntity } from '@boilerplate/back-end/modules/orders/entities/order.entity'

@Injectable()
export class OrdersRepository extends Repository<OrderEntity> {
  @InjectRepository(OrderToProductEntity)
  private readonly orderToProductRepository: Repository<OrderToProductEntity>

  constructor(readonly dataSource: DataSource) {
    super(OrderEntity, dataSource.createEntityManager())
  }

  async findOrdersAndCount({ page, pageSize }: FindOrdersAndCountOptions = {}): Promise<
    [products: OrderEntity[], total: number]
  > {
    const where: FindOptionsWhere<OrderEntity> = {}

    const options: FindManyOptions<OrderEntity> = {
      where,
      relations: {
        toProducts: {
          product: true,
        },
      },
    }

    if (typeof pageSize === 'number') {
      options.take = pageSize

      if (typeof page === 'number') {
        options.take = page * pageSize
      }
    }

    return await this.findAndCount(options)
  }

  async findOrderOneOrFail(id: string, userGid?: string | 'all'): Promise<OrderEntity> {
    let where: FindOptionsWhere<OrderEntity> | FindOptionsWhere<OrderEntity>[] = [
      {
        id,
        userGid: IsNull(),
      },
      ...(userGid ? [{ id, userGid }] : []),
    ]

    if (userGid === 'all') {
      where = { id }
    }

    const order = await this.findOne({
      where,
      relations: {
        toProducts: {
          product: true,
        },
      },
      order: {
        toProducts: {
          createdAt: 'DESC',
        },
      },
    })

    if (!order) {
      throw new NotFoundException('Order not found')
    }

    if (userGid && !order.userGid) {
      await this.update({ id }, { userGid })
    }

    return order
  }

  async setProduct(id: string, productId: string, quantity?: number): Promise<void> {
    if (quantity === 0) {
      await this.orderToProductRepository.delete({ orderId: id, productId })

      return
    }

    let relation = await this.orderToProductRepository.findOne({
      where: { orderId: id, productId },
    })

    if (!relation) {
      relation = await this.orderToProductRepository.save({ orderId: id, productId })
    }

    if (quantity) {
      await this.orderToProductRepository.update({ orderId: id, productId }, { quantity })
    }
  }
}
