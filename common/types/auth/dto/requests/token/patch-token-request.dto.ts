import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { type EncryptedAuthToken } from '@boilerplate/core/interfaces/auth'
import { Method } from '@boilerplate/core/interfaces/http'

export const PatchTokenUrl = '/tokens'

export class PatchTokenHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchTokenUrl,
  undefined,
  undefined,
  EncryptedAuthToken
> {
  readonly method = Method.Patch

  readonly url = PatchTokenUrl
}

export class PatchTokenHttpClientRequestDto extends HttpClientRequestDto<typeof PatchTokenUrl> {
  readonly method = Method.Patch

  readonly url = PatchTokenUrl
}
