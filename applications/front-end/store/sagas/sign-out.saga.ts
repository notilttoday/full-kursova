import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'
import { jwtStore } from '@boilerplate/core/stores/jwt.store'

import { type DeleteTokenResultDto } from '@boilerplate/types/auth/dto/responses/token'

import { saga } from '@boilerplate/front-end/store'

import { v1Api } from '@boilerplate/front-end/store/api/v1.api'
import { logout } from '@boilerplate/front-end/store/queries/token.query'
import { orderSlice } from '@boilerplate/front-end/store/slices/order.slice'
import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

interface SignOutStartActionPayload {
  redirect: () => void
}

export const signOutStart = createAction<SignOutStartActionPayload>(createSagaActionType('sign-out-start'))

function* handler(action: PayloadAction<SignOutStartActionPayload>): SagaIterator<void> {
  try {
    const deleteTokenRequest = yield put(logout.initiate())

    const deleteTokenResponse: HttpClientResponse<DeleteTokenResultDto> = yield call(() => deleteTokenRequest)

    if (!deleteTokenResponse.data.isSuccess) {
      throw new Error('Failure logout')
    }

    jwtStore.clear()

    yield put(profileSlice.actions.init(null))

    yield put(orderSlice.actions.clearId())

    yield put(
      v1Api.util.invalidateTags([
        { type: 'Order', id: 'current' },
        { type: 'Order', id: 'LIST' },
      ]),
    )

    yield call(action.payload.redirect)
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(signOutStart, handler)
})
