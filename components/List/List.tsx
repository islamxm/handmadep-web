import styles from './List.module.scss';
import {FC, useEffect, useRef, useState} from 'react';
import { Masonry } from 'masonic';
import {IProduct} from '@/models/IProduct';
import Product from '../Product/Product';
import Image, { StaticImageData } from 'next/image';
import pl from '@/public/assets/handmade-watermark.png';
import useWindowScroll from '@react-hook/window-scroll';
import { useWindowSize } from '@react-hook/window-size';
import { nanoid } from 'nanoid';
import { 
    useMasonry,
    usePositioner,
    useScroller,
    useContainerPosition,
    useResizeObserver 
} from 'masonic';




const columnWidth = 200;





const List:FC<{
    list: any[] 
    setPage: (...args: any[]) => any
}> = ({
    list = [], 
    setPage
}) => {

    const [itemWidth, setItemWidth] = useState(0)
    // const [localList, setLocalList] = useState<any[]>([])
    
    const containerRef = useRef<any>(null);
    const [windowWidth, height] = useWindowSize();
    const { offset, width } = useContainerPosition(containerRef, [
        windowWidth,
        height
    ]);
    const { scrollTop, isScrolling } = useScroller(offset);
    const positioner = usePositioner(
        { width, columnGutter: 8, columnWidth: itemWidth},
        [list.length]
    );
    const resizeObserver = useResizeObserver(positioner);


    const getItemSize = () => {
        if(window.innerWidth < 500) {
            setItemWidth(150)
        } else {
            setItemWidth(200)
        }
    }

    // useEffect(() => {
    //     setLocalList(list)
    // }, [list])

 

    useEffect(() => {
        getItemSize()
        window.addEventListener('resize', getItemSize)

        return () => {
            window.removeEventListener('resize', getItemSize)
        }
    }, [])



    return (
        <div className={styles.wrapper}>
            {
                useMasonry({
                    positioner,
                    scrollTop,
                    isScrolling,
                    height,
                    containerRef,
                    items: list,
                    overscanBy: 5,
                    resizeObserver,
                    render: Product,
                    // itemKey(data, index) {
                    //     return data?.id
                    // },
                })
            }
            {/* <Masonry
                rowGutter={20}
                columnGutter={20}
                columnWidth={itemWidth}
                items={list}
                overscanBy={5}
                render={Product}
                // key={'home'}
                // itemKey={data => data?.id}
                // resizeObserver={resizeObserver}
                /> */}
        </div>
    )
}

  

export default List;