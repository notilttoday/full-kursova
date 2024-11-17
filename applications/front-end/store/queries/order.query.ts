import { Method } from '@boilerplate/core/interfaces/http'

import {
  type GetOrderAuthorizedHttpClientRequestDto,
  GetOrderAuthorizedUrl,
  type GetOrderUnauthorizedHttpClientRequestDto,
  GetOrderUnauthorizedUrl,
  type PatchOrderAuthorizedHttpClientRequestDto,
  PatchOrderAuthorizedUrl,
  type PatchOrderUnauthorizedHttpClientRequestDto,
  PatchOrderUnauthorizedUrl,
  PostOrderAuthorizedUrl,
  type PostOrderAuthorizedUrlHttpClientRequestDto,
  PostOrderUnauthorizedUrl,
  type PostOrderUnauthorizedUrlHttpClientRequestDto,
} from '@boilerplate/types/orders/dto/requests/orders'
import {
  type GetOrderDto,
  type PatchOrderResultDto,
  type PostOrderResultDto,
} from '@boilerplate/types/orders/dto/responses/orders'

import { v1ReactApi } from '@boilerplate/front-end/store/api/v1.api/react.api'
import { orderSlice } from '@boilerplate/front-end/store/slices/order.slice'

const api = v1ReactApi.injectEndpoints({
  endpoints: (build) => ({
    getUnauthorizedOrder: build.query<GetOrderDto, string>({
      query: (orderId): GetOrderUnauthorizedHttpClientRequestDto => ({
        method: Method.Get,
        url: GetOrderUnauthorizedUrl,
        params: {
          orderId: String(orderId),
        },
      }),
    }),
    getAuthorizedOrder: build.query<GetOrderDto, string>({
      query: (orderId): GetOrderAuthorizedHttpClientRequestDto => ({
        method: Method.Get,
        url: GetOrderAuthorizedUrl,
        params: {
          orderId: String(orderId),
        },
      }),
    }),

    postUnauthorizedOrder: build.mutation<PostOrderResultDto, void>({
      query: (): PostOrderUnauthorizedUrlHttpClientRequestDto => ({
        method: Method.Post,
        url: PostOrderUnauthorizedUrl,
      }),
    }),
    postAuthorizedOrder: build.mutation<PostOrderResultDto, { orderId: string }>({
      query: (): PostOrderAuthorizedUrlHttpClientRequestDto => ({
        method: Method.Post,
        url: PostOrderAuthorizedUrl,
      }),
    }),

    patchUnauthorizedOrder: build.mutation<
      PatchOrderResultDto,
      { orderId: string; productId: string; quantity: number }
    >({
      query: ({ orderId, productId, quantity }): PatchOrderUnauthorizedHttpClientRequestDto => ({
        method: Method.Patch,
        url: PatchOrderUnauthorizedUrl,
        params: {
          orderId: String(orderId),
        },
        data: { productId, quantity },
      }),
      onQueryStarted({ orderId, productId, quantity }, { dispatch }) {
        dispatch(orderSlice.actions.updateQuantity({ id: productId, quantity }))
      },
    }),
    patchAuthorizedOrder: build.mutation<PatchOrderResultDto, { orderId: string; productId: string; quantity: number }>(
      {
        query: ({ orderId, productId, quantity }): PatchOrderAuthorizedHttpClientRequestDto => ({
          method: Method.Patch,
          url: PatchOrderAuthorizedUrl,
          params: {
            orderId: String(orderId),
          },
          data: { productId, quantity },
        }),
        onQueryStarted({ orderId, productId, quantity }, { dispatch }) {
          dispatch(orderSlice.actions.updateQuantity({ id: productId, quantity }))
        },
      },
    ),
  }),
})

export const {
  useGetUnauthorizedOrderQuery,
  useGetAuthorizedOrderQuery,
  usePostUnauthorizedOrderMutation,
  usePostAuthorizedOrderMutation,
  usePatchUnauthorizedOrderMutation,
  usePatchAuthorizedOrderMutation,
} = api

export const {
  getUnauthorizedOrder,
  getAuthorizedOrder,
  postUnauthorizedOrder,
  postAuthorizedOrder,
  patchUnauthorizedOrder,
  patchAuthorizedOrder,
} = api.endpoints
