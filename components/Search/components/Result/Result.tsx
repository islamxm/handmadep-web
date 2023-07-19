import styles from './Result.module.scss';
import {FC} from 'react';
import { resultType } from '../../types';
import Item from '../Item/Item';
import Card from '../Card/Card';
import {Row, Col} from 'antd';


const Result:FC<{items: any[], width: number}> = ({
    items,
    width
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
            </div>
        </div>
    )
}


export default Result;