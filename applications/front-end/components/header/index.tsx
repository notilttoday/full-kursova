'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import filterico from '@boilerplate/front-end/assets/icons/filter.png'
import logo from '@boilerplate/front-end/assets/images/logo.png'

import { GameType } from '@boilerplate/types/products/interfaces/products'

import { useTitle } from '@boilerplate/front-end/hooks/use-title.hook'

import { HeaderCartButton } from '@boilerplate/front-end/components/header/cart.button'
import classes from '@boilerplate/front-end/components/header/style.module.scss'
import { ProfileHeader } from '@boilerplate/front-end/components/header/user-content'

const gameMap: Record<GameType, string> = {
  [GameType.Dota]: 'Dota 2',
  [GameType.TheWitcher]: 'The Witcher',
  [GameType.WorldOfWarcraft]: 'World of Warcraft',
  [GameType.Diablo]: 'Diablo',
  [GameType.AssassinsCreed]: 'Assassins Creed',
}

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const router = useRouter()

  const [title, setTitle] = useTitle()

  const { game } = useParams<Partial<Record<'game', string>>>()

  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [selectedSort, setSelectedSort] = useState<string | null>(null)
  const filterMenuRef = useRef<HTMLDivElement>(null)

  const handleTitleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setTitle(e.currentTarget.value)
  }, [])

  const openFilterMenu = (): void => {
    setShowFilterMenu(true)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleGameChange = useCallback<React.ChangeEventHandler<HTMLSelectElement>>((e) => {
    router.push(e.currentTarget.value)
  }, [])

  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <Image className={classes.img} src={logo} alt="LogoFiguresShop" />
        </Link>
      </div>
      <div className={classes.nav}>
        <ul>
          <li>
            <Link href="figure-search">Магазин</Link>
          </li>
          <li>
            <Link href="about-us">Про нас</Link>
          </li>
          <li>
            <Link href="contact">Контакти</Link>
          </li>
        </ul>
      </div>
      <div className={classes['search-and-filters']}>
        <input
          type="text"
          className={classes['search-bar']}
          placeholder="Шукати фігурки..."
          value={title ?? ''}
          onChange={handleTitleChange}
        />
        <button className={classes['filter-button']} onClick={openFilterMenu}>
          <Image className={classes.img} src={filterico} alt="filter" />
        </button>
        {showFilterMenu && (
          <div className={classes['filter-menu']} ref={filterMenuRef}>
            <div className={classes['filter-option']}>
              <label>Сортування:</label>
              <select value={selectedSort ?? ''} onChange={(e) => setSelectedSort(e.target.value)}>
                <option value="az">Від A до Z</option>
                <option value="new">Спочатку нові</option>
              </select>
            </div>
            <div className={classes['filter-option']}>
              <label>Фільтрувати по грі:</label>
              <select value={game ?? ''} onChange={handleGameChange}>
                {Object.entries(gameMap).map(([gameType, gameTitle]) => (
                  <option key={gameType} value={gameType}>
                    {gameTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      <div className={classes.icons}>
        <div className={classes['cart-dropdown']}>
          <HeaderCartButton />
        </div>
        <ProfileHeader />
      </div>
    </div>
  )
}
