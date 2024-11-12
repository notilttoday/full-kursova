import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

import { PostTokenData } from '@boilerplate/types/auth/interfaces/token'

export const PostTokenUrl = '/tokens'

export class PostTokenDataDto implements PostTokenData {
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
  password: string
}

export class PostTokenHttpServerRequestDto extends HttpServerRequestDto<typeof PostTokenUrl, PostTokenDataDto> {
  readonly method = Method.Post

  readonly url = PostTokenUrl

  @ValidateNested()
  @Type(() => PostTokenDataDto)
  readonly data: PostTokenDataDto
}

export class PostTokenHttpClientRequestDto extends HttpClientRequestDto<typeof PostTokenUrl, PostTokenDataDto> {
  readonly method = Method.Post

  readonly url = PostTokenUrl

  @ValidateNested()
  @Type(() => PostTokenDataDto)
  readonly data: PostTokenDataDto
}
