import { type useRouter } from 'next/navigation'

import { createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, getContext, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type PostContactMessageResultDto } from '@boilerplate/types/contact-message/dto/responses/contact-messages'

import { saga } from '@boilerplate/front-end/store'

import { patchOrderUserData, postOrder } from '@boilerplate/front-end/store/queries/order.query'
import { orderSlice } from '@boilerplate/front-end/store/slices/order.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

import { notification } from '@boilerplate/front-end/utils/notification'

interface UpdateUserDataActionPayload {}

export const updateUserDataStart = createAction<UpdateUserDataActionPayload>(
  createSagaActionType('update-user-data-start'),
)

function* handler(): SagaIterator<void> {
  try {
    const router: ReturnType<typeof useRouter> = yield getContext('router')

    const id: ReturnType<typeof orderSlice.selectors.id> = yield select(orderSlice.selectors.id)

    const isAuthorized: ReturnType<typeof profileSlice.selectors.isAuthorized> = yield select(
      profileSlice.selectors.isAuthorized,
    )

    if (!id) {
      return
    }

    // eslint-disable-next-line prettier/prettier
    const firstName: ReturnType<typeof orderSlice.selectors.firstName> = yield select(orderSlice.selectors.firstName)
    const lastName: ReturnType<typeof orderSlice.selectors.lastName> = yield select(orderSlice.selectors.lastName)
    const email: ReturnType<typeof orderSlice.selectors.email> = yield select(orderSlice.selectors.email)
    const phone: ReturnType<typeof orderSlice.selectors.phone> = yield select(orderSlice.selectors.phone)

    const updateUserDataRequest = yield put(
      patchOrderUserData.initiate({ orderId: id, firstName, lastName, email, phone, authorized: isAuthorized }),
    )

    const updateUserDataResponse: HttpClientResponse<PostContactMessageResultDto> = yield call(
      () => updateUserDataRequest,
    )

    if (!updateUserDataResponse?.data?.isSuccess) {
      yield call(notification.error, 'Щось пішло не так')

      return
    }

    yield put(orderSlice.actions.clearId())

    const newOrderId = yield put(postOrder.initiate({ authorized: isAuthorized, force: true }))

    yield put(orderSlice.actions.setId(newOrderId))

    yield call(notification.success, 'Замовлення прийнято')

    yield call(router.push, '/')
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(updateUserDataStart, handler)
})
