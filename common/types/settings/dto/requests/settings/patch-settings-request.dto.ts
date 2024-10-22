import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'

import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

import { type PatchSettingsData, SettingsType } from '@boilerplate/types/settings/interfaces/settings'

export const PatchSettingsRequestUrl = '/settings'

export class PatchSettingsDataDto implements PatchSettingsData {
  @IsString()
  [SettingsType.Mock]: 'mock'
}

export class PatchSettingsRequestHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchSettingsRequestUrl,
  PatchSettingsDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchSettingsRequestUrl

  @ValidateNested()
  @Type(() => PatchSettingsDataDto)
  readonly data: PatchSettingsDataDto
}

export class PatchSettingsRequestHttpClientRequestDto extends HttpClientRequestDto<
  typeof PatchSettingsRequestUrl,
  PatchSettingsDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchSettingsRequestUrl

  @ValidateNested()
  @Type(() => PatchSettingsDataDto)
  readonly data: PatchSettingsDataDto
}
