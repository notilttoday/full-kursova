import { IsBoolean } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { type PostTokenResult } from '@boilerplate/types/auth/interfaces/token'

export class PostTokenResultDto implements PostTokenResult {
  @IsBoolean()
  isSuccess: boolean
}

export class PostTokenResultHttpServerResponseDto extends HttpServerResponseDto<PostTokenResultDto> {
  result?: PostTokenResultDto
}
