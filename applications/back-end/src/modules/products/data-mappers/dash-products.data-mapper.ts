import { Injectable } from '@nestjs/common'

import { GameType } from '@boilerplate/types/products/interfaces/products'

import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'
import { GetFullProductDto } from '@boilerplate/types/products/dto/responses/products'

@Injectable()
export class DashProductsDataMapper {
  toProductDash(entity: ProductEntity): GetFullProductDto {
    const { id, title, price, description, game, imagePath } = entity

    return {
      id,
      title,
      price: price / 100,
      description,
      game,
      imagePath,
    }
  }
}
