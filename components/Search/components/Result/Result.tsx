import styles from './Result.module.scss';
import {FC, useEffect} from 'react';
import { resultType } from '../../types';
import Item from '../Item/Item';
import Card from '../Card/Card';
import {Row, Col} from 'antd';
import { useInView } from 'react-intersection-observer';



const Result:FC<{items: any[], width: number, setPage?: (...args: any[]) => any, onClose?: (...args: any[]) => any}> = ({
    items,
    width,
    setPage,
    onClose
}) => {
    const {inView, ref} = useInView()



    useEffect(() => {
        setPage && setPage((s: number) => s + 1)
    }, [inView, setPage])
    


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
                <div className={styles.load} ref={ref}></div>
            </div>
        </div>
    )
}


export default Result;