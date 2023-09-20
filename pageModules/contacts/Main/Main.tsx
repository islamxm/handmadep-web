import styles from './Main.module.scss';
import { FC, useState } from 'react'
import { Row, Col } from 'antd';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Text from '@/components/Text/Text';

const Main:FC<any> = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [load, setLoad] = useState(false)

  return (
    <div className={styles.wrapper}>
      <p>
      If you have questions or suggestions on how to improve the HandmadeP experience, or if you&quot;ve discovered an error or bug on the website, please let us know through our contact form below.
      </p>
      <div className={styles.form}>
        <Row gutter={[10,10]}>
          <Col span={24}>
            <Input
              placeholder='Name'
              />
          </Col>
          <Col span={24}>
            <Input
              placeholder='E-mail'
              />
          </Col>
          <Col span={24}>
            <Text
              placeholder='Text...'
              style={{height: 200}}
              />
          </Col>
          <Col span={24}>
            <Button
              text='Send'
              />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Main;