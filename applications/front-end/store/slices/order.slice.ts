import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/front-end/store'

import { postOrder } from '@boilerplate/front-end/store/queries/order.query'

interface OrdersListState {
  id: string | null
  firstName: string
  lastName: string
  phone: string
  email: string
  // paymentType: string | null
}

const slice = createSlice({
  name: createSliceKey('order-card-list'),
  initialState: (): OrdersListState => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // paymentType: '',
    id: localStorage.getItem('orderId') || null,
  }),
  selectors: {
    id: (state) => state.id,
    firstName: (state) => state.firstName,
    lastName: (state) => state.lastName,
    email: (state) => state.email,
    phone: (state) => state.phone,
    // paymentType: (state) => state.paymentType,
  },
  reducers: {
    setId(state, action: PayloadAction<string>) {
      localStorage.setItem('orderId', action.payload)

      state.id = action.payload
    },
    clearId(state) {
      localStorage.removeItem('orderId')

      state.id = null
    },
    setFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload
    },
    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload
    },
    // setPaymentType(state, action: PayloadAction<string>) {
    //   state.paymentType = action.payload
    // },
  },
  extraReducers(builder) {
    builder.addMatcher(postOrder.matchFulfilled, (state, action) => {
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
    firstName: withSlice.selector(slice.selectors.firstName),
    lastName: withSlice.selector(slice.selectors.lastName),
    email: withSlice.selector(slice.selectors.email),
    phone: withSlice.selector(slice.selectors.phone),
    // paymentType: withSlice.selector(slice.selectors.paymentType),
  },
}

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> {}
}
