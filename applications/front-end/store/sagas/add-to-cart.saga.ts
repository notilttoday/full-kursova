import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type PostContactMessageResultDto } from '@boilerplate/types/contact-message/dto/responses/contact-messages'

import { saga } from '@boilerplate/front-end/store'

import { patchOrder, postOrder } from '@boilerplate/front-end/store/queries/order.query'
import { orderSlice } from '@boilerplate/front-end/store/slices/order.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import { notification } from '@boilerplate/front-end/utils/notification'

interface AddToCartActionPayload {
  productId: string
  quantity: number
}

export const addToCartStart = createAction<AddToCartActionPayload>(createSagaActionType('add-to-cart-start'))

function* handler(action: PayloadAction<AddToCartActionPayload>): SagaIterator<void> {
  try {
    const { productId, quantity } = action.payload
    let orderId: ReturnType<typeof orderSlice.selectors.id> = yield select(orderSlice.selectors.id)
    const authorized: ReturnType<typeof profileSlice.selectors.isAuthorized> = yield select(
      profileSlice.selectors.isAuthorized,
    )

    if (!orderId) {
      const postOrderRequest = yield put(postOrder.initiate({ authorized }))

      yield call(() => postOrderRequest)

      orderId = (yield select(orderSlice.selectors.id)) as string
    }

    const patchOrderRequest = yield put(patchOrder.initiate({ orderId, productId, quantity, authorized }))

    const patchOrderResponse: HttpClientResponse<PostContactMessageResultDto> = yield call(() => patchOrderRequest)

    if (!patchOrderResponse?.data?.isSuccess) {
      yield call(notification.error, 'Щось пішло не так')

      return
    }
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(addToCartStart, handler)
})
