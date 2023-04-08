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
    username = 'Andrey'
}) => {
    const {placeholderColor} = useAppSelector(s => s)




    return (
        <div className={`${styles.wrapper} panel`}>
            <div className={styles.avatar}>
                <div className={styles.img}>
                    <div className={styles.bg} style={{background: placeholderColor}}></div>
                    {
                        avatar ? <Image className={styles.img_el} src={placeholder} alt='Avatar'/> : <div className={styles.label}>{username[0]}</div>
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
            <div className={styles.email}>somemail@mail.com</div>   
            <div className={styles.site}>
                <a href="www.mysite.com" target='_blank'>www.mysite.com</a>    
            </div>   
            <div className={styles.descr}>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo delectus nesciunt eligendi atque quas iure eveniet quos, obcaecati amet quis? Sunt enim et suscipit aliquam, molestiae nostrum corrupti reprehenderit quibusdam.    
                </p>    
            </div>   
            {/* <div className={styles.action}>
                <Button text='Delete my account' variant='brown'/>
            </div> */}
        </div>
    )
}


export default ProfileCard;