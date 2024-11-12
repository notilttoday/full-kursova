import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { PostProductResult } from '@boilerplate/types/products/interfaces/products'

export class PostProductResultDto implements PostProductResult {
  @IsBoolean()
  isSuccess: boolean
}

export class PostProductHttpResponseDto extends HttpServerResponseDto<PostProductResultDto> {
  @IsOptional()
  @Type(() => PostProductResultDto)
  result?: PostProductResultDto
}
