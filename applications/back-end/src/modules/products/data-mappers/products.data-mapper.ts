import { Injectable } from '@nestjs/common'

import { GetProductShort } from '@boilerplate/types/products/interfaces/products'

import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

@Injectable()
export class ProductsDataMapper {
  toProductShort(entity: ProductEntity): GetProductShort {
    const { id, title, price, imagePath } = entity

    return {
      id,
      title,
      price: price / 100,
      imagePath,
    }
  }
}
