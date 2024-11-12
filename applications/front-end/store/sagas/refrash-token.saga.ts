'use client'

import logger from 'loglevel'
import ms from 'ms'
import { type SagaIterator } from 'redux-saga'
import { call, delay, put } from 'redux-saga/effects'

import { type HttpClientResponse } from '@boilerplate/core/interfaces/http'
import { jwtStore } from '@boilerplate/core/stores/jwt.store'

import { type PatchTokenResultDto } from '@boilerplate/types/auth/dto/responses/token'

import { saga } from '@boilerplate/front-end/store'

import { refrash } from '@boilerplate/front-end/store/queries/token.query'

function* handler(): SagaIterator<void> {
  try {
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
