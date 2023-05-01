import styles from './Avatar.module.scss';
import {FC} from 'react';
import { avatarTypes } from './types';
import Image from 'next/image';
import placeholder from '@/public/assets/avatar-placeholder.png';
import { useAppSelector } from '@/hooks/useTypesRedux';
import {useEffect} from 'react';
const Avatar:FC<avatarTypes> = ({
    size = 40,
    image,
    isActive,
    style,
    label
}) => {
    const {placeholderColor} = useAppSelector(s => s)


    return (
        <div style={{...style, width: size, height: size}} className={`${styles.wrapper} ${isActive ? styles.active : ''}`}>
            <div className={styles.image}>
                <div className={styles.bg} style={{backgroundColor: placeholderColor}}></div>
                {
                    image ? (
                        <Image 
                            className={styles.image_el} 
                            src={image} 
                            alt="" 
                            placeholder={'blur'}/>
                    ) : <div 
                            style={{
                                fontSize: typeof size === 'number' ? size - 20 : `calc(${size} - 20px)`,
                                lineHeight: typeof size === 'number' ? size - 20 : `calc(${size} - 20px)`
                            }} 
                            className={styles.label}>
                                {label ? label[0] : ''}
                        </div>
                }
                
            </div>
        </div>
    )
}

export default Avatar;