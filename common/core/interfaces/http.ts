import { type User } from '@boilerplate/core/interfaces/user'
import { type ParamsMap } from '@boilerplate/core/interfaces/utils/params-map'

export enum Method {
  Get = 'get',
  Delete = 'delete',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
}

export enum HttpRequestFieldCast {
  Boolean = 'boolean',
  Number = 'number',
  String = 'string',
  Json = 'json',
}

export interface HttpRequestFieldDecoratorConfig<T> {
  cast?: HttpRequestFieldCast
  convertEmpty?: boolean
  defaultValue?: T
}

export interface HttpRequestHeaders {}

export type Params<Url extends string> = ParamsMap<Url>

export interface HttpSearch extends Record<string, string | readonly string[]> {}

export type HttpServerRequestUser = User

export interface HttpRequest<Url extends string, Data, Search extends HttpSearch> {
  method: Method

  url: Url

  headers?: HttpRequestHeaders

  data?: Data

  search?: Search

  params?: Params<Url> | object
}

export interface HttpServerRequest<Url extends string, Data, Search extends HttpSearch, TUser = HttpServerRequestUser>
  extends HttpRequest<Url, Data, Search> {
  user?: TUser
}

export interface HttpClientRequest<Url extends string, Data, Search extends HttpSearch>
  extends HttpRequest<Url, Data, Search> {}

export interface HttpServerResponse<Result> {
  result?: Result
  error?: string
  message?: string
}

export interface HttpListServerResponse<Result> {
  result?: Result[]
  total?: number
}

export interface HttpClientResponse<Data> {
  data: Data
  error?: string
  message?: string
}

export interface HttpListClientResponse<Data> {
  data?: Data[]
}
