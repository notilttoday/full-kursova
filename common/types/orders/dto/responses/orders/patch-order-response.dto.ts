import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { PatchOrderResult } from '@boilerplate/types/orders/interfaces/orders'

export class PatchOrderResultDto implements PatchOrderResult {
  @IsBoolean()
  isSuccess: boolean
}

export class PatchOrderResultHttpResponseDto extends HttpServerResponseDto<PatchOrderResultDto> {
  @IsOptional()
  @Type(() => PatchOrderResultDto)
  result?: PatchOrderResultDto
}
