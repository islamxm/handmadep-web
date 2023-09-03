import styles from './Item.module.scss';
import {FC, memo} from 'react';
import Image from 'next/image';
import placeholder from '@/public/assets/handmade-watermark.png';
import Router from 'next/router';
import getClassNames from '@/helpers/getClassNames';

const Item:FC<any> = ({
    cover_url,
    title,
    id
}) => {

    return (
        <div className={styles.wrapper} onClick={() => Router.push(`/itm/${id}`)}>
            <div
                className={getClassNames([styles.image, !cover_url && styles.none])} 
                >
                <Image 
                    src={cover_url ? cover_url : placeholder} 
                    width={45}
                    height={45}
                    loader={(p) => {
                        return p?.src && typeof p?.src === 'string' ? p?.src : '' 
                    }}
                    alt=""/>
            </div>
            <div className={styles.name}>{title}</div>
        </div>
    )
}


export default memo(Item);