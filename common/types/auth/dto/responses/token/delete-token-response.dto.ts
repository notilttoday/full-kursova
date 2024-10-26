import { IsBoolean } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { type DeleteTokenResult } from '@boilerplate/types/auth/interfaces/token'

export class DeleteTokenResultDto implements DeleteTokenResult {
  @IsBoolean()
  isSuccess: boolean
}

export class DeleteTokenResultHttpServerResponseDto extends HttpServerResponseDto<DeleteTokenResultDto> {
  result?: DeleteTokenResultDto
}
