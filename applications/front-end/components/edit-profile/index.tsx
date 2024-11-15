'use client'

import { Suspense, useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import profileCircleImage from '@boilerplate/front-end/assets/icons/profile-circle.svg'

import { GameType } from '@boilerplate/types/products/interfaces/products'

import { useAppDispatch } from '@boilerplate/front-end/store'

import { useGetProfileQuery, useUpdateProfileMutation } from '@boilerplate/front-end/store/queries/profile.query'
import { updateProfileSlice } from '@boilerplate/front-end/store/slices/update-profile.slice'

import classes from '@boilerplate/front-end/components/edit-profile/style.module.scss'

interface EditProfileProps {}

const gameMap: Record<GameType, string> = {
  [GameType.Dota]: 'Dota 2',
  [GameType.TheWitcher]: 'The Witcher',
  [GameType.WorldOfWarcraft]: 'World of Warcraft',
  [GameType.Diablo]: 'Diablo',
  [GameType.AssassinsCreed]: 'Assassins Creed',
}

export const EditProfile: React.FC<EditProfileProps> = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { data } = useGetProfileQuery()
  const [updateProfile] = useUpdateProfileMutation()

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    statusText: '',
    favGames: [] as GameType[],
    file: null as File | null,
  })

  const [profileImagePath, setProfileImagePath] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    if (data) {
      setFormState({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phone: data.phone || '',
        statusText: data.statusText || '',
        favGames: data.favGames || [],
        file: null,
      })
      setProfileImagePath(data.imagePath || null)
    }
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0] || null

    setFormState((prevState) => ({
      ...prevState,
      file: selectedFile,
    }))
  }

  const handleGameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedGame = e.target.value as GameType
    const isChecked = e.target.checked

    setFormState((prevState) => {
      let updatedFavGames = [...prevState.favGames]

      if (isChecked) {
        if (updatedFavGames.length < 3) {
          updatedFavGames.push(selectedGame)
        }
      } else {
        updatedFavGames = updatedFavGames.filter((game) => game !== selectedGame)
      }

      return { ...prevState, favGames: updatedFavGames }
    })
  }

  const handleSave = async (): Promise<void> => {
    const formData = new FormData()

    formData.append('firstName', formState.firstName || '')
    formData.append('lastName', formState.lastName || '')
    formData.append('phone', formState.phone || '')
    formData.append('statusText', formState.statusText || '')
    formData.append('favGames', JSON.stringify(formState.favGames) || '')
    if (formState.file) {
      formData.append('file', formState.file)
    }

    try {
      await updateProfile(formData).unwrap()
      dispatch(updateProfileSlice.actions.setFirstName(formState.firstName))
      dispatch(updateProfileSlice.actions.setLastName(formState.lastName))
      dispatch(updateProfileSlice.actions.setPhone(formState.phone))
      dispatch(updateProfileSlice.actions.setStatusText(formState.statusText))
      dispatch(updateProfileSlice.actions.setFavGames(formState.favGames))
      alert('Профіль оновлено!')
      router.push('/cabinet')
    } catch (error) {
      console.error('Помилка при оновленні профілю:', error)
    }
  }

  const toggleDropdown = (): void => {
    setIsDropdownOpen((prev) => !prev)
  }

  const content = (
    <div className={classes['my-profile']}>
      <Image
        className={classes['profile-img']}
        src={profileImagePath ? profileImagePath : profileCircleImage}
        alt="profileImage"
        width={243}
        height={243}
      />
      <h1 className={classes.h1}>
        {formState.firstName} {formState.lastName}
      </h1>
      <div className={classes['inputs-container']}>
        <p className={classes.p}>Введіть статус:</p>
        <div className={classes['input-status']}>
          <input
            type="text"
            name="statusText"
            value={formState.statusText}
            onChange={handleChange}
            placeholder="Статус"
            className={classes.input}
            maxLength={50}
          />
        </div>
        <p className={classes.p}>Введіть ім'я та прізвище:</p>
        <div className={classes.fullname}>
          <input
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            placeholder="Ім'я"
            className={classes.input}
          />
          <input
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            placeholder="Прізвище"
            className={classes.input}
          />
        </div>
        <p className={classes.p}>Введіть номер телефону:</p>
        <input
          type="text"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          placeholder="Телефон"
          className={classes.input}
        />
        <p className={classes.p}>Улюблені ігри:</p>
        <div className={classes['fav-games']}>
          <div className={classes['dropdown-container']}>
            <button className={classes['dropdown-toggle']} onClick={toggleDropdown}>
              Вибір улюблених ігор
            </button>
            {isDropdownOpen && (
              <div className={classes['dropdown-list']}>
                {Object.entries(gameMap).map(([gameType, gameTitle]) => (
                  <div key={gameType} className={classes['game-checkbox']}>
                    <input
                      type="checkbox"
                      id={gameType}
                      value={gameType}
                      checked={formState.favGames.includes(gameType as GameType)}
                      onChange={handleGameChange}
                      disabled={formState.favGames.length >= 3 && !formState.favGames.includes(gameType as GameType)}
                    />
                    <label htmlFor={gameType}>{gameTitle}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {formState.favGames.length > 0 && (
          <p className={classes.p}>
            <strong>Улюблені ігри:</strong> {formState.favGames.map((game) => gameMap[game]).join(', ')}
          </p>
        )}
        <p className={classes.p}>Завантажити файл профілю:</p>
        <input type="file" name="file" className={classes.input} onChange={handleFileChange} />
      </div>
      <button className={classes['save-button']} onClick={handleSave}>
        Зберегти зміни
      </button>
    </div>
  )

  return <Suspense fallback={<div>Завантаження...</div>}>{content}</Suspense>
}
