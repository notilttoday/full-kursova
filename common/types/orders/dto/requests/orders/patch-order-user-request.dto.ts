import { Type } from 'class-transformer'
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method, Params } from '@boilerplate/core/interfaces/http'

import { PatchOrderUserData } from '@boilerplate/types/orders/interfaces/orders'

export const PatchOrderUserUnauthorizedUrl = '/order-user-data/:orderId'

export const PatchOrderUserAuthorizedUrl = '/order-user-data/user/:orderId'

export class PatchOrderUserParamsDto
  implements Params<typeof PatchOrderUserUnauthorizedUrl | typeof PatchOrderUserAuthorizedUrl>
{
  @HttpRequestFieldDecorator()
  @IsUUID(4)
  orderId: string
}

export class PatchOrderUserDataDto implements PatchOrderUserData {
  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  firstName?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  lastName?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  phone?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  email?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  paymentType?: string
}

export class PatchOrderUserDataUnauthorizedUrlHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchOrderUserUnauthorizedUrl,
  PatchOrderUserDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchOrderUserUnauthorizedUrl

  @ValidateNested()
  @Type(() => PatchOrderUserDataDto)
  readonly data: PatchOrderUserDataDto
}

export class PatchOrderUserUnauthorizedHttpClientRequestDto extends HttpClientRequestDto<
  typeof PatchOrderUserUnauthorizedUrl,
  PatchOrderUserDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchOrderUserUnauthorizedUrl

  @ValidateNested()
  @Type(() => PatchOrderUserDataDto)
  readonly data: PatchOrderUserDataDto
}

export class PatchOrderUserAuthorizedHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchOrderUserAuthorizedUrl,
  PatchOrderUserDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchOrderUserAuthorizedUrl

  @ValidateNested()
  @Type(() => PatchOrderUserDataDto)
  readonly data: PatchOrderUserDataDto
}

export class PatchOrderUserAuthorizedHttpClientRequestDto extends HttpClientRequestDto<
  typeof PatchOrderUserAuthorizedUrl,
  PatchOrderUserDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchOrderUserAuthorizedUrl

  @ValidateNested()
  @Type(() => PatchOrderUserDataDto)
  readonly data: PatchOrderUserDataDto
}
