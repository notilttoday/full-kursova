import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type PostProductResultDto } from '@boilerplate/types/products/dto/responses/products'

import { saga } from '@boilerplate/dashboard/store'

import { updateProduct } from '@boilerplate/dashboard/store/queries/products.query'
import { updateProductSlice } from '@boilerplate/dashboard/store/slices/update-product.slice'

import { notification } from '@boilerplate/dashboard/utils/notification'

interface UpdateProductStartActionPayload {
  redirect: () => void
}

export const updateProductStart = createAction<UpdateProductStartActionPayload>(
  createSagaActionType('create-product-start'),
)

function* handler(action: PayloadAction<UpdateProductStartActionPayload>): SagaIterator<void> {
  try {
    const productId: string = yield select(updateProductSlice.selectors.productId)
    const title: ReturnType<typeof updateProductSlice.selectors.title> = yield select(
      updateProductSlice.selectors.title,
    )
    const description: ReturnType<typeof updateProductSlice.selectors.description> = yield select(
      updateProductSlice.selectors.description,
    )
    const price: ReturnType<typeof updateProductSlice.selectors.price> = yield select(
      updateProductSlice.selectors.price,
    )
    const game: ReturnType<typeof updateProductSlice.selectors.game> = yield select(updateProductSlice.selectors.game)
    const file: ReturnType<typeof updateProductSlice.selectors.file> = yield select(updateProductSlice.selectors.file)

    if (!file) {
      throw new Error('Файл не вибрано!')
    }

    const formData = new FormData()

    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price.toString())
    formData.append('game', game)
    formData.append('file', file)

    const postProductRequest = yield put(updateProduct.initiate({ productId, formData }))

    const postProductResponse: HttpClientResponse<PostProductResultDto> = yield call(() => postProductRequest)

    if (!postProductResponse?.data?.isSuccess) {
      notification.error("Something's wrong!")

      return
    }

    yield call(action.payload.redirect)
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(updateProductStart, handler)
})
