import { IsUUID } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method, Params } from '@boilerplate/core/interfaces/http'

export const GetOrderUnauthorizedUrl = '/orders/:orderId'

export const GetOrderAuthorizedUrl = '/orders/user/:orderId'

export const GetOrderAdminUrl = '/orders/admin/:orderId'

export class GetOrderParamsDto
  implements Params<typeof GetOrderUnauthorizedUrl | typeof GetOrderAuthorizedUrl | typeof GetOrderAdminUrl>
{
  readonly [x: string]: string | number

  @HttpRequestFieldDecorator()
  @IsUUID(4)
  orderId: string
}

export class GetOrderUnauthorizedHttpServerRequestDto extends HttpServerRequestDto<typeof GetOrderUnauthorizedUrl> {
  readonly method = Method.Get

  readonly url = GetOrderUnauthorizedUrl
}

export class GetOrderUnauthorizedHttpClientRequestDto extends HttpClientRequestDto<typeof GetOrderUnauthorizedUrl> {
  readonly method = Method.Get

  readonly url = GetOrderUnauthorizedUrl
}

export class GetOrderAuthorizedHttpServerRequestDto extends HttpServerRequestDto<typeof GetOrderAuthorizedUrl> {
  readonly method = Method.Get

  readonly url = GetOrderAuthorizedUrl
}

export class GetOrderAuthorizedHttpClientRequestDto extends HttpClientRequestDto<typeof GetOrderAuthorizedUrl> {
  readonly method = Method.Get

  readonly url = GetOrderAuthorizedUrl
}

export class GetOrderAdminHttpServerRequestDto extends HttpServerRequestDto<typeof GetOrderAdminUrl> {
  readonly method = Method.Get

  readonly url = GetOrderAdminUrl
}

export class GetOrderAdminHttpClientRequestDto extends HttpClientRequestDto<typeof GetOrderAdminUrl> {
  readonly method = Method.Get

  readonly url = GetOrderAdminUrl
}
