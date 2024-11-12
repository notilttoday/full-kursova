import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

import { HttpListServerResponseDto } from '@boilerplate/core/dto/responses/http-list-server-response.dto'

import { GameType, GetProduct } from '@boilerplate/types/products/interfaces/products'

export class GetFullProductDto implements GetProduct {
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

export class GetFullProductsListHttpResponseDto extends HttpListServerResponseDto<GetFullProductDto> {
  @IsOptional()
  @IsArray()
  @Type(() => GetFullProductDto)
  result?: GetFullProductDto[]
}
