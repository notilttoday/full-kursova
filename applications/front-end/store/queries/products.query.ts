import { Method } from '@boilerplate/core/interfaces/http'

import {
  type GetProductsHttpClientRequestDto,
  GetProductsRequestUrl,
  type GetSearchProductDataDto,
} from '@boilerplate/types/products/dto/requests/products'
import { type GetProductShortDto } from '@boilerplate/types/products/dto/responses/products'

import { v1Api } from '@boilerplate/front-end/store/api/v1.api'

const api = v1Api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<GetProductShortDto[], Required<GetSearchProductDataDto>>({
      query: ({ title, game }): GetProductsHttpClientRequestDto => ({
        method: Method.Get,
        url: GetProductsRequestUrl,
        search: {
          title,
          game,
        },
      }),
    }),
  }),
})

export const { useGetProductsQuery } = api

export const { getProducts } = api.endpoints
