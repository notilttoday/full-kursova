import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'
import { jwtStore } from '@boilerplate/core/stores/jwt.store'

import { type DeleteTokenResultDto } from '@boilerplate/types/auth/dto/responses/token'

import { saga } from '@boilerplate/dashboard/store'

import { logout } from '@boilerplate/dashboard/store/queries/token.query'
import { profileSlice } from '@boilerplate/dashboard/store/slices/profile.slice'

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

    yield call(action.payload.redirect)
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(signOutStart, handler)
})
