import { Type } from 'class-transformer'
import { IsArray, IsInt, IsOptional, Min, ValidateNested } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { GetOrder, OrderItem } from '@boilerplate/types/orders/interfaces/orders'
import { GetProductShortDto } from '@boilerplate/types/products/dto/responses/products/get-products-response.dto'

export class OrderItemDto implements OrderItem {
  @ValidateNested()
  @Type(() => GetProductShortDto)
  product: GetProductShortDto

  @IsInt()
  @Min(1)
  quantity: number
}

export class GetOrderDto implements GetOrder {
  @ValidateNested()
  @IsArray()
  @Type(() => OrderItemDto)
  items: OrderItemDto[]
}

export class GetOrderHttpResponseDto extends HttpServerResponseDto<GetOrderDto> {
  @IsOptional()
  @Type(() => GetOrderDto)
  result?: GetOrderDto
}
