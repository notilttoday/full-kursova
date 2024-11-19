import { IsOptional, IsString } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

import { GetOrdersListParams } from '@boilerplate/types/orders/interfaces/orders'

export const GetOrdersListAdminUrl = '/orders-list/admin'

export class GetOrdersParamsDto implements GetOrdersListParams {
  [x: string]: string | readonly string[]

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  status?: string
}

export class GetOrdersListAdminHttpServerRequestDto extends HttpServerRequestDto<typeof GetOrdersListAdminUrl> {
  readonly method = Method.Get

  readonly url = GetOrdersListAdminUrl
}

export class GetOrdersListAdminHttpClientRequestDto extends HttpClientRequestDto<typeof GetOrdersListAdminUrl> {
  readonly method = Method.Get

  readonly url = GetOrdersListAdminUrl
}
