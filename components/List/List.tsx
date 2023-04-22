import styles from './List.module.scss';
import {FC, useEffect, useState} from 'react';
import { Masonry } from 'masonic';
import {IProduct} from '@/models/IProduct';
import Product from '../Product/Product';
import Image, { StaticImageData } from 'next/image';
import pl from '@/public/assets/handmade-watermark.png';
// import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

// import {
//     CellMeasurer,
//     CellMeasurerCache,
//     createMasonryCellPositioner,
//     Masonry,
//     AutoSizer
//   } from "react-virtualized";


const columnWidth = 200;

const defaultHeight = 250;
const defaultWidth = columnWidth;



// const cache = new CellMeasurerCache({
//     defaultHeight,
//     defaultWidth,
//     fixedWidth: true
// });


// const cellPositionerConfig = {
//     cellMeasurerCache: cache,
//     columnCount: 3,
//     columnWidth,
//     spacer: 10
// };


// const cellPositioner = createMasonryCellPositioner(cellPositionerConfig);




const List:FC<{
    list: any[] 
    setCurrentPage: (...args: any[]) => any
}> = ({
    list = [], 
    setCurrentPage
}) => {

    const [itemWidth, setItemWidth] = useState(0)
    const [localList, setLocalList] = useState<any[]>([])

    const getItemSize = () => {
        if(window.innerWidth < 500) {
            setItemWidth(150)
        } else {
            setItemWidth(200)
        }
    }

    // useEffect(() => {
    //     // console.log(localList)
    //     if(list?.length > 0) {
    //         const array = list.map((item, index) => item.id)
    //         console.log(list.map(i => i.id))
    //         const dup = array.filter((item,index, arr) => arr.indexOf(item) !== index)
    //         console.log(dup)
    //     }
    // }, [list])

    useEffect(() => {
        getItemSize()
        window.addEventListener('resize', getItemSize)

        return () => {
            window.removeEventListener('resize', getItemSize)
        }
    }, [])

    // useEffect(() => {
    //     setLocalList(list?.map((i,index) => {
    //         return {...i, isLast: index === list?.length - 1, newLimit: () => setCurrentPage((s: number) => s + 1)}
    //     }))
    // }, [list])


    
    // isLast: item.index === list?.length - 1,
    // newLimit: () => setCurrentPage((s: number) => s + 1)


    return (
        <div className={styles.wrapper}>
          
            <Masonry
                rowGutter={20}
                columnGutter={20}
                columnWidth={itemWidth}
                items={list}
                itemKey={(item, index) => {
                    return item.id
                }} 
                overscanBy={5}
                // className='sss'
                render={Product}/>
            {/* <ResponsiveMasonry columnsCountBreakPoints={{300: 2, 768: 5}}>
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
            </ResponsiveMasonry> */}
        </div>
    )
}

  

export default List;