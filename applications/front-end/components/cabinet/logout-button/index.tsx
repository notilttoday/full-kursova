/* eslint-disable import/no-default-export */
'use client'

import classes from '@boilerplate/front-end/components/cabinet/style.module.scss'
import Image from 'next/image'

import profileCircleImage from '@boilerplate/front-end/assets/icons/profile-circle.svg'
import clockImage from '@boilerplate/front-end/assets/icons/clock.svg'
import logoutIco from '@boilerplate/front-end/assets/icons/exit.svg'
import setUpIco from '@boilerplate/front-end/assets/icons/set-up.svg'

import { useGetProfileQuery } from '@boilerplate/front-end/store/queries/profile.query'

import React, { useEffect } from 'react';
import Link from 'next/link'

import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useAppDispatch } from '@boilerplate/front-end/store'

import { signOutStart } from '@boilerplate/front-end/store/sagas/sign-out.saga'

interface LogoutButtonProps { }

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
            })
        )
    }, [dispatch, refetch, router])

    useEffect(() => {
        if (isError) {
            router.push('/sign-in')
        }
    }, [isError, router])

    return (
        <button onClick={handleClick} className={classes["logout-button"]}>Вийти <Image className={classes["logout-image"]} src={logoutIco} alt="exit" /></button>
    )
}

export default LogoutButton

// interface SidebarProps extends Omit<SidebarButtonItemProps, 'onClick'> { }