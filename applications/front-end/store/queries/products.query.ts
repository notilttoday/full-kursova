import { Method } from '@boilerplate/core/interfaces/http'

import {
  type GetProductsHttpClientRequestDto,
  GetProductsRequestUrl,
} from '@boilerplate/types/products/dto/requests/products'
import { type GetProductShortDto } from '@boilerplate/types/products/dto/responses/products'

import { v1ReactApi } from '@boilerplate/front-end/store/api/v1.api/react.api'

const api = v1ReactApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<GetProductShortDto[], void>({
      query: (): GetProductsHttpClientRequestDto => ({
        method: Method.Get,
        url: GetProductsRequestUrl,
      }),
    }),
  }),
})

export const { useGetProductsQuery } = api
