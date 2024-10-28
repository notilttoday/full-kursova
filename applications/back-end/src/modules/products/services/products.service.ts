import { Injectable } from '@nestjs/common'

import { HttpListServerResponse, HttpServerResponse } from '@boilerplate/core/interfaces/http'

import { GetProductShort } from '@boilerplate/types/products/interfaces/products'

import { ProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/products.data-mapper'

import { ProductsRepository } from '@boilerplate/back-end/modules/products/repositories/products.repository'

import { PostProductData, PostProductResult } from '@boilerplate/types/products/interfaces/products'

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsDataMapper: ProductsDataMapper,

    private readonly productsRepository: ProductsRepository,
  ) { }

  async getProducts(): Promise<HttpListServerResponse<GetProductShort>> {
    const [data, total] = await this.productsRepository.findAndCount()

    return {
      result: data.map(product => this.productsDataMapper.toProductShort(product)),
      total,
    }
  }

  async postProduct(data: PostProductData): Promise<HttpServerResponse<PostProductResult>> {
    const { title, description, price } = data

    await this.productsRepository.save({
      title,
      description,
      price: parseInt(`${price * 100}`, 10),
    })

    const result: PostProductResult = {
      isSuccess: true,
    }

    return {
      result,
    }
  }
}
