import { Method } from '@boilerplate/core/interfaces/http'

import {
  type PostContactMessageDataDto,
  type PostContactMessageHttpClientRequestDto,
  PostContactMessageUrl,
} from '@boilerplate/types/contact-message/dto/requests/contact-messages'
import { PostContactMessageResultDto } from '@boilerplate/types/contact-message/dto/responses/contact-messages'

import { v1Api } from '@boilerplate/front-end/store/api/v1.api'

const api = v1Api.injectEndpoints({
  endpoints: (build) => ({
    postContactMessage: build.mutation<PostContactMessageResultDto, PostContactMessageDataDto>({
      query: ({ firstName, lastName, email, phone, message, userId }): PostContactMessageHttpClientRequestDto => ({
        method: Method.Post,
        url: PostContactMessageUrl,
        data: {
          firstName,
          lastName,
          email,
          phone,
          message,
          userId,
        },
      }),
    }),
  }),
})

export const { postContactMessage } = api.endpoints