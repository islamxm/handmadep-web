import styles from './Main.module.scss';
import Slider from '../Slider/Slider';
import Body from '../Body/Body';
import {Row, Col} from 'antd';
import { IProduct } from '@/models/IProduct';
import {FC, useEffect} from 'react';


const Main:FC<IProduct> = (props) => {

    const {cover_url} = props;

    
    return (
        <div className={styles.wrapper}>
            <Row gutter={[10,10]}>
                <Col md={12} span={24}>
                    <Slider
                        images={cover_url ? [cover_url] : []}
                        />
                </Col>
                <Col md={12} span={24}>
                    <Body {...props}/>
                </Col>
            </Row>
        </div>
    )
}


export default Main;