import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

import { HttpListServerResponseDto } from '@boilerplate/core/dto/responses/http-list-server-response.dto'

import { GetProductShort } from '@boilerplate/types/products/interfaces/products'

export class GetProductShortDto implements GetProductShort {
  @IsString()
  id: string

  @IsString()
  title: string

  @IsNumber()
  price: number

  @IsOptional()
  @IsString()
  imagePath?: string
}

export class GetProductsListHttpResponseDto extends HttpListServerResponseDto<GetProductShortDto> {
  @IsOptional()
  @IsArray()
  @Type(() => GetProductShortDto)
  result?: GetProductShortDto[]
}
