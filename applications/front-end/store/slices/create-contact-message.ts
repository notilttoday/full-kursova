import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/front-end/store'

interface CreateContactMessageState {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  userId: string
}

const slice = createSlice({
  name: createSliceKey('contact-message'),
  initialState: (): CreateContactMessageState => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    userId: '',
  }),
  selectors: {
    firstName: state => state.firstName,
    lastName: state => state.lastName,
    email: state => state.email,
    phone: state => state.phone,
    message: state => state.message,
    userId: state => state.userId,
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
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload
    },
  },
})

const withSlice = reducer.inject(slice)

export const contactMessageSlice = {
  /**
   * Omit reducer and reducerPath for prevent any other connections of it to store
   */
  ..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    firstName: withSlice.selector(slice.selectors.firstName),
    lastName: withSlice.selector(slice.selectors.lastName),
    email: withSlice.selector(slice.selectors.email),
    phone: withSlice.selector(slice.selectors.phone),
    message: withSlice.selector(slice.selectors.message),
    userId: withSlice.selector(slice.selectors.userId),
  },
}

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> { }
}
