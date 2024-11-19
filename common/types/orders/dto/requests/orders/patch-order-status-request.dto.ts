import { IsString, IsUUID } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

import { PatchOrderStatus } from '@boilerplate/types/orders/interfaces/orders'

export const PatchOrderStatusUrl = '/edit-order-status/'

export class PatchOrderStatusDto implements PatchOrderStatus {
  @HttpRequestFieldDecorator()
  @IsUUID(4)
  orderId: string

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
}

export class PatchOrderStatusMyHttpClientRequestDto extends HttpClientRequestDto<
  typeof PatchOrderStatusUrl,
  PatchOrderStatusDto
> {
  readonly method = Method.Patch

  readonly url = PatchOrderStatusUrl
}
