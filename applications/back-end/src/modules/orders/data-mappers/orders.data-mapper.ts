import { Injectable } from '@nestjs/common'

import { GetOrder, OrderItem } from '@boilerplate/types/orders/interfaces/orders'

import { OrderToProductEntity } from '@boilerplate/back-end/modules/orders/entities/order-to-product.entity'
import { OrderEntity } from '@boilerplate/back-end/modules/orders/entities/order.entity'

import { ProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/products.data-mapper'

@Injectable()
export class OrdersDataMapper {
  constructor(private readonly productsDataMapper: ProductsDataMapper) {}

  toOrderItem(entity: OrderToProductEntity): OrderItem {
    const { product, quantity } = entity

    return {
      product: this.productsDataMapper.toProductShort(product),
      quantity,
    }
  }

  toOrder(entity: OrderEntity): GetOrder {
    const { toProducts } = entity

    return {
      items: toProducts.map((toProduct) => this.toOrderItem(toProduct)),
    }
  }
}
