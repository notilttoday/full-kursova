'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useAppSelector } from '@boilerplate/front-end/store'

import { profileSlice } from '@boilerplate/front-end/store/slices/profile.slice'

interface WithProfileProps {
  children: React.ReactNode
}

export const WithoutProfile: React.FC<WithProfileProps> = ({ children }) => {
  const router = useRouter()

  const profile = useAppSelector(profileSlice.selectors.profile)

  useEffect(() => {
    if (profile !== null) {
      router.push('/cabinet')
    }
  }, [profile])

  if (profile) {
    return null
  }

  return <>{children}</>
}
