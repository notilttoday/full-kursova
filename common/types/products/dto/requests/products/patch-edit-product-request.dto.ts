import { Type } from 'class-transformer'
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { HttpRequestFieldCast, Method } from '@boilerplate/core/interfaces/http'

import { GameType, PatchProductData } from '@boilerplate/types/products/interfaces/products'

export const PatchProductMyUrl = '/edit-product/:productId'

export class PatchProductParamsDto implements Omit<PatchProductData, 'file'> {
  @HttpRequestFieldDecorator()
  @IsString()
  title: string

  @HttpRequestFieldDecorator()
  @IsString()
  description: string

  @HttpRequestFieldDecorator({ cast: HttpRequestFieldCast.Number })
  @IsNumber()
  price: number

  @HttpRequestFieldDecorator()
  @IsEnum(GameType)
  game: GameType
}

export class PatchProductHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchProductMyUrl,
  PatchProductParamsDto
> {
  readonly method = Method.Patch

  readonly url = PatchProductMyUrl

  @ValidateNested()
  @Type(() => PatchProductParamsDto)
  readonly data: PatchProductParamsDto

  params: { productId: string }
}

export class PatchProductMyHttpClientRequestDto extends HttpClientRequestDto<typeof PatchProductMyUrl, FormData> {
  readonly method = Method.Patch

  readonly url = PatchProductMyUrl

  @ValidateNested()
  @Type(() => FormData)
  readonly data: FormData

  params: { productId: string }
}
