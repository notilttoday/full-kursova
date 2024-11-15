import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { HttpRequestFieldCast, Method } from '@boilerplate/core/interfaces/http'

import { PatchMyProfile } from '@boilerplate/types/auth/interfaces/profile'
import { GameType } from '@boilerplate/types/products/interfaces/products'

export const PatchProfileMyUrl = '/edit-profile'

export class PatchProfileMyParamsDto implements Omit<PatchMyProfile, 'file'> {
  @HttpRequestFieldDecorator({ cast: HttpRequestFieldCast.String })
  @IsString()
  firstName: string

  @HttpRequestFieldDecorator({ cast: HttpRequestFieldCast.String })
  @IsString()
  lastName: string

  @HttpRequestFieldDecorator({ cast: HttpRequestFieldCast.String })
  @IsString()
  phone: string

  @HttpRequestFieldDecorator({ cast: HttpRequestFieldCast.String })
  @IsString()
  statusText?: string

  @HttpRequestFieldDecorator()
  @IsString({ each: true })
  favGames?: GameType[]
}

export class PatchProfileMyHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchProfileMyUrl,
  PatchProfileMyParamsDto
> {
  readonly method = Method.Patch

  readonly url = PatchProfileMyUrl

  @ValidateNested()
  @Type(() => PatchProfileMyParamsDto)
  readonly data: PatchProfileMyParamsDto
}

export class PatchProfileMyHttpClientRequestDto extends HttpClientRequestDto<typeof PatchProfileMyUrl, FormData> {
  readonly method = Method.Patch

  readonly url = PatchProfileMyUrl

  @ValidateNested()
  @Type(() => FormData)
  readonly data: FormData
}
