import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

export const GetHealthCheckUrl = '/health-check'

export class GetHealthCheckHttpServerRequestDto extends HttpServerRequestDto<typeof GetHealthCheckUrl> {
  readonly method = Method.Get

  readonly url = GetHealthCheckUrl
}

export class GetHealthCheckHttpClientRequestDto extends HttpClientRequestDto<typeof GetHealthCheckUrl> {
  readonly method = Method.Put

  readonly url = GetHealthCheckUrl
}
