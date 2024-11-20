import { Method } from '@boilerplate/core/interfaces/http'

import {
  type GetReferencePaymentMethodsHttpClientRequestDto,
  GetReferencePaymentMethodsUrl,
} from '@boilerplate/types/reference/dto/requests/reference'
import { type ReferencePaymentMethodsDto } from '@boilerplate/types/reference/dto/responses/reference'

import { v1Api } from '@boilerplate/front-end/store/api/v1.api'

const api = v1Api.injectEndpoints({
  endpoints: (build) => ({
    getPaymentMethods: build.query<ReferencePaymentMethodsDto[], void>({
      query: (): GetReferencePaymentMethodsHttpClientRequestDto => ({
        method: Method.Get,
        url: GetReferencePaymentMethodsUrl,
      }),
    }),
  }),
})

export const { useGetPaymentMethodsQuery } = api
