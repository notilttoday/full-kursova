import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

export const GetContactMessagesRequestUrl = '/contact-messages'

export class GetContactMessagesHttpServerRequestDto extends HttpServerRequestDto<typeof GetContactMessagesRequestUrl> {
  readonly method = Method.Get

  readonly url = GetContactMessagesRequestUrl
}

export class GetContactMessagesHttpClientRequestDto extends HttpClientRequestDto<typeof GetContactMessagesRequestUrl> {
  readonly method = Method.Get

  readonly url = GetContactMessagesRequestUrl
}
