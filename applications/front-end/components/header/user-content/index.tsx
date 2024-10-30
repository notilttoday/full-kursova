'use client'

import classes from '@boilerplate/front-end/components/header/style.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import profileIco from '@boilerplate/front-end/assets/icons/profile.svg'
import signUpIco from '@boilerplate/front-end/assets/icons/user-add.svg'
import signInIco from '@boilerplate/front-end/assets/icons/sign-in.svg'

import { contactMessageSlice } from '@boilerplate/front-end/store/slices/create-contact-message'
import { useGetProfileQuery } from '@boilerplate/front-end/store/queries/profile.query'

import { useAppDispatch } from '@boilerplate/front-end/store'
import { useEffect } from 'react'
import { HeaderCartButton } from '@boilerplate/front-end/components/header/cart.button'
import { WithProfile } from '@boilerplate/front-end/store/with-profile'
import { WithoutProfile } from '@boilerplate/front-end/store/without-profile'

interface ProfileHeaderProps { }

export const ProfileHeader: React.FC<ProfileHeaderProps> = () => {


  return (
    <>
      <WithProfile>
        <div className={classes["cart-dropdown"]}>
          <HeaderCartButton />
        </div>
        <div className={classes["profile-dropdown"]}>
          <Link href="/cabinet" className={classes.profile}>
            <Image className={classes.img} src={profileIco} alt="profileIcon" />
          </Link>
        </div>
      </WithProfile>
      <WithoutProfile>
        <div className={classes["cart-dropdown"]}>
          <Link href="/sign-up" className={classes.profile}>
            <Image className={classes.img} src={signUpIco} alt="signUp" />
          </Link>
        </div>
        <div className={classes["profile-dropdown"]}>
          <Link href="/sign-in" className={classes.profile}>
            <Image className={classes.img} src={signInIco} alt="singIn" />
          </Link>
        </div>
      </WithoutProfile>
    </>
  )
}