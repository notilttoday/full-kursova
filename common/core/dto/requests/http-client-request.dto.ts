import { HttpRequestDto } from '@boilerplate/core/dto/requests/http-request.dto'
import { type HttpClientRequest, type HttpSearch } from '@boilerplate/core/interfaces/http'

export abstract class HttpClientRequestDto<Url extends string, Data = never, Search extends HttpSearch = never>
  extends HttpRequestDto<Url, Data, Search>
  implements HttpClientRequest<Url, Data, Search> {}
