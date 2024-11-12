import { createAction } from '@reduxjs/toolkit'
import logger from 'loglevel'
import { type SagaIterator } from 'redux-saga'
import { put, race, take } from 'redux-saga/effects'

import { createSagaActionType } from '@boilerplate/core/builders/saga-action-type.builder'

import { confirmDeletionSlice } from '@boilerplate/dashboard/store/slices/confirm-deletion.slice'

interface ConfirmDeletionOptions {
  title: string
  description?: string
}

export const confirmDeletionClose = createAction(createSagaActionType('confirm-deletion-close'))

export const confirmDeletionOk = createAction(createSagaActionType('confirm-deletion-ok'))

export function* confirmDeletion({ title, description }: ConfirmDeletionOptions): SagaIterator {
  try {
    yield put(confirmDeletionSlice.actions.setTitle(title))
    yield put(confirmDeletionSlice.actions.setDescription(description))

    yield put(confirmDeletionSlice.actions.open())

    const { confirm } = yield race({
      close: take(confirmDeletionClose),
      confirm: take(confirmDeletionOk),
    })

    yield put(confirmDeletionSlice.actions.close())

    if (confirm) {
      return true
    }

    return false
  } catch (error) {
    logger.error(error)
  }
}
