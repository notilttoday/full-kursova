'use client'

import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { type MyProfile } from '@boilerplate/types/auth/interfaces/profile'

import { reducer } from '@boilerplate/front-end/store'

export interface JwtState {
  data?: MyProfile | null
}

const slice = createSlice({
  name: createSliceKey('profile'),
  initialState: (): JwtState => ({
    data: undefined,
  }),
  selectors: {
    profile: (state) => state.data,
  },
  reducers: {
    init(state, action: PayloadAction<MyProfile | null>) {
      state.data = action.payload
    },
  },
})

const withSlice = reducer.inject(slice)

export const profileSlice = {
  /**
   * Omit reducer and reducerPath for prevent any other connections of it to store
   */
  ..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    profile: withSlice.selector(slice.selectors.profile),
  },
}

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> {}
}
