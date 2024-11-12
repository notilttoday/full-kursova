/* eslint-disable import/no-default-export */

'use client'

import { combineSlices, configureStore, createDynamicMiddleware } from '@reduxjs/toolkit'
// eslint-disable-next-line no-restricted-imports
import { useDispatch, useSelector } from 'react-redux'
import { default as createSagaMiddleware } from 'redux-saga'

/**
 * need for next overriding with slices
 */
interface LazyLoadedSlices {}

const rootReducer = combineSlices().withLazyLoadedSlices<LazyLoadedSlices>()

const dynamicMiddleware = createDynamicMiddleware()

const sagasMiddleware = createSagaMiddleware()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat([dynamicMiddleware.middleware, sagasMiddleware]),
  })

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useAppSelector = useSelector.withTypes<RootState>()

export const reducer = rootReducer

export const middleware = {
  inject: dynamicMiddleware.addMiddleware,
}

export const saga = sagasMiddleware

// Infer the type of createStore
export type AppStore = ReturnType<typeof createStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
