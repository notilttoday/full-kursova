import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { type GetProduct } from '@boilerplate/types/products/interfaces/products'

import { reducer } from '@boilerplate/front-end/store'

interface ProductState {
  productId: string
  product?: GetProduct | null
}

const slice = createSlice({
  name: 'product',
  initialState: (): ProductState => ({
    productId: '',
    product: null,
  }),
  selectors: {
    productId: (state) => state.productId,
    product: (state) => state.product,
  },
  reducers: {
    setId(state, action: PayloadAction<string>) {
      state.productId = action.payload
    },
    setProduct(state, action: PayloadAction<GetProduct | null>) {
      state.product = action.payload
    },
  },
})

const withSlice = reducer.inject(slice)

export const productSlice = {
  /**
   
Omit reducer and reducerPath for prevent any other connections of it to store*/..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    productId: withSlice.selector(slice.selectors.productId),
    product: withSlice.selector(slice.selectors.product),
  },
}

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> { }
}