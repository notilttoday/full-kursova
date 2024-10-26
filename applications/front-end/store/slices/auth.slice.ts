import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/front-end/store'

interface SignUpState {
  firstName: string
  lastName: string
  email: string
  password: string
  repeatPassword: string
  promoCode: string
  phone: string
  usResident: boolean
}

const slice = createSlice({
  name: createSliceKey('auth'),
  initialState: (): SignUpState => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    promoCode: '',
    phone: '',
    usResident: false,
  }),
  selectors: {
    firstName: (state) => state.firstName,
    lastName: (state) => state.lastName,
    email: (state) => state.email,
    password: (state) => state.password,
    repeatPassword: (state) => state.repeatPassword,
    promoCode: (state) => state.promoCode,
    phone: (state) => state.phone,
    usResident: (state) => state.usResident,
  },
  reducers: {
    setFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload
    },
    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
    setRepeatPassword(state, action: PayloadAction<string>) {
      state.repeatPassword = action.payload
    },
    setPromoCode(state, action: PayloadAction<string>) {
      state.promoCode = action.payload
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload
    },
    setUsResident(state, action: PayloadAction<boolean>) {
      state.usResident = action.payload
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
    firstName: withSlice.selector(slice.selectors.firstName),
    lastName: withSlice.selector(slice.selectors.lastName),
    email: withSlice.selector(slice.selectors.email),
    password: withSlice.selector(slice.selectors.password),
    repeatPassword: withSlice.selector(slice.selectors.repeatPassword),
    promoCode: withSlice.selector(slice.selectors.promoCode),
    phone: withSlice.selector(slice.selectors.phone),
    usResident: withSlice.selector(slice.selectors.usResident),
  },
}

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> {}
}
