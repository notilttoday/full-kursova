import { Method } from '@boilerplate/core/interfaces/http'

import {
  DeleteProductUrl,
  type PostProductHttpClientRequestDto,
  PostProductUrl,
} from '@boilerplate/types/products/dto/requests/products'
import { type PostProductResultDto } from '@boilerplate/types/products/dto/responses/products'

import { v1ReactApi } from '@boilerplate/dashboard/store/api/v1.api/react.api'

const api = v1ReactApi.injectEndpoints({
  endpoints: (build) => ({
    create: build.mutation<PostProductResultDto, FormData>({
      query: (formData): PostProductHttpClientRequestDto => ({
        method: Method.Post,
        url: PostProductUrl,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    delete: build.mutation<void, string>({
      query: (productId) => ({
        method: Method.Delete,
        url: DeleteProductUrl,
        params: {
          productId,
        },
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
})

export const { create, delete: deleteProduct } = api.endpoints

export const { useDeleteMutation } = api
