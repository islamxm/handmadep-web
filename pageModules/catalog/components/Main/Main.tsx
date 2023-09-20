import styles from './Main.module.scss';
import Slider from '../Slider/Slider';
import Body from '../Body/Body';
import {Row, Col} from 'antd';
import { IProduct } from '@/models/IProduct';
import {FC} from 'react';

interface I extends IProduct {
    ssrData?: IProduct | any
}

const Main:FC<I> = (props) => {

    const {cover_url, title, ssrData} = props;
    

    return (
        <div className={styles.wrapper}>
            <Row gutter={[10,10]}>
                <Col md={12} span={24}>
                    <Slider
                        title={title}
                        images={cover_url ? [cover_url] : []}
                        />
                </Col>
                <Col md={12} span={24}>
                    <Body {...props} title={ssrData?.title || title}/>
                </Col>
            </Row>
        </div>
    )
}


export default Main;