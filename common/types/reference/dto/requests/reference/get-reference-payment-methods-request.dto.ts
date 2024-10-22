import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

export const GetReferencePaymentMethodsUrl = '/reference/payment-methods'

export class GetReferencePaymentMethodsHttpServerRequestDto extends HttpServerRequestDto<
  typeof GetReferencePaymentMethodsUrl
> {
  readonly method = Method.Get

  readonly url = GetReferencePaymentMethodsUrl
}

export class GetReferencePaymentMethodsHttpClientRequestDto extends HttpClientRequestDto<
  typeof GetReferencePaymentMethodsUrl
> {
  readonly method = Method.Get

  readonly url = GetReferencePaymentMethodsUrl
}
