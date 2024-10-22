import { type Action, type PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { type RootState } from '@boilerplate/front-end/store'

export const isHydrateAction = (action: Action): action is PayloadAction<RootState> => action.type === HYDRATE
