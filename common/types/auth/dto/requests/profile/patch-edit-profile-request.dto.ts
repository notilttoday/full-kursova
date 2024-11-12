import { IsEnum, IsOptional, IsString } from 'class-validator'

import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method, type Params } from '@boilerplate/core/interfaces/http'
import { GameType } from '@boilerplate/types/products/interfaces/products'

export const PatchProfileMyUrl = '/edit-profile'

export class PatchProfileMyParamsDto implements Params<typeof PatchProfileMyUrl> {
  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsString()
  statusText?: string

  @IsOptional()
  @IsString({ each: true })
  favGames?: GameType[]
}

export class PatchProfileMyHttpServerRequestDto extends HttpServerRequestDto<typeof PatchProfileMyUrl> {
  readonly method = Method.Patch

  readonly url = PatchProfileMyUrl

  params: PatchProfileMyParamsDto
}

export class PatchProfileMyHttpClientRequestDto extends HttpClientRequestDto<typeof PatchProfileMyUrl> {
  readonly method = Method.Patch

  readonly url = PatchProfileMyUrl

  params: PatchProfileMyParamsDto
}
