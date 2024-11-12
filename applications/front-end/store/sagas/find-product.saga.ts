import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'
import { jwtStore } from '@boilerplate/core/stores/jwt.store'

import { type GetProductShortDto } from '@boilerplate/types/products/dto/responses/products'

import { saga } from '@boilerplate/front-end/store'

import { getProducts } from '@boilerplate/front-end/store/queries/products.query'
import { productsListSlice } from '@boilerplate/front-end/store/slices/products-list.slice'

interface FindProductsActionPayload {
  redirect: () => void
  title?: string
  game?: string[]
}

export const findProductsStart = createAction<FindProductsActionPayload>(createSagaActionType('sign-in-start'))

function* handler(action: PayloadAction<FindProductsActionPayload>): SagaIterator<void> {
  try {
    const title: string | undefined = yield select(productsListSlice.selectors.title)
    const game: string[] | undefined = yield select(productsListSlice.selectors.game)

    const queryParams: Record<string, any> = {}
    if (title) {
      queryParams.title = title
    }

    if (game) {
      queryParams.game = game
    }

    const getProductsRequest = yield put(getProducts.initiate(queryParams))
    const getProductsResponse: HttpClientResponse<GetProductShortDto> = yield call(() => getProductsRequest)

    yield call(action.payload.redirect)
  } catch (error) {
    jwtStore.clear()
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(findProductsStart, handler)
})