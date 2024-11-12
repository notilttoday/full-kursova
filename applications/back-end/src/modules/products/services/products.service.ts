import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { compact, uniq } from 'lodash'

import { HttpListServerResponse, HttpServerResponse } from '@boilerplate/core/interfaces/http'

import { DeleteProductResult, GameType, GetProduct, GetProductShort, GetSearchProductsData, GetSingleProductData } from '@boilerplate/types/products/interfaces/products'

import { ProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/products.data-mapper'

import { DashProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/dash-products.data-mapper'

import { ProductsRepository } from '@boilerplate/back-end/modules/products/repositories/products.repository'

import { PostProductData, PostProductResult } from '@boilerplate/types/products/interfaces/products'
import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'
import { FindOptionsWhere, ILike, In } from 'typeorm'
import { DeleteProductResultHttpServerResponseDto, GetFullProductDto, PatchProductHttpServerResponseDto } from '@boilerplate/types/products/dto/responses/products'
import { GetFullProductDataDto, PatchProductParamsDto } from '@boilerplate/types/products/dto/requests/products'

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsDataMapper: ProductsDataMapper,

    private readonly productsRepository: ProductsRepository,

    private readonly dashProductsDataMapper: DashProductsDataMapper,
  ) { }

  async getProducts(params: GetSearchProductsData): Promise<HttpListServerResponse<GetProductShort>> {
    const { title } = params
    let { game } = params

    console.log(title);

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

  async getProduct(params: GetSingleProductData): Promise<HttpServerResponse<GetProduct>> {
    const { productId } = params

    const product = await this.productsRepository.findOne({ where: { id: productId } })

    return {
      result: product
    }
  }

  async postProduct(data: PostProductData): Promise<HttpServerResponse<PostProductResult>> {
    const { title, description, price, game, file } = data

    if (!Object.values(GameType).includes(game as GameType)) {
      throw new Error(`Invalid game value: ${game}`)
    }

    await this.productsRepository.save({
      title,
      description,
      price: parseInt(`${price * 100}`, 10),
      game: game as GameType,
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
        createdAt: 'desc'
      }
    });

    return {
      result: products.map((product) => this.dashProductsDataMapper.toProductDash(product)),
      total,
    };
  }

  async updateProduct(
    productId: string,
    updateProductDto: PatchProductParamsDto
  ): Promise<PatchProductHttpServerResponseDto> {

    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (updateProductDto.title !== undefined) {
      product.title = updateProductDto.title;
    }
    if (updateProductDto.description !== undefined) {
      product.description = updateProductDto.description;
    }
    if (updateProductDto.price !== undefined) {
      product.price = Math.round(parseFloat(updateProductDto.price.toString()) * 100);
    }
    if (updateProductDto.game !== undefined) {
      if (!Object.values(GameType).includes(updateProductDto.game as GameType)) {
        throw new Error(`Invalid game value: ${updateProductDto.game}`);
      }
      product.game = updateProductDto.game as GameType;
    }

    try {
      await this.productsRepository.save(product);
    } catch (error) {
      console.error('Error saving product:', error);
      throw new InternalServerErrorException('Failed to update product');
    }

    return {
      result: this.dashProductsDataMapper.toProductDash(product),
    };
  }

  async deleteProduct(productId: string): Promise<HttpServerResponse<DeleteProductResult>> {
    const product = await this.productsRepository.findOne({
      where: { id: productId }
    });

    if (!product) {
      throw new Error('Product not found');
    }

    await this.productsRepository.delete(productId);

    const result: DeleteProductResult = {
      isSuccess: true,
    }

    return {
      result,
    }
  }

}