import styles from './Result.module.scss';
import {FC} from 'react';
import { resultType } from '../../types';
import Item from '../Item/Item';
import Card from '../Card/Card';
import {Row, Col} from 'antd';


const Result:FC<resultType> = ({
    items,
    categories
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
            {
                categories ? (
                    <div className={styles.ex}>
                        <div className={styles.label}></div>
                        <div className={styles.list}>
                            <Row gutter={[10,10]}>
                                {
                                    categories?.map((item,index) => (
                                        <Col span={6} key={index}><Card {...item}/></Col>
                                    ))
                                }
                            </Row>
                            
                        </div>
                    </div>
                ) : null
            }
            
        </div>
    )
}


export default Result;