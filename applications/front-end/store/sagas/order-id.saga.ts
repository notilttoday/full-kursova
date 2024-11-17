'use client'

import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'

import { saga } from '@boilerplate/front-end/store'

import { postAuthorizedOrder, postUnauthorizedOrder } from '@boilerplate/front-end/store/queries/order.query'
import { orderSlice } from '@boilerplate/front-end/store/slices/order.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

function* handler(): SagaIterator<void> {
  try {
    const id: ReturnType<typeof orderSlice.selectors.id> = yield select(orderSlice.selectors.id)

    if (id) {
      return
    }

    const profile: ReturnType<typeof profileSlice.selectors.profile> = yield select(profileSlice.selectors.profile)

    if (profile) {
      const postAuthorizedOrderRequest = yield put(postAuthorizedOrder.initiate(undefined))

      yield call(() => postAuthorizedOrderRequest)

      return
    }

    const postUnauthorizedOrderRequest = yield put(postUnauthorizedOrder.initiate(undefined))

    yield call(() => postUnauthorizedOrderRequest)
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
