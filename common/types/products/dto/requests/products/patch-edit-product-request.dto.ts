import { IsEnum, IsOptional, IsString } from 'class-validator'

import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method, type Params } from '@boilerplate/core/interfaces/http'

export const PatchProductMyUrl = '/edit-product/:productId'

export class PatchProductParamsDto {

  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  price?: string

  @IsOptional()
  @IsString()
  game?: string
}

export class PatchProductHttpServerRequestDto extends HttpServerRequestDto<typeof PatchProductMyUrl> {
  readonly method = Method.Patch;

  readonly url = PatchProductMyUrl

  body: PatchProductParamsDto;
}

export class PatchProductMyHttpClientRequestDto extends HttpClientRequestDto<typeof PatchProductMyUrl> {
  readonly method = Method.Patch;

  readonly url = PatchProductMyUrl

  body: PatchProductParamsDto;
}