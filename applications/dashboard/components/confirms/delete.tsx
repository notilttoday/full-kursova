/* eslint-disable import/no-default-export */

'use client'

import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '@boilerplate/dashboard/store'

import { confirmDeletionClose, confirmDeletionOk } from '@boilerplate/dashboard/store/sagas/confirm-deletion.saga'
import { confirmDeletionSlice } from '@boilerplate/dashboard/store/slices/confirm-deletion.slice'

interface ConfirmDeletionProps {}

const ConfirmDeletion: React.FC<ConfirmDeletionProps> = () => {
  const dispatch = useAppDispatch()
  const open = useAppSelector(confirmDeletionSlice.selectors.open)
  const title = useAppSelector(confirmDeletionSlice.selectors.title)
  const description = useAppSelector(confirmDeletionSlice.selectors.description)

  const handleCancel = useCallback(() => {
    dispatch(confirmDeletionClose())
  }, [])

  const handleConfirm = useCallback(() => {
    dispatch(confirmDeletionOk())
  }, [])

  if (!open) {
    return null
  }

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-[10050] cursor-pointer bg-slate-500/50 backdrop-blur"
        role="backdrop"
        onClick={handleCancel}
      />
      <div id="confirm-deletion-modal" className="pointer-events-none fixed inset-0 z-[10051] overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:p-0">
          <div
            className="pointer-events-auto m-auto inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                data-behavior="cancel"
                className="text-gray-400 hover:text-gray-500 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                onClick={handleCancel}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-rose-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-gray-900 text-lg font-medium leading-6" id="modal-headline">
                  {title}
                </h3>
                {description ? (
                  <div className="mt-2">
                    <p className="text-gray-500 text-sm">{description}</p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                data-behavior="commit"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                type="button"
                data-behavior="cancel"
                className="border-gray-300 text-gray-700 hover:text-gray-500 mt-3 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmDeletion
