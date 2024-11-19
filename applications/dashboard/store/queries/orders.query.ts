import { Method } from '@boilerplate/core/interfaces/http'

import {
  type GetOrdersListAdminHttpClientRequestDto,
  GetOrdersListAdminUrl,
} from '@boilerplate/types/orders/dto/requests/orders'
import { type GetOrderDto } from '@boilerplate/types/orders/dto/responses/orders'

import { v1ReactApi } from '@boilerplate/dashboard/store/api/v1.api/react.api'

const api = v1ReactApi.injectEndpoints({
  endpoints: (build) => ({
    getOrdersList: build.query<GetOrderDto[], void>({
      query: (): GetOrdersListAdminHttpClientRequestDto => ({
        method: Method.Get,
        url: GetOrdersListAdminUrl,
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

export const { useGetOrdersListQuery } = api

export const { getOrdersList } = api.endpoints
