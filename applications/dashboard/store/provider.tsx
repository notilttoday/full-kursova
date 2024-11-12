'use client'

import { Suspense, lazy, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { Provider } from 'react-redux'

import { type MyProfile } from '@boilerplate/types/auth/interfaces/profile'

import { type AppStore, createStore } from '@boilerplate/dashboard/store'

import { profileSlice } from '@boilerplate/dashboard/store/slices/profile.slice'

interface ReduxProviderProps {
  children: React.ReactNode
  profile: MyProfile | null
}

const RefrashToken = lazy(() => import('@boilerplate/dashboard/store/refrash-token'))

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children, profile }) => {
  const router = useRouter()

  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = createStore({ router })
    storeRef.current.dispatch(profileSlice.actions.init(profile))
  }

  return (
    <Provider store={storeRef.current}>
      <Suspense>
        <RefrashToken />
      </Suspense>
      {children}
    </Provider>
  )
}
