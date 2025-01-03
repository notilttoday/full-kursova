import { Method } from '@boilerplate/core/interfaces/http'

import {
  DeleteProductUrl,
  type GetProductHttpClientRequestDto,
  GetProductRequestUrl,
  type PatchProductMyHttpClientRequestDto,
  PatchProductMyUrl,
  type PostProductHttpClientRequestDto,
  PostProductUrl,
} from '@boilerplate/types/products/dto/requests/products'
import {
  type GetProductDto,
  type PatchProductResultDto,
  type PostProductResultDto,
} from '@boilerplate/types/products/dto/responses/products'

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
    updateProduct: build.mutation<PatchProductResultDto, { productId: string; formData: FormData }>({
      query: ({ productId, formData }): PatchProductMyHttpClientRequestDto => ({
        method: Method.Patch,
        url: PatchProductMyUrl,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
        params: {
          productId,
        },
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Product', id: 'current' },
        { type: 'Product', id: productId },
        { type: 'Product', id: 'LIST' },
      ],
    }),
    getProduct: build.query<GetProductDto, string>({
      query: (productId: string): GetProductHttpClientRequestDto => ({
        method: Method.Get,
        url: GetProductRequestUrl,
        params: {
          productId,
        },
      }),
    }),
  }),
})

export const { create, delete: deleteProduct, updateProduct, getProduct } = api.endpoints

export const { useDeleteMutation, useUpdateProductMutation, useGetProductQuery } = api
