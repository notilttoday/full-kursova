'use client'

import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'

import { saga } from '@boilerplate/front-end/store'

import { postOrder } from '@boilerplate/front-end/store/queries/order.query'
import { orderSlice } from '@boilerplate/front-end/store/slices/order.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

function* handler(): SagaIterator<void> {
  try {
    const id: ReturnType<typeof orderSlice.selectors.id> = yield select(orderSlice.selectors.id)

    if (id) {
      return
    }

    const isAuthorized: ReturnType<typeof profileSlice.selectors.isAuthorized> = yield select(
      profileSlice.selectors.isAuthorized,
    )

    const postOrderRequest = yield put(postOrder.initiate({ authorized: isAuthorized }))

    yield call(() => postOrderRequest)
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  if (typeof window !== 'object') {
    return
  }

  try {
    yield call(handler)
  } catch (error) {
    logger.error(error)
  }
})
