import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@boilerplate/back-end/modules/auth/auth.module'

import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

import { ProductsRepository } from '@boilerplate/back-end/modules/products/repositories/products.repository'

import { ProductsController } from '@boilerplate/back-end/modules/products/controllers/products.controller'

import { ProductsService } from '@boilerplate/back-end/modules/products/services/products.service'

import { DashProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/dash-products.data-mapper'
import { ProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/products.data-mapper'

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), forwardRef(() => AuthModule)],
  controllers: [ProductsController],
  providers: [ProductsDataMapper, ProductsRepository, ProductsService, DashProductsDataMapper],
  exports: [ProductsDataMapper],
})
export class ProductsModule {}
