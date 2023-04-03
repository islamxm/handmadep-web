import styles from './Item.module.scss';
import {FC, memo} from 'react';
import { searchItemType } from '../../types';
import Image from 'next/image';
import placeholder from '@/public/assets/handmade-watermark.png';


const Item:FC<searchItemType> = ({
    image,
    name
}) => {

    return (
        <div className={styles.wrapper}>
            {/* <div className={`${styles.image} ${!image ? styles.none : ''}`}>
                <Image src={image ? image : placeholder} alt=""/>
            </div> */}
            <div className={styles.name}>{name}</div>
        </div>
    )
}


export default memo(Item);