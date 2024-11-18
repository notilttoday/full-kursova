'use client'

// eslint-disable-next-line no-restricted-imports
import React, { lazy } from 'react'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

import clockImage from '@boilerplate/front-end/assets/icons/clock.svg'
import profileCircleImage from '@boilerplate/front-end/assets/icons/profile-circle.svg'
import setUpIco from '@boilerplate/front-end/assets/icons/set-up.svg'
import assassinsCreedImage from '@boilerplate/front-end/assets/images/assassins-creed-image.png'
import diabloImage from '@boilerplate/front-end/assets/images/diablo-image.jpg'
import dotaImage from '@boilerplate/front-end/assets/images/dota-image.jpeg'
import witcherImage from '@boilerplate/front-end/assets/images/witcher-image.jpg'
import wowImage from '@boilerplate/front-end/assets/images/wow-image.jpg'

import { GameType } from '@boilerplate/types/products/interfaces/products'

import { useGetProfileQuery } from '@boilerplate/front-end/store/queries/profile.query'

import classes from '@boilerplate/front-end/components/cabinet/style.module.scss'

const gameImages: Record<GameType, StaticImageData> = {
  [GameType.Dota]: dotaImage,
  [GameType.TheWitcher]: witcherImage,
  [GameType.WorldOfWarcraft]: wowImage,
  [GameType.Diablo]: diabloImage,
  [GameType.AssassinsCreed]: assassinsCreedImage,
}

const gameMap: Record<GameType, string> = {
  [GameType.Dota]: 'Dota 2',
  [GameType.TheWitcher]: 'The Witcher',
  [GameType.WorldOfWarcraft]: 'World of Warcraft',
  [GameType.Diablo]: 'Diablo',
  [GameType.AssassinsCreed]: 'Assassins Creed',
}

const LogoutButton = lazy(() => import('@boilerplate/front-end/components/cabinet/logout-button'))

interface CabinetProps {}

export const Cabinet: React.FC<CabinetProps> = () => {
  const { data } = useGetProfileQuery()
  const { firstName, lastName, phone, email, statusText, imagePath, favGames } = data ?? {}

  return (
    <div className={classes['my-profile']}>
      <Image
        className={classes['profile-img']}
        src={imagePath ? imagePath : profileCircleImage}
        alt="profileImage"
        width={243}
        height={243}
      />
      <h1 className={classes.h1}>
        {firstName} {lastName}
      </h1>
      <h4 className={classes.status}>{statusText}</h4>
      <h5 className={classes.h5}>Пошта: {email}</h5>
      <h5 className={classes.h5}>Номер телефону: {phone}</h5>
      <div className={classes.favourite}>
        <div className={classes['fav-games']}>
          <h2 className={classes.h2}>Улюблені ігри:</h2>
          <div className={classes['fav-examples']}>
            {favGames && favGames.length > 0
              ? favGames.map((game) => {
                  const gameImage = gameImages[game]
                  const gameAlt = gameMap[game]

                  if (!gameImage) {
                    return null
                  }

                  return (
                    <Image
                      key={game}
                      className={classes.img}
                      src={gameImage}
                      alt={gameAlt || 'Unknown Game'}
                      width={50}
                      height={50}
                    />
                  )
                })
              : [1, 2, 3].map((index) => (
                  <Image
                    key={index}
                    className={classes.img}
                    src={clockImage}
                    alt={`Fallback Game Logo ${index}`}
                    width={50}
                    height={50}
                  />
                ))}
          </div>
        </div>
      </div>
      <div className={classes['general-buttons']}>
        <Link href="/edit-profile" className={classes['edit-button']}>
          Редагувати профіль <Image className={classes['edit-image']} src={setUpIco} alt="edit" />
        </Link>
        <LogoutButton />
      </div>
    </div>
  )
}
