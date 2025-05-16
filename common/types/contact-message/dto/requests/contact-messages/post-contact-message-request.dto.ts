import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

import { type PostContactMessage } from '@boilerplate/types/contact-message/interfaces/contact-message'

export const PostContactMessageUrl = '/contact-message'

export class PostContactMessageDataDto implements PostContactMessage {
  @HttpRequestFieldDecorator()
  @IsString()
  firstName: string

  @HttpRequestFieldDecorator()
  @IsString()
  lastName: string

  @HttpRequestFieldDecorator()
  @IsString()
  email: string

  @HttpRequestFieldDecorator()
  @IsString()
  phone: string

  @HttpRequestFieldDecorator()
  @IsString()
  message: string

  @HttpRequestFieldDecorator()
  @IsString()
  userId: string
}

export class PostContactMessageHttpServerRequestDto extends HttpServerRequestDto<
  typeof PostContactMessageUrl,
  PostContactMessageDataDto
> {
  readonly method = Method.Post

  readonly url = PostContactMessageUrl

  @ValidateNested()
  @Type(() => PostContactMessageDataDto)
  readonly data: PostContactMessageDataDto
}

export class PostContactMessageHttpClientRequestDto extends HttpClientRequestDto<
  typeof PostContactMessageUrl,
  PostContactMessageDataDto
> {
  readonly method = Method.Post

  readonly url = PostContactMessageUrl

  @ValidateNested()
  @Type(() => PostContactMessageDataDto)
  readonly data: PostContactMessageDataDto
}
