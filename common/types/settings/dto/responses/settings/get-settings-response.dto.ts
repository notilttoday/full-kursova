import { Type } from 'class-transformer'
import { IsArray, IsOptional, IsString } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { GetSettingsResult, SettingsType } from '@boilerplate/types/settings/interfaces/settings'

export class GetSettingsResultDto implements GetSettingsResult {
  @IsString()
  [SettingsType.Mock]: 'mock'
}

export class GetSettingsHttpResponseDto extends HttpServerResponseDto<GetSettingsResultDto> {
  @IsOptional()
  @IsArray()
  @Type(() => GetSettingsResultDto)
  result?: GetSettingsResultDto
}
