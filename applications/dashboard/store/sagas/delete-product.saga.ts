import { type useRouter } from 'next/navigation'

import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, getContext, put, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type DeleteProductResultDto } from '@boilerplate/types/products/dto/responses/products'

import { saga } from '@boilerplate/dashboard/store'

import { deleteProduct } from '@boilerplate/dashboard/store/queries/products.query'
import { confirmDeletion } from '@boilerplate/dashboard/store/sagas/confirm-deletion.saga'

import { notification } from '@boilerplate/dashboard/utils/notification'

interface DeleteProductStartActionPayload {
  productId: string
}

export const deleteProductStart = createAction<DeleteProductStartActionPayload>(
  createSagaActionType('delete-product-start'),
)

function* handler(action: PayloadAction<DeleteProductStartActionPayload>): SagaIterator<void> {
  try {
    const isConfirmed = yield call(confirmDeletion, {
      title: 'Підтвердження видалення',
      description: 'Обраний продукт буде видалено.',
    })

    if (!isConfirmed) {
      return
    }

    const router: ReturnType<typeof useRouter> = yield getContext('router')

    const { productId } = action.payload

    const deleteProductRequest = yield put(deleteProduct.initiate(productId))

    const deleteProductResponse: HttpClientResponse<DeleteProductResultDto> = yield call(() => deleteProductRequest)

    if (!deleteProductResponse?.data?.isSuccess) {
      yield call(notification.error, "Something's wrong!")

      return
    }

    yield call(notification.success, 'Продукт видалено!')

    yield call(router.push, '/')
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(deleteProductStart, handler)
})
