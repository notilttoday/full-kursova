import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type PatchProductResultDto } from '@boilerplate/types/products/dto/responses/products'

import { saga } from '@boilerplate/dashboard/store'

import { updateProduct } from '@boilerplate/dashboard/store/queries/products.query'
import { updateProductSlice } from '@boilerplate/dashboard/store/slices/update-product.slice'

import { notification } from '@boilerplate/dashboard/utils/notification'

interface UpdateProductStartActionPayload {
  redirect: () => void
}

export const updateProductStart = createAction<UpdateProductStartActionPayload>(
  createSagaActionType('update-product-start'),
)

function* handler(action: PayloadAction<UpdateProductStartActionPayload>): SagaIterator<void> {
  try {
    const productId: ReturnType<typeof updateProductSlice.selectors.productId> = yield select(
      updateProductSlice.selectors.productId,
    )
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

    const formData = new FormData()

    if (file) {
      formData.append('file', file)
    }

    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price.toString())
    formData.append('game', game)

    const patchProductRequest = yield put(updateProduct.initiate({ productId, formData }))

    const patchProductResponse: HttpClientResponse<PatchProductResultDto> = yield call(() => patchProductRequest)

    if (!patchProductResponse?.data?.isSuccess) {
      notification.error('Щось пішло не так!')

      return
    }

    yield call(notification.success, 'Продукт оновлено!')

    yield call(action.payload.redirect)
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(updateProductStart, handler)
})
