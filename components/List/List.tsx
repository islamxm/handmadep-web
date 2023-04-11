import styles from './List.module.scss';
import {FC, useEffect, useState} from 'react';
// import { Masonry } from 'masonic';
import {IProduct} from '@/models/IProduct';
import Product from '../Product/Product';
import Image, { StaticImageData } from 'next/image';
import pl from '@/public/assets/handmade-watermark.png';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"


const List:FC<{list: IProduct[], setCurrentPage: (...args: any[]) => any}> = ({
    list = [], setCurrentPage
}) => {

    const [itemWidth, setItemWidth] = useState(0);


    // const getItemSize = () => {
    //     if(window.innerWidth < 500) {
    //         setItemWidth(150)
    //     } else {
    //         setItemWidth(200)
    //     }
    // }

    // useEffect(() => {
    //     getItemSize()
    //     window.addEventListener('resize', getItemSize)

    //     return () => {
    //         window.removeEventListener('resize', getItemSize)
    //     }
    // }, [])


    return (
        <div className={styles.wrapper}>
            {/* <Masonry
                rowGutter={20}
                columnGutter={20}
                columnWidth={itemWidth}
                items={list} 
                overscanBy={5}
                render={Product}/> */}
            <ResponsiveMasonry columnsCountBreakPoints={{300: 2, 768: 5}}>
                <Masonry
                    className='sss'
                    gutter={'20px'}
                    
                    >
                    
                    {
                        list?.length > 0 ? (
                            list.map((item, index) => (
                                <Product
                                    data={{
                                        ...item,
                                        isLast: index === list?.length - 1,
                                        newLimit: () => setCurrentPage((s: number) => s + 1)
                                    }}
                                    key={index}
                                    />
                            ))  
                        ) : null
                    }
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}

  

export default List;