import { Type } from 'class-transformer'
import { IsBoolean, IsOptional, IsUUID } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { PostOrderResult } from '@boilerplate/types/orders/interfaces/orders'

export class PostOrderResultDto implements PostOrderResult {
  @IsUUID(4)
  orderId: string

  @IsBoolean()
  isSuccess: boolean
}

export class PostOrderResultHttpResponseDto extends HttpServerResponseDto<PostOrderResultDto> {
  @IsOptional()
  @Type(() => PostOrderResultDto)
  result?: PostOrderResultDto
}
