import { type PayloadAction, type WithSlice, createSlice } from '@reduxjs/toolkit'
import _omit from 'lodash/omit'

import { createSliceKey } from '@boilerplate/core/builders/slice-key.builder'

import { reducer } from '@boilerplate/dashboard/store'

interface ConfirmDeletionState {
  open: boolean
  title: string
  description?: string
}

const slice = createSlice({
  name: createSliceKey('confirm-deletion'),
  initialState: (): ConfirmDeletionState => ({
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

export const confirmDeletionSlice = {
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

declare module '@boilerplate/dashboard/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof slice> {}
}
