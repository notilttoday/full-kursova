import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { type EncryptedAuthToken } from '@boilerplate/core/interfaces/auth'
import { Method } from '@boilerplate/core/interfaces/http'

export const DeleteTokenUrl = '/tokens'

export class DeleteTokenHttpServerRequestDto extends HttpServerRequestDto<
  typeof DeleteTokenUrl,
  undefined,
  undefined,
  EncryptedAuthToken
> {
  readonly method = Method.Delete

  readonly url = DeleteTokenUrl
}

export class DeleteTokenHttpClientRequestDto extends HttpClientRequestDto<typeof DeleteTokenUrl> {
  readonly method = Method.Delete

  readonly url = DeleteTokenUrl
}
