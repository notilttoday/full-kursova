import { IsOptional, IsString } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

import { GetSearchProductsData } from '@boilerplate/types/products/interfaces/products'

export const GetProductsRequestUrl = '/'

export class GetSearchProductDataDto implements GetSearchProductsData {
  [x: string]: string | readonly string[]

  @HttpRequestFieldDecorator()
  @IsString()
  @IsOptional()
  title?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString({ each: true })
  game?: string[]
}

export class GetProductsHttpServerRequestDto extends HttpServerRequestDto<
  typeof GetProductsRequestUrl,
  never,
  GetSearchProductDataDto
> {
  readonly method = Method.Get

  readonly url = GetProductsRequestUrl
}

export class GetProductsHttpClientRequestDto extends HttpClientRequestDto<
  typeof GetProductsRequestUrl,
  never,
  GetSearchProductDataDto
> {
  readonly method = Method.Get

  readonly url = GetProductsRequestUrl
}
