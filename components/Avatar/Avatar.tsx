import styles from './Avatar.module.scss';
import {FC} from 'react';
import { avatarTypes } from './types';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/useTypesRedux';


const Avatar:FC<avatarTypes> = ({
    size = 40,
    image,
    isActive,
    style,
    label,
    onClick
}) => {
    const {placeholderColor} = useAppSelector(s => s.main)


    return (
        <div onClick={onClick} style={{...style, width: size, height: size}} className={`${styles.wrapper} ${isActive ? styles.active : ''}`}>
            <div className={styles.image}>
                <div className={styles.bg} style={{backgroundColor: placeholderColor || 'var(--brown)'}}></div>
                {
                    image ? (
                        <Image 
                            className={styles.image_el} 
                            src={image} 
                            alt="" 
                            width={(size && typeof size === 'number') ? size : 40}
                            height={(size && typeof size === 'number') ? size : 40}
                            loader={(p) => {
                                return p?.src && typeof p?.src === 'string' ? p?.src : '' 
                            }}
                            />
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