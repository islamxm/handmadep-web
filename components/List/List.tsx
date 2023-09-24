import styles from './List.module.scss';
import {FC, useEffect, useRef, useState} from 'react';
import Product from '../Product/Product';
import { useWindowSize } from '@react-hook/window-size';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import { 
    useMasonry,
    usePositioner,
    useScroller,
    useContainerPosition,
    useResizeObserver,
    Masonry
} from 'masonic';
import getClassNames from '@/helpers/getClassNames';
import { main_updateListRef } from '@/store/slices/mainSlice';

const columnWidth = 200;

const List:FC<{
    list: any[] 
    setPage: (...args: any[]) => any
}> = ({
    list = [], 
    setPage
}) => {
    const dispatch = useAppDispatch()
    const ref = useRef<HTMLDivElement>(null)
    const [itemWidth, setItemWidth] = useState(0)
    
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

 

    useEffect(() => {
        getItemSize()
        window.addEventListener('resize', getItemSize)

        return () => {
            window.removeEventListener('resize', getItemSize)
        }
    }, [])


    useEffect(() => {
        if(ref?.current) {
            dispatch(main_updateListRef(ref?.current))
        }
    }, [ref])


    return (
        <div ref={ref} className={styles.wrapper}>
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
            
        </div>
    )
}

  

export default List;