import { Type } from 'class-transformer'
import { IsBoolean, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { HttpRequestFieldCast, Method } from '@boilerplate/core/interfaces/http'

import { PostOrderData } from '@boilerplate/types/orders/interfaces/orders'

export const PostOrderUnauthorizedUrl = '/orders'

export const PostOrderAuthorizedUrl = '/orders/user'

export class PostOrderDataDto implements PostOrderData {
  @HttpRequestFieldDecorator({ cast: HttpRequestFieldCast.Boolean, defaultValue: false })
  @IsBoolean()
  force: boolean
}

export class PostOrderUnauthorizedUrlHttpServerRequestDto extends HttpServerRequestDto<
  typeof PostOrderUnauthorizedUrl,
  PostOrderDataDto
> {
  readonly method = Method.Post

  readonly url = PostOrderUnauthorizedUrl

  @ValidateNested()
  @Type(() => PostOrderDataDto)
  data: PostOrderDataDto
}

export class PostOrderUnauthorizedUrlHttpClientRequestDto extends HttpClientRequestDto<
  typeof PostOrderUnauthorizedUrl,
  PostOrderDataDto
> {
  readonly method = Method.Post

  readonly url = PostOrderUnauthorizedUrl

  @ValidateNested()
  @Type(() => PostOrderDataDto)
  data: PostOrderDataDto
}

export class PostOrderAuthorizedUrlHttpServerRequestDto extends HttpServerRequestDto<
  typeof PostOrderAuthorizedUrl,
  PostOrderDataDto
> {
  readonly method = Method.Post

  readonly url = PostOrderAuthorizedUrl

  @ValidateNested()
  @Type(() => PostOrderDataDto)
  data: PostOrderDataDto
}

export class PostOrderAuthorizedUrlHttpClientRequestDto extends HttpClientRequestDto<
  typeof PostOrderAuthorizedUrl,
  PostOrderDataDto
> {
  readonly method = Method.Post

  readonly url = PostOrderAuthorizedUrl

  @ValidateNested()
  @Type(() => PostOrderDataDto)
  data: PostOrderDataDto
}
