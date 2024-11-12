import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type PostTokenResultDto } from '@boilerplate/types/auth/dto/responses/token'

import { saga } from '@boilerplate/front-end/store'

import { registration } from '@boilerplate/front-end/store/queries/token.query'
import { authSlice } from '@boilerplate/front-end/store/slices/auth.slice'

import '@boilerplate/front-end/store/queries/profile.query'

interface SignUpStartActionPayload {
  redirect: () => void
}

export const signUpStart = createAction<SignUpStartActionPayload>(createSagaActionType('sign-up-start'))

function* handler(action: PayloadAction<SignUpStartActionPayload>): SagaIterator<void> {
  try {
    const firstName: ReturnType<typeof authSlice.selectors.firstName> = yield select(authSlice.selectors.firstName)
    const lastName: ReturnType<typeof authSlice.selectors.lastName> = yield select(authSlice.selectors.lastName)
    const email: ReturnType<typeof authSlice.selectors.email> = yield select(authSlice.selectors.email)
    const phone: ReturnType<typeof authSlice.selectors.phone> = yield select(authSlice.selectors.phone)
    const password: ReturnType<typeof authSlice.selectors.password> = yield select(authSlice.selectors.password)
    const passCode: ReturnType<typeof authSlice.selectors.promoCode> = yield select(authSlice.selectors.promoCode)
    const usResident: ReturnType<typeof authSlice.selectors.usResident> = yield select(authSlice.selectors.usResident)

    const postTokenRequest = yield put(
      registration.initiate({
        firstName,
        lastName,
        email,
        phone,
        password,
        passCode,
        usResident,
      }),
    )

    const postTokenResponse: HttpClientResponse<PostTokenResultDto> = yield call(() => postTokenRequest)

    if (!postTokenResponse.data.isSuccess) {
      throw new Error('Failure registration')
    }

    yield call(action.payload.redirect)
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(signUpStart, handler)
})
