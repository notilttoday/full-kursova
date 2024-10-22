'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useAppSelector } from '@boilerplate/dashboard/store'

import { profileSlice } from '@boilerplate/dashboard/store/slices/profile.slice'

interface WithProfileProps {
  children: React.ReactNode
}

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

  return <>{children}</>
}
