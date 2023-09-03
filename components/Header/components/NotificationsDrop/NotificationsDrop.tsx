import styles from './NotificationsDrop.module.scss';
import { FC } from 'react'
import Item from './Item/Item';
import {Row,Col} from 'antd';

const NotificationsDrop:FC<any> = () => {
  return (
    <div className={styles.wrapper}>
      <Row gutter={[5,5]}>
        <Col span={24}>
          <Item/>
        </Col>
      </Row>
    </div>
  )
}

export default NotificationsDrop;