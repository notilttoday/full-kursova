'use client';

import { useState, useEffect } from 'react';
import classes from '@boilerplate/front-end/components/edit-profile/style.module.scss';
import Image from 'next/image';
import profileCircleImage from '@boilerplate/front-end/assets/icons/profile-circle.svg';
import clockImage from '@boilerplate/front-end/assets/icons/clock.svg';
import { useGetProfileQuery, useUpdateProfileMutation } from '@boilerplate/front-end/store/queries/profile.query';
import { useAppDispatch } from '@boilerplate/front-end/store';
import { updateProfileSlice } from '@boilerplate/front-end/store/slices/update-profile.slice';
import { Game } from '@boilerplate/types/products/interfaces/products';
import { useRouter } from 'next/navigation';

interface EditProfileProps { }

export const EditProfile: React.FC<EditProfileProps> = () => {
  const { data } = useGetProfileQuery();
  const dispatch = useAppDispatch();
  const [updateProfile] = useUpdateProfileMutation();
  const router = useRouter();

  const [formState, setFormState] = useState({
    id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    statusText: '',
    favGames: [] as Game[],
  });

  useEffect(() => {
    if (data) {
      setFormState({
        id: data.id || '',
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phone: data.phone || '',
        email: data.email || '',
        statusText: data.statusText || '',
        favGames: data.favGames || [],
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGameChange = (index: number, newGame: Game) => {
    const updatedGames = [...formState.favGames];
    updatedGames[index] = newGame;
    setFormState((prevState) => ({
      ...prevState,
      favGames: updatedGames,
    }));
  };

  const handleSave = async () => {
    try {
      console.log('Updating profile with data:', formState);
      await updateProfile(formState).unwrap();
      dispatch(updateProfileSlice.actions.setFirstName(formState.firstName));
      dispatch(updateProfileSlice.actions.setLastName(formState.lastName));
      dispatch(updateProfileSlice.actions.setPhone(formState.phone));
      dispatch(updateProfileSlice.actions.setStatusText(formState.statusText));
      dispatch(updateProfileSlice.actions.setFavGames(formState.favGames));
      alert('Профіль оновлено');
      router.push('/cabinet');
    } catch (error) {
      console.error('Помилка при оновленні профілю:', error);
    }
  };

  return (
    <div className={classes['my-profile']}>
      <Image className={classes['profile-img']} src={profileCircleImage} alt="profileImage" />
      <h1 className={classes.h1}>{formState.firstName} {formState.lastName}</h1>
      <div className={classes["inputs-container"]}>
        <p className={classes.p}>Введіть статус:</p>
        <div className={classes["input-status"]}>
          <input
            type="text"
            name="statusText"
            value={formState.statusText}
            onChange={handleInputChange}
            placeholder="Статус"
            className={classes['input']}
            maxLength={50}
          />
        </div>
        <p className={classes.p}>Введіть ім'я та прізвище:</p>
        <div className={classes.fullname}>
          <input
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
            placeholder="Ім'я"
            className={classes['input']}
          />
          <input
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
            placeholder="Прізвище"
            className={classes['input']}
          />
        </div>
        <p className={classes.p}>Введіть номер телефону:</p>
        <input
          type="text"
          name="phone"
          value={formState.phone}
          onChange={handleInputChange}
          placeholder="Телефон"
          className={classes['input']}
        />
        <div className={classes['favourite']}>
          <p className={classes.p}>Улюблені ігри:</p>
          <div className={classes['fav-games']}>
            {formState.favGames.map((game, index) => (
              <select
                key={index}
                value={game}
                onChange={(e) => handleGameChange(index, e.target.value as Game)}
                className={classes['input']}
              >
                {Object.values(Game).map((gameValue) => (
                  <option key={gameValue} value={gameValue}>{gameValue}</option>
                ))}
              </select>
            ))}
          </div>
        </div>
      </div>
      <button className={classes['save-button']} onClick={handleSave}>Зберегти зміни</button>
    </div>
  );
};