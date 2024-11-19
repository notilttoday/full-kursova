import { IsOptional, IsString } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

import { GetProductsByOrder } from '@boilerplate/types/products/interfaces/products'

export const GetProductsByOrderRequestUrl = '/figures-by-order'

export class GetProductsByOrderDataDto implements GetProductsByOrder {
  [x: string]: string | readonly string[]

  @HttpRequestFieldDecorator()
  @IsString()
  @IsOptional()
  orderId?: string
}

export class GetProductsByOrderHttpServerRequestDto extends HttpServerRequestDto<
  typeof GetProductsByOrderRequestUrl,
  never,
  GetProductsByOrderDataDto
> {
  readonly method = Method.Get

  readonly url = GetProductsByOrderRequestUrl
}

export class GetProductsByOrderHttpClientRequestDto extends HttpClientRequestDto<
  typeof GetProductsByOrderRequestUrl,
  never,
  GetProductsByOrderDataDto
> {
  readonly method = Method.Get

  readonly url = GetProductsByOrderRequestUrl
}
