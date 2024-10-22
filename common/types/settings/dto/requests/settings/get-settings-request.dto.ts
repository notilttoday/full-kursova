import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

export const GetSettingsRequestUrl = '/settings'

export class GetSettingsRequestHttpServerRequestDto extends HttpServerRequestDto<typeof GetSettingsRequestUrl> {
  readonly method = Method.Get

  readonly url = GetSettingsRequestUrl
}

export class GetSettingsRequestHttpClientRequestDto extends HttpClientRequestDto<typeof GetSettingsRequestUrl> {
  readonly method = Method.Get

  readonly url = GetSettingsRequestUrl
}
