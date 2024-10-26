import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

import { PutTokenData } from '@boilerplate/types/auth/interfaces/token'

export const PutTokenUrl = '/tokens'

export class PutTokenDataDto implements PutTokenData {
  @HttpRequestFieldDecorator()
  @IsString()
  readonly email: string

  @HttpRequestFieldDecorator()
  @IsString()
  readonly password: string
}

export class PutTokenHttpServerRequestDto extends HttpServerRequestDto<typeof PutTokenUrl, PutTokenDataDto> {
  readonly method = Method.Put

  readonly url = PutTokenUrl

  @ValidateNested()
  @Type(() => PutTokenDataDto)
  readonly data: PutTokenDataDto
}

export class PutTokenHttpClientRequestDto extends HttpClientRequestDto<typeof PutTokenUrl, PutTokenDataDto> {
  readonly method = Method.Put

  readonly url = PutTokenUrl

  @ValidateNested()
  @Type(() => PutTokenDataDto)
  readonly data: PutTokenDataDto
}
