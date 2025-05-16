import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

export const GetUserOrdersListUrl = '/user-orders'

export class GetUserOrdersListHttpServerRequestDto extends HttpServerRequestDto<typeof GetUserOrdersListUrl> {
  readonly method = Method.Get

  readonly url = GetUserOrdersListUrl
}

export class GetUserOrdersListHttpClientRequestDto extends HttpClientRequestDto<typeof GetUserOrdersListUrl> {
  readonly method = Method.Get

  readonly url = GetUserOrdersListUrl
}
