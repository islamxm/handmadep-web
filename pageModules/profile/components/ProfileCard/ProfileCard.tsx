import styles from './ProfileCard.module.scss';
import { Row, Col } from 'antd';
import Image from 'next/image';

import {FC, useState} from 'react';
import IUser from '@/models/IUser';
import Button from '@/components/Button/Button';
import placeholder from '@/public/assets/avatar-placeholder.png';
import {BiEditAlt} from 'react-icons/bi';
import {BsTrashFill} from 'react-icons/bs';
import { useAppSelector } from '@/hooks/useTypesRedux';


const ProfileCard:FC<IUser> = ({
    avatar,
    username,
    site,
    about,
    email
}) => {
    const {placeholderColor} = useAppSelector(s => s.main)




    return (
        <div className={`${styles.wrapper} panel`}>
            <div className={styles.avatar}>
                <div className={styles.img}>
                    <div className={styles.bg} style={{background: placeholderColor}}></div>
                    {
                        avatar ? <Image className={styles.img_el} src={placeholder} alt='Avatar'/> : <div className={styles.label}>{username ? username[0] : ''}</div>
                    }
                    
                </div>    
                <div className={styles.edit}>
                    <div className={styles.item}>
                        <Button round icon={<BiEditAlt size={30} color='#fff'/>} variant='blue'/>
                    </div>
                    {
                        avatar ? (
                            <div className={styles.item}>
                                <Button round icon={<BsTrashFill size={30} color='#fff'/>} variant='brown'/>
                            </div>
                        ) : null
                    }
                </div>
            </div>   
            <div className={styles.name}>
                {username}
            </div>
            <div className={styles.email}>{email}</div>   
            {
                site && (
                    <div className={styles.site}>
                        <a href="www.mysite.com" target='_blank'>{site}</a>    
                    </div>   
                )
            }
           
            {
                about && (
                    <div className={styles.descr}>
                        <p>{about}</p> 
                    </div>   
                )
            }
        </div>
    )
}


export default ProfileCard;