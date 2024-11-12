import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/dashboard/store'
import { GameType } from '@boilerplate/types/products/interfaces/products'

interface CreateProductState {
  title: string
  description: string
  price: number
  game: string
  file: File | null
}

const slice = createSlice({
  name: createSliceKey('create-product'),
  initialState: (): CreateProductState => ({
    title: '',
    description: '',
    price: 0,
    game: '',
    file: null,
  }),
  selectors: {
    title: (state) => state.title,
    description: (state) => state.description,
    price: (state) => state.price,
    game: (state) => state.game,
    file: (state) => state.file,
  },
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
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
    game: withSlice.selector(slice.selectors.game),
    file: withSlice.selector(slice.selectors.file),
  },
}

declare module '@boilerplate/dashboard/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> { }
}
