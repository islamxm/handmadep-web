import styles from './List.module.scss';
import {FC} from 'react';
import { Masonry } from 'masonic';
import IProduct from '@/models/IProduct';
import Product from '../Product/Product';
import Image, { StaticImageData } from 'next/image';
import pl from '@/public/assets/handmade-watermark.png';

const List:FC<{list: IProduct[]}> = ({
    list
}) => {

    return (
        <div className={styles.wrapper}>
            <Masonry 
                rowGutter={20}
                columnGutter={20}
                // columnWidth={220}
                items={list} 
                overscanBy={5}
                render={Product}/>
        </div>
    )
}

  

export default List;