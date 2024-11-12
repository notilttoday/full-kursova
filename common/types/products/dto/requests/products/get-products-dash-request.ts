import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'
import { GameType, GetProduct } from '@boilerplate/types/products/interfaces/products'
import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'

export const GetFullProductsRequestUrl = '/dash-products'

export class GetFullProductDataDto {
  @HttpRequestFieldDecorator()
  @IsString()
  @IsOptional()
  id?: string

  @HttpRequestFieldDecorator()
  @IsString()
  @IsOptional()
  description?: string

  @HttpRequestFieldDecorator()
  @IsNumber()
  @IsOptional()
  price?: number

  @HttpRequestFieldDecorator()
  @IsString()
  @IsOptional()
  title?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  game?: GameType

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  imagePath?: string
}

export class GetFullProductsListHttpServerRequestDto extends HttpServerRequestDto<typeof GetFullProductsRequestUrl> {
  readonly method = Method.Get

  readonly url = GetFullProductsRequestUrl
}

export class GetFullProductsListHttpClientRequestDto extends HttpClientRequestDto<typeof GetFullProductsRequestUrl> {
  readonly method = Method.Get

  readonly url = GetFullProductsRequestUrl
}