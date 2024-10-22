import { Type } from 'class-transformer'
import { IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'

import { HttpRequestDto } from '@boilerplate/core/dto/requests/http-request.dto'
import { HttpRequestHeaders, HttpSearch, HttpServerRequest, HttpServerRequestUser } from '@boilerplate/core/interfaces/http'

class HttpRequestHeadersDto implements HttpRequestHeaders {
  @IsOptional()
  @IsString()
  authorization?: string
}

export abstract class HttpServerRequestDto<
    Url extends string,
    Data = never,
    Search extends HttpSearch = never,
    TUser = HttpServerRequestUser,
  >
  extends HttpRequestDto<Url, Data, Search>
  implements HttpServerRequest<Url, Data, Search, TUser>
{
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => HttpRequestHeadersDto)
  headers?: HttpRequestHeadersDto

  @IsOptional()
  @IsObject()
  @ValidateNested()
  user?: TUser
}
