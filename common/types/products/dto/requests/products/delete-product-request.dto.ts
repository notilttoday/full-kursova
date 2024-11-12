import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

export const DeleteProductUrl = '/products/:productId'

export class DeleteProductHttpServerRequestDto extends HttpServerRequestDto<
  typeof DeleteProductUrl,
  undefined,
  undefined,
  { productId: string }
> {
  readonly method = Method.Delete;

  readonly url = DeleteProductUrl;

  params: { productId: string };
}

export class DeleteProductHttpClientRequestDto extends HttpClientRequestDto<typeof DeleteProductUrl> {
  readonly method = Method.Delete;

  readonly url = DeleteProductUrl;

  params: { productId: string };
}
