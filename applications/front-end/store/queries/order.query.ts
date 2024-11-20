import { Method } from '@boilerplate/core/interfaces/http'

import {
  type GetOrderAuthorizedHttpClientRequestDto,
  GetOrderAuthorizedUrl,
  type GetOrderUnauthorizedHttpClientRequestDto,
  GetOrderUnauthorizedUrl,
  type PatchOrderAuthorizedHttpClientRequestDto,
  PatchOrderAuthorizedUrl,
  type PatchOrderDataDto,
  type PatchOrderParamsDto,
  type PatchOrderUnauthorizedHttpClientRequestDto,
  PatchOrderUnauthorizedUrl,
  type PatchOrderUserAuthorizedHttpClientRequestDto,
  PatchOrderUserAuthorizedUrl,
  type PatchOrderUserDataDto,
  type PatchOrderUserParamsDto,
  type PatchOrderUserUnauthorizedHttpClientRequestDto,
  PatchOrderUserUnauthorizedUrl,
  PostOrderAuthorizedUrl,
  type PostOrderAuthorizedUrlHttpClientRequestDto,
  PostOrderUnauthorizedUrl,
  type PostOrderUnauthorizedUrlHttpClientRequestDto,
} from '@boilerplate/types/orders/dto/requests/orders'
import {
  type GetOrderDto,
  type PatchOrderResultDto,
  type PatchOrderUserDataResultDto,
  type PostOrderResultDto,
} from '@boilerplate/types/orders/dto/responses/orders'

import { v1Api } from '@boilerplate/front-end/store/api/v1.api'

const api = v1Api.injectEndpoints({
  endpoints: (build) => ({
    getOrder: build.query<GetOrderDto, { orderId: string; authorized: boolean }>({
      query: ({
        orderId,
        authorized,
      }): GetOrderUnauthorizedHttpClientRequestDto | GetOrderAuthorizedHttpClientRequestDto => ({
        method: Method.Get,
        url: authorized ? GetOrderAuthorizedUrl : GetOrderUnauthorizedUrl,
        params: {
          orderId,
        },
      }),
      providesTags: (result) =>
        Array.isArray(result)
          ? [...result.map(({ id }) => ({ type: 'Order', id }) as const), { type: 'Order', id: 'LIST' }]
          : [{ type: 'Order', id: 'LIST' }],
    }),

    postOrder: build.mutation<PostOrderResultDto, { authorized: boolean }>({
      query: ({
        authorized,
      }): PostOrderUnauthorizedUrlHttpClientRequestDto | PostOrderAuthorizedUrlHttpClientRequestDto => ({
        method: Method.Post,
        url: authorized ? PostOrderAuthorizedUrl : PostOrderUnauthorizedUrl,
      }),
      invalidatesTags: [
        { type: 'Order', id: 'current' },
        { type: 'Order', id: 'LIST' },
      ],
    }),

    patchOrder: build.mutation<PatchOrderResultDto, PatchOrderParamsDto & PatchOrderDataDto & { authorized: boolean }>({
      query: ({
        orderId,
        productId,
        quantity,
        authorized,
      }): PatchOrderUnauthorizedHttpClientRequestDto | PatchOrderAuthorizedHttpClientRequestDto => ({
        method: Method.Patch,
        url: authorized ? PatchOrderAuthorizedUrl : PatchOrderUnauthorizedUrl,
        params: {
          orderId,
        },
        data: { productId, quantity },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: 'current' },
        { type: 'Order', id: orderId },
        { type: 'Order', id: 'LIST' },
      ],
    }),

    patchOrderUserData: build.mutation<
      PatchOrderUserDataResultDto,
      PatchOrderUserParamsDto & PatchOrderUserDataDto & { authorized: boolean }
    >({
      query: ({
        orderId,
        authorized,
        firstName,
        lastName,
        phone,
        email,
        // paymentType,
      }): PatchOrderUserUnauthorizedHttpClientRequestDto | PatchOrderUserAuthorizedHttpClientRequestDto => ({
        method: Method.Patch,
        url: authorized ? PatchOrderUserAuthorizedUrl : PatchOrderUserUnauthorizedUrl,
        params: {
          orderId,
        },
        data: { firstName, lastName, phone, email },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: 'current' },
        { type: 'Order', id: orderId },
        { type: 'Order', id: 'LIST' },
      ],
    }),
  }),
})

export const { useGetOrderQuery, usePostOrderMutation, usePatchOrderMutation, usePatchOrderUserDataMutation } = api

export const { getOrder, postOrder, patchOrder, patchOrderUserData } = api.endpoints
