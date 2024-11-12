import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { GetProduct } from '@boilerplate/types/products/interfaces/products'

export class EditProductDto implements GetProduct {
  @IsOptional()
  @IsString()
  id: string

  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsNumber()
  price: number

  @IsOptional()
  @IsString()
  game: string
}

export class PatchProductHttpServerResponseDto extends HttpServerResponseDto<EditProductDto> {
  @IsOptional()
  @Type(() => EditProductDto)
  result?: EditProductDto
}
