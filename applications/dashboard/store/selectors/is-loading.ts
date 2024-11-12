import _get from 'lodash/get'

import { isApiKey } from '@boilerplate/core/builders/api-key.builder'

import { type RootState } from '@boilerplate/dashboard/store'

export const isLoadingSelector = (state: RootState): boolean => {
  const entries = Object.entries(state)

  const isLoadingFlags = [] as boolean[]

  for (const [key, sliceData] of entries) {
    if (!isApiKey(key)) {
      continue
    }

    const queries = _get(sliceData, 'queries', null) as Record<string, Record<'status', string>> | null

    if (!queries || typeof queries !== 'object') {
      continue
    }

    for (const { status } of Object.values(queries)) {
      if (!status || typeof status !== 'string') {
        continue
      }

      isLoadingFlags.push(status === 'pending')
    }

    const mutations = _get(sliceData, 'mutations', null) as Record<string, Record<'status', string>> | null

    if (!mutations || typeof mutations !== 'object') {
      continue
    }

    for (const { status } of Object.values(mutations)) {
      if (!status || typeof status !== 'string') {
        continue
      }

      isLoadingFlags.push(status === 'pending')
    }
  }

  return isLoadingFlags.some(Boolean)
}
