/* eslint-disable import/no-default-export */
'use client'

// eslint-disable-next-line no-restricted-imports
import React, { useCallback, useEffect } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import logoutIco from '@boilerplate/front-end/assets/icons/exit.svg'

import { useAppDispatch } from '@boilerplate/front-end/store'

import { useGetProfileQuery } from '@boilerplate/front-end/store/queries/profile.query'
import { signOutStart } from '@boilerplate/front-end/store/sagas/sign-out.saga'

import classes from '@boilerplate/front-end/components/cabinet/style.module.scss'

interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { refetch, isError } = useGetProfileQuery()

  const handleClick = useCallback(() => {
    dispatch(
      signOutStart({
        redirect: () => {
          refetch()
          router.push('/sign-in')
        },
      }),
    )
  }, [dispatch, refetch, router])

  useEffect(() => {
    if (isError) {
      router.push('/sign-in')
    }
  }, [isError, router])

  return (
    <button onClick={handleClick} className={classes['logout-button']}>
      Вийти <Image className={classes['logout-image']} src={logoutIco} alt="exit" />
    </button>
  )
}

export default LogoutButton

// interface SidebarProps extends Omit<SidebarButtonItemProps, 'onClick'> { }
