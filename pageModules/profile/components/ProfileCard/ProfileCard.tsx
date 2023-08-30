import styles from './ProfileCard.module.scss';
import { Row, Col } from 'antd';
import Image from 'next/image';

import {ChangeEvent, FC, useEffect, useState} from 'react';
import IUser from '@/models/IUser';
import Button from '@/components/Button/Button';
import placeholder from '@/public/assets/avatar-placeholder.png';
import {BiEditAlt} from 'react-icons/bi';
import {BsTrashFill} from 'react-icons/bs';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import notify from '@/helpers/notify';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import { main_updateUserData } from '@/store/slices/mainSlice';
import { MoonLoader } from 'react-spinners';
import getClassNames from '@/helpers/getClassNames';

const service = new ApiService()

const ProfileCard:FC<IUser> = ({
    avatar,
    username,
    avatar_image,
    site,
    about,
    email
}) => {
    const dispatch = useAppDispatch()
    const {placeholderColor, token: {access}, userData} = useAppSelector(s => s.main)
    const [isLoading, setIsLoading] = useState(false)

        
    const onUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0)
        if(access && file) {
            setIsLoading(true)
            const fr = new FileReader()
            fr.readAsDataURL(file)
            fr.onload = async () => {
                const res = await fr.result
                if(res && typeof res === 'string') {
                    service.editSelf({avatar_image: res}, access).then(data => {
                        if(data?.id) {
                            dispatch(main_updateUserData(res))
                            notify('Success', 'SUCCESS')
                        } else {
                            notify('An error occurred', 'ERROR')
                        }
                    }).finally(() => setIsLoading(false))       
                } else {
                    setIsLoading(false)
                }
            }
        }
    }

    return (
        <div className={`${styles.wrapper} panel`}>
            <div className={getClassNames([styles.avatar, isLoading && styles.loading])}>
                {
                    isLoading && <div className={styles.loader}><MoonLoader/></div>
                }
                <div className={styles.img}>
                    <div className={styles.bg} style={{background: placeholderColor}}></div>
                    {
                        avatar_image ? 
                        <Image 
                            width={100} 
                            height={100} 
                            className={styles.img_el} 
                            src={avatar_image || placeholder} 
                            loader={(p) => {
                                return p?.src && typeof p?.src === 'string' ? p?.src : '' 
                            }}
                            alt='Avatar'/> 
                        : <div className={styles.label}>{username ? username[0] : ''}</div>
                    }
                </div>    
                <div className={styles.edit}>
                    <div className={styles.item}>
                        <input value={''} onChange={onUploadImage} id='upload-image' type="file" accept='.jpg, .png, .webp' />
                        <label htmlFor="upload-image">
                            <BiEditAlt size={30} color='#fff'/>
                        </label>
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