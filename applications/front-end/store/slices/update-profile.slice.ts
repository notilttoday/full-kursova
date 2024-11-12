import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/front-end/store'

interface UpdateProfileState {
  firstName: string
  lastName: string
  phone: string
  statusText: string
  favGames: string[]
  userId: string;
}

const slice = createSlice({
  name: createSliceKey('update-profile'),
  initialState: (): UpdateProfileState => ({
    firstName: '',
    lastName: '',
    phone: '',
    statusText: '',
    favGames: [],
    userId: '',
  }),
  selectors: {
    firstName: (state) => state.firstName,
    lastName: (state) => state.lastName,
    phone: (state) => state.phone,
    statusText: (state) => state.statusText,
    favGames: (state) => state.favGames,
    userId: (state) => state.userId,
  },
  reducers: {
    setFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload
    },
    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload
    },
    setStatusText(state, action: PayloadAction<string>) {
      state.statusText = action.payload
    },
    setFavGames(state, action: PayloadAction<string[]>) {
      state.favGames = action.payload
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload
    },
  },
})

const withSlice = reducer.inject(slice)

export const updateProfileSlice = {
  /**
   * Omit reducer and reducerPath for prevent any other connections of it to store
   */
  ..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    firstName: withSlice.selector(slice.selectors.firstName),
    lastName: withSlice.selector(slice.selectors.lastName),
    phone: withSlice.selector(slice.selectors.phone),
    statusText: withSlice.selector(slice.selectors.statusText),
    favGames: withSlice.selector(slice.selectors.favGames),
    userId: withSlice.selector(slice.selectors.userId),
  },
}

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> { }
}
