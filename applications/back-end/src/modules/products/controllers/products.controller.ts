import { extname, resolve } from 'path'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import multer from 'multer'
import { JwtPassportAuthGuard } from 'src/modules/auth/guards/jwt-passport.guard'
import { v4 as uuid } from 'uuid'

import { Roles } from '@boilerplate/core/decorators/roles.decorator'
import { Role } from '@boilerplate/core/interfaces/user'

import {
  DeleteProductUrl,
  GetFullProductsRequestUrl,
  GetProductRequestUrl,
  GetProductsRequestUrl,
  GetSearchProductDataDto,
  PatchProductParamsDto,
  PostProductDataDto,
  PostProductUrl,
} from '@boilerplate/types/products/dto/requests/products'
import {
  DeleteProductResultHttpServerResponseDto,
  GetFullProductsListHttpResponseDto,
  GetProductHttpResponseDto,
  GetProductsListHttpResponseDto,
  PatchProductHttpServerResponseDto,
  PostProductHttpResponseDto,
} from '@boilerplate/types/products/dto/responses/products'

import { ProductsService } from '@boilerplate/back-end/modules/products/services/products.service'

@Controller()
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtPassportAuthGuard)
  @ApiBearerAuth()
  @Roles([Role.Admin])
  @Post(PostProductUrl)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, resolve(process.cwd(), 'uploads', 'products'))
        },
        filename: function (req, file, cb) {
          cb(null, `${uuid()}${extname(file.originalname)}`)
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        game: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async postProduct(
    @Body() data: PostProductDataDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PostProductHttpResponseDto> {
    const { title, description, price, game } = data

    return await this.productsService.postProduct({ title, description, price, game, file })
  }

  @Get(GetProductsRequestUrl)
  async getSearchProductList(@Query() queries: GetSearchProductDataDto): Promise<GetProductsListHttpResponseDto> {
    const { title, game } = queries

    return await this.productsService.getProducts({ title, game })
  }

  @Get(GetProductRequestUrl)
  async getProduct(@Param('productId') productId: string): Promise<GetProductHttpResponseDto> {
    return await this.productsService.getProduct({ productId })
  }

  @Get(GetFullProductsRequestUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.Admin])
  async getDashProductList(): Promise<GetFullProductsListHttpResponseDto> {
    return await this.productsService.getDashboardProducts()
  }

  @Patch('/edit-product/:productId')
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.Admin])
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: PatchProductParamsDto,
  ): Promise<PatchProductHttpServerResponseDto> {
    return await this.productsService.updateProduct(productId, updateProductDto)
  }

  @Delete(DeleteProductUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.Admin])
  async deleteProduct(@Param('productId') productId: string): Promise<DeleteProductResultHttpServerResponseDto> {
    return await this.productsService.deleteProduct(productId)
  }
}
