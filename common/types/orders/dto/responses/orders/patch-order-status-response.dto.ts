import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { PatchOrderStatusResult } from '@boilerplate/types/orders/interfaces/orders'

export class PatchOrderStatusResultDto implements PatchOrderStatusResult {
  @IsBoolean()
  isSuccess: boolean
}

export class PatchOrderStatusHttpServerResponseDto extends HttpServerResponseDto<PatchOrderStatusResultDto> {
  @IsOptional()
  @Type(() => PatchOrderStatusResultDto)
  result?: PatchOrderStatusResultDto
}
