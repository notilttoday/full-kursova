import { IsBoolean } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { type DeleteProductResult } from '@boilerplate/types/products/interfaces/products'

export class DeleteProductResultDto implements DeleteProductResult {
  @IsBoolean()
  isSuccess: boolean
}

export class DeleteProductResultHttpServerResponseDto extends HttpServerResponseDto<DeleteProductResultDto> {
  result?: DeleteProductResultDto
}
