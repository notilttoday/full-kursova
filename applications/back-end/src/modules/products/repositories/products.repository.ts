import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

@Injectable()
export class ProductsRepository extends Repository<ProductEntity> {
  constructor(readonly dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager())
  }
}
