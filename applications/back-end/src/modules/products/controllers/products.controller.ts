import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { PostProductDataDto, PostProductUrl, GetProductsRequestUrl } from '@boilerplate/types/products/dto/requests/products'
import { GetProductsHttpResponseDto, PostProductHttpResponseDto } from '@boilerplate/types/products/dto/responses/products'

import { ProductsService } from '@boilerplate/back-end/modules/products/services/products.service'
import { JwtPassportAuthGuard } from 'src/modules/auth/guards/jwt-passport.guard'
import { Roles } from '@boilerplate/core/decorators/roles.decorator'
import { Role } from '@boilerplate/core/interfaces/user'

@Controller()
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtPassportAuthGuard)
  @ApiBearerAuth()
  @Roles([Role.Admin])
  @Post(PostProductUrl)
  async postProduct(@Body() data: PostProductDataDto): Promise<PostProductHttpResponseDto> {
    const { title, description, price } = data

    return await this.productsService.postProduct({ title, description, price })
  }

  @Get(GetProductsRequestUrl)
  async getProducts(): Promise<GetProductsHttpResponseDto> {
    return await this.productsService.getProducts()
  }
}
