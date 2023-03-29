import styles from './Card.module.scss';
import { searchItemType } from '../../types';
import {FC, memo} from 'react';
import placeholder from '@/public/assets/handmade-watermark.png';
import Image from 'next/image';


const Card:FC<searchItemType> = ({image, name}) => {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.image} ${!image ? styles.none : ''}`}>
                <Image src={image ? image : placeholder} alt="" />
            </div>
            <div className={styles.name}>
                {name}
            </div>
        </div>
    )
}

export default memo(Card);