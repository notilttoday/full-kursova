import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsUUID, Min, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method, Params } from '@boilerplate/core/interfaces/http'

import { type PatchOrderData } from '@boilerplate/types/orders/interfaces/orders'

export const PatchOrderUnauthorizedUrl = '/orders/:orderId'

export const PatchOrderAuthorizedUrl = '/orders/user/:orderId'

export const PatchOrderAdminUrl = '/orders/admin/:orderId'

export class PatchOrderParamsDto
  implements Params<typeof PatchOrderUnauthorizedUrl | typeof PatchOrderAuthorizedUrl | typeof PatchOrderAdminUrl>
{
  readonly [x: string]: string | number

  @HttpRequestFieldDecorator()
  @IsUUID(4)
  orderId: string
}

export class PatchOrderDataDto implements PatchOrderData {
  @HttpRequestFieldDecorator()
  @IsUUID(4)
  productId: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number
}

export class PatchOrderUnauthorizedHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchOrderUnauthorizedUrl,
  PatchOrderDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchOrderUnauthorizedUrl

  @ValidateNested()
  @Type(() => PatchOrderDataDto)
  readonly data: PatchOrderDataDto
}

export class PatchOrderUnauthorizedHttpClientRequestDto extends HttpClientRequestDto<
  typeof PatchOrderUnauthorizedUrl,
  PatchOrderDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchOrderUnauthorizedUrl

  @ValidateNested()
  @Type(() => PatchOrderDataDto)
  readonly data: PatchOrderDataDto
}

export class PatchOrderAuthorizedHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchOrderAuthorizedUrl,
  PatchOrderDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchOrderAuthorizedUrl

  @ValidateNested()
  @Type(() => PatchOrderDataDto)
  readonly data: PatchOrderDataDto
}

export class PatchOrderAuthorizedHttpClientRequestDto extends HttpClientRequestDto<
  typeof PatchOrderAuthorizedUrl,
  PatchOrderDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchOrderAuthorizedUrl

  @ValidateNested()
  @Type(() => PatchOrderDataDto)
  readonly data: PatchOrderDataDto
}

export class PatchOrderAdminHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchOrderAdminUrl,
  PatchOrderDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchOrderAdminUrl

  @ValidateNested()
  @Type(() => PatchOrderDataDto)
  readonly data: PatchOrderDataDto
}

export class PatchOrderAdminHttpClientRequestDto extends HttpClientRequestDto<
  typeof PatchOrderAdminUrl,
  PatchOrderDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchOrderAdminUrl

  @ValidateNested()
  @Type(() => PatchOrderDataDto)
  readonly data: PatchOrderDataDto
}
