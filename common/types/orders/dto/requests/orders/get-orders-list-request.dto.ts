import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

import { GetOrdersSearch } from '@boilerplate/types/orders/interfaces/orders'

export const GetOrdersListUrl = '/orders'

export class GetOrdersSearchDto implements GetOrdersSearch {
  [x: string]: string | readonly string[]

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  page?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  pageSize?: string
}

export class GetOrdersHttpServerRequestDto extends HttpServerRequestDto<
  typeof GetOrdersListUrl,
  never,
  GetOrdersSearchDto
> {
  readonly method = Method.Get

  readonly url = GetOrdersListUrl

  @ValidateNested()
  @Type(() => GetOrdersSearchDto)
  search?: GetOrdersSearchDto
}

export class GetOrdersHttpClientRequestDto extends HttpClientRequestDto<
  typeof GetOrdersListUrl,
  never,
  GetOrdersSearchDto
> {
  readonly method = Method.Get

  readonly url = GetOrdersListUrl

  @ValidateNested()
  @Type(() => GetOrdersSearchDto)
  search?: GetOrdersSearchDto
}
