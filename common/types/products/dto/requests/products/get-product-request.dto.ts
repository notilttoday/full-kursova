import { IsString } from 'class-validator'

import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method, Params } from '@boilerplate/core/interfaces/http'

export const GetProductRequestUrl = '/product/:productId'

export class GetProductDataDto implements Params<typeof GetProductRequestUrl> {
  @IsString()
  productId: string
}

export class GetProductHttpServerRequestDto extends HttpServerRequestDto<typeof GetProductRequestUrl> {
  readonly method = Method.Get

  readonly url = GetProductRequestUrl

  params: GetProductDataDto
}

export class GetProductHttpClientRequestDto extends HttpClientRequestDto<typeof GetProductRequestUrl> {
  readonly method = Method.Get

  readonly url = GetProductRequestUrl

  params: GetProductDataDto
}
