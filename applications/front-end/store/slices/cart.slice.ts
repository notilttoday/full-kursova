import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/front-end/store'

interface CartItem {
  id: string
  quantity: number
}

interface CartState {
  cart: CartItem[]
}

const slice = createSlice({
  name: createSliceKey('cart'),
  initialState: (): CartState => ({
    cart: []
  }),
  selectors: {
    cart: state => state.cart,
    quantity: state => state.cart.reduce((acc, { quantity }) => acc + quantity, 0)
  },
  reducers: {
    add(state, action: PayloadAction<CartItem>) {
      state.cart.push(action.payload)
    },
    remove(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
  },
})

const withSlice = reducer.inject(slice)

export const cartSlice = {
  /**
   * Omit reducer and reducerPath for prevent any other connections of it to store
   */
  ..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    cart: withSlice.selector(slice.selectors.cart),
    quantity: withSlice.selector(slice.selectors.quantity),
  },
}

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> { }
}
