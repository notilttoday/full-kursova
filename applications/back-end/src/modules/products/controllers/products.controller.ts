import { BadRequestException, Body, Controller, Get, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors, Request, Delete, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger'

import { PostProductDataDto, PostProductUrl, GetProductsRequestUrl, GetSearchProductDataDto, GetProductRequestUrl, GetProductDataDto, GetFullProductsRequestUrl, GetFullProductDataDto, PatchProductHttpServerRequestDto, PatchProductParamsDto, DeleteProductUrl, DeleteProductHttpServerRequestDto } from '@boilerplate/types/products/dto/requests/products'
import { DeleteProductResultHttpServerResponseDto, GetFullProductDto, GetFullProductsListHttpResponseDto, GetProductHttpResponseDto, GetProductsListHttpResponseDto, PatchProductHttpServerResponseDto, PostProductHttpResponseDto } from '@boilerplate/types/products/dto/responses/products'

import { ProductsService } from '@boilerplate/back-end/modules/products/services/products.service'
import { JwtPassportAuthGuard } from 'src/modules/auth/guards/jwt-passport.guard'
import { Roles } from '@boilerplate/core/decorators/roles.decorator'
import { Role } from '@boilerplate/core/interfaces/user'
import { FileInterceptor } from '@nestjs/platform-express'
import { extname, resolve } from 'path'
import multer from 'multer'
import { v4 as uuid } from 'uuid'
import { JwtPassportLogoutAuthGuard } from 'src/modules/auth/guards/jwt-passport-logout-auth.guard'

@Controller()
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtPassportAuthGuard)
  @ApiBearerAuth()
  @Roles([Role.Admin])
  @Post(PostProductUrl)
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, resolve(process.cwd(), 'uploads', 'products'))
      },
      filename: function (req, file, cb) {
        cb(null, `${uuid()}${extname(file.originalname)}`)
      }
    })
  }))
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
  async postProduct(@Body() data: PostProductDataDto, @UploadedFile() file: Express.Multer.File): Promise<PostProductHttpResponseDto> {
    const { title, description, price, game } = data
    const { filename } = file
    return await this.productsService.postProduct({ title, description, price, game, file })
  }

  @Get(GetProductsRequestUrl)
  async getSearchProductList(@Query() queries: GetSearchProductDataDto): Promise<GetProductsListHttpResponseDto> {
    const { title, game } = queries

    console.log(`queries: ${title}`);

    return await this.productsService.getProducts({ title, game })
  }

  @Get(GetProductRequestUrl)
  async getProduct(@Param("productId") productId: string): Promise<GetProductHttpResponseDto> {
    return await this.productsService.getProduct({ productId })
  }

  @UseGuards(JwtPassportAuthGuard)
  @ApiBearerAuth()
  @Roles([Role.Admin])
  @Get(GetFullProductsRequestUrl)
  async getDashProductList(): Promise<GetFullProductsListHttpResponseDto> {
    return await this.productsService.getDashboardProducts()
  }

  @Patch('/edit-product/:productId')
  @ApiBearerAuth()
  @ApiParam({ name: 'productId', type: String, description: 'ID of the product to be updated' })
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: PatchProductParamsDto,
  ): Promise<any> {

    return await this.productsService.updateProduct(productId, updateProductDto);
  }

  @Delete(DeleteProductUrl)
  @UseGuards(JwtPassportLogoutAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'productId', type: String, description: 'ID of the product to delete' })
  async deleteProduct(
    @Param('productId') productId: string,
  ): Promise<DeleteProductResultHttpServerResponseDto> {

    return await this.productsService.deleteProduct(productId)
  }
}
