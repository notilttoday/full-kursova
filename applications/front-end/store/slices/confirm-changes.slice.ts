import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/front-end/store'

interface ConfirmChangesState {
  open: boolean
  title: string
  description?: string
}

const slice = createSlice({
  name: createSliceKey('confirm-changes'),
  initialState: (): ConfirmChangesState => ({
    open: false,
    title: '',
  }),
  selectors: {
    open: (state) => state.open,
    title: (state) => state.title,
    description: (state) => state.description,
  },
  reducers: {
    open(state) {
      state.open = true
    },
    close(state) {
      state.open = false
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setDescription(state, action: PayloadAction<string | undefined>) {
      state.description = action.payload
    },
  },
})

const withSlice = reducer.inject(slice)

export const confirmChangesSlice = {
  /**
   * Omit reducer and reducerPath for prevent any other connections of it to store
   */
  ..._omit(slice, ['reducer', 'reducerPath']),
  selectSlice: withSlice.selector(slice.selectSlice),
  selectors: {
    open: withSlice.selector(slice.selectors.open),
    title: withSlice.selector(slice.selectors.title),
    description: withSlice.selector(slice.selectors.description),
  },
}

declare module '@boilerplate/front-end/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> {}
}
