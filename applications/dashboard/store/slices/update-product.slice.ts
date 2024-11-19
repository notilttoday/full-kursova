import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/dashboard/store'

interface UpdateProductState {
  productId: string
  description: string
  title: string
  price: number
  game: string
  file: File | null
}

const slice = createSlice({
  name: createSliceKey('update-product'),
  initialState: (): UpdateProductState => ({
    productId: '',
    description: '',
    title: '',
    price: 0,
    game: '',
    file: null,
  }),
  selectors: {
    productId: (state) => state.productId,
    description: (state) => state.description,
    title: (state) => state.title,
    price: (state) => state.price,
    game: (state) => state.game,
    file: (state) => state.file,
  },
  reducers: {
    setProductId(state, action: PayloadAction<string>) {
      state.productId = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload
    },
    setGame(state, action: PayloadAction<string>) {
      state.game = action.payload
    },
    setFile(state, action: PayloadAction<File | null>) {
      state.file = action.payload
    },
  },
})

const withSlice = reducer.inject(slice)

export const updateProductSlice = {
  /**
   * Omit reducer and reducerPath for prevent any other connections of it to store
   */
  ..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    productId: withSlice.selector(slice.selectors.productId),
    description: withSlice.selector(slice.selectors.description),
    title: withSlice.selector(slice.selectors.title),
    price: withSlice.selector(slice.selectors.price),
    game: withSlice.selector(slice.selectors.game),
    file: withSlice.selector(slice.selectors.file),
  },
}

declare module '@boilerplate/dashboard/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> {}
}
