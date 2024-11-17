'use client'

import { type WithSlice } from '@reduxjs/toolkit'
import { createApi } from '@reduxjs/toolkit/query/react'

import { createApiKey } from '@boilerplate/core/builders/api-key.builder'
import { createAxiosBaseQuery } from '@boilerplate/core/builders/axios-base-query.builder'
import { isHydrateAction } from '@boilerplate/core/utils/is-hydrate-action.util'

import { middleware, reducer } from '@boilerplate/dashboard/store'

export const v1ReactApi = createApi({
  reducerPath: createApiKey('[React] main', '1'),
  baseQuery: createAxiosBaseQuery(),
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return action.payload[reducerPath]
    }
  },

  tagTypes: ['Product'],
  endpoints: () => ({}),
})

reducer.inject(v1ReactApi)

middleware.inject(v1ReactApi.middleware)

declare module '@boilerplate/dashboard/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof v1ReactApi> {}
}
