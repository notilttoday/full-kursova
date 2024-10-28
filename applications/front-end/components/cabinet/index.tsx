'use client'

import classes from '@boilerplate/front-end/components/cabinet/style.module.scss'
import Image from 'next/image'

import profileCircleImage from '@boilerplate/front-end/assets/icons/profile-circle.svg'
import clockImage from '@boilerplate/front-end/assets/icons/clock.svg'
import logoutIco from '@boilerplate/front-end/assets/icons/exit.svg'
import setUpIco from '@boilerplate/front-end/assets/icons/set-up.svg'

import { useGetProfileQuery } from '@boilerplate/front-end/store/queries/profile.query'

import React from 'react';

interface CabinetProps { }

export const Cabinet: React.FC<CabinetProps> = () => {
    const { data } = useGetProfileQuery()
    const { firstName, lastName } = data ?? {}

    //     function ProfileLogoUploader() {
    //         const [selectedImage, setSelectedImage] = useState(null);

    //         const handleImageChange = (event) => {
    //           const file = event.target.files[0];
    //           if (file) {
    //             const imageUrl = URL.createObjectURL(file);
    //             setSelectedImage(imageUrl);
    //           }
    //         };
    return (
        <div className={classes["my-profile"]}>
            <Image className={classes["profile-img"]} src={profileCircleImage} alt="profileImage" />
            {/* <button className={classes["edit-profile-image"]}>
                <Image className={classes.img} src={editIco} alt="edit"/>
            </button> */}
            <h1 className={classes.h1}>{firstName} {lastName}</h1>
            <h4 className={classes.status}>status-text status-text status-text status-text status-text</h4>
            <div className={classes.favourite}>
                <div className={classes["fav-games"]}>
                    <h2 className={classes.h2}>Улюблені ігри:</h2>
                    <div className={classes["fav-examples"]}>
                        <Image className={classes.img} src={clockImage} alt="favGameLogo" />
                        <Image className={classes.img} src={clockImage} alt="favGameLogo" />
                        <Image className={classes.img} src={clockImage} alt="favGameLogo" />
                    </div>
                </div>
                <div className={classes["fav-characters"]}>
                    <h2 className={classes.h2}>Улюблені персонажі:</h2>
                    <div className={classes["fav-examples"]}>
                        <Image className={classes.img} src={clockImage} alt="favCharacterLogo" />
                        <Image className={classes.img} src={clockImage} alt="favCharacterLogo" />
                        <Image className={classes.img} src={clockImage} alt="favCharacterLogo" />
                    </div>
                </div>
            </div>
            <div className={classes["general-buttons"]}>
                <button className={classes["edit-button"]}>Редагувати профіль <Image className={classes["edit-image"]} src={setUpIco} alt="edit" /></button>
                <button className={classes["logout-button"]}>Вийти <Image className={classes["logout-image"]} src={logoutIco} alt="exit" /></button>
            </div>
        </div >
    )
}