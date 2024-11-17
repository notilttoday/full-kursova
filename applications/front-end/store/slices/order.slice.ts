import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/front-end/store'

import { postUnauthorizedOrder } from '@boilerplate/front-end/store/queries/order.query'

interface OrdersListState {
  id: string | null
}

const slice = createSlice({
  name: createSliceKey('order-card-list'),
  initialState: (): OrdersListState => ({
    id: localStorage.getItem('orderId') || null,
  }),
  selectors: {
    id: (state) => state.id,
  },
  reducers: {
    setId(state, action: PayloadAction<string>) {
      localStorage.setItem('orderId', action.payload)

      state.id = action.payload
    },
  },
  extraReducers(builder) {
    builder.addMatcher(postUnauthorizedOrder.matchFulfilled, (state, action) => {
      localStorage.setItem('orderId', action.payload.orderId)

      state.id = action.payload.orderId
    })
  },
})

const withSlice = reducer.inject(slice)

export const orderSlice = {
  /**
   
Omit reducer and reducerPath for prevent any other connections of it to store*/ ..._omit(slice, [
    'reducer',
    'reducerPath',
  ]),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    id: withSlice.selector(slice.selectors.id),
  },
}

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> {}
}
