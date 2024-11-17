import { type useRouter } from 'next/navigation'

import { createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { call, getContext, put, select, takeLatest } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'
import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'

import { type PostContactMessageResultDto } from '@boilerplate/types/contact-message/dto/responses/contact-messages'

import { saga } from '@boilerplate/front-end/store'

import { postContactMessage } from '@boilerplate/front-end/store/queries/contact-message.query'
import { contactMessageSlice } from '@boilerplate/front-end/store/slices/create-contact-message'

import { notification } from '@boilerplate/front-end/utils/notification'

interface CreateProductStartActionPayload {}

export const createContactMessageStart = createAction<CreateProductStartActionPayload>(
  createSagaActionType('create-contact-message-start'),
)

function* handler(): SagaIterator<void> {
  try {
    const router: ReturnType<typeof useRouter> = yield getContext('router')

    const firstName: ReturnType<typeof contactMessageSlice.selectors.firstName> = yield select(
      contactMessageSlice.selectors.firstName,
    )
    const lastName: ReturnType<typeof contactMessageSlice.selectors.lastName> = yield select(
      contactMessageSlice.selectors.lastName,
    )
    const email: ReturnType<typeof contactMessageSlice.selectors.email> = yield select(
      contactMessageSlice.selectors.email,
    )
    const phone: ReturnType<typeof contactMessageSlice.selectors.phone> = yield select(
      contactMessageSlice.selectors.phone,
    )
    const message: ReturnType<typeof contactMessageSlice.selectors.message> = yield select(
      contactMessageSlice.selectors.message,
    )
    const userId: ReturnType<typeof contactMessageSlice.selectors.userId> = yield select(
      contactMessageSlice.selectors.userId,
    )

    const createContactMessageRequest = yield put(
      postContactMessage.initiate({ firstName, lastName, email, phone, message, userId }),
    )

    const createContactMessageResponse: HttpClientResponse<PostContactMessageResultDto> = yield call(
      () => createContactMessageRequest,
    )

    if (!createContactMessageResponse?.data?.isSuccess) {
      yield call(notification.error, 'Щось пішло не так')

      return
    }

    yield call(notification.success, 'Звернення відправлено')

    yield call(router.push, '/')
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  yield takeLatest(createContactMessageStart, handler)
})
