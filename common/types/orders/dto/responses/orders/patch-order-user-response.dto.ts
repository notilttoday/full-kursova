import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { PatchOrderUserDataResult } from '@boilerplate/types/orders/interfaces/orders'

export class PatchOrderUserDataResultDto implements PatchOrderUserDataResult {
  @IsBoolean()
  isSuccess: boolean
}

export class PatchOrderUserDataHttpResponseDto extends HttpServerResponseDto<PatchOrderUserDataResultDto> {
  @IsOptional()
  @Type(() => PatchOrderUserDataResultDto)
  result?: PatchOrderUserDataResultDto
}
