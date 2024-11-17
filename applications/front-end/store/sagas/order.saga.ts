import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { saga } from '@boilerplate/front-end/store'

import { postAuthorizedOrder, postUnauthorizedOrder } from '@boilerplate/front-end/store/queries/orders.query'
import { selectUserGid } from '@boilerplate/front-end/store/selectors/auth.selector'
import { orderSlice } from '@boilerplate/front-end/store/slices/order.slice'

interface CreateOrderStartActionPayload {
  redirect: () => void
}

export const createOrderStart = createAction<CreateOrderStartActionPayload>(createSagaActionType('create-order-start'))

function* handler(action: PayloadAction<CreateOrderStartActionPayload>): SagaIterator<void> {
  try {
    const userGid: string | null = yield select(selectUserGid)

    const order: ReturnType<typeof orderSlice.selectors.order> = yield select(orderSlice.selectors.order)

    if (userGid) {
      const createOrderRequest = yield put(postAuthorizedOrder.initiate({ orderId: order.id }))
      const createOrderResponse: HttpClientResponse<PostOrderResultDto> = yield call(() => createOrderRequest)

      logger.info('Authorized order created', createOrderResponse)
    } else {
      const createOrderRequest = yield put(postUnauthorizedOrder.initiate())
      const createOrderResponse: HttpClientResponse<PostOrderResultDto> = yield call(() => createOrderRequest)

      logger.info('Unauthorized order created', createOrderResponse)
    }

    yield call(action.payload.redirect)
  } catch (error) {
    logger.error('Error creating order:', error)
  }
}

saga.run(function* () {
  yield takeLatest(createOrderStart, handler)
})
