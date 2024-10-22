import { IsEnum } from 'class-validator'

import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method, type Params } from '@boilerplate/core/interfaces/http'
import { Role } from '@boilerplate/core/interfaces/user'

export const GetProfileMyUrl = '/profile/me/:role'

export class GetProfileMyParamsDto implements Params<typeof GetProfileMyUrl> {
  @IsEnum(Role)
  role: Role
}

export class GetProfileMyHttpServerRequestDto extends HttpServerRequestDto<typeof GetProfileMyUrl> {
  readonly method = Method.Get

  readonly url = GetProfileMyUrl

  params: GetProfileMyParamsDto
}

export class GetProfileMyHttpClientRequestDto extends HttpClientRequestDto<typeof GetProfileMyUrl> {
  readonly method = Method.Get

  readonly url = GetProfileMyUrl

  params: GetProfileMyParamsDto
}
