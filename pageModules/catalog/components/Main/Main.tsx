import styles from './Main.module.scss';
import Slider from '../Slider/Slider';
import Body from '../Body/Body';
import {Row, Col} from 'antd';


const Main = () => {

    return (
        <div className={styles.wrapper}>
            <Row gutter={[20,20]}>
                <Col span={12}>
                    <Slider/>
                </Col>
                <Col span={12}>
                    <Body/>
                </Col>
            </Row>
        </div>
    )
}


export default Main;