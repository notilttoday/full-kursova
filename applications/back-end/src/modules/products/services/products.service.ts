import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { compact, uniq } from 'lodash'
import { FindOptionsWhere, ILike, In } from 'typeorm'

import { HttpListServerResponse, HttpServerResponse } from '@boilerplate/core/interfaces/http'

import {
  GetFullProductDto,
  PatchProductHttpServerResponseDto,
} from '@boilerplate/types/products/dto/responses/products'
import {
  DeleteProductResult,
  GameType,
  GetProduct,
  GetProductShort,
  GetSearchProductsData,
  GetSingleProductData,
  PatchProductData,
  PostProductData,
  PostProductResult,
} from '@boilerplate/types/products/interfaces/products'

import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

import { ProductsRepository } from '@boilerplate/back-end/modules/products/repositories/products.repository'

import { DashProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/dash-products.data-mapper'
import { ProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/products.data-mapper'

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name)

  constructor(
    private readonly productsDataMapper: ProductsDataMapper,

    private readonly productsRepository: ProductsRepository,

    private readonly dashProductsDataMapper: DashProductsDataMapper,
  ) {}

  async getProducts(data: GetSearchProductsData): Promise<HttpListServerResponse<GetProductShort>> {
    const { title } = data
    let { game } = data

    game = Array.isArray(game) ? game : [game]
    game = compact(uniq(game))

    const where: FindOptionsWhere<ProductEntity> = {}
    if (title) {
      where.title = ILike(`%${title.split('').join('%')}%`)
    }

    if (game.length > 0) {
      where.game = In([...game])
    }

    const [products, total] = await this.productsRepository.findAndCount({ where })

    return {
      result: products.map((product) => this.productsDataMapper.toProductShort(product)),
      total,
    }
  }

  async getProduct(data: GetSingleProductData): Promise<HttpServerResponse<GetProduct>> {
    const { productId } = data

    const product = await this.productsRepository.findOne({ where: { id: productId } })

    return {
      result: product,
    }
  }

  async postProduct(data: PostProductData): Promise<HttpServerResponse<PostProductResult>> {
    const { title, description, price, game, file } = data

    if (!Object.values(GameType).includes(game)) {
      throw new Error(`Invalid game value: ${game}`)
    }

    await this.productsRepository.save({
      title,
      description,
      price: parseInt(`${price * 100}`, 10),
      game,
      imagePath: `/uploads/products/${file.filename}`,
    })

    const result: PostProductResult = {
      isSuccess: true,
    }

    return {
      result,
    }
  }

  async getDashboardProducts(): Promise<HttpListServerResponse<GetFullProductDto>> {
    const [products, total] = await this.productsRepository.findAndCount({
      order: {
        createdAt: 'desc',
      },
    })

    return {
      result: products.map((product) => this.dashProductsDataMapper.toProductDash(product)),
      total,
    }
  }

  async updateProduct(productId: string, data: PatchProductData): Promise<PatchProductHttpServerResponseDto> {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    })

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    if (data.title !== undefined) {
      product.title = data.title
    }

    if (data.description !== undefined) {
      product.description = data.description
    }

    if (data.price !== undefined) {
      product.price = Math.round(parseFloat(data.price.toString()))
    }

    if (data.game !== undefined) {
      if (!Object.values(GameType).includes(<GameType>data.game)) {
        throw new Error(`Invalid game value: ${data.game}`)
      }

      product.game = <GameType>data.game
    }

    if (data.file) {
      product.imagePath = `/uploads/products/${data.file.filename}`
    }

    try {
      await this.productsRepository.save(product)
    } catch (error) {
      this.logger.error({ action: 'updateProduct', data: { productId, ...data }, error })

      throw new InternalServerErrorException('Failed to update product')
    }

    return {
      result: this.dashProductsDataMapper.toProductDash(product),
    }
  }

  async deleteProduct(productId: string): Promise<HttpServerResponse<DeleteProductResult>> {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    })

    if (!product) {
      throw new Error('Product not found')
    }

    await this.productsRepository.softDelete(productId)

    const result: DeleteProductResult = {
      isSuccess: true,
    }

    return {
      result,
    }
  }
}
