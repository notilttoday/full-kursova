import { Type } from 'class-transformer'
import { IsString, IsUUID, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method, Params } from '@boilerplate/core/interfaces/http'

import { PatchOrderStatus } from '@boilerplate/types/orders/interfaces/orders'

export const PatchOrderStatusUrl = '/edit-order-status/:orderId'

export class PatchOrderStatusParamsDto implements Params<typeof PatchOrderStatusUrl> {
  @HttpRequestFieldDecorator()
  @IsUUID(4)
  orderId: string
}

export class PatchOrderStatusDto implements PatchOrderStatus {
  @HttpRequestFieldDecorator()
  @IsString()
  paymentStatus: string
}

export class PatchOrderStatusHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchOrderStatusUrl,
  PatchOrderStatusDto
> {
  readonly method = Method.Patch

  readonly url = PatchOrderStatusUrl

  @ValidateNested()
  @Type(() => PatchOrderStatusDto)
  readonly data: PatchOrderStatusDto
}

export class PatchOrderStatusMyHttpClientRequestDto extends HttpClientRequestDto<
  typeof PatchOrderStatusUrl,
  PatchOrderStatusDto
> {
  readonly method = Method.Patch

  readonly url = PatchOrderStatusUrl

  @ValidateNested()
  @Type(() => PatchOrderStatusDto)
  readonly data: PatchOrderStatusDto
}
