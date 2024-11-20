import { Method } from '@boilerplate/core/interfaces/http'
import { Role } from '@boilerplate/core/interfaces/user'

import {
  type GetProfileMyHttpClientRequestDto,
  GetProfileMyUrl,
  type PatchProfileMyHttpClientRequestDto,
  PatchProfileMyUrl,
} from '@boilerplate/types/auth/dto/requests/profile'
import { type EditProfileDto, type MyProfileDto } from '@boilerplate/types/auth/dto/responses/profile'

import { v1Api } from '@boilerplate/front-end/store/api/v1.api'

const api = v1Api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<MyProfileDto, void>({
      query: (): GetProfileMyHttpClientRequestDto => ({
        method: Method.Get,
        url: GetProfileMyUrl,
        params: {
          role: Role.User,
        },
      }),
      providesTags: (result) =>
        Array.isArray(result)
          ? [...result.map(({ id }) => ({ type: 'Profile', id }) as const), { type: 'Profile', id: 'LIST' }]
          : [{ type: 'Profile', id: 'LIST' }],
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
      invalidatesTags: [
        { type: 'Profile', id: 'current' },
        { type: 'Profile', id: 'LIST' },
      ],
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = api

export const { getProfile, updateProfile } = api.endpoints
