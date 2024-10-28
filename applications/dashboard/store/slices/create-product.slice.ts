import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/dashboard/store'

interface CreateProductState {
  title: string
  descritption: string
  price: number
}

const slice = createSlice({
  name: createSliceKey('create-product'),
  initialState: (): CreateProductState => ({
    title: '',
    descritption: '',
    price: 0
  }),
  selectors: {
    title: (state) => state.title,
    description: (state) => state.descritption,
    price: (state) => state.price,
  },
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
      state.descritption = action.payload
    },
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload
    },
  },
})

const withSlice = reducer.inject(slice)

export const createProductSlice = {
  /**
   * Omit reducer and reducerPath for prevent any other connections of it to store
   */
  ..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    title: withSlice.selector(slice.selectors.title),
    description: withSlice.selector(slice.selectors.description),
    price: withSlice.selector(slice.selectors.price),
  },
}

declare module '@boilerplate/dashboard/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> { }
}
