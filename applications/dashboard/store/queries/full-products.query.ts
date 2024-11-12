import { Method } from '@boilerplate/core/interfaces/http'

import {
  GetFullProductsListHttpClientRequestDto,
  GetFullProductsRequestUrl,
} from '@boilerplate/types/products/dto/requests/products'
import {
  GetFullProductDto,
} from '@boilerplate/types/products/dto/responses/products'

import { v1ReactApi } from '@boilerplate/dashboard/store/api/v1.api/react.api'


const api = v1ReactApi.injectEndpoints({
  endpoints: (build) => ({
    getDashProducts: build.query<GetFullProductDto[], void>({
      query: (): GetFullProductsListHttpClientRequestDto => ({
        method: Method.Get,
        url: GetFullProductsRequestUrl,
      }),
      providesTags: (result) =>
        Array.isArray(result)
          ? [...result.map(({ id }) => ({ type: 'Product', id }) as const), { type: 'Product', id: 'LIST' }]
          : [{ type: 'Product', id: 'LIST' }],
    }),
  }),
})

export const { useGetDashProductsQuery } = api

export const { getDashProducts } = api.endpoints