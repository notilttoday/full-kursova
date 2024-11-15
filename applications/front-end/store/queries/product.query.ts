import { Method } from '@boilerplate/core/interfaces/http'

import {
  type GetProductHttpClientRequestDto,
  GetProductRequestUrl,
} from '@boilerplate/types/products/dto/requests/products'
import { type GetProductDto } from '@boilerplate/types/products/dto/responses/products'

import { v1ReactApi } from '@boilerplate/front-end/store/api/v1.api/react.api'

const api = v1ReactApi.injectEndpoints({
  endpoints: (build) => ({
    getProduct: build.query<GetProductDto, string>({
      query: (productId): GetProductHttpClientRequestDto => ({
        method: Method.Get,
        url: GetProductRequestUrl,
        params: {
          productId: String(productId),
        },
      }),
    }),
  }),
})

export const { useGetProductQuery } = api

export const { getProduct } = api.endpoints
