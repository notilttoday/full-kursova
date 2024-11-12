import { createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { put, race, take } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'

import { confirmChangesSlice } from '@boilerplate/dashboard/store/slices/confirm-changes.slice'

interface ConfirmChangesOptions {
  title: string
  description?: string
}

export const confirmChangesClose = createAction(createSagaActionType('confirm-changes-close'))

export const confirmChangesOk = createAction(createSagaActionType('confirm-changes-ok'))

export function* confirmChanges({ title, description }: ConfirmChangesOptions): SagaIterator {
  try {
    yield put(confirmChangesSlice.actions.setTitle(title))
    yield put(confirmChangesSlice.actions.setDescription(description))

    yield put(confirmChangesSlice.actions.open())

    const { confirm } = yield race({
      close: take(confirmChangesClose),
      confirm: take(confirmChangesOk),
    })

    yield put(confirmChangesSlice.actions.close())

    if (confirm) {
      return true
    }

    return false
  } catch (error) {
    logger.error(error)
  }
}
