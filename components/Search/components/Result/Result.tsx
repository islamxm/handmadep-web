import styles from './Result.module.scss';
import {FC} from 'react';
import { resultType } from '../../types';
import Item from '../Item/Item';
import Card from '../Card/Card';
import {Row, Col} from 'antd';


const Result:FC<resultType> = ({
    items,
}) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                {
                    items?.map((item,index) => (
                        <Item {...item} key={index}/>
                    ))
                }
            </div>
        </div>
    )
}


export default Result;