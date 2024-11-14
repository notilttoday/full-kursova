import { Method } from '@boilerplate/core/interfaces/http'
import { Role } from '@boilerplate/core/interfaces/user'

import {
  type GetProfileMyHttpClientRequestDto,
  GetProfileMyUrl,
  type PatchProfileMyParamsDto,
  PatchProfileMyUrl,
} from '@boilerplate/types/auth/dto/requests/profile'
import { type EditProfileDto, type MyProfileDto } from '@boilerplate/types/auth/dto/responses/profile'

import { v1ReactApi } from '@boilerplate/front-end/store/api/v1.api/react.api'

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
    updateProfile: build.mutation<EditProfileDto, PatchProfileMyParamsDto>({
      query: ({ firstName, lastName, phone, statusText, favGames }) => ({
        method: Method.Patch,
        url: PatchProfileMyUrl,
        data: {
          firstName,
          lastName,
          phone,
          statusText,
          favGames,
        },
      }),
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = api

export const { getProfile, updateProfile } = api.endpoints
