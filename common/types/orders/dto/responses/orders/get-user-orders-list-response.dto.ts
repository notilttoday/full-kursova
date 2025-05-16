import { Type } from 'class-transformer'
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator'

import { HttpListServerResponseDto } from '@boilerplate/core/dto/responses/http-list-server-response.dto'

import { OrderItemDto } from '@boilerplate/types/orders/dto/responses/orders/get-order-response.dto'
import { GetOrderInfo } from '@boilerplate/types/orders/interfaces/orders'

export class GetUserOrdersListDto implements GetOrderInfo {
  @ValidateNested()
  @IsArray()
  @Type(() => OrderItemDto)
  items: OrderItemDto[]

  @IsOptional()
  @IsString()
  id?: string

  @IsOptional()
  @IsString()
  userId?: string

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
  email?: string

  @IsOptional()
  @IsString()
  status?: string

  @IsOptional()
  @IsString()
  updatedAt?: string
}

export class GetUserOrdersListHttpServerResponseDto extends HttpListServerResponseDto<GetUserOrdersListDto> {
  @IsOptional()
  @IsArray()
  @Type(() => GetUserOrdersListDto)
  result?: GetUserOrdersListDto[]
}
