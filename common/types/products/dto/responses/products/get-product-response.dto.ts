import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { GetProduct } from '@boilerplate/types/products/interfaces/products'

export class GetProductDto implements GetProduct {
  @IsString()
  id: string

  @IsString()
  title: string

  @IsNumber()
  price: number

  @IsString()
  description: string

  @IsString()
  game: string

  @IsOptional()
  @IsString()
  imagePath?: string
}

export class GetProductHttpResponseDto extends HttpServerResponseDto<GetProductDto> {
  @IsOptional()
  @IsArray()
  @Type(() => GetProductDto)
  result?: GetProductDto
}
