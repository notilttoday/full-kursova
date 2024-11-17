import { type PayloadAction, createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type EditProfileDto } from '@boilerplate/types/auth/dto/responses/profile'

import { updateProfile } from '@boilerplate/front-end/store/queries/profile.query'
import { updateProfileSlice } from '@boilerplate/front-end/store/slices/update-profile.slice'

import { saga } from '@boilerplate/front-end/store'

interface UpdateProfileStartActionPayload {
  redirect: () => void
}

export const updateProfileStart = createAction<UpdateProfileStartActionPayload>(
  createSagaActionType('update-profile-start'),
)

function* handler(action: PayloadAction<UpdateProfileStartActionPayload>): SagaIterator<void> {
  try {
    const firstName: ReturnType<typeof updateProfileSlice.selectors.firstName> = yield select(
      updateProfileSlice.selectors.firstName,
    )
    const lastName: ReturnType<typeof updateProfileSlice.selectors.lastName> = yield select(
      updateProfileSlice.selectors.lastName,
    )
    const phone: ReturnType<typeof updateProfileSlice.selectors.phone> = yield select(
      updateProfileSlice.selectors.phone,
    )
    const statusText: ReturnType<typeof updateProfileSlice.selectors.statusText> = yield select(
      updateProfileSlice.selectors.statusText,
    )
    const favGames: ReturnType<typeof updateProfileSlice.selectors.favGames> = yield select(
      updateProfileSlice.selectors.favGames,
    )
    const file: ReturnType<typeof updateProfileSlice.selectors.file> = yield select(updateProfileSlice.selectors.file)

    if (!file) {
      throw new Error('Файл не вибрано!')
    }

    const formData = new FormData()

    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('phone', phone)
    formData.append('statusText', statusText)
    formData.append('favGames', JSON.stringify(favGames))
    formData.append('file', file)

    const postProfileRequest = yield put(updateProfile.initiate(formData))

    const postProductResponse: HttpClientResponse<EditProfileDto> = yield call(() => postProfileRequest)

    yield call(action.payload.redirect)
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(updateProfileStart, handler)
})
