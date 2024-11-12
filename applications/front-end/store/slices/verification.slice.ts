import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { reducer } from '@boilerplate/front-end/store'

interface VerificationState {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  repeatPassword: string
}

const slice = createSlice({
  name: 'verification',
  initialState: (): VerificationState => ({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: '',
  }),
  selectors: {
    id: (state) => state.id,
    firstName: (state) => state.firstName,
    lastName: (state) => state.lastName,
    email: (state) => state.email,
    phone: (state) => state.phone,
    password: (state) => state.password,
    repeatPassword: (state) => state.repeatPassword,
  },
  reducers: {
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload
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
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
    setRepeatPassword(state, action: PayloadAction<string>) {
      state.repeatPassword = action.payload
    },
  },
})

const withSlice = reducer.inject(slice)

export const verificationSlice = {
  /**
   * Omit reducer and reducerPath for prevent any other connections of it to store
   */
  ..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    id: withSlice.selector(slice.selectors.id),
    firstName: withSlice.selector(slice.selectors.firstName),
    lastName: withSlice.selector(slice.selectors.lastName),
    email: withSlice.selector(slice.selectors.email),
    phone: withSlice.selector(slice.selectors.phone),
    password: withSlice.selector(slice.selectors.password),
    repeatPassword: withSlice.selector(slice.selectors.repeatPassword),
  },
}

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> {}
}
