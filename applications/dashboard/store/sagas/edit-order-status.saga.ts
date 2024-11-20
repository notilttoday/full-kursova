import { type useRouter } from 'next/navigation'

import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, getContext, put, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type PatchOrderStatusResultDto } from '@boilerplate/types/orders/dto/responses/orders'

import { saga } from '@boilerplate/dashboard/store'

import { patchOrderStatus } from '@boilerplate/dashboard/store/queries/edit-status.query'

import { notification } from '@boilerplate/dashboard/utils/notification'

interface PatchOrderStatusStartActionPayload {
  orderId: string
  paymentStatus: string
}

export const patchOrderStatusStart = createAction<PatchOrderStatusStartActionPayload>(
  createSagaActionType('patch-order-status-start'),
)

function* handler(action: PayloadAction<PatchOrderStatusStartActionPayload>): SagaIterator<void> {
  try {
    const router: ReturnType<typeof useRouter> = yield getContext('router')

    const { orderId } = action.payload
    const { paymentStatus } = action.payload

    const patchOrderStatusRequest = yield put(patchOrderStatus.initiate({ orderId, paymentStatus }))

    const patchOrderStatusResponse: HttpClientResponse<PatchOrderStatusResultDto> = yield call(
      () => patchOrderStatusRequest,
    )

    if (!patchOrderStatusResponse?.data?.isSuccess) {
      yield call(notification.error, 'Щось пішло не так!')

      return
    }

    yield call(notification.success, 'Статус змінено!')

    yield call(router.push, '/orders')
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(patchOrderStatusStart, handler)
})
