'use client'

import classes from '@boilerplate/front-end/components/header/style.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import profileIco from '@boilerplate/front-end/assets/icons/profile.svg'
import signUpIco from '@boilerplate/front-end/assets/icons/user-add.svg'
import signInIco from '@boilerplate/front-end/assets/icons/sign-in.svg'

import { WithProfile } from '@boilerplate/front-end/store/with-profile'
import { WithoutProfile } from '@boilerplate/front-end/store/without-profile'

interface ProfileHeaderProps { }

export const ProfileHeader: React.FC<ProfileHeaderProps> = () => {

  return (
    <>
      <WithProfile>
        <div className={classes["profile-dropdown"]}>
          <Link href="/cabinet" className={classes.profile}>
            <Image className={classes.img} src={profileIco} alt="profileIcon" />
          </Link>
        </div>
      </WithProfile>
      <WithoutProfile>
        <div className={classes["profile-dropdown-without-profile"]}>
          <Link href="/sign-in" className={classes.profile}><span>Увійти</span><Image src={signInIco} alt="SignIn" className={classes.img} /></Link>
          <Link href="/sign-up" className={classes.profile}><span>Зареєструватись</span><Image src={signUpIco} alt="SignIUp" className={classes.img} /></Link>
        </div>
      </WithoutProfile>
    </>
  )
}