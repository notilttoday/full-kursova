import 'reflect-metadata'

import { Type } from 'class-transformer'
import { IsEnum, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'

import { type HttpRequest, type HttpRequestHeaders, type HttpSearch, Method } from '@boilerplate/core/interfaces/http'
import { type ParamsMap } from '@boilerplate/core/interfaces/utils/params-map'

class HttpRequestHeadersDto implements HttpRequestHeaders {}

export abstract class HttpRequestDto<Url extends string, Data = never, Search extends HttpSearch = never>
  implements HttpRequest<Url, Data, Search>
{
  @IsEnum(Method)
  abstract method: Method

  @IsString()
  abstract url: Url

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => HttpRequestHeadersDto)
  headers?: HttpRequestHeadersDto

  @IsOptional()
  @IsObject()
  @ValidateNested()
  data?: Data

  @IsOptional()
  @IsObject()
  @ValidateNested()
  search?: Search

  @IsOptional()
  @IsObject()
  @ValidateNested()
  params?: ParamsMap<Url>
}
