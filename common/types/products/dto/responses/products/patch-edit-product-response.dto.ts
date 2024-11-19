import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { PatchProductResult } from '@boilerplate/types/products/interfaces/products'

export class PatchProductResultDto implements PatchProductResult {
  @IsBoolean()
  isSuccess: boolean
}

export class PatchProductHttpServerResponseDto extends HttpServerResponseDto<PatchProductResultDto> {
  @IsOptional()
  @Type(() => PatchProductResultDto)
  result?: PatchProductResultDto
}
