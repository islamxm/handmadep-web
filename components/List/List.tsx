import styles from './List.module.scss';
import {FC, useEffect, useState} from 'react';
import { Masonry } from 'masonic';
import {IProduct} from '@/models/IProduct';
import Product from '../Product/Product';
import Image, { StaticImageData } from 'next/image';
import pl from '@/public/assets/handmade-watermark.png';

const List:FC<{list: IProduct[]}> = ({
    list = []
}) => {

    const [itemWidth, setItemWidth] = useState(0);


    const getItemSize = () => {
        if(window.innerWidth < 500) {
            setItemWidth(150)
        } else {
            setItemWidth(200)
        }
    }

    useEffect(() => {
        getItemSize()
        window.addEventListener('resize', getItemSize)

        return () => {
            window.removeEventListener('resize', getItemSize)
        }
    }, [])


    return (
        <div className={styles.wrapper}>
            <Masonry
                rowGutter={20}
                columnGutter={20}
                columnWidth={itemWidth}
                items={list} 
                overscanBy={5}
                render={Product}/>
        </div>
    )
}

  

export default List;