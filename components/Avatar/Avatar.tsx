import styles from './Avatar.module.scss';
import {FC} from 'react';
import { avatarTypes } from './types';
import Image from 'next/image';
import placeholder from '@/public/assets/avatar-placeholder.png';


const Avatar:FC<avatarTypes> = ({
    size,
    image,
    isActive,
    style
}) => {

    return (
        <div style={{...style, width: size, height: size}} className={`${styles.wrapper} ${isActive ? styles.active : ''}`}>
            <div className={styles.image}>
                <Image src={image ? image : placeholder} alt="" placeholder={'blur'}/>
            </div>
        </div>
    )
}

export default Avatar;