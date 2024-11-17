import { Type } from 'class-transformer'
import { IsArray, IsOptional } from 'class-validator'

import { HttpListServerResponseDto } from '@boilerplate/core/dto/responses/http-list-server-response.dto'

import { GetOrderDto } from '@boilerplate/types/orders/dto/responses/orders/get-order-response.dto'

export class GetOrdersHttpListResponseDto extends HttpListServerResponseDto<GetOrderDto> {
  @IsOptional()
  @IsArray()
  @Type(() => GetOrderDto)
  result?: GetOrderDto[]
}
