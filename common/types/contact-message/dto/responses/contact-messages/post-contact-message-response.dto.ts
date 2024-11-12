import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { PostContactMessageResult } from '@boilerplate/types/contact-message/interfaces/contact-message'

export class PostContactMessageResultDto implements PostContactMessageResult {
  @IsBoolean()
  isSuccess: boolean
}

export class PostContactMessageHttpResponseDto extends HttpServerResponseDto<PostContactMessageResultDto> {
  @IsOptional()
  @Type(() => PostContactMessageResultDto)
  result?: PostContactMessageResultDto
}
