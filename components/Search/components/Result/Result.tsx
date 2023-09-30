import styles from './Result.module.scss';
import {FC} from 'react';
import Item from '../Item/Item';
import { LoadNext } from '@/components/loadMoreCtrl/loadMoreCtrl';

const Result:FC<{
    items: any[], 
    width: number, 
    setPage: (...args: any[]) => any, 
    onClose?: (...args: any[]) => any,

    canLoadNext?: boolean,
    isEnd?: boolean,
    page:number
}> = ({
    items,
    width,
    setPage,
    onClose,

    canLoadNext,
    isEnd,
    page
}) => {

    if(items?.length === 0) {
        return null
    } 

    return (
        <div style={{width: width}} className={styles.wrapper}>
            <div className={styles.main}>
                {
                    items?.length > 0 && items?.map((item: any,index: number) => (
                        <Item {...item} key={index}/>
                    ))
                }
                {(canLoadNext && !isEnd && items?.length > 0) && (
                    <LoadNext
                        canLoadNext={canLoadNext}
                        setPage={setPage}
                        page={page}
                        />
                )}
            </div>
        </div>
    )
}


export default Result;