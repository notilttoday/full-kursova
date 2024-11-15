import { Method } from '@boilerplate/core/interfaces/http'
import { Role } from '@boilerplate/core/interfaces/user'

import {
  type GetProfileMyHttpClientRequestDto,
  GetProfileMyUrl,
  type PatchProfileMyHttpClientRequestDto,
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
    updateProfile: build.mutation<EditProfileDto, FormData>({
      query: (formData): PatchProfileMyHttpClientRequestDto => ({
        method: Method.Patch,
        url: PatchProfileMyUrl,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      }),
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = api

export const { getProfile, updateProfile } = api.endpoints
