'use client'

import { Suspense, lazy, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useAppSelector } from '@boilerplate/front-end/store'

import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

interface WithProfileProps {
  children: React.ReactNode
}

const RefrashToken = lazy(() => import('@boilerplate/front-end/store/refrash-token'))

export const WithProfile: React.FC<WithProfileProps> = ({ children }) => {
  const router = useRouter()

  const profile = useAppSelector(profileSlice.selectors.profile)

  useEffect(() => {
    if (profile === null) {
      router.push('/sign-in')
    }
  }, [profile])

  if (!profile) {
    return null
  }

  return (
    <>
      <Suspense>
        <RefrashToken />
      </Suspense>
      {children}
    </>
  )
}
