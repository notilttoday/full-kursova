import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

export const PostOrderUnauthorizedUrl = '/orders'

export const PostOrderAuthorizedUrl = '/orders/user'

export class PostOrderUnauthorizedUrlHttpServerRequestDto extends HttpServerRequestDto<
  typeof PostOrderUnauthorizedUrl
> {
  readonly method = Method.Post

  readonly url = PostOrderUnauthorizedUrl
}

export class PostOrderUnauthorizedUrlHttpClientRequestDto extends HttpClientRequestDto<
  typeof PostOrderUnauthorizedUrl
> {
  readonly method = Method.Post

  readonly url = PostOrderUnauthorizedUrl
}

export class PostOrderAuthorizedUrlHttpServerRequestDto extends HttpServerRequestDto<typeof PostOrderAuthorizedUrl> {
  readonly method = Method.Post

  readonly url = PostOrderAuthorizedUrl
}

export class PostOrderAuthorizedUrlHttpClientRequestDto extends HttpClientRequestDto<typeof PostOrderAuthorizedUrl> {
  readonly method = Method.Post

  readonly url = PostOrderAuthorizedUrl
}
