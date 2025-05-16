import { Method } from '@boilerplate/core/interfaces/http'

import {
  type GetUserOrdersListHttpClientRequestDto,
  GetUserOrdersListUrl,
} from '@boilerplate/types/orders/dto/requests/orders'
import { type GetUserOrdersListDto } from '@boilerplate/types/orders/dto/responses/orders'

import { v1ReactApi } from '@boilerplate/front-end/store/api/v1.api/react.api'

const api = v1ReactApi.injectEndpoints({
  endpoints: (build) => ({
    getUserOrdersList: build.query<GetUserOrdersListDto[], void>({
      query: (): GetUserOrdersListHttpClientRequestDto => ({
        method: Method.Get,
        url: GetUserOrdersListUrl,
      }),
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.flatMap((order) =>
                order.items
                  .filter((item) => item.product !== null)
                  .map((item) => ({ type: 'Order', id: item.product!.id }) as const),
              ),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
    }),
  }),
})

export const { useGetUserOrdersListQuery } = api

export const { getUserOrdersList } = api.endpoints
