import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/front-end/store'

interface ProductsListState {
  id?: string
  title: string
  price: number
  game: string[]
}

const slice = createSlice({
  name: createSliceKey('product-card-list'),
  initialState: (): ProductsListState => ({
    id: '',
    title: '',
    price: 0,
    game: [],
  }),
  selectors: {
    id: (state) => state.id,
    title: (state) => state.title,
    price: (state) => state.price,
    game: (state) => state.game,
  },
  reducers: {
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload
    },
    setGame(state, action: PayloadAction<string[]>) {
      state.game = action.payload
    },
  },
})

const withSlice = reducer.inject(slice)

export const productsListSlice = {
  /**
   
Omit reducer and reducerPath for prevent any other connections of it to store*/ ..._omit(slice, [
    'reducer',
    'reducerPath',
  ]),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    id: withSlice.selector(slice.selectors.id),
    title: withSlice.selector(slice.selectors.title),
    price: withSlice.selector(slice.selectors.price),
    game: withSlice.selector(slice.selectors.game),
  },
}

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> {}
}
