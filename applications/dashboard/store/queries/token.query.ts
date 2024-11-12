import { Method } from '@boilerplate/core/interfaces/http'

import {
  type DeleteTokenHttpClientRequestDto,
  DeleteTokenUrl,
  type PatchTokenHttpClientRequestDto,
  PatchTokenUrl,
  type PutTokenDataDto,
  type PutTokenHttpClientRequestDto,
  PutTokenUrl,
} from '@boilerplate/types/auth/dto/requests/token'
import {
  type DeleteTokenResultDto,
  type PatchTokenResultDto,
  type PutTokenResultDto,
} from '@boilerplate/types/auth/dto/responses/token'

import { v1Api } from '@boilerplate/dashboard/store/api/v1.api'

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

export const { login, refrash, logout } = api.endpoints
