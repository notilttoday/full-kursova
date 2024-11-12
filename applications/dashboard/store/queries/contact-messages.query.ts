import { Method } from '@boilerplate/core/interfaces/http'

import { type GetContactMessagesHttpClientRequestDto, GetContactMessagesRequestUrl } from '@boilerplate/types/contact-message/dto/requests/contact-messages'
import { type GetContactMessageDto } from '@boilerplate/types/contact-message/dto/responses/contact-messages'

import { v1ReactApi } from '@boilerplate/dashboard/store/api/v1.api/react.api'

const api = v1ReactApi.injectEndpoints({
  endpoints: (build) => ({
    receive: build.query<GetContactMessageDto[], void>({
      query: (): GetContactMessagesHttpClientRequestDto => ({
        method: Method.Get,
        url: GetContactMessagesRequestUrl,
      }),
    }),
  }),
})

export const { useReceiveQuery } = api

export const { receive } = api.endpoints
