'use client'

import logger from 'loglevel'
import ms from 'ms'
import { type SagaIterator } from 'redux-saga'
import { call, delay, put } from 'redux-saga/effects'

import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'
import { jwtStore } from '@boilerplate/core/stores/jwt.store'

import { type PatchTokenResultDto } from '@boilerplate/types/auth/dto/responses/token'

import { saga } from '@boilerplate/dashboard/store'

import { refrash } from '@boilerplate/dashboard/store/queries/token.query'

function* handler(): SagaIterator<void> {
  try {
    const token = jwtStore.get()

    if (!token) {
      logger.info('Has no token for refrash')

      return
    }

    logger.info('Start refreshing jwt token')

    const refrashRequest = yield put(refrash.initiate(undefined, { forceRefetch: true }))

    const refrashResponse: HttpClientResponse<PatchTokenResultDto> = yield call(() => refrashRequest)

    if (!refrashResponse?.data?.token) {
      throw new Error('Failure refrash token')
    }

    jwtStore.set(refrashResponse.data.token)
  } catch (error) {
    logger.error(error)
  }
}

saga.run(function* () {
  if (typeof window !== 'object') {
    return
  }

  try {
    while (true) {
      yield call(handler)

      yield delay(ms('5m'))
    }
  } catch (error) {
    logger.error(error)
  }
})
