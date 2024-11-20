import { Method } from '@boilerplate/core/interfaces/http'

import {
  type PatchOrderStatusDto,
  type PatchOrderStatusMyHttpClientRequestDto,
  type PatchOrderStatusParamsDto,
  PatchOrderStatusUrl,
} from '@boilerplate/types/orders/dto/requests/orders'
import { type PatchOrderStatusResultDto } from '@boilerplate/types/orders/dto/responses/orders'

import { v1ReactApi } from '@boilerplate/dashboard/store/api/v1.api/react.api'

const api = v1ReactApi.injectEndpoints({
  endpoints: (build) => ({
    patchOrderStatus: build.mutation<PatchOrderStatusResultDto, PatchOrderStatusParamsDto & PatchOrderStatusDto>({
      query: ({ orderId, paymentStatus }): PatchOrderStatusMyHttpClientRequestDto => ({
        method: Method.Patch,
        url: PatchOrderStatusUrl,
        data: {
          paymentStatus,
        },
        params: {
          orderId,
        },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: 'current' },
        { type: 'Order', id: orderId },
        { type: 'Order', id: 'LIST' },
      ],
    }),
  }),
})

export const { patchOrderStatus } = api.endpoints
