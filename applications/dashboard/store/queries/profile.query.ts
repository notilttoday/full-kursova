import { Method } from '@boilerplate/core/interfaces/http'
import { Role } from '@boilerplate/core/interfaces/user'

import { type GetProfileMyHttpClientRequestDto, GetProfileMyUrl } from '@boilerplate/types/auth/dto/requests/profile'
import { type MyProfileDto } from '@boilerplate/types/auth/dto/responses/profile'

import { v1ReactApi } from '@boilerplate/dashboard/store/api/v1.api/react.api'

const api = v1ReactApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<MyProfileDto, void>({
      query: (): GetProfileMyHttpClientRequestDto => ({
        method: Method.Get,
        url: GetProfileMyUrl,
        params: {
          role: Role.User,
        },
      }),
    }),
  }),
})

export const { useGetProfileQuery } = api

export const { getProfile } = api.endpoints
