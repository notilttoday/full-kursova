import { Injectable } from '@nestjs/common'

import { GetFullProductDto } from '@boilerplate/types/products/dto/responses/products'
import { GameType } from '@boilerplate/types/products/interfaces/products'

import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

@Injectable()
export class DashProductsDataMapper {
  private readonly gameMap: Record<GameType, string> = {
    [GameType.Dota]: 'Dota 2',
    [GameType.TheWitcher]: 'The Witcher',
    [GameType.WorldOfWarcraft]: 'World of warcraft',
    [GameType.Diablo]: 'Diablo',
    [GameType.AssassinsCreed]: 'Assassins creed',
  }

  toProductDash(entity: ProductEntity): GetFullProductDto {
    const { id, title, price, description, game, imagePath } = entity

    return {
      id,
      title,
      price: price / 100,
      description,
      game: this.gameMap[game],
      imagePath,
    }
  }
}
