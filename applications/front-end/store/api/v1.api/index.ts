'use client'

import { type WithSlice } from '@reduxjs/toolkit'
import { createApi } from '@reduxjs/toolkit/query/react'

import { createApiKey } from '@boilerplate/core/builders/api-key.builder'
import { createAxiosBaseQuery } from '@boilerplate/core/builders/axios-base-query.builder'
import { isHydrateAction } from '@boilerplate/core/utils/is-hydrate-action.util'

import { middleware, reducer } from '@boilerplate/front-end/store'

export const v1Api = createApi({
  reducerPath: createApiKey('main', '1'),
  baseQuery: createAxiosBaseQuery(),
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return action.payload[reducerPath]
    }
  },

  tagTypes: ['Order', 'Profile'],

  endpoints: () => ({}),
})

reducer.inject(v1Api)

middleware.inject(v1Api.middleware)

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof v1Api> {}
}
