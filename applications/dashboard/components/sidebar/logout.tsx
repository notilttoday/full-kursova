/* eslint-disable import/no-default-export */

'use client'

import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useAppDispatch } from '@boilerplate/dashboard/store'

import { signOutStart } from '@boilerplate/dashboard/store/sagas/sign-out.saga'

import { type SidebarButtonItemProps, SidebarItem } from '@boilerplate/dashboard/components/sidebar/sidebar-item'

interface SidebarProps extends Omit<SidebarButtonItemProps, 'onClick'> {}

const LogoutSidebarItem: React.FC<SidebarProps> = (props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleClick = useCallback(() => {
    dispatch(
      signOutStart({
        redirect: () => router.push('/sign-in'),
      }),
    )
  }, [])

  return <SidebarItem {...props} onClick={handleClick} />
}

export default LogoutSidebarItem
