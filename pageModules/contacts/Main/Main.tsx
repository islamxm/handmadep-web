import styles from './Main.module.scss';
import { Row, Col } from 'antd';
import Input from '@/components/Input/Input';
import Text from '@/components/Text/Text';
import Button from '@/components/Button/Button';

const Main = () => {
  return (
    <div className={styles.wrapper}>
      <Row gutter={[15,15]}>
        <Col span={24}>
          <Input
            label='E-mail'
            placeholder='E-mail'
            />
        </Col>
        <Col span={24}>
          <Text
            placeholder='Text...'
            />
        </Col>
        <Col span={24}>
          <Button
            text='Send'
            />
        </Col>
      </Row>
    </div>
  )
}

export default Main;