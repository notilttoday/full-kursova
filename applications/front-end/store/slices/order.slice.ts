import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/front-end/store'

interface OrderItem {
  id: string
  quantity: number
}

interface OrderState {
  order: OrderItem[]
}

const slice = createSlice({
  name: createSliceKey('order'),
  initialState: (): OrderState => ({
    order: [],
  }),
  selectors: {
    order: (state) => state.order,
    quantity: (state) => state.order.reduce((acc, { quantity }) => acc + quantity, 0),
  },
  reducers: {
    add(state, action: PayloadAction<OrderItem>) {
      const existingItem = state.order.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.order.push(action.payload)
      }
    },
    remove(state, action: PayloadAction<string>) {
      state.order = state.order.filter((item) => item.id !== action.payload)
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const item = state.order.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
  },
})

const withSlice = reducer.inject(slice)

export const orderSlice = {
  /**
   * Omit reducer and reducerPath for prevent any other connections of it to store
   */
  ..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    order: withSlice.selector(slice.selectors.order),
    quantity: withSlice.selector(slice.selectors.quantity),
  },
}

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> {}
}
