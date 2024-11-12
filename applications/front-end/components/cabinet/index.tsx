'use client'

import classes from '@boilerplate/front-end/components/cabinet/style.module.scss'
import Image from 'next/image'

import profileCircleImage from '@boilerplate/front-end/assets/icons/profile-circle.svg'
import clockImage from '@boilerplate/front-end/assets/icons/clock.svg'
import logoutIco from '@boilerplate/front-end/assets/icons/exit.svg'
import setUpIco from '@boilerplate/front-end/assets/icons/set-up.svg'

import { useGetProfileQuery } from '@boilerplate/front-end/store/queries/profile.query'

import React, { lazy } from 'react';
import Link from 'next/link'

interface CabinetProps { }

const LogoutButton = lazy(() => import('@boilerplate/front-end/components/cabinet/logout-button'))

const NOOP_LOGOUT = (): void => undefined

export const Cabinet: React.FC<CabinetProps> = () => {
    const { data } = useGetProfileQuery()
    const { firstName, lastName, phone, email, statusText } = data ?? {}

    return (
        <div className={classes["my-profile"]}>
            <Image className={classes["profile-img"]} src={profileCircleImage} alt="profileImage" />
            <h1 className={classes.h1}>{firstName} {lastName}</h1>
            <h4 className={classes.status}>{statusText}</h4>
            <h5 className={classes.h5}>Пошта: {email}</h5>
            <h5 className={classes.h5}>Номер телефону: {phone}</h5>
            <div className={classes.favourite}>
                <div className={classes["fav-games"]}>
                    <h2 className={classes.h2}>Улюблені ігри:</h2>
                    <div className={classes["fav-examples"]}>
                        <Image className={classes.img} src={clockImage} alt="favGameLogo" />
                        <Image className={classes.img} src={clockImage} alt="favGameLogo" />
                        <Image className={classes.img} src={clockImage} alt="favGameLogo" />
                    </div>
                </div>
            </div>
            <div className={classes["general-buttons"]}>
                <Link href="edit-profile" className={classes["edit-button"]}>Редагувати профіль <Image className={classes["edit-image"]} src={setUpIco} alt="edit" /></Link>
                <LogoutButton />
            </div>
        </div>
    )
}