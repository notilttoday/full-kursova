import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/dashboard/store'

interface SignUpState {
  email: string
  password: string
}

const slice = createSlice({
  name: createSliceKey('auth'),
  initialState: (): SignUpState => ({
    email: '',
    password: '',
  }),
  selectors: {
    email: (state) => state.email,
    password: (state) => state.password,
  },
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
  },
})

const withSlice = reducer.inject(slice)

export const authSlice = {
  /**
   * Omit reducer and reducerPath for prevent any other connections of it to store
   */
  ..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    email: withSlice.selector(slice.selectors.email),
    password: withSlice.selector(slice.selectors.password),
  },
}

declare module '@boilerplate/dashboard/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> {}
}
