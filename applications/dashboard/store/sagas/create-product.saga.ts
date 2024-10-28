import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { saga } from '@boilerplate/dashboard/store'

import { create } from '@boilerplate/dashboard/store/queries/products.query'
import { createProductSlice } from '../slices/create-product.slice'
import { PostProductResultDto } from '@boilerplate/types/products/dto/responses/products'

interface CreateProductStartActionPayload {
  redirect: () => void
}

export const createProductStart = createAction<CreateProductStartActionPayload>(createSagaActionType('create-product-start'))

function* handler(action: PayloadAction<CreateProductStartActionPayload>): SagaIterator<void> {
  try {
    const title: ReturnType<typeof createProductSlice.selectors.title> = yield select(createProductSlice.selectors.title)
    const description: ReturnType<typeof createProductSlice.selectors.description> = yield select(createProductSlice.selectors.description)
    const price: ReturnType<typeof createProductSlice.selectors.price> = yield select(createProductSlice.selectors.price)

    const postProductRequest = yield put(create.initiate({ title, description, price }))

    const postProductResponse: HttpClientResponse<PostProductResultDto> = yield call(() => postProductRequest)

    yield call(action.payload.redirect)
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(createProductStart, handler)
})