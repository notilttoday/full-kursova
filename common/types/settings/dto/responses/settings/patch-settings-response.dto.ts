import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { PatchSettingsResult } from '@boilerplate/types/settings/interfaces/settings'

export class PatchSettingsResultDto implements PatchSettingsResult {
  @IsBoolean()
  isSuccess: boolean
}

export class PatchSettingsHttpResponseDto extends HttpServerResponseDto<PatchSettingsResultDto> {
  @IsOptional()
  @Type(() => PatchSettingsResultDto)
  result?: PatchSettingsResultDto
}
