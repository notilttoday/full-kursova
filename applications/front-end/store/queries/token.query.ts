import { Method } from '@boilerplate/core/interfaces/http'

import {
  type DeleteTokenHttpClientRequestDto,
  DeleteTokenUrl,
  type PatchTokenHttpClientRequestDto,
  PatchTokenUrl,
  type PostTokenDataDto,
  type PostTokenHttpClientRequestDto,
  PostTokenUrl,
  type PutTokenDataDto,
  type PutTokenHttpClientRequestDto,
  PutTokenUrl,
} from '@boilerplate/types/auth/dto/requests/token'
import {
  type DeleteTokenResultDto,
  type PatchTokenResultDto,
  type PostTokenResultDto,
  type PutTokenResultDto,
} from '@boilerplate/types/auth/dto/responses/token'

import { v1Api } from '@boilerplate/front-end/store/api/v1.api'

const api = v1Api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<PutTokenResultDto, PutTokenDataDto>({
      query: ({ email, password }): PutTokenHttpClientRequestDto => ({
        method: Method.Put,
        url: PutTokenUrl,
        data: {
          email,
          password,
        },
      }),
    }),
    registration: build.mutation<PostTokenResultDto, PostTokenDataDto>({
      query: ({ firstName, lastName, email, phone, password }): PostTokenHttpClientRequestDto => ({
        method: Method.Post,
        url: PostTokenUrl,
        data: {
          firstName,
          lastName,
          email,
          phone,
          password,
        },
      }),
    }),
    refrash: build.query<PatchTokenResultDto, void>({
      query: (): PatchTokenHttpClientRequestDto => ({
        method: Method.Patch,
        url: PatchTokenUrl,
      }),
    }),
    logout: build.query<DeleteTokenResultDto, void>({
      query: (): DeleteTokenHttpClientRequestDto => ({
        method: Method.Delete,
        url: DeleteTokenUrl,
      }),
    }),
  }),
})

export const { login, registration, refrash, logout } = api.endpoints
