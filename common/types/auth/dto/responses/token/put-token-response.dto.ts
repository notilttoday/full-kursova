import { IsString } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { type PutTokenResult } from '@boilerplate/types/auth/interfaces/token'

export class PutTokenResultDto implements PutTokenResult {
  @IsString()
  token: string
}

export class PutTokenResultHttpServerResponseDto extends HttpServerResponseDto<PutTokenResultDto> {
  result?: PutTokenResultDto
}
