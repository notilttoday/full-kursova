import { IsString } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { type PatchTokenResult } from '@boilerplate/types/auth/interfaces/token'

export class PatchTokenResultDto implements PatchTokenResult {
  @IsString()
  token: string
}

export class PatchTokenResultHttpServerResponseDto extends HttpServerResponseDto<PatchTokenResultDto> {
  result?: PatchTokenResultDto
}
