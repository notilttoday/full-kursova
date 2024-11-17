import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@boilerplate/back-end/modules/auth/auth.module'
import { ProductsModule } from '@boilerplate/back-end/modules/products/products.module'

import { OrderToProductEntity } from '@boilerplate/back-end/modules/orders/entities/order-to-product.entity'
import { OrderEntity } from '@boilerplate/back-end/modules/orders/entities/order.entity'

import { OrdersRepository } from '@boilerplate/back-end/modules/orders/repositories/orders.repository'

import { OrdersController } from '@boilerplate/back-end/modules/orders/controllers/orders.controller'

import { OrdersService } from '@boilerplate/back-end/modules/orders/services/orders.service'

import { OrdersDataMapper } from '@boilerplate/back-end/modules/orders/data-mappers/orders.data-mapper'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderToProductEntity, //
      OrderEntity, //
    ]),
    ProductsModule, //
    forwardRef(() => AuthModule), //
  ],
  controllers: [
    OrdersController, //
  ],
  providers: [
    OrdersRepository, //
    OrdersService, //
    OrdersDataMapper, //
  ],
  exports: [
    OrdersRepository, //
    OrdersService, //
    OrdersDataMapper, //
  ],
})
export class OrdersModule {}
