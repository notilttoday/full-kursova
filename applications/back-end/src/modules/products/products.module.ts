import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@boilerplate/back-end/modules/auth/auth.module'

import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

import { ProductsController } from '@boilerplate/back-end/modules/products/controllers/products.controller'

import { ProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/products.data-mapper'

import { DashProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/dash-products.data-mapper'

import { ProductsRepository } from '@boilerplate/back-end/modules/products/repositories/products.repository'

import { ProductsService } from '@boilerplate/back-end/modules/products/services/products.service'

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), forwardRef(() => AuthModule)],
  controllers: [ProductsController],
  providers: [ProductsDataMapper, ProductsRepository, ProductsService, DashProductsDataMapper],
  exports: [],
})
export class ProductsModule { }
